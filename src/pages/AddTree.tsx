import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { COUNTRIES, DEFAULT_COUNTRY } from '../data/countries'
import { WORLD_SPECIES, calcXP, DEFAULT_XP, type LocalSpecies } from '../data/worldSpecies'
import { countryFlag } from '../data/countryFlags'

type TreeStage = 'seed' | 'seedling' | 'sapling' | 'tree'

const STAGES: { value: TreeStage; label: string; emoji: string }[] = [
  { value: 'seed',     label: 'Seed',     emoji: '🌰' },
  { value: 'seedling', label: 'Seedling', emoji: '🌱' },
  { value: 'sapling',  label: 'Sapling',  emoji: '🌿' },
  { value: 'tree',     label: 'Tree',     emoji: '🌳' },
]

// NLP carousel slides — Unsplash photos with emotional copy
const SLIDES = [
  {
    url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=900&q=85&auto=format&fit=crop',
    head: 'Your tree will outlive you.',
    sub: 'Plant something that lasts longer than a lifetime.',
  },
  {
    url: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=900&q=85&auto=format&fit=crop',
    head: 'Feel the soil between your fingers.',
    sub: 'Every tree begins with a single moment of intention.',
  },
  {
    url: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=900&q=85&auto=format&fit=crop',
    head: '2.7 million trees. Counting.',
    sub: 'Join a global movement rooted in real action.',
  },
  {
    url: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=900&q=85&auto=format&fit=crop',
    head: 'Children will play in its shade.',
    sub: 'The best time to plant a tree was 20 years ago. The second best time is now.',
  },
  {
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&q=85&auto=format&fit=crop',
    head: 'Breathe easier. Literally.',
    sub: 'A single mature tree absorbs 22kg of CO₂ every year.',
  },
]

// Ensure or create species in Supabase, return its UUID
async function upsertSpecies(sp: LocalSpecies): Promise<string | null> {
  try {
    const { data: existing } = await supabase
      .from('species')
      .select('id')
      .eq('scientific_name', sp.scientific_name)
      .maybeSingle()
    if (existing) return existing.id

    const { data: inserted, error } = await supabase
      .from('species')
      .insert({
        name: sp.common_name,
        scientific_name: sp.scientific_name,
        category: 'native',
        carbon_coeff_kg_per_cm: sp.carbon_coeff,
      })
      .select('id')
      .single()
    if (error) return null
    return inserted.id
  } catch { return null }
}

export default function AddTree() {
  const navigate  = useNavigate()
  const searchRef = useRef<HTMLInputElement>(null)

  // ── Carousel state ────────────────────────────────────────────────────
  const [slide,   setSlide]   = useState(0)
  const [fadeIn,  setFadeIn]  = useState(true)

  useEffect(() => {
    const t = setInterval(() => {
      setFadeIn(false)
      setTimeout(() => {
        setSlide(s => (s + 1) % SLIDES.length)
        setFadeIn(true)
      }, 400)
    }, 4500)
    return () => clearInterval(t)
  }, [])

  // ── Form state ────────────────────────────────────────────────────────
  const [country, setCountry]                 = useState(DEFAULT_COUNTRY)
  const [speciesQuery, setSpeciesQuery]       = useState('')
  const [selectedSpecies, setSelectedSpecies] = useState<LocalSpecies | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [form, setForm] = useState({
    name: '',
    stage: 'seed' as TreeStage,
    planted_at: new Date().toISOString().split('T')[0],
  })
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)

  // ── Species autocomplete ──────────────────────────────────────────────
  const nativeSpecies = useMemo(
    () => WORLD_SPECIES.filter(s => s.native_countries.includes(country)),
    [country],
  )

  const suggestions = useMemo(() => {
    const q = speciesQuery.trim().toLowerCase()
    if (!q || q.length < 2) return []
    return nativeSpecies
      .filter(s =>
        s.common_name.toLowerCase().includes(q) ||
        s.scientific_name.toLowerCase().includes(q) ||
        (s.family ?? '').toLowerCase().includes(q),
      )
      .slice(0, 8)
  }, [nativeSpecies, speciesQuery])

  // ── XP ────────────────────────────────────────────────────────────────
  const xp       = selectedSpecies ? calcXP(selectedSpecies.carbon_coeff) : DEFAULT_XP
  const xpColor  = xp >= 100 ? '#16a34a' : xp >= 60 ? '#d97706' : 'white'

  // ── Country change resets species ─────────────────────────────────────
  const handleCountryChange = (c: string) => {
    setCountry(c)
    setSelectedSpecies(null)
    setSpeciesQuery('')
  }

  // ── Submit (auth-gated) ───────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!country) { setError('Please select a country first'); return }
    setLoading(true); setError(null)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      // Save pending tree data so Auth can resume after login
      sessionStorage.setItem('pendingTree', JSON.stringify({
        country,
        form,
        speciesScientificName: selectedSpecies?.scientific_name ?? null,
      }))
      navigate('/auth')
      return
    }

    let species_id: string | null = null
    if (selectedSpecies) {
      species_id = await upsertSpecies(selectedSpecies)
    }

    const { error: err } = await supabase.from('trees').insert({
      user_id: user.id,
      name: form.name,
      species_id,
      stage: form.stage,
      planted_at: form.planted_at || null,
      lat: null,
      lng: null,
      notes: null,
      is_public: true,
    })
    if (err) { setError(err.message); setLoading(false); return }

    try { await supabase.rpc('award_xp', { user_id: user.id, amount: xp }) } catch { /* */ }
    navigate('/dashboard')
  }

  const flag = countryFlag(country)

  return (
    <>
      <style>{`
        /* ── NLP Carousel ─────────────────────────────────────────────── */
        .carousel-root {
          position: relative;
          width: 100%;
          height: 240px;
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 24px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.28);
        }
        @media (min-width: 480px) { .carousel-root { height: 280px; } }

        .carousel-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 0.4s ease;
          animation: kenBurns 4.5s ease-in-out forwards;
        }
        @keyframes kenBurns {
          0%   { transform: scale(1.0) translateX(0); }
          100% { transform: scale(1.08) translateX(-1%); }
        }

        .carousel-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.65) 100%);
        }

        .carousel-copy {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 20px 20px 16px;
        }

        .carousel-head {
          font-size: 20px;
          font-weight: 800;
          color: #fff;
          line-height: 1.2;
          letter-spacing: -0.4px;
          margin: 0 0 5px;
          text-shadow: 0 2px 12px rgba(0,0,0,0.5);
        }
        @media (min-width: 480px) { .carousel-head { font-size: 24px; } }

        .carousel-sub {
          font-size: 12px;
          color: rgba(255,255,255,0.82);
          margin: 0;
          line-height: 1.45;
          text-shadow: 0 1px 6px rgba(0,0,0,0.5);
        }

        .carousel-dots {
          position: absolute;
          top: 14px;
          right: 16px;
          display: flex;
          gap: 5px;
        }
        .carousel-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.4);
          cursor: pointer;
          border: none;
          padding: 0;
          transition: background 0.3s, transform 0.3s;
        }
        .carousel-dot.active {
          background: #fff;
          transform: scale(1.3);
        }

        .carousel-stats {
          position: absolute;
          top: 14px; left: 16px;
          display: flex;
          gap: 8px;
        }
        .carousel-stat-pill {
          font-size: 10px;
          font-weight: 700;
          color: rgba(255,255,255,0.9);
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(6px);
          border-radius: 20px;
          padding: 4px 10px;
          white-space: nowrap;
        }

        /* ── Country flag reveal ──────────────────────────────────────── */
        .flag-reveal {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: rgba(58,184,122,0.07);
          border: 1px solid rgba(58,184,122,0.2);
          border-radius: 14px;
          margin-top: 10px;
          animation: flagFadeIn 0.3s ease;
        }
        @keyframes flagFadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .flag-emoji {
          font-size: 36px;
          line-height: 1;
          filter: drop-shadow(0 2px 6px rgba(0,0,0,0.2));
        }
      `}</style>

      {/* ── NLP Image Carousel ──────────────────────────────────────────── */}
      <div className="carousel-root">
        <img
          key={slide}
          className="carousel-img"
          src={SLIDES[slide].url}
          alt=""
          style={{ opacity: fadeIn ? 1 : 0 }}
        />
        <div className="carousel-overlay" />

        {/* Stats pills */}
        <div className="carousel-stats">
          <span className="carousel-stat-pill">🌍 127 countries</span>
          <span className="carousel-stat-pill">🌳 2.7M trees</span>
          <span className="carousel-stat-pill">✨ Growing daily</span>
        </div>

        {/* Dot indicators */}
        <div className="carousel-dots">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot${i === slide ? ' active' : ''}`}
              onClick={() => { setFadeIn(false); setTimeout(() => { setSlide(i); setFadeIn(true) }, 400) }}
            />
          ))}
        </div>

        {/* Copy */}
        <div className="carousel-copy" style={{ opacity: fadeIn ? 1 : 0, transition: 'opacity 0.4s ease' }}>
          <p className="carousel-head">{SLIDES[slide].head}</p>
          <p className="carousel-sub">{SLIDES[slide].sub}</p>
        </div>
      </div>

      {/* ── Page header ─────────────────────────────────────────────────── */}
      <div style={{ marginBottom: 28 }}>
        <p className="page-eyebrow">New tree</p>
        <h1 className="page-title" style={{ fontSize: 24 }}>Plant a tree 🌱</h1>
      </div>

      <form onSubmit={handleSubmit}>

        {/* ── 1. Country ───────────────────────────────────────────────── */}
        <div className="field">
          <label className="label">Country *</label>
          <p style={{ fontSize: 11, color: 'var(--color-tertiary)', marginBottom: 8 }}>
            Select where you're planting — species list updates to native plants only
          </p>
          <select
            className="input"
            value={country}
            onChange={e => handleCountryChange(e.target.value)}
            required
            style={{ cursor: 'pointer' }}
          >
            {COUNTRIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Flag reveal */}
          {country && (
            <div className="flag-reveal">
              <span className="flag-emoji">{flag}</span>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-fg)', margin: 0 }}>{country}</p>
                {nativeSpecies.length > 0 && (
                  <p style={{ fontSize: 12, color: 'var(--accent)', margin: '2px 0 0' }}>
                    🌿 {nativeSpecies.length} native species available
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── 2. Species search ────────────────────────────────────────── */}
        <div className="field">
          <label className="label">Species</label>
          <p style={{ fontSize: 11, color: 'var(--color-tertiary)', marginBottom: 8 }}>
            {nativeSpecies.length === 0
              ? `No species data yet for ${country} — you can still plant without selecting one`
              : 'Start typing a common or scientific name'}
          </p>

          {/* Selected species chip */}
          {selectedSpecies && (
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: 'rgba(58,184,122,0.08)', border: '1px solid rgba(58,184,122,0.3)',
              borderRadius: 12, padding: '10px 14px', marginBottom: 10,
            }}>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent)', margin: 0 }}>
                  {selectedSpecies.common_name}
                </p>
                <p style={{ fontSize: 11, color: 'var(--color-tertiary)', margin: 0 }}>
                  {selectedSpecies.scientific_name} · CO₂ coeff {selectedSpecies.carbon_coeff}
                </p>
              </div>
              <button type="button"
                onClick={() => { setSelectedSpecies(null); setSpeciesQuery('') }}
                style={{
                  width: 28, height: 28, borderRadius: '50%', border: 'none',
                  background: 'rgba(163,177,198,0.3)', color: 'var(--color-secondary)',
                  fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>×</button>
            </div>
          )}

          {/* Search input */}
          {!selectedSpecies && (
            <div style={{ position: 'relative' }}>
              <input
                ref={searchRef}
                className="input"
                type="text"
                placeholder={nativeSpecies.length > 0 ? `Search ${nativeSpecies.length} native species…` : 'No species data for this country'}
                value={speciesQuery}
                disabled={nativeSpecies.length === 0}
                onChange={e => { setSpeciesQuery(e.target.value); setShowSuggestions(true) }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                autoComplete="off"
              />

              {/* Autocomplete dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div style={{
                  position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50,
                  background: 'var(--surface-solid)',
                  border: '1px solid rgba(212,219,229,0.8)',
                  borderRadius: 14, marginTop: 4,
                  boxShadow: 'var(--neu-shadow)',
                  overflow: 'hidden',
                }}>
                  {suggestions.map((sp, i) => (
                    <button
                      key={sp.scientific_name}
                      type="button"
                      onMouseDown={() => { setSelectedSpecies(sp); setSpeciesQuery(''); setShowSuggestions(false) }}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        width: '100%', padding: '11px 14px', border: 'none',
                        background: 'transparent', cursor: 'pointer', textAlign: 'left',
                        borderBottom: i < suggestions.length - 1 ? '1px solid rgba(212,219,229,0.4)' : 'none',
                      }}
                    >
                      <div style={{ minWidth: 0 }}>
                        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-fg)', margin: 0,
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {sp.common_name}
                        </p>
                        <p style={{ fontSize: 11, color: 'var(--color-tertiary)', margin: 0 }}>
                          {sp.scientific_name}
                        </p>
                      </div>
                      <span style={{
                        flexShrink: 0, marginLeft: 8, fontSize: 11, fontWeight: 700,
                        color: calcXP(sp.carbon_coeff) >= 100 ? '#16a34a' : '#d97706',
                        background: 'rgba(58,184,122,0.08)', borderRadius: 8, padding: '2px 6px',
                      }}>
                        +{calcXP(sp.carbon_coeff)} XP
                      </span>
                    </button>
                  ))}

                  {speciesQuery.length >= 2 && suggestions.length === 0 && (
                    <p style={{ padding: '12px 14px', fontSize: 13, color: 'var(--color-tertiary)', margin: 0 }}>
                      No native species found for "{speciesQuery}" in {country}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── 3. Stage picker ──────────────────────────────────────────── */}
        <div className="field">
          <label className="label">Current stage</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {STAGES.map(s => (
              <button key={s.value} type="button"
                onClick={() => setForm(f => ({ ...f, stage: s.value }))}
                style={{
                  padding: '14px 0', borderRadius: 14, border: 'none', cursor: 'pointer',
                  transition: 'all 0.15s',
                  background: form.stage === s.value ? 'var(--surface-solid)' : 'var(--bg)',
                  boxShadow: form.stage === s.value ? 'var(--neu-inset-sm)' : 'var(--neu-shadow-sm)',
                  color: form.stage === s.value ? 'var(--accent)' : 'var(--color-secondary)',
                  textAlign: 'center',
                }}>
                <div style={{ fontSize: 26, lineHeight: 1, marginBottom: 6 }}>{s.emoji}</div>
                <div style={{ fontSize: 11, fontWeight: 600 }}>{s.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* ── 4. Date planted ──────────────────────────────────────────── */}
        <div className="field">
          <label className="label">Date planted</label>
          <input className="input" type="date" value={form.planted_at}
            onChange={e => setForm(f => ({ ...f, planted_at: e.target.value }))} />
        </div>

        {/* ── 5. Tree name ─────────────────────────────────────────────── */}
        <div className="field">
          <label className="label">Name your tree *</label>
          <input className="input" type="text" placeholder="e.g. Grandma's Oak"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            required />
        </div>

        {error && (
          <p style={{ fontSize: 13, color: '#ef4444', marginBottom: 16 }}>{error}</p>
        )}

        {/* ── 6. Submit ────────────────────────────────────────────────── */}
        <button type="submit" className="btn-primary" disabled={loading}
          style={{ position: 'relative', overflow: 'hidden' }}>
          {loading ? 'Planting…' : (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <span>🌱 Plant this tree</span>
              <span style={{
                background: 'rgba(255,255,255,0.18)', borderRadius: 8,
                padding: '3px 10px', fontSize: 14, fontWeight: 700, color: xpColor,
              }}>
                +{xp} XP
              </span>
            </span>
          )}
        </button>

        {selectedSpecies && (
          <p style={{ fontSize: 11, color: 'var(--color-tertiary)', textAlign: 'center', marginTop: 10 }}>
            XP based on {selectedSpecies.common_name}'s estimated CO₂ absorption capacity
            (coeff {selectedSpecies.carbon_coeff} kg/m/yr)
          </p>
        )}

      </form>
    </>
  )
}

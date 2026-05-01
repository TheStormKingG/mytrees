import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { COUNTRIES, DEFAULT_COUNTRY } from '../data/countries'
import { getCountryInfo } from '../data/countryBlurbs'
import { WORLD_SPECIES, calcXP, DEFAULT_XP, type LocalSpecies } from '../data/worldSpecies'
import { countryFlag } from '../data/countryFlags'
import PlantingWizard from '../components/PlantingWizard'

// ── Rarity helpers ────────────────────────────────────────────────────────────
type Rarity = { tier: string; color: string; bg: string; glow: string; stars: string; fallbackImg: string }
function getRarity(coeff: number | null): Rarity {
  if (!coeff || coeff < 1.8) return {
    tier: 'Common', color: '#3ab87a',
    bg: 'linear-gradient(160deg,#0a2a1a 0%,#0d3d22 60%,#0a2a18 100%)',
    glow: 'rgba(58,184,122,0.5)', stars: '⭐',
    fallbackImg: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80&auto=format&fit=crop',
  }
  if (coeff < 3.5) return {
    tier: 'Rare', color: '#60a5fa',
    bg: 'linear-gradient(160deg,#0a1a3a 0%,#0d2d6e 60%,#0a1a38 100%)',
    glow: 'rgba(96,165,250,0.5)', stars: '⭐⭐',
    fallbackImg: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=80&auto=format&fit=crop',
  }
  if (coeff < 6.0) return {
    tier: 'Epic', color: '#c084fc',
    bg: 'linear-gradient(160deg,#1a0a3a 0%,#3d0d6e 60%,#1a0a38 100%)',
    glow: 'rgba(192,132,252,0.5)', stars: '⭐⭐⭐',
    fallbackImg: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80&auto=format&fit=crop',
  }
  return {
    tier: 'Legendary', color: '#fbbf24',
    bg: 'linear-gradient(160deg,#2a1800 0%,#6e3d00 60%,#2a1600 100%)',
    glow: 'rgba(251,191,36,0.6)', stars: '⭐⭐⭐⭐',
    fallbackImg: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80&auto=format&fit=crop',
  }
}

type TreeStage = 'seed' | 'seedling' | 'sapling' | 'tree'

const STAGES: { value: TreeStage; label: string; emoji: string }[] = [
  { value: 'seed',     label: 'Seed',     emoji: '🌰' },
  { value: 'seedling', label: 'Seedling', emoji: '🌱' },
  { value: 'sapling',  label: 'Sapling',  emoji: '🌿' },
  { value: 'tree',     label: 'Tree',     emoji: '🌳' },
]

// ── NLP carousel — all free Unsplash, all forests/Amazon/planting ─────────────
const SLIDES = [
  {
    url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=900&q=85&auto=format&fit=crop',
    head: 'Your tree will outlive you.',
    sub: 'Plant something that lasts longer than a lifetime.',
  },
  {
    url: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=900&q=85&auto=format&fit=crop',
    head: 'The Amazon breathes for all of us.',
    sub: 'Every tree you plant adds to the world\'s lungs.',
  },
  {
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&q=85&auto=format&fit=crop',
    head: 'Breathe easier. Literally.',
    sub: 'A single mature tree absorbs 22kg of CO₂ every year.',
  },
  {
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=85&auto=format&fit=crop',
    head: 'Children will play in its shade.',
    sub: 'The best time to plant a tree was 20 years ago. The second best time is now.',
  },
  {
    url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&q=85&auto=format&fit=crop',
    head: 'Every tree counts.',
    sub: 'Join a global movement rooted in real action.',
  },
]

// ── Ensure or create species in Supabase ─────────────────────────────────────
async function upsertSpecies(sp: LocalSpecies): Promise<string | null> {
  try {
    const { data: existing } = await supabase.from('species').select('id').eq('scientific_name', sp.scientific_name).maybeSingle()
    if (existing) return existing.id
    const { data: inserted, error } = await supabase.from('species').insert({
      name: sp.common_name, scientific_name: sp.scientific_name,
      category: 'native', carbon_coeff_kg_per_cm: sp.carbon_coeff,
    }).select('id').single()
    if (error) return null
    return inserted.id
  } catch { return null }
}

export default function AddTree() {
  const navigate  = useNavigate()
  const searchRef = useRef<HTMLInputElement>(null)

  // ── Carousel ──────────────────────────────────────────────────────────
  const [slide,  setSlide]  = useState(0)
  const [fadeIn, setFadeIn] = useState(true)

  useEffect(() => {
    const t = setInterval(() => {
      setFadeIn(false)
      setTimeout(() => { setSlide(s => (s + 1) % SLIDES.length); setFadeIn(true) }, 400)
    }, 4500)
    return () => clearInterval(t)
  }, [])

  // ── Form ──────────────────────────────────────────────────────────────
  const [country, setCountry]                 = useState(DEFAULT_COUNTRY)
  const [speciesQuery, setSpeciesQuery]       = useState('')
  const [selectedSpecies, setSelectedSpecies] = useState<LocalSpecies | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [form, setForm] = useState({
    name: '', stage: 'seed' as TreeStage,
    planted_at: new Date().toISOString().split('T')[0],
  })
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState<string | null>(null)

  // ── Planting wizard ───────────────────────────────────────────────────
  const [showWizard, setShowWizard] = useState(false)

  // ── Card flip + Wikipedia back-image ──────────────────────────────────
  const [cardFlipped,  setCardFlipped]  = useState(false)
  const [wikiImage,    setWikiImage]    = useState<string | null>(null)
  const [wikiLoading,  setWikiLoading]  = useState(false)

  useEffect(() => {
    if (!selectedSpecies) { setCardFlipped(false); setWikiImage(null); return }
    setCardFlipped(false); setWikiImage(null); setWikiLoading(true)
    const slug = encodeURIComponent(selectedSpecies.scientific_name.replace(/ /g, '_'))
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${slug}`)
      .then(r => r.json())
      .then(d => setWikiImage(d.originalimage?.source ?? d.thumbnail?.source ?? null))
      .catch(() => {})
      .finally(() => setWikiLoading(false))
  }, [selectedSpecies])

  // ── Species data ──────────────────────────────────────────────────────
  const nativeSpecies = useMemo(() => WORLD_SPECIES.filter(s => s.native_countries.includes(country)), [country])
  const suggestions   = useMemo(() => {
    const q = speciesQuery.trim().toLowerCase()
    if (!q || q.length < 2) return []
    return nativeSpecies.filter(s =>
      s.common_name.toLowerCase().includes(q) ||
      s.scientific_name.toLowerCase().includes(q) ||
      (s.family ?? '').toLowerCase().includes(q),
    ).slice(0, 8)
  }, [nativeSpecies, speciesQuery])

  const xp      = selectedSpecies ? calcXP(selectedSpecies.carbon_coeff, selectedSpecies.conservation_status) : DEFAULT_XP
  const xpColor = xp >= 100 ? '#16a34a' : xp >= 60 ? '#d97706' : 'white'

  const handleCountryChange = (c: string) => {
    setCountry(c); setSelectedSpecies(null); setSpeciesQuery('')
  }

  // ── Submit — open wizard for everyone (auth handled inside wizard) ───
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!country) { setError('Please select a country first'); return }
    setShowWizard(true)
  }

  // ── Plant confirmed (called after wizard completes with uploaded media) ──
  const handlePlantConfirmed = async (mediaUrls: string[], caption: string) => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setLoading(false); return }
    let species_id: string | null = null
    if (selectedSpecies) species_id = await upsertSpecies(selectedSpecies)
    const { data: tree, error: err } = await supabase.from('trees').insert({
      user_id: user.id, name: form.name, species_id, stage: form.stage,
      planted_at: form.planted_at || null, lat: null, lng: null, notes: null, is_public: true,
    }).select('id').single()
    if (err || !tree) { setError(err?.message ?? 'Insert failed'); setLoading(false); return }
    // Create the initial "planting" post log
    await supabase.from('tree_logs').insert({
      tree_id: tree.id, log_type: 'planting',
      media_urls: mediaUrls, caption,
      health: 'good', xp_awarded: xp,
    })
    try { await supabase.rpc('award_xp', { user_id: user.id, amount: xp }) } catch { /**/ }
    navigate('/dashboard')
  }

  const flag        = countryFlag(country)
  const countryInfo = getCountryInfo(country)

  return (
    <>
      <style>{`
        /* ── Carousel ───────────────────────────────────────────────────── */
        .carousel-root {
          position: relative; width: 100%; height: 240px;
          border-radius: 20px; overflow: hidden; margin-bottom: 24px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.28);
        }
        @media (min-width: 480px) { .carousel-root { height: 290px; } }
        .carousel-img {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; transition: opacity 0.4s ease;
          animation: kenBurns 4.5s ease-in-out forwards;
        }
        @keyframes kenBurns {
          0%   { transform: scale(1.0); }
          100% { transform: scale(1.09) translateX(-1%); }
        }
        .carousel-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.68) 100%);
        }
        .carousel-copy { position: absolute; bottom: 0; left: 0; right: 0; padding: 20px 20px 18px; }
        .carousel-head {
          font-size: 20px; font-weight: 800; color: #fff; line-height: 1.2;
          letter-spacing: -0.4px; margin: 0 0 5px;
          text-shadow: 0 2px 12px rgba(0,0,0,0.5);
        }
        @media (min-width: 480px) { .carousel-head { font-size: 24px; } }
        .carousel-sub {
          font-size: 12px; color: rgba(255,255,255,0.82); margin: 0; line-height: 1.45;
          text-shadow: 0 1px 6px rgba(0,0,0,0.5);
        }
        .carousel-dots { position: absolute; top: 14px; right: 16px; display: flex; gap: 5px; }
        .carousel-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(255,255,255,0.4); cursor: pointer; border: none; padding: 0;
          transition: background 0.3s, transform 0.3s;
        }
        .carousel-dot.active { background: #fff; transform: scale(1.35); }
        .carousel-stats { position: absolute; top: 14px; left: 16px; display: flex; gap: 8px; }
        .carousel-stat-pill {
          font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.9);
          background: rgba(0,0,0,0.4); backdrop-filter: blur(6px);
          border-radius: 20px; padding: 4px 10px; white-space: nowrap;
        }

        /* ── Pokemon / playing card flip ─────────────────────────────── */
        .poke-wrap {
          width: 100%; max-width: 240px; margin: 12px auto 0;
          aspect-ratio: 5 / 7;
          perspective: 900px; cursor: pointer;
          animation: fadeUp 0.35s ease;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .poke-flipper {
          width: 100%; height: 100%; position: relative;
          transform-style: preserve-3d;
          transition: transform 0.65s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 16px;
        }
        .poke-flipper.flipped { transform: rotateY(180deg); }
        .poke-face {
          position: absolute; inset: 0; border-radius: 16px; overflow: hidden;
          backface-visibility: hidden; -webkit-backface-visibility: hidden;
        }
        .poke-back { transform: rotateY(180deg); }

        /* Front face */
        .poke-front-inner {
          width: 100%; height: 100%; display: flex; flex-direction: column;
          border: 2px solid rgba(255,255,255,0.12);
          border-radius: 16px; overflow: hidden; box-sizing: border-box;
        }
        .poke-shimmer {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(125deg,
            transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%);
          animation: shimmer 3s ease-in-out infinite;
        }
        @keyframes shimmer {
          0%,100% { opacity: 0; }
          50%      { opacity: 1; }
        }
        .poke-header {
          padding: 10px 12px 6px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .poke-image-zone {
          flex: 1; position: relative; overflow: hidden;
          margin: 0 8px; border-radius: 10px;
          background: rgba(0,0,0,0.3);
          display: flex; align-items: center; justify-content: center;
          font-size: 52px;
        }
        .poke-stats-zone {
          padding: 8px 12px 10px;
        }
        .poke-stat-row {
          display: flex; justify-content: space-between;
          align-items: center; margin-bottom: 5px;
        }
        .poke-stat-label { font-size: 9px; font-weight: 700; letter-spacing: 0.8px; text-transform: uppercase; opacity: 0.55; color: #fff; }
        .poke-stat-value { font-size: 13px; font-weight: 800; }
        .poke-stat-bar-track { height: 4px; border-radius: 2px; background: rgba(255,255,255,0.1); overflow: hidden; margin-top: 2px; }
        .poke-stat-bar-fill  { height: 100%; border-radius: 2px; }
        .poke-hint {
          text-align: center; font-size: 9px; letter-spacing: 0.5px;
          color: rgba(255,255,255,0.35); padding: 0 0 8px;
        }

        /* Back face */
        .poke-back-img {
          width: 100%; height: 100%; object-fit: cover;
          display: block;
        }
        .poke-back-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.82) 100%);
        }
        .poke-back-copy {
          position: absolute; bottom: 0; left: 0; right: 0; padding: 14px 14px 12px;
        }

        /* ── Cartoon filter on front-face image ──────────────────────── */
        .cartoon-img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          filter: url(#cartoon-filter) contrast(1.35) brightness(1.08);
        }

        /* ── Country flag reveal ──────────────────────────────────────── */
        .flag-reveal {
          display: flex; align-items: center; gap: 12px;
          padding: 12px 16px;
          background: rgba(58,184,122,0.07); border: 1px solid rgba(58,184,122,0.2);
          border-radius: 14px; margin-top: 10px;
          animation: fadeUp 0.3s ease;
        }
        .flag-emoji { font-size: 36px; line-height: 1; filter: drop-shadow(0 2px 6px rgba(0,0,0,0.2)); }
      `}</style>

      {/* ── SVG cartoon filter (hidden, referenced by CSS) ───────────────── */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <defs>
          <filter id="cartoon-filter" colorInterpolationFilters="sRGB">
            {/* Slight smoothing to remove grain */}
            <feGaussianBlur stdDeviation="0.6" result="blur" />
            {/* Boost saturation slightly — cartoon feel without oversaturation */}
            <feColorMatrix type="saturate" values="1.4" in="blur" result="saturated" />
            {/* Posterize: reduce to flat colour bands */}
            <feComponentTransfer in="saturated" result="posterized">
              <feFuncR type="discrete" tableValues="0 0.25 0.5 0.75 1" />
              <feFuncG type="discrete" tableValues="0 0.25 0.5 0.75 1" />
              <feFuncB type="discrete" tableValues="0 0.25 0.5 0.75 1" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>

      {/* ── Carousel ──────────────────────────────────────────────────────── */}
      <div className="carousel-root">
        <img key={slide} className="carousel-img" src={SLIDES[slide].url} alt=""
          style={{ opacity: fadeIn ? 1 : 0 }} />
        <div className="carousel-overlay" />
        <div className="carousel-stats">
          <span className="carousel-stat-pill">🌍 127 countries</span>
          <span className="carousel-stat-pill">✨ Growing daily</span>
        </div>
        <div className="carousel-dots">
          {SLIDES.map((_, i) => (
            <button key={i}
              className={`carousel-dot${i === slide ? ' active' : ''}`}
              onClick={() => { setFadeIn(false); setTimeout(() => { setSlide(i); setFadeIn(true) }, 400) }}
            />
          ))}
        </div>
        <div className="carousel-copy" style={{ opacity: fadeIn ? 1 : 0, transition: 'opacity 0.4s ease' }}>
          <p className="carousel-head">{SLIDES[slide].head}</p>
          <p className="carousel-sub">{SLIDES[slide].sub}</p>
        </div>
      </div>

      {/* ── Page header ───────────────────────────────────────────────────── */}
      <div style={{ marginBottom: 28 }}>
        <h1 className="page-title" style={{ fontSize: 24 }}>Plant a tree 🌱</h1>
      </div>

      <form onSubmit={handleSubmit}>

        {/* ── Country ─────────────────────────────────────────────────────── */}
        <div className="field">
          <label className="label">Country *</label>
          <p style={{ fontSize: 11, color: 'var(--color-tertiary)', marginBottom: 8 }}>
            Select where you're planting — species list updates to native plants only
          </p>
          <select className="input" value={country} onChange={e => handleCountryChange(e.target.value)}
            required style={{ cursor: 'pointer' }}>
            {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {country && (
            <div className="flag-reveal" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 12 }}>

              {/* ── Header row: flag + country name + species count ── */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span className="flag-emoji">{flag}</span>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-fg)', margin: 0 }}>{country}</p>
                  {nativeSpecies.length > 0 && (
                    <p style={{ fontSize: 12, color: 'var(--accent)', margin: '2px 0 0' }}>
                      🌿 {nativeSpecies.length} native species available
                    </p>
                  )}
                </div>
              </div>

              {/* ── National animal + plant tiles ── */}
              <div style={{ display: 'flex', gap: 10, width: '100%' }}>
                {/* National Animal */}
                <div style={{
                  flex: 1, borderRadius: 14,
                  background: 'rgba(36,160,96,0.07)',
                  border: '1px solid rgba(36,160,96,0.18)',
                  padding: '12px 10px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: 36, lineHeight: 1, marginBottom: 6 }}>
                    {countryInfo.nationalAnimal.emoji}
                  </div>
                  <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent)', margin: '0 0 2px',
                    textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    National Animal
                  </p>
                  <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-fg)', margin: 0, lineHeight: 1.3 }}>
                    {countryInfo.nationalAnimal.name}
                  </p>
                </div>

                {/* National Plant */}
                <div style={{
                  flex: 1, borderRadius: 14,
                  background: 'rgba(36,160,96,0.07)',
                  border: '1px solid rgba(36,160,96,0.18)',
                  padding: '12px 10px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: 36, lineHeight: 1, marginBottom: 6 }}>
                    {countryInfo.nationalPlant.emoji}
                  </div>
                  <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent)', margin: '0 0 2px',
                    textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    National Plant
                  </p>
                  <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-fg)', margin: 0, lineHeight: 1.3 }}>
                    {countryInfo.nationalPlant.name}
                  </p>
                </div>
              </div>

              {/* ── Country blurb ── */}
              <p style={{
                fontSize: 12, color: 'var(--color-secondary)', lineHeight: 1.6, margin: 0,
                borderTop: '1px solid rgba(36,160,96,0.15)', paddingTop: 12,
              }}>
                {countryInfo.blurb}
              </p>

            </div>
          )}
        </div>

        {/* ── Species ─────────────────────────────────────────────────────── */}
        <div className="field">
          <label className="label">Species</label>
          <p style={{ fontSize: 11, color: 'var(--color-tertiary)', marginBottom: 8 }}>
            {nativeSpecies.length === 0
              ? `No species data yet for ${country} — you can still plant without selecting one`
              : 'Start typing a common or scientific name'}
          </p>

          {selectedSpecies ? (() => {
            const r         = getRarity(selectedSpecies.carbon_coeff)
            const earnedXP  = calcXP(selectedSpecies.carbon_coeff, selectedSpecies.conservation_status)
            const annualKg  = (selectedSpecies.carbon_coeff * 2.0).toFixed(1)
            const backImg   = wikiImage ?? r.fallbackImg
            const barPct    = Math.min(100, (selectedSpecies.carbon_coeff / 10) * 100)

            return (
              <>
                {/* Chip with × */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  background: 'rgba(58,184,122,0.08)', border: '1px solid rgba(58,184,122,0.3)',
                  borderRadius: 12, padding: '10px 14px', marginBottom: 8,
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent)', margin: 0 }}>
                        {selectedSpecies.common_name}
                      </p>
                      {selectedSpecies.conservation_status && (() => {
                        const sc =
                          selectedSpecies.conservation_status === 'CR' ? '#dc2626' :
                          selectedSpecies.conservation_status === 'EN' ? '#ea580c' :
                          selectedSpecies.conservation_status === 'VU' ? '#d97706' : '#65a30d'
                        const label =
                          selectedSpecies.conservation_status === 'CR' ? 'Critically Endangered' :
                          selectedSpecies.conservation_status === 'EN' ? 'Endangered' :
                          selectedSpecies.conservation_status === 'VU' ? 'Vulnerable' : 'Near Threatened'
                        return (
                          <span style={{
                            fontSize: 9, fontWeight: 800, letterSpacing: 0.8, textTransform: 'uppercase',
                            color: sc, background: `${sc}18`, border: `1px solid ${sc}50`,
                            borderRadius: 4, padding: '1px 5px', flexShrink: 0,
                          }}>⚠ {label}</span>
                        )
                      })()}
                    </div>
                    <p style={{ fontSize: 11, color: 'var(--color-tertiary)', margin: 0 }}>
                      {selectedSpecies.scientific_name}
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

                {/* ── Pokemon flip card ── */}
                <div className="poke-wrap" onClick={() => setCardFlipped(f => !f)}>
                  <div className={`poke-flipper${cardFlipped ? ' flipped' : ''}`}
                    style={{ boxShadow: `0 12px 40px ${r.glow}` }}>

                    {/* ── FRONT ── */}
                    <div className="poke-face">
                      <div className="poke-front-inner" style={{ background: r.bg }}>
                        <div className="poke-shimmer" />

                        {/* Header: rarity badge + XP */}
                        <div className="poke-header">
                          <span style={{
                            fontSize: 9, fontWeight: 800, letterSpacing: 1.2, textTransform: 'uppercase',
                            color: r.color, background: `${r.color}25`, borderRadius: 6, padding: '3px 8px',
                          }}>{r.tier}</span>
                          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>{r.stars}</span>
                          <span style={{
                            fontSize: 10, fontWeight: 800, color: r.color,
                            background: 'rgba(0,0,0,0.3)', borderRadius: 6, padding: '2px 7px',
                          }}>+{earnedXP} XP</span>
                        </div>

                        {/* Name */}
                        <div style={{ padding: '0 12px 6px' }}>
                          <p style={{ fontSize: 13, fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1.2 }}>
                            {selectedSpecies.common_name}
                          </p>
                          <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', margin: '2px 0 0', fontStyle: 'italic' }}>
                            {selectedSpecies.scientific_name}
                          </p>
                        </div>

                        {/* Image zone — cartoon filter applied here */}
                        <div className="poke-image-zone" style={{ border: `1px solid ${r.color}30` }}>
                          {wikiLoading
                            ? <span style={{ fontSize: 32, opacity: 0.4 }}>🌿</span>
                            : wikiImage
                              ? <img src={wikiImage} alt="" className="cartoon-img" />
                              : <span>🌳</span>
                          }
                          {/* Vignette edge blend into card bg */}
                          <div style={{
                            position: 'absolute', inset: 0, pointerEvents: 'none',
                            background: `radial-gradient(ellipse at center, transparent 45%, ${r.bg.split(',')[0].replace('linear-gradient(160deg,', '')}99 100%)`,
                          }} />
                        </div>

                        {/* Stats */}
                        <div className="poke-stats-zone">
                          <div className="poke-stat-row">
                            <span className="poke-stat-label">CO₂ coeff</span>
                            <span className="poke-stat-value" style={{ color: r.color }}>{selectedSpecies.carbon_coeff}</span>
                          </div>
                          <div className="poke-stat-bar-track">
                            <div className="poke-stat-bar-fill"
                              style={{ width: `${barPct}%`, background: r.color }} />
                          </div>

                          <div className="poke-stat-row" style={{ marginTop: 7 }}>
                            <span className="poke-stat-label">Annual CO₂</span>
                            <span className="poke-stat-value" style={{ color: r.color }}>{annualKg} kg/yr</span>
                          </div>
                        </div>

                        <p className="poke-hint">TAP TO FLIP →</p>
                      </div>
                    </div>

                    {/* ── BACK ── */}
                    <div className="poke-face poke-back"
                      style={{ border: `2px solid ${r.color}40`, borderRadius: 16 }}>
                      <img className="poke-back-img" src={backImg} alt={selectedSpecies.common_name} />
                      <div className="poke-back-overlay" />
                      <div className="poke-back-copy">
                        <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: 1.2, textTransform: 'uppercase',
                          color: r.color, margin: '0 0 3px' }}>
                          {r.tier} · {r.stars}
                        </p>
                        <p style={{ fontSize: 14, fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1.2 }}>
                          {selectedSpecies.common_name}
                        </p>
                        <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', margin: '2px 0 0', fontStyle: 'italic' }}>
                          {selectedSpecies.scientific_name}
                        </p>
                      </div>
                      <p className="poke-hint" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                        ← TAP TO FLIP
                      </p>
                    </div>

                  </div>
                </div>
              </>
            )
          })() : (
            <div style={{ position: 'relative' }}>
              <input
                ref={searchRef} className="input" type="text"
                placeholder={nativeSpecies.length > 0 ? `Search ${nativeSpecies.length} native species…` : 'No species data for this country'}
                value={speciesQuery} disabled={nativeSpecies.length === 0}
                onChange={e => { setSpeciesQuery(e.target.value); setShowSuggestions(true) }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                autoComplete="off"
              />
              {showSuggestions && suggestions.length > 0 && (
                <div style={{
                  position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50,
                  background: 'var(--surface-solid)', border: '1px solid rgba(212,219,229,0.8)',
                  borderRadius: 14, marginTop: 4, boxShadow: 'var(--neu-shadow)', overflow: 'hidden',
                }}>
                  {suggestions.map((sp, i) => {
                    const spXP = calcXP(sp.carbon_coeff, sp.conservation_status)
                    const statusColor =
                      sp.conservation_status === 'CR' ? '#dc2626' :
                      sp.conservation_status === 'EN' ? '#ea580c' :
                      sp.conservation_status === 'VU' ? '#d97706' :
                      sp.conservation_status === 'NT' ? '#65a30d' : null
                    return (
                    <button key={sp.scientific_name} type="button"
                      onMouseDown={() => { setSelectedSpecies(sp); setSpeciesQuery(''); setShowSuggestions(false) }}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        width: '100%', padding: '11px 14px', border: 'none',
                        background: 'transparent', cursor: 'pointer', textAlign: 'left',
                        borderBottom: i < suggestions.length - 1 ? '1px solid rgba(212,219,229,0.4)' : 'none',
                      }}>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                          <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-fg)', margin: 0,
                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {sp.common_name}
                          </p>
                          {sp.conservation_status && statusColor && (
                            <span style={{
                              fontSize: 9, fontWeight: 800, letterSpacing: 0.8, textTransform: 'uppercase',
                              color: statusColor, background: `${statusColor}18`,
                              border: `1px solid ${statusColor}50`,
                              borderRadius: 4, padding: '1px 5px', flexShrink: 0,
                            }}>{sp.conservation_status}</span>
                          )}
                        </div>
                        <p style={{ fontSize: 11, color: 'var(--color-tertiary)', margin: 0 }}>
                          {sp.scientific_name}
                        </p>
                      </div>
                      <span style={{
                        flexShrink: 0, marginLeft: 8, fontSize: 11, fontWeight: 700,
                        color: spXP >= 100 ? '#16a34a' : '#d97706',
                        background: 'rgba(58,184,122,0.08)', borderRadius: 8, padding: '2px 6px',
                      }}>+{spXP} XP</span>
                    </button>
                    )
                  })}
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

        {/* ── Stage picker ─────────────────────────────────────────────────── */}
        <div className="field">
          <label className="label">Current stage</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {STAGES.map(s => (
              <button key={s.value} type="button" onClick={() => setForm(f => ({ ...f, stage: s.value }))}
                style={{
                  padding: '14px 0', borderRadius: 14, border: 'none', cursor: 'pointer', transition: 'all 0.15s',
                  background: form.stage === s.value ? 'var(--surface-solid)' : 'var(--bg)',
                  boxShadow: form.stage === s.value ? 'var(--neu-inset-sm)' : 'var(--neu-shadow-sm)',
                  color: form.stage === s.value ? 'var(--accent)' : 'var(--color-secondary)', textAlign: 'center',
                }}>
                <div style={{ fontSize: 26, lineHeight: 1, marginBottom: 6 }}>{s.emoji}</div>
                <div style={{ fontSize: 11, fontWeight: 600 }}>{s.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* ── Date planted ─────────────────────────────────────────────────── */}
        <div className="field">
          <label className="label">Date planted</label>
          <input className="input" type="date" value={form.planted_at}
            onChange={e => setForm(f => ({ ...f, planted_at: e.target.value }))} />
        </div>

        {/* ── Tree name ────────────────────────────────────────────────────── */}
        <div className="field">
          <label className="label">Name your tree *</label>
          <input className="input" type="text" placeholder="e.g. Grandma's Oak"
            value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
        </div>

        {error && <p style={{ fontSize: 13, color: '#ef4444', marginBottom: 16 }}>{error}</p>}

        {/* ── Submit ───────────────────────────────────────────────────────── */}
        <button type="submit" className="btn-primary" disabled={loading}
          style={{ position: 'relative', overflow: 'hidden' }}>
          {loading ? 'Planting…' : (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <span>🌱 Plant this tree</span>
              <span style={{
                background: 'rgba(255,255,255,0.18)', borderRadius: 8,
                padding: '3px 10px', fontSize: 14, fontWeight: 700, color: xpColor,
              }}>+{xp} XP</span>
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

      {showWizard && (
        <PlantingWizard
          stage={form.stage}
          treeName={form.name}
          onComplete={(mediaUrls, caption) => handlePlantConfirmed(mediaUrls, caption)}
          onCancel={() => setShowWizard(false)}
        />
      )}
    </>
  )
}

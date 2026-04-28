import { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { COUNTRIES, DEFAULT_COUNTRY } from '../data/countries'
import { WORLD_SPECIES, calcXP, DEFAULT_XP, type LocalSpecies } from '../data/worldSpecies'

type TreeStage = 'seed' | 'seedling' | 'sapling' | 'tree'

const STAGES: { value: TreeStage; label: string; emoji: string }[] = [
  { value: 'seed',     label: 'Seed',     emoji: '🌰' },
  { value: 'seedling', label: 'Seedling', emoji: '🌱' },
  { value: 'sapling',  label: 'Sapling',  emoji: '🌿' },
  { value: 'tree',     label: 'Tree',     emoji: '🌳' },
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
  const navigate = useNavigate()
  const searchRef = useRef<HTMLInputElement>(null)

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

  // ── Species autocomplete ─────────────────────────────────────────────
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

  // ── XP calculation ───────────────────────────────────────────────────
  const xp = selectedSpecies ? calcXP(selectedSpecies.carbon_coeff) : DEFAULT_XP
  const xpColor = xp >= 100 ? '#16a34a' : xp >= 60 ? '#d97706' : 'white'

  // ── Country change resets species ─────────────────────────────────────
  const handleCountryChange = (c: string) => {
    setCountry(c)
    setSelectedSpecies(null)
    setSpeciesQuery('')
  }

  // ── Submit ────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!country) { setError('Please select a country first'); return }
    setLoading(true); setError(null)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setError('Not signed in'); setLoading(false); return }

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

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
        <button className="btn-back" onClick={() => navigate(-1)}>←</button>
        <div>
          <p className="page-eyebrow">New tree</p>
          <h1 className="page-title" style={{ fontSize: 24 }}>Plant a tree 🌱</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit}>

        {/* ── 1. Country (required, before species) ────────────────── */}
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
          {nativeSpecies.length > 0 && (
            <p style={{ fontSize: 11, color: 'var(--accent)', marginTop: 6 }}>
              🌿 {nativeSpecies.length} native species available for {country}
            </p>
          )}
        </div>

        {/* ── 2. Species search (native to selected country) ────────── */}
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

        {/* ── 3. Stage picker ───────────────────────────────────────── */}
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

        {/* ── 4. Date planted ───────────────────────────────────────── */}
        <div className="field">
          <label className="label">Date planted</label>
          <input className="input" type="date" value={form.planted_at}
            onChange={e => setForm(f => ({ ...f, planted_at: e.target.value }))} />
        </div>

        {/* ── 5. Tree name ──────────────────────────────────────────── */}
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

        {/* ── 6. Dynamic XP submit button ───────────────────────────── */}
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
    </div>
  )
}

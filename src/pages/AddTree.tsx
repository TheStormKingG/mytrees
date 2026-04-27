import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Database } from '../types/database'

type Species   = Database['public']['Tables']['species']['Row']
type TreeStage = 'seed' | 'seedling' | 'sapling' | 'tree'

const STAGES: { value: TreeStage; label: string; emoji: string }[] = [
  { value: 'seed',     label: 'Seed',     emoji: '🌰' },
  { value: 'seedling', label: 'Seedling', emoji: '🌱' },
  { value: 'sapling',  label: 'Sapling',  emoji: '🌿' },
  { value: 'tree',     label: 'Tree',     emoji: '🌳' },
]

export default function AddTree() {
  const navigate = useNavigate()
  const [species,  setSpecies]  = useState<Species[]>([])
  const [form,     setForm]     = useState({
    name: '', species_id: '', stage: 'seed' as TreeStage,
    planted_at: new Date().toISOString().split('T')[0],
    lat: '', lng: '', notes: '', is_public: true,
  })
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState<string | null>(null)

  useEffect(() => {
    supabase.from('species').select('*').order('name').then(({ data }) => setSpecies(data ?? []))
  }, [])

  const useGPS = () => {
    navigator.geolocation.getCurrentPosition(
      pos => setForm(f => ({ ...f, lat: String(pos.coords.latitude), lng: String(pos.coords.longitude) })),
      () => setError('Could not get GPS location')
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError(null)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setError('Not logged in'); setLoading(false); return }
    const { error: err } = await supabase.from('trees').insert({
      user_id: user.id, name: form.name,
      species_id: form.species_id || null, stage: form.stage,
      planted_at: form.planted_at || null,
      lat: form.lat ? parseFloat(form.lat) : null,
      lng: form.lng ? parseFloat(form.lng) : null,
      notes: form.notes || null, is_public: form.is_public,
    })
    if (err) { setError(err.message); setLoading(false); return }
    try { await supabase.rpc('award_xp', { user_id: user.id, amount: 50 }) } catch { /* */ }
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

        {/* Tree name */}
        <div className="field">
          <label className="label">Tree name *</label>
          <input className="input" type="text" placeholder="e.g. Grandma's Oak"
            value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
        </div>

        {/* Stage picker */}
        <div className="field">
          <label className="label">Current stage</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {STAGES.map(s => (
              <button key={s.value} type="button"
                onClick={() => setForm(f => ({ ...f, stage: s.value }))}
                style={{
                  padding: '14px 0',
                  borderRadius: 14,
                  border: 'none',
                  cursor: 'pointer',
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

        {/* Species */}
        {species.length > 0 && (
          <div className="field">
            <label className="label">Species</label>
            <select className="input" value={form.species_id}
              onChange={e => setForm(f => ({ ...f, species_id: e.target.value }))}>
              <option value="">Unknown / not listed</option>
              {species.map(sp => (
                <option key={sp.id} value={sp.id}>
                  {sp.name}{sp.scientific_name ? ` (${sp.scientific_name})` : ''}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Date planted */}
        <div className="field">
          <label className="label">Date planted</label>
          <input className="input" type="date" value={form.planted_at}
            onChange={e => setForm(f => ({ ...f, planted_at: e.target.value }))} />
        </div>

        {/* Location */}
        <div className="field">
          <label className="label">Location (optional)</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input className="input" type="number" placeholder="Latitude" value={form.lat}
              onChange={e => setForm(f => ({ ...f, lat: e.target.value }))} step="any"
              style={{ flex: 1 }} />
            <input className="input" type="number" placeholder="Longitude" value={form.lng}
              onChange={e => setForm(f => ({ ...f, lng: e.target.value }))} step="any"
              style={{ flex: 1 }} />
            <button type="button" onClick={useGPS}
              style={{
                width: 50, flexShrink: 0, borderRadius: 14, border: 'none',
                background: 'var(--surface-solid)', boxShadow: 'var(--neu-shadow-sm)',
                fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>📍</button>
          </div>
        </div>

        {/* Notes */}
        <div className="field">
          <label className="label">Notes</label>
          <textarea className="input" placeholder="Soil type, location, how you got the seed…"
            value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
            rows={3} style={{ resize: 'none' }} />
        </div>

        {/* Public toggle */}
        <div className="field">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}
            onClick={() => setForm(f => ({ ...f, is_public: !f.is_public }))}>
            <div style={{
              width: 52, height: 30, borderRadius: 15, position: 'relative', cursor: 'pointer',
              background: form.is_public ? 'var(--accent)' : 'var(--bg)',
              boxShadow: form.is_public ? '0 2px 10px var(--accent-shadow)' : 'var(--neu-inset-sm)',
              transition: 'all 0.2s', flexShrink: 0,
            }}>
              <div style={{
                position: 'absolute', top: 3,
                left: form.is_public ? 24 : 3,
                width: 24, height: 24, borderRadius: '50%',
                background: 'white', boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                transition: 'left 0.2s',
              }} />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--color-fg)' }}>Public tree profile</div>
              <div style={{ fontSize: 12, color: 'var(--color-tertiary)', marginTop: 1 }}>
                Show this tree on the community map
              </div>
            </div>
          </div>
        </div>

        {error && (
          <p style={{ fontSize: 13, color: '#ef4444', marginBottom: 16 }}>{error}</p>
        )}

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Planting…' : '🌳 Plant this tree · +50 XP'}
        </button>
      </form>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Database } from '../types/database'

type Species = Database['public']['Tables']['species']['Row']
type TreeStage = 'seed' | 'seedling' | 'sapling' | 'tree'

const STAGES: { value: TreeStage; label: string; emoji: string }[] = [
  { value: 'seed',     label: 'Seed',     emoji: '🌰' },
  { value: 'seedling', label: 'Seedling', emoji: '🌱' },
  { value: 'sapling',  label: 'Sapling',  emoji: '🌿' },
  { value: 'tree',     label: 'Tree',     emoji: '🌳' },
]

const inputStyle = {
  background: 'var(--bg)',
  color: 'var(--color-fg)',
  boxShadow: 'var(--neu-inset)',
  border: 'none',
}
const inputCls = "w-full rounded-xl px-3.5 py-3 text-sm focus:outline-none"

export default function AddTree() {
  const navigate = useNavigate()
  const [species, setSpecies] = useState<Species[]>([])
  const [form, setForm] = useState({
    name: '',
    species_id: '',
    stage: 'seed' as TreeStage,
    planted_at: new Date().toISOString().split('T')[0],
    lat: '',
    lng: '',
    notes: '',
    is_public: true,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
      user_id: user.id,
      name: form.name,
      species_id: form.species_id || null,
      stage: form.stage,
      planted_at: form.planted_at || null,
      lat: form.lat ? parseFloat(form.lat) : null,
      lng: form.lng ? parseFloat(form.lng) : null,
      notes: form.notes || null,
      is_public: form.is_public,
    })
    if (err) { setError(err.message); setLoading(false); return }
    try { await supabase.rpc('award_xp', { user_id: user.id, amount: 50 }) } catch { /* non-critical */ }
    navigate('/dashboard')
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-95"
          style={{ background: 'var(--surface)', boxShadow: 'var(--neu-shadow-sm)', border: '1px solid var(--border-glass)', color: 'var(--color-secondary)' }}
        >←</button>
        <div>
          <h1 className="section-title">Plant a tree 🌱</h1>
          <p className="section-subtitle">+50 XP on planting</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Tree name */}
        <div className="card p-4">
          <label className="label-cap">Tree name *</label>
          <input type="text" placeholder="e.g. Grandma's Oak" value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required
            className={inputCls} style={inputStyle} />
        </div>

        {/* Stage */}
        <div className="card p-4">
          <label className="label-cap">Current stage</label>
          <div className="grid grid-cols-4 gap-2">
            {STAGES.map(s => (
              <button key={s.value} type="button"
                onClick={() => setForm(f => ({ ...f, stage: s.value }))}
                className="py-3 rounded-xl text-center transition-all active:scale-95"
                style={{
                  background: form.stage === s.value ? 'var(--surface-solid)' : 'var(--bg)',
                  boxShadow: form.stage === s.value ? 'var(--neu-inset-sm)' : 'var(--neu-shadow-sm)',
                  border: form.stage === s.value ? '1px solid var(--border-glass)' : '1px solid transparent',
                  color: form.stage === s.value ? 'var(--accent)' : 'var(--color-secondary)',
                }}>
                <div className="text-2xl">{s.emoji}</div>
                <div className="text-xs mt-1 font-medium">{s.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Species */}
        {species.length > 0 && (
          <div className="card p-4">
            <label className="label-cap">Species</label>
            <select value={form.species_id}
              onChange={e => setForm(f => ({ ...f, species_id: e.target.value }))}
              className={inputCls} style={inputStyle}>
              <option value="">Unknown / not listed</option>
              {species.map(sp => (
                <option key={sp.id} value={sp.id}>{sp.name}{sp.scientific_name ? ` (${sp.scientific_name})` : ''}</option>
              ))}
            </select>
          </div>
        )}

        {/* Date */}
        <div className="card p-4">
          <label className="label-cap">Date planted</label>
          <input type="date" value={form.planted_at}
            onChange={e => setForm(f => ({ ...f, planted_at: e.target.value }))}
            className={inputCls} style={inputStyle} />
        </div>

        {/* Location */}
        <div className="card p-4">
          <label className="label-cap">Location (optional)</label>
          <div className="flex gap-2">
            <input type="number" placeholder="Latitude" value={form.lat}
              onChange={e => setForm(f => ({ ...f, lat: e.target.value }))} step="any"
              className="flex-1 rounded-xl px-3 py-3 text-sm focus:outline-none" style={inputStyle} />
            <input type="number" placeholder="Longitude" value={form.lng}
              onChange={e => setForm(f => ({ ...f, lng: e.target.value }))} step="any"
              className="flex-1 rounded-xl px-3 py-3 text-sm focus:outline-none" style={inputStyle} />
            <button type="button" onClick={useGPS}
              className="rounded-xl px-3 py-3 text-xl transition-all active:scale-95"
              style={{ background: 'var(--surface)', boxShadow: 'var(--neu-shadow-sm)', border: '1px solid var(--border-glass)' }}>📍</button>
          </div>
        </div>

        {/* Notes */}
        <div className="card p-4">
          <label className="label-cap">Notes</label>
          <textarea placeholder="Soil type, location, how you got the seed…" value={form.notes}
            onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={3}
            className="w-full rounded-xl px-3.5 py-3 text-sm focus:outline-none resize-none" style={inputStyle} />
        </div>

        {/* Public toggle */}
        <div className="card p-4">
          <label className="flex items-center gap-3 cursor-pointer"
            onClick={() => setForm(f => ({ ...f, is_public: !f.is_public }))}>
            <div className="w-12 h-6 rounded-full relative transition-all"
              style={{
                background: form.is_public ? 'var(--accent)' : 'var(--bg)',
                boxShadow: form.is_public ? '0 2px 8px rgba(58,184,122,0.35)' : 'var(--neu-inset-sm)',
              }}>
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${form.is_public ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </div>
            <span className="text-sm font-medium" style={{ color: 'var(--color-secondary)' }}>Public tree profile</span>
          </label>
        </div>

        {error && <p className="text-red-500 text-xs px-1">{error}</p>}

        <button type="submit" disabled={loading}
          className="w-full text-white font-semibold py-4 rounded-2xl transition-all active:scale-[0.98] disabled:opacity-50"
          style={{ background: 'var(--accent)', boxShadow: '0 4px 16px rgba(58,184,122,0.30)', fontSize: 15 }}>
          {loading ? 'Planting…' : 'Plant this tree 🌳 (+50 XP)'}
        </button>
      </form>
    </div>
  )
}

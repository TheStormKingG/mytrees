import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Database } from '../types/database'

type Species = Database['public']['Tables']['species']['Row']
type TreeStage = 'seed' | 'seedling' | 'sapling' | 'tree'

const STAGES: { value: TreeStage; label: string; emoji: string }[] = [
  { value: 'seed', label: 'Seed', emoji: '🌰' },
  { value: 'seedling', label: 'Seedling', emoji: '🌱' },
  { value: 'sapling', label: 'Sapling', emoji: '🌿' },
  { value: 'tree', label: 'Tree', emoji: '🌳' },
]

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
    setLoading(true)
    setError(null)

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

    // Award XP for planting
    try { await supabase.rpc('award_xp', { user_id: user.id, amount: 50 }) } catch { /* non-critical */ }

    navigate('/dashboard')
  }

  const inputCls = "w-full rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none neu-pressed-sm"

  return (
    <div className="px-4 pt-6 pb-4" style={{ background: 'var(--neu-base)' }}>
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 neu-raised-sm transition-all active:neu-pressed-sm"
          style={{ background: 'var(--neu-base)' }}
        >←</button>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Plant a tree 🌱</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="block text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">Tree name *</label>
          <input type="text" placeholder="e.g. Grandma's Oak" value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required
            className={inputCls} style={{ background: 'var(--neu-base)' }} />
        </div>

        <div>
          <label className="block text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">Current stage</label>
          <div className="grid grid-cols-4 gap-2">
            {STAGES.map(s => (
              <button key={s.value} type="button"
                onClick={() => setForm(f => ({ ...f, stage: s.value }))}
                className={`py-3 rounded-xl text-center transition-all ${
                  form.stage === s.value
                    ? 'neu-pressed-sm text-emerald-700 font-semibold'
                    : 'neu-raised-sm text-slate-500 hover:text-slate-700'
                }`}
                style={{ background: 'var(--neu-base)' }}
              >
                <div className="text-2xl">{s.emoji}</div>
                <div className="text-xs mt-1">{s.label}</div>
              </button>
            ))}
          </div>
        </div>

        {species.length > 0 && (
          <div>
            <label className="block text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">Species</label>
            <select value={form.species_id}
              onChange={e => setForm(f => ({ ...f, species_id: e.target.value }))}
              className={inputCls} style={{ background: 'var(--neu-base)' }}>
              <option value="">Unknown / not listed</option>
              {species.map(sp => (
                <option key={sp.id} value={sp.id}>{sp.name}{sp.scientific_name ? ` (${sp.scientific_name})` : ''}</option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">Date planted</label>
          <input type="date" value={form.planted_at}
            onChange={e => setForm(f => ({ ...f, planted_at: e.target.value }))}
            className={inputCls} style={{ background: 'var(--neu-base)' }} />
        </div>

        <div>
          <label className="block text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">Location (optional)</label>
          <div className="flex gap-2">
            <input type="number" placeholder="Latitude" value={form.lat}
              onChange={e => setForm(f => ({ ...f, lat: e.target.value }))} step="any"
              className="flex-1 rounded-xl px-3 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none neu-pressed-sm"
              style={{ background: 'var(--neu-base)' }} />
            <input type="number" placeholder="Longitude" value={form.lng}
              onChange={e => setForm(f => ({ ...f, lng: e.target.value }))} step="any"
              className="flex-1 rounded-xl px-3 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none neu-pressed-sm"
              style={{ background: 'var(--neu-base)' }} />
            <button type="button" onClick={useGPS}
              className="neu-raised-sm rounded-xl px-3 py-3 text-xl transition-all active:neu-pressed-sm"
              style={{ background: 'var(--neu-base)' }}>📍</button>
          </div>
        </div>

        <div>
          <label className="block text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">Notes</label>
          <textarea placeholder="Soil type, location, how you got the seed…" value={form.notes}
            onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={3}
            className="w-full rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none neu-pressed-sm resize-none"
            style={{ background: 'var(--neu-base)' }} />
        </div>

        <label className="flex items-center gap-3 cursor-pointer" onClick={() => setForm(f => ({ ...f, is_public: !f.is_public }))}>
          <div className={`w-12 h-6 rounded-full transition-all relative neu-pressed-sm ${form.is_public ? 'bg-emerald-400' : ''}`}
            style={{ background: form.is_public ? undefined : 'var(--neu-base)' }}>
            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${form.is_public ? 'translate-x-6' : 'translate-x-0.5'}`} />
          </div>
          <span className="text-slate-600 text-sm font-medium">Public tree profile</span>
        </label>

        {error && <p className="text-red-500 text-xs">{error}</p>}

        <button type="submit" disabled={loading}
          className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all neu-raised-sm text-sm">
          {loading ? 'Planting…' : 'Plant this tree 🌳 (+50 XP)'}
        </button>
      </form>
    </div>
  )
}

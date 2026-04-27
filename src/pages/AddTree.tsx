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

  return (
    <div className="px-4 pt-6 pb-4">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="text-stone-400 hover:text-stone-200 text-xl">←</button>
        <h1 className="text-xl font-bold text-emerald-400">Plant a tree 🌱</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-stone-400 text-xs mb-1.5">Tree name *</label>
          <input
            type="text"
            placeholder="e.g. Grandma's Oak"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            required
            className="w-full bg-stone-900 border border-stone-700 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-stone-100 placeholder-stone-600 outline-none transition-colors"
          />
        </div>

        {/* Stage */}
        <div>
          <label className="block text-stone-400 text-xs mb-1.5">Current stage</label>
          <div className="grid grid-cols-4 gap-2">
            {STAGES.map(s => (
              <button
                key={s.value}
                type="button"
                onClick={() => setForm(f => ({ ...f, stage: s.value }))}
                className={`py-3 rounded-xl border text-center transition-colors ${
                  form.stage === s.value
                    ? 'bg-emerald-900 border-emerald-500 text-emerald-300'
                    : 'bg-stone-900 border-stone-700 text-stone-400 hover:border-stone-500'
                }`}
              >
                <div className="text-xl">{s.emoji}</div>
                <div className="text-xs mt-1">{s.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Species */}
        {species.length > 0 && (
          <div>
            <label className="block text-stone-400 text-xs mb-1.5">Species</label>
            <select
              value={form.species_id}
              onChange={e => setForm(f => ({ ...f, species_id: e.target.value }))}
              className="w-full bg-stone-900 border border-stone-700 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-stone-100 outline-none"
            >
              <option value="">Unknown / not listed</option>
              {species.map(sp => (
                <option key={sp.id} value={sp.id}>{sp.name}{sp.scientific_name ? ` (${sp.scientific_name})` : ''}</option>
              ))}
            </select>
          </div>
        )}

        {/* Planted date */}
        <div>
          <label className="block text-stone-400 text-xs mb-1.5">Date planted / germinated</label>
          <input
            type="date"
            value={form.planted_at}
            onChange={e => setForm(f => ({ ...f, planted_at: e.target.value }))}
            className="w-full bg-stone-900 border border-stone-700 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-stone-100 outline-none"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-stone-400 text-xs mb-1.5">Location (optional)</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Latitude"
              value={form.lat}
              onChange={e => setForm(f => ({ ...f, lat: e.target.value }))}
              step="any"
              className="flex-1 bg-stone-900 border border-stone-700 focus:border-emerald-500 rounded-xl px-3 py-3 text-sm text-stone-100 placeholder-stone-600 outline-none"
            />
            <input
              type="number"
              placeholder="Longitude"
              value={form.lng}
              onChange={e => setForm(f => ({ ...f, lng: e.target.value }))}
              step="any"
              className="flex-1 bg-stone-900 border border-stone-700 focus:border-emerald-500 rounded-xl px-3 py-3 text-sm text-stone-100 placeholder-stone-600 outline-none"
            />
            <button
              type="button"
              onClick={useGPS}
              className="bg-stone-800 border border-stone-700 hover:border-emerald-500 rounded-xl px-3 py-3 text-lg transition-colors"
              title="Use my GPS location"
            >
              📍
            </button>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-stone-400 text-xs mb-1.5">Notes</label>
          <textarea
            placeholder="Soil type, location description, how you got the seed..."
            value={form.notes}
            onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
            rows={3}
            className="w-full bg-stone-900 border border-stone-700 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-stone-100 placeholder-stone-600 outline-none resize-none"
          />
        </div>

        {/* Public toggle */}
        <label className="flex items-center gap-3 cursor-pointer">
          <div
            onClick={() => setForm(f => ({ ...f, is_public: !f.is_public }))}
            className={`w-11 h-6 rounded-full transition-colors relative ${form.is_public ? 'bg-emerald-600' : 'bg-stone-700'}`}
          >
            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.is_public ? 'translate-x-5.5' : 'translate-x-0.5'}`} />
          </div>
          <span className="text-stone-300 text-sm">Public tree profile</span>
        </label>

        {error && <p className="text-red-400 text-xs">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-colors text-sm"
        >
          {loading ? 'Planting...' : 'Plant this tree 🌳 (+50 XP)'}
        </button>
      </form>
    </div>
  )
}

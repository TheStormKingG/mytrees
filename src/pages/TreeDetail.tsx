import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Database } from '../types/database'

type Tree = Database['public']['Tables']['trees']['Row']
type TreeLog = Database['public']['Tables']['tree_logs']['Row']

const STAGE_EMOJI: Record<string, string> = { seed: '🌰', seedling: '🌱', sapling: '🌿', tree: '🌳' }
const HEALTH_COLOR: Record<string, string> = {
  excellent: 'text-emerald-400',
  good: 'text-green-400',
  fair: 'text-amber-400',
  poor: 'text-red-400',
}

export default function TreeDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [tree, setTree] = useState<Tree | null>(null)
  const [logs, setLogs] = useState<TreeLog[]>([])
  const [showLog, setShowLog] = useState(false)
  const [logForm, setLogForm] = useState({ height_cm: '', canopy_cm: '', health: 'good' as TreeLog['health'], notes: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!id) return
    Promise.all([
      supabase.from('trees').select('*').eq('id', id).single(),
      supabase.from('tree_logs').select('*').eq('tree_id', id).order('logged_at', { ascending: false }),
    ]).then(([{ data: t }, { data: l }]) => {
      setTree(t)
      setLogs(l ?? [])
    })
  }, [id])

  const submitLog = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id) return
    setSaving(true)

    await supabase.from('tree_logs').insert({
      tree_id: id,
      height_cm: logForm.height_cm ? parseFloat(logForm.height_cm) : null,
      canopy_cm: logForm.canopy_cm ? parseFloat(logForm.canopy_cm) : null,
      health: logForm.health,
      notes: logForm.notes || null,
      xp_awarded: 30,
    })

    const { data: { user } } = await supabase.auth.getUser()
    if (user) { try { await supabase.rpc('award_xp', { user_id: user.id, amount: 30 }) } catch { /* non-critical */ } }

    // Refresh logs
    const { data: l } = await supabase.from('tree_logs').select('*').eq('tree_id', id).order('logged_at', { ascending: false })
    setLogs(l ?? [])
    setShowLog(false)
    setSaving(false)
  }

  if (!tree) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-4xl animate-bounce">🌱</div>
    </div>
  )

  return (
    <div className="px-4 pt-6 pb-4">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="text-stone-400 hover:text-stone-200 text-xl">←</button>
        <h1 className="text-xl font-bold text-stone-100 flex items-center gap-2">
          {STAGE_EMOJI[tree.stage]} {tree.name}
        </h1>
      </div>

      {/* Tree info card */}
      <div className="bg-stone-900 border border-stone-700 rounded-2xl p-4 mb-5">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <div className="text-stone-500 text-xs">Stage</div>
            <div className="text-stone-100 capitalize mt-0.5">{tree.stage}</div>
          </div>
          <div>
            <div className="text-stone-500 text-xs">Planted</div>
            <div className="text-stone-100 mt-0.5">{tree.planted_at ? new Date(tree.planted_at).toLocaleDateString() : '—'}</div>
          </div>
          {tree.lat && tree.lng && (
            <div className="col-span-2">
              <div className="text-stone-500 text-xs">Location</div>
              <div className="text-stone-100 mt-0.5 text-xs">{tree.lat.toFixed(4)}, {tree.lng.toFixed(4)}</div>
            </div>
          )}
          {tree.notes && (
            <div className="col-span-2">
              <div className="text-stone-500 text-xs">Notes</div>
              <div className="text-stone-300 mt-0.5 text-xs">{tree.notes}</div>
            </div>
          )}
        </div>
      </div>

      {/* Log growth button */}
      <button
        onClick={() => setShowLog(!showLog)}
        className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl mb-5 transition-colors text-sm"
      >
        📏 Log growth today (+30 XP)
      </button>

      {/* Log form */}
      {showLog && (
        <form onSubmit={submitLog} className="bg-stone-900 border border-emerald-700 rounded-2xl p-4 mb-5 space-y-3">
          <h3 className="text-stone-200 font-semibold text-sm">Today's check-in</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-stone-400 text-xs">Height (cm)</label>
              <input type="number" value={logForm.height_cm} onChange={e => setLogForm(f => ({ ...f, height_cm: e.target.value }))}
                step="any" placeholder="e.g. 45"
                className="w-full mt-1 bg-stone-800 border border-stone-600 rounded-lg px-3 py-2 text-sm text-stone-100 placeholder-stone-600 outline-none" />
            </div>
            <div>
              <label className="text-stone-400 text-xs">Canopy (cm)</label>
              <input type="number" value={logForm.canopy_cm} onChange={e => setLogForm(f => ({ ...f, canopy_cm: e.target.value }))}
                step="any" placeholder="e.g. 20"
                className="w-full mt-1 bg-stone-800 border border-stone-600 rounded-lg px-3 py-2 text-sm text-stone-100 placeholder-stone-600 outline-none" />
            </div>
          </div>
          <div>
            <label className="text-stone-400 text-xs">Health</label>
            <select value={logForm.health} onChange={e => setLogForm(f => ({ ...f, health: e.target.value as TreeLog['health'] }))}
              className="w-full mt-1 bg-stone-800 border border-stone-600 rounded-lg px-3 py-2 text-sm text-stone-100 outline-none">
              <option value="excellent">Excellent 🌟</option>
              <option value="good">Good ✅</option>
              <option value="fair">Fair ⚠️</option>
              <option value="poor">Poor 🚨</option>
            </select>
          </div>
          <textarea value={logForm.notes} onChange={e => setLogForm(f => ({ ...f, notes: e.target.value }))}
            placeholder="Any observations..."
            rows={2}
            className="w-full bg-stone-800 border border-stone-600 rounded-lg px-3 py-2 text-sm text-stone-100 placeholder-stone-600 outline-none resize-none" />
          <button type="submit" disabled={saving}
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors">
            {saving ? 'Saving...' : 'Save log'}
          </button>
        </form>
      )}

      {/* Log history */}
      <h2 className="text-stone-300 font-semibold text-sm mb-3">Growth history ({logs.length} entries)</h2>
      {logs.length === 0 ? (
        <p className="text-stone-600 text-sm text-center py-6">No logs yet. Log today's growth!</p>
      ) : (
        <div className="space-y-3">
          {logs.map(log => (
            <div key={log.id} className="bg-stone-900 border border-stone-700 rounded-xl p-3">
              <div className="flex justify-between items-start mb-1">
                <span className="text-stone-300 text-xs">{new Date(log.logged_at).toLocaleDateString()}</span>
                <span className={`text-xs font-medium capitalize ${HEALTH_COLOR[log.health]}`}>{log.health}</span>
              </div>
              <div className="text-stone-400 text-xs">
                {log.height_cm && `Height: ${log.height_cm}cm`}
                {log.height_cm && log.canopy_cm && ' · '}
                {log.canopy_cm && `Canopy: ${log.canopy_cm}cm`}
              </div>
              {log.notes && <p className="text-stone-500 text-xs mt-1">{log.notes}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

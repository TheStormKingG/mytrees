import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Database } from '../types/database'

type Tree = Database['public']['Tables']['trees']['Row']
type TreeLog = Database['public']['Tables']['tree_logs']['Row']

const STAGE_EMOJI: Record<string, string> = { seed: '🌰', seedling: '🌱', sapling: '🌿', tree: '🌳' }
const HEALTH_COLOR: Record<string, string> = {
  excellent: 'text-emerald-600',
  good: 'text-green-600',
  fair: 'text-amber-500',
  poor: 'text-red-500',
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

  const inputCls = "w-full rounded-lg px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none neu-pressed-sm mt-1"

  if (!tree) return (
    <div className="flex items-center justify-center h-64" style={{ background: 'var(--neu-base)' }}>
      <div className="text-4xl animate-bounce">🌱</div>
    </div>
  )

  return (
    <div className="px-4 pt-6 pb-4" style={{ background: 'var(--neu-base)' }}>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 neu-raised-sm active:neu-pressed-sm"
          style={{ background: 'var(--neu-base)' }}>←</button>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          {STAGE_EMOJI[tree.stage]} {tree.name}
        </h1>
      </div>

      {/* Tree info card */}
      <div className="neu-raised rounded-2xl p-5 mb-5" style={{ background: 'var(--neu-base)' }}>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Stage</div>
            <div className="text-slate-700 capitalize font-medium mt-1">{tree.stage}</div>
          </div>
          <div>
            <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Planted</div>
            <div className="text-slate-700 font-medium mt-1">{tree.planted_at ? new Date(tree.planted_at).toLocaleDateString() : '—'}</div>
          </div>
          {tree.lat && tree.lng && (
            <div className="col-span-2">
              <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Location</div>
              <div className="text-slate-600 mt-1 text-xs">{tree.lat.toFixed(4)}, {tree.lng.toFixed(4)}</div>
            </div>
          )}
          {tree.notes && (
            <div className="col-span-2">
              <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Notes</div>
              <div className="text-slate-600 mt-1 text-xs">{tree.notes}</div>
            </div>
          )}
        </div>
      </div>

      {/* Log growth CTA */}
      <button onClick={() => setShowLog(!showLog)}
        className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3.5 rounded-xl mb-5 transition-all neu-raised-sm text-sm">
        📏 Log growth today (+30 XP)
      </button>

      {/* Log form */}
      {showLog && (
        <form onSubmit={submitLog} className="neu-pressed rounded-2xl p-5 mb-5 space-y-4" style={{ background: 'var(--neu-base)' }}>
          <h3 className="text-slate-700 font-bold text-sm">Today's check-in</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Height (cm)</label>
              <input type="number" value={logForm.height_cm}
                onChange={e => setLogForm(f => ({ ...f, height_cm: e.target.value }))}
                step="any" placeholder="e.g. 45"
                className={inputCls} style={{ background: 'var(--neu-base)' }} />
            </div>
            <div>
              <label className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Canopy (cm)</label>
              <input type="number" value={logForm.canopy_cm}
                onChange={e => setLogForm(f => ({ ...f, canopy_cm: e.target.value }))}
                step="any" placeholder="e.g. 20"
                className={inputCls} style={{ background: 'var(--neu-base)' }} />
            </div>
          </div>
          <div>
            <label className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Health</label>
            <select value={logForm.health}
              onChange={e => setLogForm(f => ({ ...f, health: e.target.value as TreeLog['health'] }))}
              className={inputCls} style={{ background: 'var(--neu-base)' }}>
              <option value="excellent">Excellent 🌟</option>
              <option value="good">Good ✅</option>
              <option value="fair">Fair ⚠️</option>
              <option value="poor">Poor 🚨</option>
            </select>
          </div>
          <textarea value={logForm.notes} onChange={e => setLogForm(f => ({ ...f, notes: e.target.value }))}
            placeholder="Any observations…" rows={2}
            className="w-full rounded-lg px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none neu-pressed-sm resize-none"
            style={{ background: 'var(--neu-base)' }} />
          <button type="submit" disabled={saving}
            className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all neu-raised-sm text-sm">
            {saving ? 'Saving…' : 'Save log'}
          </button>
        </form>
      )}

      <h2 className="text-slate-600 font-semibold text-sm mb-3">Growth history ({logs.length} entries)</h2>
      {logs.length === 0 ? (
        <p className="text-slate-400 text-sm text-center py-6">No logs yet. Log today's growth!</p>
      ) : (
        <div className="space-y-3">
          {logs.map(log => (
            <div key={log.id} className="neu-raised-sm rounded-xl p-4" style={{ background: 'var(--neu-base)' }}>
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-500 text-xs font-medium">{new Date(log.logged_at).toLocaleDateString()}</span>
                <span className={`text-xs font-bold capitalize ${HEALTH_COLOR[log.health]}`}>{log.health}</span>
              </div>
              <div className="text-slate-500 text-xs">
                {log.height_cm && `Height: ${log.height_cm}cm`}
                {log.height_cm && log.canopy_cm && ' · '}
                {log.canopy_cm && `Canopy: ${log.canopy_cm}cm`}
              </div>
              {log.notes && <p className="text-slate-400 text-xs mt-1">{log.notes}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

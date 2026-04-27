import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Database } from '../types/database'

type Tree    = Database['public']['Tables']['trees']['Row']
type TreeLog = Database['public']['Tables']['tree_logs']['Row']

const STAGE_EMOJI: Record<string, string> = { seed: '🌰', seedling: '🌱', sapling: '🌿', tree: '🌳' }
const HEALTH_COLOR: Record<string, string> = {
  excellent: '#3ab87a', good: '#5a9e6f', fair: '#d97706', poor: '#ef4444',
}

const inputStyle = { background: 'var(--bg)', color: 'var(--color-fg)', boxShadow: 'var(--neu-inset)', border: 'none' }
const inputCls = "w-full rounded-xl px-3.5 py-3 text-sm focus:outline-none"

export default function TreeDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [tree,    setTree]    = useState<Tree | null>(null)
  const [logs,    setLogs]    = useState<TreeLog[]>([])
  const [showLog, setShowLog] = useState(false)
  const [logForm, setLogForm] = useState({ height_cm: '', canopy_cm: '', health: 'good' as TreeLog['health'], notes: '' })
  const [saving,  setSaving]  = useState(false)

  useEffect(() => {
    if (!id) return
    Promise.all([
      supabase.from('trees').select('*').eq('id', id).single(),
      supabase.from('tree_logs').select('*').eq('tree_id', id).order('logged_at', { ascending: false }),
    ]).then(([{ data: t }, { data: l }]) => { setTree(t); setLogs(l ?? []) })
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
    <div>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-95"
          style={{ background: 'var(--surface)', boxShadow: 'var(--neu-shadow-sm)', border: '1px solid var(--border-glass)', color: 'var(--color-secondary)' }}>←</button>
        <div>
          <h1 className="section-title">{STAGE_EMOJI[tree.stage]} {tree.name}</h1>
          <p className="section-subtitle capitalize">{tree.stage}</p>
        </div>
      </div>

      <div className="card p-5 mb-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="label-cap">Stage</p>
            <p className="font-medium capitalize" style={{ color: 'var(--color-fg)' }}>{tree.stage}</p>
          </div>
          <div>
            <p className="label-cap">Planted</p>
            <p className="font-medium" style={{ color: 'var(--color-fg)' }}>
              {tree.planted_at ? new Date(tree.planted_at).toLocaleDateString() : '—'}
            </p>
          </div>
          {tree.lat && tree.lng && (
            <div className="col-span-2">
              <p className="label-cap">Location</p>
              <p className="text-xs" style={{ color: 'var(--color-secondary)' }}>{tree.lat.toFixed(4)}, {tree.lng.toFixed(4)}</p>
            </div>
          )}
          {tree.notes && (
            <div className="col-span-2">
              <p className="label-cap">Notes</p>
              <p className="text-xs" style={{ color: 'var(--color-secondary)' }}>{tree.notes}</p>
            </div>
          )}
        </div>
      </div>

      <button onClick={() => setShowLog(!showLog)}
        className="w-full text-white font-semibold py-3.5 rounded-2xl mb-4 transition-all active:scale-[0.98]"
        style={{ background: 'var(--accent)', boxShadow: '0 4px 16px rgba(58,184,122,0.30)', fontSize: 15 }}>
        📏 Log growth today (+30 XP)
      </button>

      {showLog && (
        <form onSubmit={submitLog} className="card p-5 mb-5 space-y-4">
          <h3 className="section-title" style={{ fontSize: 15 }}>Today's check-in</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label-cap">Height (cm)</label>
              <input type="number" value={logForm.height_cm}
                onChange={e => setLogForm(f => ({ ...f, height_cm: e.target.value }))}
                step="any" placeholder="e.g. 45" className={inputCls} style={inputStyle} />
            </div>
            <div>
              <label className="label-cap">Canopy (cm)</label>
              <input type="number" value={logForm.canopy_cm}
                onChange={e => setLogForm(f => ({ ...f, canopy_cm: e.target.value }))}
                step="any" placeholder="e.g. 20" className={inputCls} style={inputStyle} />
            </div>
          </div>
          <div>
            <label className="label-cap">Health</label>
            <select value={logForm.health}
              onChange={e => setLogForm(f => ({ ...f, health: e.target.value as TreeLog['health'] }))}
              className={inputCls} style={inputStyle}>
              <option value="excellent">Excellent 🌟</option>
              <option value="good">Good ✅</option>
              <option value="fair">Fair ⚠️</option>
              <option value="poor">Poor 🚨</option>
            </select>
          </div>
          <textarea value={logForm.notes} onChange={e => setLogForm(f => ({ ...f, notes: e.target.value }))}
            placeholder="Any observations…" rows={2}
            className="w-full rounded-xl px-3.5 py-3 text-sm focus:outline-none resize-none" style={inputStyle} />
          <button type="submit" disabled={saving}
            className="w-full text-white font-semibold py-3 rounded-xl transition-all active:scale-[0.98] disabled:opacity-50"
            style={{ background: 'var(--accent)', boxShadow: '0 4px 12px rgba(58,184,122,0.25)' }}>
            {saving ? 'Saving…' : 'Save log'}
          </button>
        </form>
      )}

      <div className="flex items-baseline justify-between mb-3 px-1">
        <h2 className="section-title">Growth history</h2>
        <p className="section-subtitle">{logs.length} entries</p>
      </div>

      {logs.length === 0 ? (
        <p className="text-sm text-center py-6" style={{ color: 'var(--color-tertiary)' }}>No logs yet. Log today's growth!</p>
      ) : (
        <div className="space-y-3">
          {logs.map(log => (
            <div key={log.id} className="card-sm p-4">
              <div className="flex justify-between items-start mb-1.5">
                <span className="text-xs font-medium" style={{ color: 'var(--color-tertiary)' }}>
                  {new Date(log.logged_at).toLocaleDateString()}
                </span>
                <span className="text-xs font-bold capitalize" style={{ color: HEALTH_COLOR[log.health] }}>{log.health}</span>
              </div>
              <div className="text-xs" style={{ color: 'var(--color-secondary)' }}>
                {log.height_cm && `Height: ${log.height_cm}cm`}
                {log.height_cm && log.canopy_cm && ' · '}
                {log.canopy_cm && `Canopy: ${log.canopy_cm}cm`}
              </div>
              {log.notes && <p className="text-xs mt-1" style={{ color: 'var(--color-tertiary)' }}>{log.notes}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Database } from '../types/database'
import TreeNFTCard from '../components/TreeNFTCard'

type Tree    = Database['public']['Tables']['trees']['Row']
type TreeLog = Database['public']['Tables']['tree_logs']['Row']

// Species row extended with carbon_coeff (joined via species_id)
type SpeciesRow = { id: string; name: string; scientific_name: string | null; carbon_coeff_kg_per_cm: number | null }

const STAGE_EMOJI: Record<string, string> = { seed: '🌰', seedling: '🌱', sapling: '🌿', tree: '🌳' }
const HEALTH_COLOR: Record<string, string> = { excellent: '#3ab87a', good: '#5a9e6f', fair: '#d97706', poor: '#ef4444' }

export default function TreeDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [tree,       setTree]       = useState<Tree | null>(null)
  const [species,    setSpecies]    = useState<SpeciesRow | null>(null)
  const [logs,       setLogs]       = useState<TreeLog[]>([])
  const [showLog,    setShowLog]    = useState(false)
  const [showCard,   setShowCard]   = useState(false)
  const [logForm,    setLogForm]    = useState({ height_cm: '', canopy_cm: '', health: 'good' as TreeLog['health'], notes: '' })
  const [saving,     setSaving]     = useState(false)

  useEffect(() => {
    if (!id) return
    Promise.all([
      supabase.from('trees').select('*').eq('id', id).single(),
      supabase.from('tree_logs').select('*').eq('tree_id', id).order('logged_at', { ascending: false }),
    ]).then(async ([{ data: t }, { data: l }]) => {
      setTree(t); setLogs(l ?? [])
      // Fetch species for carbon data
      if (t?.species_id) {
        const { data: sp } = await supabase.from('species').select('id,name,scientific_name,carbon_coeff_kg_per_cm').eq('id', t.species_id).single()
        setSpecies(sp)
      }
    })
  }, [id])

  const submitLog = async (e: React.FormEvent) => {
    e.preventDefault(); if (!id) return; setSaving(true)
    await supabase.from('tree_logs').insert({
      tree_id: id,
      height_cm: logForm.height_cm ? parseFloat(logForm.height_cm) : null,
      canopy_cm: logForm.canopy_cm ? parseFloat(logForm.canopy_cm) : null,
      health: logForm.health, notes: logForm.notes || null, xp_awarded: 30,
    })
    const { data: { user } } = await supabase.auth.getUser()
    if (user) { try { await supabase.rpc('award_xp', { user_id: user.id, amount: 30 }) } catch { /* */ } }
    const { data: l } = await supabase.from('tree_logs').select('*').eq('tree_id', id).order('logged_at', { ascending: false })
    setLogs(l ?? []); setShowLog(false); setSaving(false)
  }

  if (!tree) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 260 }}>
      <div style={{ fontSize: 40 }} className="animate-bounce">🌱</div>
    </div>
  )

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
        <button className="btn-back" onClick={() => navigate(-1)}>←</button>
        <div>
          <p className="page-eyebrow">{STAGE_EMOJI[tree.stage]} {tree.stage}</p>
          <h1 className="page-title" style={{ fontSize: 24 }}>{tree.name}</h1>
        </div>
      </div>

      {/* Info card */}
      <div className="card" style={{ padding: 20, marginBottom: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 24px' }}>
          {[
            { label: 'Stage',   value: tree.stage,     style: { textTransform: 'capitalize' as const } },
            { label: 'Planted', value: tree.planted_at ? new Date(tree.planted_at).toLocaleDateString() : '—', style: {} },
          ].map(item => (
            <div key={item.label}>
              <p className="label" style={{ marginBottom: 2 }}>{item.label}</p>
              <p style={{ fontSize: 15, fontWeight: 500, color: 'var(--color-fg)', ...item.style }}>{item.value}</p>
            </div>
          ))}
          {tree.lat && tree.lng && (
            <div style={{ gridColumn: '1 / -1' }}>
              <p className="label" style={{ marginBottom: 2 }}>Location</p>
              <p style={{ fontSize: 13, color: 'var(--color-secondary)' }}>{tree.lat.toFixed(4)}, {tree.lng.toFixed(4)}</p>
            </div>
          )}
          {tree.notes && (
            <div style={{ gridColumn: '1 / -1' }}>
              <p className="label" style={{ marginBottom: 2 }}>Notes</p>
              <p style={{ fontSize: 13, color: 'var(--color-secondary)' }}>{tree.notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* NFT Card CTA */}
      <button
        className="btn-primary"
        onClick={() => setShowCard(true)}
        style={{ marginBottom: 12, background: 'linear-gradient(135deg, #1e003c, #7c3aed)', border: 'none' }}
      >
        ✨ View NFT Card
      </button>

      {/* Log CTA */}
      <button className="btn-primary" onClick={() => setShowLog(!showLog)} style={{ marginBottom: 20 }}>
        📏 Log growth today · +30 XP
      </button>

      {/* NFT Card Modal */}
      {showCard && (
        <div
          onClick={() => setShowCard(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: 24,
          }}
        >
          <div onClick={e => e.stopPropagation()}>
            <TreeNFTCard
              treeId={tree.id}
              treeName={tree.name}
              stage={tree.stage}
              plantedAt={tree.planted_at}
              speciesName={species ? `${species.name} · ${species.scientific_name}` : null}
              carbonCoeff={species?.carbon_coeff_kg_per_cm ?? null}
              heightCm={logs.find(l => l.height_cm)?.height_cm ?? null}
            />
          </div>
          <p style={{ marginTop: 20, fontSize: 12, color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
            Tap outside the card to close
          </p>
        </div>
      )}

      {/* Log form */}
      {showLog && (
        <div className="card" style={{ padding: 20, marginBottom: 24 }}>
          <h3 className="section-title" style={{ marginBottom: 20 }}>Today's check-in</h3>
          <form onSubmit={submitLog}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
              <div>
                <label className="label">Height (cm)</label>
                <input className="input" type="number" value={logForm.height_cm}
                  onChange={e => setLogForm(f => ({ ...f, height_cm: e.target.value }))} step="any" placeholder="45" />
              </div>
              <div>
                <label className="label">Canopy (cm)</label>
                <input className="input" type="number" value={logForm.canopy_cm}
                  onChange={e => setLogForm(f => ({ ...f, canopy_cm: e.target.value }))} step="any" placeholder="20" />
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label className="label">Health</label>
              <select className="input" value={logForm.health}
                onChange={e => setLogForm(f => ({ ...f, health: e.target.value as TreeLog['health'] }))}>
                <option value="excellent">Excellent 🌟</option>
                <option value="good">Good ✅</option>
                <option value="fair">Fair ⚠️</option>
                <option value="poor">Poor 🚨</option>
              </select>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label className="label">Observations</label>
              <textarea className="input" value={logForm.notes}
                onChange={e => setLogForm(f => ({ ...f, notes: e.target.value }))}
                placeholder="Any notes…" rows={2} style={{ resize: 'none' }} />
            </div>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? 'Saving…' : 'Save log'}
            </button>
          </form>
        </div>
      )}

      {/* History */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
        <h2 className="section-title">Growth history</h2>
        <p className="section-subtitle">{logs.length} entries</p>
      </div>

      {logs.length === 0 ? (
        <p style={{ fontSize: 14, color: 'var(--color-tertiary)', textAlign: 'center', padding: '24px 0' }}>
          No logs yet — start tracking!
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {logs.map(log => (
            <div key={log.id} className="card-sm" style={{ padding: '14px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: 'var(--color-tertiary)', fontWeight: 500 }}>
                  {new Date(log.logged_at).toLocaleDateString()}
                </span>
                <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'capitalize', color: HEALTH_COLOR[log.health] }}>
                  {log.health}
                </span>
              </div>
              {(log.height_cm || log.canopy_cm) && (
                <p style={{ fontSize: 13, color: 'var(--color-secondary)' }}>
                  {log.height_cm ? `Height: ${log.height_cm}cm` : ''}
                  {log.height_cm && log.canopy_cm ? ' · ' : ''}
                  {log.canopy_cm ? `Canopy: ${log.canopy_cm}cm` : ''}
                </p>
              )}
              {log.notes && <p style={{ fontSize: 12, color: 'var(--color-tertiary)', marginTop: 4 }}>{log.notes}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

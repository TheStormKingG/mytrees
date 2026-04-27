import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

interface TreeWithSpecies {
  id: string; name: string; stage: string; planted_at: string | null
  species: { carbon_coeff_kg_per_cm: number; name: string } | null
  latest_height: number | null
}

function estimateCO2(tree: TreeWithSpecies): number {
  if (!tree.planted_at) return 0
  const years = (Date.now() - new Date(tree.planted_at).getTime()) / (1000 * 60 * 60 * 24 * 365)
  const coeff = tree.species?.carbon_coeff_kg_per_cm ?? 1.5
  const height = tree.latest_height ?? 30
  return parseFloat((coeff * (height / 100) * years).toFixed(2))
}

export default function CarbonLedger() {
  const [trees,   setTrees]   = useState<TreeWithSpecies[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoading(false); return }
      const { data: treeData } = await supabase.from('trees').select(`*, species(carbon_coeff_kg_per_cm, name)`).eq('user_id', user.id)
      if (!treeData) { setLoading(false); return }
      const treeIds = treeData.map(t => t.id)
      const { data: logData } = await supabase.from('tree_logs').select('tree_id, height_cm, logged_at').in('tree_id', treeIds).order('logged_at', { ascending: false })
      const latestH: Record<string, number | null> = {}
      logData?.forEach(log => { if (!(log.tree_id in latestH)) latestH[log.tree_id] = log.height_cm })
      setTrees(treeData.map(t => ({
        ...t,
        species: Array.isArray(t.species) ? t.species[0] ?? null : t.species,
        latest_height: latestH[t.id] ?? null,
      })))
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 260 }}>
      <div style={{ fontSize: 40 }} className="animate-bounce">🌍</div>
    </div>
  )

  const totalCO2 = trees.reduce((sum, t) => sum + estimateCO2(t), 0)

  return (
    <div>
      <header className="page-header">
        <p className="page-eyebrow">Impact tracker</p>
        <h1 className="page-title">Carbon Ledger 🌍</h1>
        <p className="page-subtitle">Estimated CO₂ sequestered by your forest</p>
      </header>

      {/* Hero */}
      <div className="card" style={{ padding: '28px 20px', marginBottom: 16, textAlign: 'center' }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%', margin: '0 auto 16px',
          background: 'var(--bg)', boxShadow: 'var(--neu-inset)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36,
        }}>🌿</div>
        <p style={{ fontSize: 52, fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--accent)', lineHeight: 1 }}>
          {totalCO2.toFixed(1)}
        </p>
        <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--accent)', marginTop: 6 }}>kg CO₂e absorbed</p>
        <p style={{ fontSize: 12, color: 'var(--color-tertiary)', marginTop: 8 }}>
          ≈ {(totalCO2 / 21000).toFixed(4)} car-years offset
        </p>
      </div>

      {/* Disclaimer */}
      <div style={{
        borderRadius: 14, padding: '12px 14px', marginBottom: 24,
        background: 'rgba(217,119,6,0.07)', border: '1px solid rgba(217,119,6,0.18)',
      }}>
        <p style={{ fontSize: 12, color: '#b45309', lineHeight: 1.5 }}>
          ⚠️ Estimates use simplified allometric equations. Actual sequestration varies by species, climate and soil.
        </p>
      </div>

      {/* Breakdown */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
        <h2 className="section-title">Tree breakdown</h2>
        <p className="section-subtitle">{trees.length} trees</p>
      </div>

      {trees.length === 0 ? (
        <p style={{ fontSize: 14, color: 'var(--color-tertiary)', textAlign: 'center', padding: '32px 0' }}>
          No trees yet — plant one to see your carbon impact!
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {trees.map(tree => {
            const co2 = estimateCO2(tree)
            return (
              <div key={tree.id} className="card-sm" style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-fg)' }}>{tree.name}</p>
                  <p style={{ fontSize: 12, color: 'var(--color-tertiary)', marginTop: 2 }}>
                    {tree.species?.name ?? 'Unknown species'} · {tree.latest_height ? `${tree.latest_height}cm` : 'No height logged'}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--accent)' }}>{co2.toFixed(2)}</p>
                  <p style={{ fontSize: 11, color: 'var(--color-tertiary)' }}>kg CO₂e</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

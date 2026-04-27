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
  const diameterProxy = height / 100
  return parseFloat((coeff * diameterProxy * years).toFixed(2))
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
      const latestHeights: Record<string, number | null> = {}
      logData?.forEach(log => { if (!(log.tree_id in latestHeights)) latestHeights[log.tree_id] = log.height_cm })
      setTrees(treeData.map(t => ({
        ...t,
        species: Array.isArray(t.species) ? t.species[0] ?? null : t.species,
        latest_height: latestHeights[t.id] ?? null,
      })))
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-4xl animate-bounce">🌍</div>
    </div>
  )

  const totalCO2 = trees.reduce((sum, t) => sum + estimateCO2(t), 0)

  return (
    <div>
      <header className="mb-6">
        <p className="label-cap mb-1">Impact tracker</p>
        <h1 className="section-title text-[28px] leading-[34px]">Carbon Ledger 🌍</h1>
        <p className="section-subtitle mt-0.5">Estimated CO₂ sequestered by your forest</p>
      </header>

      {/* Hero total */}
      <div className="card p-6 mb-4 text-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-4"
          style={{ background: 'var(--bg)', boxShadow: 'var(--neu-inset)' }}>🌿</div>
        <div className="text-[48px] font-bold leading-none tracking-tight" style={{ color: 'var(--accent)' }}>
          {totalCO2.toFixed(1)}
        </div>
        <div className="text-sm font-semibold mt-1" style={{ color: 'var(--accent)' }}>kg CO₂e absorbed</div>
        <div className="text-xs mt-3" style={{ color: 'var(--color-tertiary)' }}>
          ≈ {(totalCO2 / 21000).toFixed(4)} car-years of emissions offset
        </div>
      </div>

      {/* Disclaimer */}
      <div className="rounded-xl p-3 mb-5 text-xs font-medium"
        style={{ background: 'rgba(217,119,6,0.08)', border: '1px solid rgba(217,119,6,0.2)', color: '#d97706' }}>
        ⚠️ Estimates use simplified allometric equations. Actual sequestration varies by species, climate and soil.
      </div>

      <div className="flex items-baseline justify-between mb-3 px-1">
        <h2 className="section-title">Tree breakdown</h2>
        <p className="section-subtitle">{trees.length} trees</p>
      </div>

      {trees.length === 0 ? (
        <p className="text-sm text-center py-8" style={{ color: 'var(--color-tertiary)' }}>
          No trees yet — plant one to see your carbon impact!
        </p>
      ) : (
        <div className="space-y-3">
          {trees.map(tree => {
            const co2 = estimateCO2(tree)
            return (
              <div key={tree.id} className="card-sm p-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-sm" style={{ color: 'var(--color-fg)' }}>{tree.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--color-tertiary)' }}>
                    {tree.species?.name ?? 'Unknown species'} · {tree.latest_height ? `${tree.latest_height}cm` : 'No height logged'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm" style={{ color: 'var(--accent)' }}>{co2.toFixed(2)} kg</div>
                  <div className="text-xs" style={{ color: 'var(--color-tertiary)' }}>CO₂e</div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

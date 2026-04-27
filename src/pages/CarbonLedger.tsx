import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

interface TreeWithSpecies {
  id: string
  name: string
  stage: string
  planted_at: string | null
  species: {
    carbon_coeff_kg_per_cm: number
    name: string
  } | null
  latest_height: number | null
}

// Estimate CO2 sequestered using a simplified formula
// kg CO2 ≈ coefficient × diameter_cm × years_alive
// Using height as a proxy: diameter ≈ height_cm / 100 (very rough!)
function estimateCO2(tree: TreeWithSpecies): number {
  if (!tree.planted_at) return 0
  const years = (Date.now() - new Date(tree.planted_at).getTime()) / (1000 * 60 * 60 * 24 * 365)
  const coeff = tree.species?.carbon_coeff_kg_per_cm ?? 1.5
  const height = tree.latest_height ?? 30
  const diameterProxy = height / 100
  return parseFloat((coeff * diameterProxy * years).toFixed(2))
}

export default function CarbonLedger() {
  const [trees, setTrees] = useState<TreeWithSpecies[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Get trees with species
      const { data: treeData } = await supabase
        .from('trees')
        .select(`*, species(carbon_coeff_kg_per_cm, name)`)
        .eq('user_id', user.id)

      if (!treeData) { setLoading(false); return }

      // Get latest log heights
      const treeIds = treeData.map(t => t.id)
      const { data: logData } = await supabase
        .from('tree_logs')
        .select('tree_id, height_cm, logged_at')
        .in('tree_id', treeIds)
        .order('logged_at', { ascending: false })

      const latestHeights: Record<string, number | null> = {}
      logData?.forEach(log => {
        if (!(log.tree_id in latestHeights)) {
          latestHeights[log.tree_id] = log.height_cm
        }
      })

      const combined: TreeWithSpecies[] = treeData.map(t => ({
        ...t,
        species: Array.isArray(t.species) ? t.species[0] ?? null : t.species,
        latest_height: latestHeights[t.id] ?? null,
      }))

      setTrees(combined)
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
    <div className="px-4 pt-6 pb-4">
      <h1 className="text-xl font-bold text-emerald-400 mb-1">Carbon Ledger 🌍</h1>
      <p className="text-stone-400 text-xs mb-6">Estimated CO₂ sequestered by your forest</p>

      {/* Total */}
      <div className="bg-gradient-to-br from-emerald-900/60 to-stone-900 border border-emerald-700 rounded-2xl p-5 mb-6 text-center">
        <div className="text-4xl font-bold text-emerald-300">{totalCO2.toFixed(1)}</div>
        <div className="text-emerald-500 text-sm mt-1">kg CO₂e absorbed</div>
        <div className="text-stone-500 text-xs mt-3">Equivalent to {(totalCO2 / 21000).toFixed(4)} car-years of emissions offset</div>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-900/30 border border-amber-700/50 rounded-xl p-3 mb-5 text-xs text-amber-300">
        ⚠️ Estimates use simplified allometric equations. Actual sequestration varies by species, climate and soil. Verified measurements coming soon.
      </div>

      {/* Per-tree breakdown */}
      <h2 className="text-stone-300 font-semibold text-sm mb-3">Tree breakdown</h2>
      {trees.length === 0 ? (
        <p className="text-stone-500 text-sm text-center py-8">No trees yet — plant one to see your carbon impact!</p>
      ) : (
        <div className="space-y-3">
          {trees.map(tree => {
            const co2 = estimateCO2(tree)
            return (
              <div key={tree.id} className="bg-stone-900 border border-stone-700 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <div className="text-stone-100 font-medium text-sm">{tree.name}</div>
                  <div className="text-stone-500 text-xs">
                    {tree.species?.name ?? 'Unknown species'} · {tree.latest_height ? `${tree.latest_height}cm` : 'No height logged'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-emerald-400 font-semibold text-sm">{co2.toFixed(2)} kg</div>
                  <div className="text-stone-600 text-xs">CO₂e</div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

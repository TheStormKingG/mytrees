import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Database } from '../types/database'

type Profile = Database['public']['Tables']['profiles']['Row']
type Tree = Database['public']['Tables']['trees']['Row']

const STAGE_EMOJI: Record<string, string> = {
  seed: '🌰',
  seedling: '🌱',
  sapling: '🌿',
  tree: '🌳',
}

const XP_PER_LEVEL = 500

function xpToNextLevel(xp: number) {
  const level = Math.floor(xp / XP_PER_LEVEL) + 1
  const progress = xp % XP_PER_LEVEL
  return { level, progress, max: XP_PER_LEVEL }
}

export default function Dashboard() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [trees, setTrees] = useState<Tree[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const [{ data: prof }, { data: treeData }] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('trees').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
      ])

      setProfile(prof)
      setTrees(treeData ?? [])
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-4xl animate-bounce">🌱</div>
    </div>
  )

  const { level, progress, max } = xpToNextLevel(profile?.xp ?? 0)
  const pct = Math.round((progress / max) * 100)

  return (
    <div className="px-4 pt-6 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-emerald-400">
            My Forest 🌳
          </h1>
          <p className="text-stone-400 text-sm">
            {profile?.username ?? 'Forest keeper'}
          </p>
        </div>
        <div className="text-right">
          <div className="text-stone-300 text-sm font-semibold">Lvl {level}</div>
          <div className="text-stone-500 text-xs">{profile?.xp ?? 0} XP</div>
        </div>
      </div>

      {/* XP Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-stone-500 mb-1">
          <span>{progress} / {max} XP</span>
          <span>{pct}% to Lvl {level + 1}</span>
        </div>
        <div className="h-2 bg-stone-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-stone-900 rounded-xl p-3 text-center border border-stone-700">
          <div className="text-2xl font-bold text-emerald-400">{trees.length}</div>
          <div className="text-stone-400 text-xs mt-1">Trees</div>
        </div>
        <div className="bg-stone-900 rounded-xl p-3 text-center border border-stone-700">
          <div className="text-2xl font-bold text-orange-400">🔥 {profile?.streak_days ?? 0}</div>
          <div className="text-stone-400 text-xs mt-1">Day streak</div>
        </div>
        <div className="bg-stone-900 rounded-xl p-3 text-center border border-stone-700">
          <div className="text-2xl font-bold text-sky-400">{profile?.level ?? 1}</div>
          <div className="text-stone-400 text-xs mt-1">Level</div>
        </div>
      </div>

      {/* Trees list */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-stone-200 font-semibold text-sm">Your trees</h2>
        <Link to="/add-tree" className="text-emerald-400 text-xs font-medium hover:text-emerald-300">
          + Plant new
        </Link>
      </div>

      {trees.length === 0 ? (
        <div className="bg-stone-900 border border-dashed border-stone-600 rounded-2xl p-8 text-center">
          <div className="text-5xl mb-3">🌰</div>
          <p className="text-stone-400 text-sm mb-4">You haven't planted any trees yet.</p>
          <Link
            to="/add-tree"
            className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            Plant your first tree
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {trees.map(tree => (
            <Link
              key={tree.id}
              to={`/tree/${tree.id}`}
              className="block bg-stone-900 border border-stone-700 hover:border-emerald-700 rounded-xl p-4 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="text-3xl">{STAGE_EMOJI[tree.stage] ?? '🌱'}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-stone-100 truncate">{tree.name}</div>
                  <div className="text-stone-400 text-xs capitalize">{tree.stage} · {tree.planted_at ? new Date(tree.planted_at).toLocaleDateString() : 'Not planted yet'}</div>
                </div>
                <div className="text-stone-600 text-sm">›</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

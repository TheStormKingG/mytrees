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
    <div className="flex items-center justify-center h-64" style={{ background: 'var(--neu-base)' }}>
      <div className="text-4xl animate-bounce">🌱</div>
    </div>
  )

  const { level, progress, max } = xpToNextLevel(profile?.xp ?? 0)
  const pct = Math.round((progress / max) * 100)

  return (
    <div className="px-4 pt-6 pb-4" style={{ background: 'var(--neu-base)' }}>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Forest 🌳</h1>
          <p className="text-slate-500 text-sm mt-0.5">{profile?.username ?? 'Forest keeper'}</p>
        </div>
        <div
          className="neu-raised-sm rounded-2xl px-4 py-2 text-center"
          style={{ background: 'var(--neu-base)' }}
        >
          <div className="text-slate-800 text-sm font-bold">Lvl {level}</div>
          <div className="text-slate-400 text-xs">{profile?.xp ?? 0} XP</div>
        </div>
      </div>

      {/* XP Bar */}
      <div className="neu-pressed-sm rounded-full overflow-hidden h-3 mb-1.5" style={{ background: 'var(--neu-base)' }}>
        <div
          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-slate-400 mb-6">
        <span>{progress} / {max} XP</span>
        <span>{pct}% to Lvl {level + 1}</span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { value: trees.length, label: 'Trees', color: 'text-emerald-600' },
          { value: `🔥 ${profile?.streak_days ?? 0}`, label: 'Day streak', color: 'text-amber-500' },
          { value: profile?.level ?? 1, label: 'Level', color: 'text-slate-700' },
        ].map(stat => (
          <div
            key={stat.label}
            className="neu-raised-sm rounded-2xl p-3 text-center"
            style={{ background: 'var(--neu-base)' }}
          >
            <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-slate-400 text-xs mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Trees list header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-slate-700 font-semibold text-sm">Your trees</h2>
        <Link to="/add-tree" className="text-emerald-600 text-xs font-bold hover:text-emerald-500 transition-colors">
          + Plant new
        </Link>
      </div>

      {trees.length === 0 ? (
        <div
          className="neu-pressed rounded-2xl p-8 text-center"
          style={{ background: 'var(--neu-base)' }}
        >
          <div className="text-5xl mb-3">🌰</div>
          <p className="text-slate-500 text-sm mb-5">You haven't planted any trees yet.</p>
          <Link
            to="/add-tree"
            className="inline-block bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-bold px-6 py-3 rounded-xl transition-all neu-raised-sm"
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
              className="block neu-raised-sm rounded-xl p-4 transition-all hover:neu-raised active:neu-pressed-sm"
              style={{ background: 'var(--neu-base)' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl neu-pressed-sm flex-shrink-0"
                  style={{ background: 'var(--neu-base)' }}
                >
                  {STAGE_EMOJI[tree.stage] ?? '🌱'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-800 truncate">{tree.name}</div>
                  <div className="text-slate-400 text-xs capitalize mt-0.5">
                    {tree.stage} · {tree.planted_at ? new Date(tree.planted_at).toLocaleDateString() : 'Not planted yet'}
                  </div>
                </div>
                <div className="text-slate-300 text-lg font-light">›</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

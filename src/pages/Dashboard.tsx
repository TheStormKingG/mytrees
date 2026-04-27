import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Database } from '../types/database'

type Profile = Database['public']['Tables']['profiles']['Row']
type Tree    = Database['public']['Tables']['trees']['Row']

const STAGE_EMOJI: Record<string, string> = { seed: '🌰', seedling: '🌱', sapling: '🌿', tree: '🌳' }
const XP_PER_LEVEL = 500

function xpToNextLevel(xp: number) {
  const level    = Math.floor(xp / XP_PER_LEVEL) + 1
  const progress = xp % XP_PER_LEVEL
  return { level, progress, max: XP_PER_LEVEL }
}

export default function Dashboard() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [trees,   setTrees]   = useState<Tree[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoading(false); return }
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
    <div>
      {/* Header */}
      <header className="mb-6">
        <p className="label-cap mb-1">My Forest</p>
        <h1 className="section-title text-[28px] leading-[34px]">🌳 Forest</h1>
        <p className="section-subtitle mt-0.5">{profile?.username ?? 'Forest keeper'}</p>
      </header>

      {/* XP card */}
      <div className="card p-5 mb-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="label-cap mb-0.5">Experience</p>
            <p className="text-[28px] font-bold leading-none" style={{ color: 'var(--color-fg)' }}>
              {profile?.xp ?? 0} <span className="text-base font-normal" style={{ color: 'var(--color-tertiary)' }}>XP</span>
            </p>
          </div>
          <div className="text-right">
            <p className="label-cap mb-0.5">Streak</p>
            <p className="text-base font-semibold" style={{ color: 'var(--color-fg)' }}>🔥 {profile?.streak_days ?? 0}d</p>
          </div>
          <div className="text-right">
            <p className="label-cap mb-0.5">Level</p>
            <p className="text-base font-semibold" style={{ color: 'var(--accent)' }}>{level}</p>
          </div>
        </div>
        {/* XP progress bar */}
        <div className="rounded-full overflow-hidden h-2" style={{ background: 'var(--bg)', boxShadow: 'var(--neu-inset-sm)' }}>
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, background: 'var(--accent)' }} />
        </div>
        <p className="text-[11px] mt-1.5" style={{ color: 'var(--color-tertiary)' }}>
          {progress} / {max} XP · {pct}% to Level {level + 1}
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { value: trees.length, label: 'Trees planted' },
          { value: `${profile?.streak_days ?? 0}d`, label: 'Day streak' },
          { value: `Lvl ${level}`, label: 'Current level' },
        ].map(stat => (
          <div key={stat.label} className="card-sm p-3 text-center">
            <div className="font-bold text-lg" style={{ color: 'var(--color-fg)' }}>{stat.value}</div>
            <div className="text-[11px] mt-0.5" style={{ color: 'var(--color-tertiary)' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Trees section */}
      <div className="flex items-baseline justify-between mb-3 px-1">
        <div>
          <h2 className="section-title">Your trees</h2>
          <p className="section-subtitle mt-0.5">{trees.length} in your forest</p>
        </div>
        <Link to="/add-tree" className="text-xs font-semibold transition-colors"
          style={{ color: 'var(--accent)' }}>+ Plant new</Link>
      </div>

      {trees.length === 0 ? (
        <div className="card p-8 text-center">
          <div className="text-5xl mb-3">🌰</div>
          <p className="text-sm mb-5" style={{ color: 'var(--color-secondary)' }}>You haven't planted any trees yet.</p>
          <Link to="/add-tree"
            className="inline-block text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all active:scale-95"
            style={{ background: 'var(--accent)', boxShadow: '0 4px 12px rgba(58,184,122,0.30)' }}>
            Plant your first tree
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {trees.map(tree => (
            <Link key={tree.id} to={`/tree/${tree.id}`}
              className="block card-sm p-4 transition-all active:scale-[0.98]">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: 'var(--bg)', boxShadow: 'var(--neu-inset-sm)' }}>
                  {STAGE_EMOJI[tree.stage] ?? '🌱'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate" style={{ color: 'var(--color-fg)' }}>{tree.name}</div>
                  <div className="text-xs capitalize mt-0.5" style={{ color: 'var(--color-tertiary)' }}>
                    {tree.stage} · {tree.planted_at ? new Date(tree.planted_at).toLocaleDateString() : 'Not planted yet'}
                  </div>
                </div>
                <div className="text-lg font-light" style={{ color: 'var(--border)' }}>›</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

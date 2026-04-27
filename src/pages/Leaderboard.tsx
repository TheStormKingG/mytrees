import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

interface LeaderEntry {
  id: string; username: string | null; xp: number; level: number; tree_count: number
}

const RANK_EMOJI = ['🥇', '🥈', '🥉']

export default function Leaderboard() {
  const [leaders, setLeaders] = useState<LeaderEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [myId,    setMyId]    = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      setMyId(user?.id ?? null)
      const { data: profiles } = await supabase.from('profiles').select('id, username, xp, level').order('xp', { ascending: false }).limit(50)
      if (!profiles) { setLoading(false); return }
      const ids = profiles.map(p => p.id)
      const { data: treeCounts } = await supabase.from('trees').select('user_id').in('user_id', ids)
      const countMap: Record<string, number> = {}
      treeCounts?.forEach(t => { countMap[t.user_id] = (countMap[t.user_id] ?? 0) + 1 })
      setLeaders(profiles.map(p => ({ ...p, tree_count: countMap[p.id] ?? 0 })))
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-4xl animate-bounce">🏆</div>
    </div>
  )

  return (
    <div>
      <header className="mb-6">
        <p className="label-cap mb-1">Community</p>
        <h1 className="section-title text-[28px] leading-[34px]">Forest Leagues 🏆</h1>
        <p className="section-subtitle mt-0.5">Top forest keepers by XP</p>
      </header>

      {leaders.length === 0 ? (
        <p className="text-sm text-center py-12" style={{ color: 'var(--color-tertiary)' }}>
          No keepers yet — be the first! 🌱
        </p>
      ) : (
        <div className="space-y-3">
          {leaders.map((entry, i) => {
            const isMe = entry.id === myId
            return (
              <div key={entry.id}
                className="flex items-center gap-4 rounded-[18px] p-4 transition-all"
                style={{
                  background: isMe ? 'var(--bg)' : 'var(--surface)',
                  border: `1px solid ${isMe ? 'rgba(58,184,122,0.3)' : 'var(--border-glass)'}`,
                  boxShadow: isMe ? 'var(--neu-inset-sm)' : 'var(--neu-shadow-sm)',
                }}>
                <div className="w-9 text-center font-bold text-xl">
                  {RANK_EMOJI[i] ?? <span className="text-sm font-semibold" style={{ color: 'var(--color-tertiary)' }}>#{i + 1}</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate text-sm" style={{ color: isMe ? 'var(--accent)' : 'var(--color-fg)' }}>
                    {entry.username ?? 'Anonymous'}
                    {isMe && <span className="text-xs font-normal ml-1" style={{ color: 'var(--accent)' }}>(you)</span>}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--color-tertiary)' }}>
                    {entry.tree_count} trees · Lvl {entry.level}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm" style={{ color: '#d97706' }}>{entry.xp.toLocaleString()}</div>
                  <div className="text-xs" style={{ color: 'var(--color-tertiary)' }}>XP</div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

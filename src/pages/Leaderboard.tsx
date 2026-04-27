import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

interface LeaderEntry {
  id: string
  username: string | null
  xp: number
  level: number
  tree_count: number
}

const RANK_EMOJI = ['🥇', '🥈', '🥉']

export default function Leaderboard() {
  const [leaders, setLeaders] = useState<LeaderEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [myId, setMyId] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      setMyId(user?.id ?? null)

      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, username, xp, level')
        .order('xp', { ascending: false })
        .limit(50)

      if (!profiles) { setLoading(false); return }

      // Get tree counts
      const ids = profiles.map(p => p.id)
      const { data: treeCounts } = await supabase
        .from('trees')
        .select('user_id')
        .in('user_id', ids)

      const countMap: Record<string, number> = {}
      treeCounts?.forEach(t => { countMap[t.user_id] = (countMap[t.user_id] ?? 0) + 1 })

      setLeaders(profiles.map(p => ({ ...p, tree_count: countMap[p.id] ?? 0 })))
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-64" style={{ background: 'var(--neu-base)' }}>
      <div className="text-4xl animate-bounce">🏆</div>
    </div>
  )

  return (
    <div className="px-4 pt-6 pb-4" style={{ background: 'var(--neu-base)' }}>
      <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-1">Forest Leagues 🏆</h1>
      <p className="text-slate-400 text-sm mb-6">Top forest keepers by XP</p>

      {leaders.length === 0 ? (
        <p className="text-slate-400 text-center py-12">No keepers yet — be the first! 🌱</p>
      ) : (
        <div className="space-y-3">
          {leaders.map((entry, i) => {
            const isMe = entry.id === myId
            return (
              <div
                key={entry.id}
                className={`flex items-center gap-4 rounded-xl p-4 transition-all ${isMe ? 'neu-pressed-sm' : 'neu-raised-sm'}`}
                style={{ background: 'var(--neu-base)' }}
              >
                <div className="w-9 text-center font-bold text-xl">
                  {RANK_EMOJI[i] ?? <span className="text-slate-400 text-sm font-semibold">#{i + 1}</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`font-semibold truncate text-sm ${isMe ? 'text-emerald-700' : 'text-slate-800'}`}>
                    {entry.username ?? 'Anonymous'} {isMe && <span className="text-xs text-emerald-500 font-normal">(you)</span>}
                  </div>
                  <div className="text-slate-400 text-xs mt-0.5">
                    {entry.tree_count} trees · Lvl {entry.level}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-amber-500 font-bold text-sm">{entry.xp.toLocaleString()}</div>
                  <div className="text-slate-400 text-xs">XP</div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

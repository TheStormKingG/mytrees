import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

interface LeaderEntry { id: string; username: string | null; xp: number; level: number; tree_count: number }

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
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 260 }}>
      <div style={{ fontSize: 40 }} className="animate-bounce">🏆</div>
    </div>
  )

  return (
    <div>
      <header className="page-header">
        <p className="page-eyebrow">Community</p>
        <h1 className="page-title">Forest Leagues 🏆</h1>
        <p className="page-subtitle">Top forest keepers ranked by XP</p>
      </header>

      {leaders.length === 0 ? (
        <div className="card" style={{ padding: '40px 24px', textAlign: 'center' }}>
          <p style={{ fontSize: 40, marginBottom: 12 }}>🌱</p>
          <p style={{ fontSize: 15, color: 'var(--color-secondary)' }}>No keepers yet — be the first!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {leaders.map((entry, i) => {
            const isMe = entry.id === myId
            return (
              <div key={entry.id} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '14px 16px',
                borderRadius: 16,
                background: isMe ? 'rgba(58,184,122,0.06)' : 'var(--surface-solid)',
                border: `1px solid ${isMe ? 'rgba(58,184,122,0.25)' : 'rgba(212,219,229,0.6)'}`,
                boxShadow: isMe ? 'none' : 'var(--neu-shadow-sm)',
              }}>
                <div style={{ width: 36, textAlign: 'center', fontSize: 22, flexShrink: 0 }}>
                  {RANK_EMOJI[i] ?? <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-tertiary)' }}>#{i + 1}</span>}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 15, fontWeight: 600, color: isMe ? 'var(--accent)' : 'var(--color-fg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {entry.username ?? 'Anonymous'}
                    {isMe && <span style={{ fontSize: 12, fontWeight: 400, color: 'var(--accent)', marginLeft: 6 }}>you</span>}
                  </p>
                  <p style={{ fontSize: 12, color: 'var(--color-tertiary)', marginTop: 2 }}>
                    {entry.tree_count} trees · Level {entry.level}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: 16, fontWeight: 700, color: '#d97706' }}>{entry.xp.toLocaleString()}</p>
                  <p style={{ fontSize: 11, color: 'var(--color-tertiary)' }}>XP</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

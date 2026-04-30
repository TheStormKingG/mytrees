import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

interface LeaderEntry {
  id:          string
  username:    string | null
  schoolGroup: string | null
  avatarUrl:   string | null
  level:       number
  xp:          number
  treeCount:   number
  co2kg:       number          // total kg CO₂e absorbed
}

const RANK_EMOJI = ['🥇', '🥈', '🥉']

/** Format kg CO₂e: show kg below 1000, tonnes above */
function formatCO2(kg: number): { value: string; unit: string } {
  if (kg >= 1000) return { value: (kg / 1000).toFixed(2), unit: 'tonnes CO₂e' }
  return { value: kg.toFixed(1), unit: 'kg CO₂e' }
}

/** Initials avatar fallback */
function Avatar({ url, name, size = 44 }: { url: string | null; name: string | null; size?: number }) {
  const initials = (name ?? '?').charAt(0).toUpperCase()
  if (url) {
    return (
      <img
        src={url}
        alt={name ?? 'avatar'}
        style={{
          width: size, height: size, borderRadius: '50%',
          objectFit: 'cover', flexShrink: 0,
          border: '2px solid rgba(36,160,96,0.2)',
          boxShadow: 'var(--neu-shadow-xs)',
        }}
        onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
      />
    )
  }
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: 'linear-gradient(135deg, var(--accent-light) 0%, var(--accent) 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.4, fontWeight: 700, color: '#fff',
      boxShadow: 'var(--neu-shadow-xs)',
    }}>
      {initials}
    </div>
  )
}

export default function Leaderboard() {
  const [leaders, setLeaders] = useState<LeaderEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [myId,    setMyId]    = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      // ── Who am I? ──────────────────────────────────────────────────────
      const { data: { user } } = await supabase.auth.getUser()
      setMyId(user?.id ?? null)

      // ── Top 100 profiles ───────────────────────────────────────────────
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, username, school_group, avatar_url, level, xp')
        .order('xp', { ascending: false })
        .limit(100)
      if (!profiles?.length) { setLoading(false); return }

      const ids = profiles.map(p => p.id)

      // ── Trees with their species carbon coefficient ─────────────────────
      const { data: trees } = await supabase
        .from('trees')
        .select('id, user_id, species:species_id(carbon_coeff_kg_per_cm)')
        .in('user_id', ids)

      // ── Latest height_cm per tree from logs ────────────────────────────
      const treeIds = (trees ?? []).map(t => t.id)
      const { data: logs } = treeIds.length
        ? await supabase
            .from('tree_logs')
            .select('tree_id, height_cm, logged_at')
            .in('tree_id', treeIds)
            .not('height_cm', 'is', null)
            .order('logged_at', { ascending: false })
        : { data: [] }

      // ── Latest height per tree ─────────────────────────────────────────
      const latestHeight: Record<string, number> = {}
      for (const log of (logs ?? [])) {
        if (log.height_cm && !(log.tree_id in latestHeight)) {
          latestHeight[log.tree_id] = log.height_cm
        }
      }

      // ── CO₂ + tree count per user ──────────────────────────────────────
      const co2Map:   Record<string, number> = {}
      const countMap: Record<string, number> = {}
      for (const tree of (trees ?? [])) {
        countMap[tree.user_id] = (countMap[tree.user_id] ?? 0) + 1
        const coeff = (tree.species as { carbon_coeff_kg_per_cm: number } | null)?.carbon_coeff_kg_per_cm ?? 1.0
        const h     = latestHeight[tree.id] ?? 0
        co2Map[tree.user_id] = (co2Map[tree.user_id] ?? 0) + (h * coeff)
      }

      // ── Build + sort by CO₂ descending ────────────────────────────────
      const entries: LeaderEntry[] = profiles.map(p => ({
        id:          p.id,
        username:    p.username,
        schoolGroup: p.school_group,
        avatarUrl:   p.avatar_url,
        level:       p.level,
        xp:          p.xp ?? 0,
        treeCount:   countMap[p.id] ?? 0,
        co2kg:       co2Map[p.id]   ?? 0,
      }))
      entries.sort((a, b) => b.co2kg - a.co2kg)

      setLeaders(entries)
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
        <p className="page-subtitle">Top forest keepers ranked by CO₂ absorbed</p>
      </header>

      {leaders.length === 0 ? (
        <div className="card" style={{ padding: '40px 24px', textAlign: 'center' }}>
          <p style={{ fontSize: 40, marginBottom: 12 }}>🌱</p>
          <p style={{ fontSize: 15, color: 'var(--color-secondary)' }}>
            No keepers yet — be the first!
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {leaders.map((entry, i) => {
            const isMe   = entry.id === myId
            const co2fmt = formatCO2(entry.co2kg)
            return (
              <div key={entry.id} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 14px',
                borderRadius: 18,
                background: isMe ? 'rgba(36,160,96,0.06)' : 'var(--surface-solid)',
                border: `1px solid ${isMe ? 'rgba(36,160,96,0.28)' : 'rgba(0,0,0,0.05)'}`,
                boxShadow: isMe ? '0 0 0 2px rgba(36,160,96,0.12)' : 'var(--neu-shadow-sm)',
              }}>

                {/* ── Rank badge ── */}
                <div style={{
                  width: 30, textAlign: 'center', flexShrink: 0,
                  fontSize: i < 3 ? 22 : 13, fontWeight: 700,
                  color: 'var(--color-tertiary)',
                }}>
                  {RANK_EMOJI[i] ?? `#${i + 1}`}
                </div>

                {/* ── Avatar ── */}
                <Avatar url={entry.avatarUrl} name={entry.username} size={44} />

                {/* ── Name + org ── */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, flexWrap: 'wrap' }}>
                    <p style={{
                      fontSize: 15, fontWeight: 700,
                      color: isMe ? 'var(--accent)' : 'var(--color-fg)',
                      margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {entry.username ?? 'Anonymous'}
                    </p>
                    {isMe && (
                      <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--accent)' }}>you</span>
                    )}
                    {entry.schoolGroup && (
                      <span style={{
                        fontSize: 11, fontStyle: 'italic',
                        color: 'var(--color-tertiary)', whiteSpace: 'nowrap',
                        overflow: 'hidden', textOverflow: 'ellipsis',
                      }}>
                        ({entry.schoolGroup})
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--color-tertiary)', margin: '3px 0 0', fontStyle: 'italic' }}>
                    {entry.treeCount} {entry.treeCount === 1 ? 'tree' : 'trees'} · Level {entry.level} · {entry.xp.toLocaleString()} XP
                  </p>
                </div>

                {/* ── CO₂ score ── */}
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{
                    fontSize: 16, fontWeight: 800, margin: 0,
                    color: isMe ? 'var(--accent)' : '#16a34a',
                  }}>
                    {co2fmt.value}
                  </p>
                  <p style={{ fontSize: 10, color: 'var(--color-tertiary)', margin: '1px 0 0', whiteSpace: 'nowrap' }}>
                    {co2fmt.unit}
                  </p>
                </div>

              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

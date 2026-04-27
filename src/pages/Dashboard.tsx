import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Database } from '../types/database'

type Profile = Database['public']['Tables']['profiles']['Row']
type Tree    = Database['public']['Tables']['trees']['Row']

const STAGE_EMOJI: Record<string, string> = { seed: '🌰', seedling: '🌱', sapling: '🌿', tree: '🌳' }
const XP_PER_LEVEL = 500

function xpInfo(xp: number) {
  const level    = Math.floor(xp / XP_PER_LEVEL) + 1
  const progress = xp % XP_PER_LEVEL
  const pct      = Math.round((progress / XP_PER_LEVEL) * 100)
  return { level, progress, pct }
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
      setProfile(prof); setTrees(treeData ?? []); setLoading(false)
    }
    load()
  }, [])

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 260 }}>
      <div style={{ fontSize: 40 }} className="animate-bounce">🌱</div>
    </div>
  )

  const { level, progress, pct } = xpInfo(profile?.xp ?? 0)

  return (
    <div>
      {/* Page header */}
      <header className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 4 }}>
          <img
            src="/mytrees/logo-icon.svg"
            alt="MyTrees icon"
            style={{ width: 44, height: 44, flexShrink: 0 }}
          />
          <img
            src="/mytrees/logo-wordmark.svg"
            alt="MyTrees"
            style={{ height: 36, width: 'auto' }}
          />
        </div>
        <p className="page-subtitle" style={{ marginTop: 8 }}>
          {profile?.username ? `Hey, ${profile.username} 👋` : 'Your personal forest tracker'}
        </p>
      </header>

      {/* XP card */}
      <div className="card" style={{ padding: '20px 20px 18px', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <p className="label" style={{ marginBottom: 2 }}>Experience points</p>
            <p style={{ fontSize: 32, fontWeight: 700, lineHeight: 1, letterSpacing: '-0.03em', color: 'var(--color-fg)' }}>
              {(profile?.xp ?? 0).toLocaleString()}
              <span style={{ fontSize: 16, fontWeight: 400, color: 'var(--color-tertiary)', marginLeft: 4 }}>XP</span>
            </p>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ textAlign: 'right' }}>
              <p className="label" style={{ marginBottom: 2 }}>Streak</p>
              <p style={{ fontSize: 17, fontWeight: 600, color: '#d97706' }}>🔥 {profile?.streak_days ?? 0}d</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p className="label" style={{ marginBottom: 2 }}>Level</p>
              <p style={{ fontSize: 17, fontWeight: 600, color: 'var(--accent)' }}>{level}</p>
            </div>
          </div>
        </div>
        {/* XP bar */}
        <div style={{ background: 'var(--bg)', borderRadius: 8, height: 8, overflow: 'hidden', boxShadow: 'var(--neu-inset-sm)' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: 'var(--accent)', borderRadius: 8, transition: 'width 0.6s ease' }} />
        </div>
        <p style={{ fontSize: 11, color: 'var(--color-tertiary)', marginTop: 8 }}>
          {progress} / {XP_PER_LEVEL} XP · {pct}% to Level {level + 1}
        </p>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 28 }}>
        {[
          { value: trees.length,           label: 'Trees' },
          { value: `${profile?.streak_days ?? 0}d`, label: 'Streak' },
          { value: `Lvl ${level}`,          label: 'Rank' },
        ].map(stat => (
          <div key={stat.label} className="card-sm" style={{ padding: '14px 12px', textAlign: 'center' }}>
            <p style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-fg)', lineHeight: 1 }}>{stat.value}</p>
            <p style={{ fontSize: 11, color: 'var(--color-tertiary)', marginTop: 4 }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Trees section header */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
        <div>
          <h2 className="section-title">Your trees</h2>
          <p className="section-subtitle">{trees.length} in your forest</p>
        </div>
        <Link to="/add-tree" style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', textDecoration: 'none' }}>
          + Plant new
        </Link>
      </div>

      {trees.length === 0 ? (
        <div className="card" style={{ padding: '40px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: 52, marginBottom: 12 }}>🌰</div>
          <p style={{ fontSize: 15, color: 'var(--color-secondary)', marginBottom: 20 }}>You haven't planted any trees yet.</p>
          <Link to="/add-tree" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block', width: 'auto', padding: '14px 28px' }}>
            Plant your first tree
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {trees.map(tree => (
            <Link key={tree.id} to={`/tree/${tree.id}`}
              style={{ textDecoration: 'none', display: 'block' }}>
              <div className="card-sm" style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14, transition: 'transform 0.15s' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                  background: 'var(--bg)', boxShadow: 'var(--neu-inset-sm)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
                }}>
                  {STAGE_EMOJI[tree.stage] ?? '🌱'}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-fg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {tree.name}
                  </p>
                  <p style={{ fontSize: 12, color: 'var(--color-tertiary)', marginTop: 2, textTransform: 'capitalize' }}>
                    {tree.stage} · {tree.planted_at ? new Date(tree.planted_at).toLocaleDateString() : 'Not planted yet'}
                  </p>
                </div>
                <span style={{ fontSize: 18, color: 'var(--border)', fontWeight: 300 }}>›</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

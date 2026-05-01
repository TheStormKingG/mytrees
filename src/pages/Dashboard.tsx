import { useEffect, useRef, useState } from 'react'
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

  // ── Remove tree ───────────────────────────────────────────────────────
  const [removeTarget,  setRemoveTarget]  = useState<Tree | null>(null)
  const [removeConfirm, setRemoveConfirm] = useState('')
  const [removeLoading, setRemoveLoading] = useState(false)
  const removeInputRef = useRef<HTMLInputElement>(null)
  const CONFIRM_PHRASE = 'remove this tree'

  const openRemove = (e: React.MouseEvent, tree: Tree) => {
    e.preventDefault(); e.stopPropagation()
    setRemoveTarget(tree); setRemoveConfirm('')
    setTimeout(() => removeInputRef.current?.focus(), 120)
  }

  const handleRemove = async () => {
    if (!removeTarget || removeConfirm.toLowerCase() !== CONFIRM_PHRASE) return
    setRemoveLoading(true)
    await supabase.from('trees').delete().eq('id', removeTarget.id)
    setTrees(ts => ts.filter(t => t.id !== removeTarget.id))
    setRemoveTarget(null); setRemoveConfirm(''); setRemoveLoading(false)
  }

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
            src="/mytrees/logo-icon.png"
            alt="groluv icon"
            style={{ width: 70, height: 70, flexShrink: 0 }}
          />
          <img
            src="/mytrees/logo-wordmark.png"
            alt="groluv"
            style={{ height: 42, width: 'auto' }}
          />
        </div>
        <p className="page-subtitle" style={{ marginTop: 8 }}>
          {profile?.username ? `Hey, ${profile.username} 👋` : 'Your personal forest tracker'}
        </p>
      </header>

      {/* XP card */}
      <div className="card" style={{ padding: '20px 20px 18px', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
          <div>
            <p className="label" style={{ marginBottom: 3 }}>Experience points</p>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 34, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.04em', color: 'var(--color-fg)' }}>
              {(profile?.xp ?? 0).toLocaleString()}
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 500, color: 'var(--color-tertiary)', marginLeft: 5 }}>XP</span>
            </p>
          </div>
          <div style={{ display: 'flex', gap: 14 }}>
            <div style={{ textAlign: 'right' }}>
              <p className="label" style={{ marginBottom: 3 }}>Streak</p>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, color: 'var(--xp)', letterSpacing: '-0.02em' }}>🔥 {profile?.streak_days ?? 0}d</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p className="label" style={{ marginBottom: 3 }}>Level</p>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, color: 'var(--accent)', letterSpacing: '-0.02em' }}>{level}</p>
            </div>
          </div>
        </div>
        {/* XP progress bar */}
        <div style={{ background: 'var(--bg)', borderRadius: 99, height: 7, overflow: 'hidden', boxShadow: 'var(--neu-inset-sm)', marginBottom: 8 }}>
          <div style={{
            height: '100%',
            width: `${pct}%`,
            background: 'linear-gradient(90deg, var(--accent) 0%, var(--accent-light) 100%)',
            borderRadius: 99,
            transition: 'width 0.7s cubic-bezier(0.34,1.56,0.64,1)',
          }} />
        </div>
        <p style={{ fontSize: 11, color: 'var(--color-tertiary)' }}>
          {progress.toLocaleString()} / {XP_PER_LEVEL.toLocaleString()} XP · {pct}% to Level {level + 1}
        </p>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 28 }}>
        {[
          { value: trees.length,                     label: 'Trees',  color: 'var(--color-fg)' },
          { value: `${profile?.streak_days ?? 0}d`,  label: 'Streak', color: 'var(--xp)'       },
          { value: `Lvl ${level}`,                   label: 'Rank',   color: 'var(--accent)'   },
        ].map(stat => (
          <div key={stat.label} className="card-sm" style={{ padding: '14px 12px', textAlign: 'center' }}>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 800, color: stat.color, lineHeight: 1, letterSpacing: '-0.03em' }}>{stat.value}</p>
            <p style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--color-tertiary)', marginTop: 5, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{stat.label}</p>
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
        <div className="card empty-state">
          <span className="empty-state-icon">🌰</span>
          <p className="empty-state-title">No trees yet</p>
          <p className="empty-state-body" style={{ marginBottom: 24 }}>Plant your first tree and start building your personal forest.</p>
          <Link to="/add-tree" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block', width: 'auto', padding: '14px 32px' }}>
            Plant your first tree
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {trees.map(tree => (
            <div key={tree.id} style={{ position: 'relative' }}>
              <Link to={`/tree/${tree.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                <div className="card-sm" style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14, paddingRight: 56 }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: 15, flexShrink: 0,
                    background: 'var(--bg)', boxShadow: 'var(--neu-inset-sm)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
                  }}>
                    {STAGE_EMOJI[tree.stage] ?? '🌱'}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: 'var(--color-fg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', letterSpacing: '-0.01em' }}>
                      {tree.name}
                    </p>
                    <p style={{ fontSize: 12, color: 'var(--color-tertiary)', marginTop: 3, textTransform: 'capitalize', letterSpacing: '0.01em' }}>
                      {tree.stage} · {tree.planted_at ? new Date(tree.planted_at).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Not planted yet'}
                    </p>
                  </div>
                </div>
              </Link>
              {/* Delete button — outside Link so it doesn't navigate */}
              <button
                onClick={e => openRemove(e, tree)}
                style={{
                  position: 'absolute', top: '50%', right: 14,
                  transform: 'translateY(-50%)',
                  width: 30, height: 30, borderRadius: 8, border: 'none',
                  background: 'var(--bg)', boxShadow: 'var(--neu-shadow-sm)',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, color: 'var(--color-tertiary)',
                  transition: 'color 0.15s, box-shadow 0.15s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#ef4444' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-tertiary)' }}
                title="Remove tree"
              >
                🗑
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ── Remove confirmation modal ────────────────────────────────────── */}
      {removeTarget && (
        <>
          <style>{`
            .remove-backdrop {
              position: fixed; inset: 0; z-index: 700;
              background: rgba(0,0,0,0.45); backdrop-filter: blur(4px);
              display: flex; align-items: center; justify-content: center;
              padding: 24px;
            }
            .remove-modal {
              width: 100%; max-width: 360px;
              background: var(--surface-solid);
              border-radius: 20px;
              padding: 28px 24px 24px;
              box-shadow: var(--neu-shadow-lg);
              animation: removeUp 0.25s cubic-bezier(0.4,0,0.2,1) forwards;
            }
            @keyframes removeUp {
              from { opacity: 0; transform: scale(0.94) translateY(8px); }
              to   { opacity: 1; transform: scale(1)    translateY(0);    }
            }
          `}</style>
          <div className="remove-backdrop" onClick={() => setRemoveTarget(null)}>
            <div className="remove-modal" onClick={e => e.stopPropagation()}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>🗑️</div>
              <p style={{ fontSize: 17, fontWeight: 700, color: 'var(--color-fg)', marginBottom: 6 }}>
                Remove "{removeTarget.name}"?
              </p>
              <p style={{ fontSize: 13, color: 'var(--color-secondary)', marginBottom: 18, lineHeight: 1.5 }}>
                This cannot be undone. Type <strong>remove this tree</strong> to confirm.
              </p>
              <input
                ref={removeInputRef}
                className="input"
                type="text"
                placeholder="remove this tree"
                value={removeConfirm}
                onChange={e => setRemoveConfirm(e.target.value)}
                style={{ marginBottom: 14 }}
              />
              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={() => { setRemoveTarget(null); setRemoveConfirm('') }}
                  style={{
                    flex: 1, padding: '13px 0', borderRadius: 12, border: 'none',
                    background: 'var(--bg)', boxShadow: 'var(--neu-shadow-sm)',
                    fontSize: 14, fontWeight: 600, color: 'var(--color-secondary)',
                    cursor: 'pointer', fontFamily: 'inherit',
                  }}>
                  Cancel
                </button>
                <button
                  onClick={handleRemove}
                  disabled={removeConfirm.toLowerCase() !== CONFIRM_PHRASE || removeLoading}
                  style={{
                    flex: 1, padding: '13px 0', borderRadius: 12, border: 'none',
                    background: removeConfirm.toLowerCase() === CONFIRM_PHRASE ? '#ef4444' : 'var(--bg)',
                    boxShadow: removeConfirm.toLowerCase() === CONFIRM_PHRASE ? '0 4px 14px rgba(239,68,68,0.35)' : 'var(--neu-shadow-sm)',
                    fontSize: 14, fontWeight: 700,
                    color: removeConfirm.toLowerCase() === CONFIRM_PHRASE ? '#fff' : 'var(--color-tertiary)',
                    cursor: removeConfirm.toLowerCase() === CONFIRM_PHRASE ? 'pointer' : 'not-allowed',
                    fontFamily: 'inherit', transition: 'all 0.2s',
                  }}>
                  {removeLoading ? 'Removing…' : 'Remove'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

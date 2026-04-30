import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { applyTheme, getStoredTheme } from '../lib/theme'
import type { Theme } from '../lib/theme'
import type { Database } from '../types/database'

type Profile = Database['public']['Tables']['profiles']['Row']

export default function ProfilePage() {
  const [profile,     setProfile]     = useState<Profile | null>(null)
  const [email,       setEmail]       = useState('')
  const [username,    setUsername]    = useState('')
  const [schoolGroup, setSchoolGroup] = useState('')
  const [saving,      setSaving]      = useState(false)
  const [message,     setMessage]     = useState('')
  const [theme,       setTheme]       = useState<Theme>(getStoredTheme)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      setEmail(user.email ?? '')
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (data) {
        setProfile(data)
        setUsername(data.username ?? '')
        setSchoolGroup(data.school_group ?? '')
      }
    }
    load()
  }, [])

  const save = async () => {
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('profiles').upsert({
      id: user.id,
      username: username || null,
      school_group: schoolGroup || null,
    })
    setMessage('Saved!'); setTimeout(() => setMessage(''), 2000); setSaving(false)
  }

  const signOut = async () => {
    await supabase.auth.signOut(); window.location.href = '/mytrees/'
  }

  return (
    <div>
      <header className="page-header">
        <p className="page-eyebrow">Account</p>
        <h1 className="page-title">Profile</h1>
      </header>

      {/* Avatar card */}
      <div className="card" style={{ padding: 20, marginBottom: 28, display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%', flexShrink: 0,
          background: 'var(--bg)', boxShadow: 'var(--neu-inset)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30,
        }}>🌳</div>
        <div>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 700, color: 'var(--color-fg)', lineHeight: 1.2, letterSpacing: '-0.03em' }}>
            {username || 'Forest keeper'}
          </p>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', marginTop: 4 }}>
            Level {profile?.level ?? 1} · {profile?.xp ?? 0} XP
          </p>
          <p style={{ fontSize: 12, color: 'var(--xp, #e89e00)', marginTop: 2 }}>
            🔥 {profile?.streak_days ?? 0} day streak
          </p>
        </div>
      </div>

      {/* ── Profile fields ──────────────────────────────────────────────── */}
      <div className="field">
        <label className="label">Display name</label>
        <input className="input" type="text" value={username}
          onChange={e => setUsername(e.target.value)} placeholder="Your forest keeper name" />
      </div>

      <div className="field">
        <label className="label">School / Youth Group / Organisation</label>
        <input className="input" type="text" value={schoolGroup}
          onChange={e => setSchoolGroup(e.target.value)} placeholder="e.g. Green High School, Scouts, WWF" />
      </div>

      {email && (
        <div className="field">
          <label className="label">Email</label>
          <input className="input" type="email" value={email} disabled
            style={{ opacity: 0.5, cursor: 'not-allowed' }} />
        </div>
      )}

      {message && (
        <p style={{ fontSize: 13, color: 'var(--accent)', marginBottom: 16, fontWeight: 600 }}>{message}</p>
      )}

      <button className="btn-primary" onClick={save} disabled={saving} style={{ marginBottom: 24 }}>
        {saving ? 'Saving…' : 'Save changes'}
      </button>

      {/* ── Settings ────────────────────────────────────────────────────── */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, color: 'var(--color-fg)', letterSpacing: '-0.03em', marginBottom: 14 }}>
          Appearance
        </p>
        <div className="card" style={{ padding: '18px 20px' }}>
          <p className="label" style={{ marginBottom: 14 }}>Theme</p>

          {/* Light option */}
          <button
            onClick={() => { setTheme('light'); applyTheme('light') }}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              width: '100%', border: 'none',
              cursor: 'pointer', padding: '12px 14px', borderRadius: 16,
              marginBottom: 8, fontFamily: 'inherit',
              boxShadow: theme === 'light' ? 'var(--neu-inset-sm)' : 'var(--neu-shadow-xs)',
              background: theme === 'light' ? 'var(--bg)' : 'var(--surface-solid)',
              transition: 'box-shadow 0.2s, background 0.2s',
            } as React.CSSProperties}
          >
            {/* Swatch */}
            <div style={{
              width: 40, height: 40, borderRadius: 12, flexShrink: 0,
              background: 'linear-gradient(135deg, #f4fbf4 0%, #e8f5e8 100%)',
              border: '2px solid ' + (theme === 'light' ? 'var(--accent)' : 'transparent'),
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              transition: 'border-color 0.2s',
            }} />
            <div style={{ flex: 1, textAlign: 'left' }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-fg)', margin: 0 }}>Light</p>
              <p style={{ fontSize: 11, color: 'var(--color-tertiary)', margin: '2px 0 0' }}>Near-white with a hint of green</p>
            </div>
            {theme === 'light' && (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            )}
          </button>

          {/* Dark option */}
          <button
            onClick={() => { setTheme('dark'); applyTheme('dark') }}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              width: '100%', border: 'none',
              cursor: 'pointer', padding: '12px 14px', borderRadius: 16,
              fontFamily: 'inherit',
              boxShadow: theme === 'dark' ? 'var(--neu-inset-sm)' : 'var(--neu-shadow-xs)',
              background: theme === 'dark' ? 'var(--bg)' : 'var(--surface-solid)',
              transition: 'box-shadow 0.2s, background 0.2s',
            } as React.CSSProperties}
          >
            {/* Swatch */}
            <div style={{
              width: 40, height: 40, borderRadius: 12, flexShrink: 0,
              background: 'linear-gradient(135deg, #e2ece2 0%, #c8dcc8 100%)',
              border: '2px solid ' + (theme === 'dark' ? 'var(--accent)' : 'transparent'),
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              transition: 'border-color 0.2s',
            }} />
            <div style={{ flex: 1, textAlign: 'left' }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-fg)', margin: 0 }}>Forest</p>
              <p style={{ fontSize: 11, color: 'var(--color-tertiary)', margin: '2px 0 0' }}>Sage green — default</p>
            </div>
            {theme === 'dark' && (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {email && (
        <button className="btn-ghost" onClick={signOut}>Sign out</button>
      )}
    </div>
  )
}

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Database } from '../types/database'

type Profile = Database['public']['Tables']['profiles']['Row']

export default function ProfilePage() {
  const [profile,     setProfile]     = useState<Profile | null>(null)
  const [email,       setEmail]       = useState('')
  const [username,    setUsername]    = useState('')
  const [schoolGroup, setSchoolGroup] = useState('')
  const [saving,      setSaving]      = useState(false)
  const [message,     setMessage]     = useState('')

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
        <h1 className="page-title">Profile 👤</h1>
      </header>

      {/* Avatar card */}
      <div className="card" style={{ padding: 20, marginBottom: 28, display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%', flexShrink: 0,
          background: 'var(--bg)', boxShadow: 'var(--neu-inset)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30,
        }}>🌳</div>
        <div>
          <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-fg)', lineHeight: 1.2 }}>
            {username || 'Forest keeper'}
          </p>
          <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent)', marginTop: 4 }}>
            Level {profile?.level ?? 1} · {profile?.xp ?? 0} XP
          </p>
          <p style={{ fontSize: 12, color: '#d97706', marginTop: 2 }}>
            🔥 {profile?.streak_days ?? 0} day streak
          </p>
        </div>
      </div>

      {/* Fields */}
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
        <p style={{ fontSize: 13, color: 'var(--accent)', marginBottom: 16, fontWeight: 500 }}>{message}</p>
      )}

      <button className="btn-primary" onClick={save} disabled={saving} style={{ marginBottom: 12 }}>
        {saving ? 'Saving…' : 'Save changes'}
      </button>

      {email && (
        <button className="btn-ghost" onClick={signOut}>Sign out</button>
      )}
    </div>
  )
}

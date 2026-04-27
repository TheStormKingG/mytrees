import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Database } from '../types/database'

type Profile = Database['public']['Tables']['profiles']['Row']

const inputStyle = { background: 'var(--bg)', color: 'var(--color-fg)', boxShadow: 'var(--neu-inset)', border: 'none' }
const inputCls = "w-full rounded-xl px-3.5 py-3 text-sm focus:outline-none"

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
      if (data) { setProfile(data); setUsername(data.username ?? ''); setSchoolGroup(data.school_group ?? '') }
    }
    load()
  }, [])

  const save = async () => {
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('profiles').upsert({ id: user.id, username: username || null, school_group: schoolGroup || null })
    setMessage('Saved!')
    setTimeout(() => setMessage(''), 2000)
    setSaving(false)
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/mytrees/'
  }

  return (
    <div>
      <header className="mb-6">
        <p className="label-cap mb-1">Account</p>
        <h1 className="section-title text-[28px] leading-[34px]">Profile 👤</h1>
      </header>

      {/* Avatar card */}
      <div className="card p-5 mb-6 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl flex-shrink-0"
          style={{ background: 'var(--bg)', boxShadow: 'var(--neu-inset)' }}>
          🌳
        </div>
        <div>
          <div className="font-bold text-lg" style={{ color: 'var(--color-fg)' }}>
            {username || 'Forest keeper'}
          </div>
          <div className="text-sm font-semibold mt-0.5" style={{ color: 'var(--accent)' }}>
            Level {profile?.level ?? 1} · {profile?.xp ?? 0} XP
          </div>
          <div className="text-xs mt-0.5 font-medium" style={{ color: '#d97706' }}>
            🔥 {profile?.streak_days ?? 0} day streak
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="card p-4">
          <label className="label-cap">Display name</label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)}
            placeholder="Your forest keeper name" className={inputCls} style={inputStyle} />
        </div>

        <div className="card p-4">
          <label className="label-cap">School / youth group</label>
          <input type="text" value={schoolGroup} onChange={e => setSchoolGroup(e.target.value)}
            placeholder="e.g. Green High School" className={inputCls} style={inputStyle} />
        </div>

        {email && (
          <div className="card p-4">
            <label className="label-cap">Email</label>
            <input type="email" value={email} disabled
              className="w-full rounded-xl px-3.5 py-3 text-sm opacity-50 cursor-not-allowed outline-none"
              style={{ background: 'var(--bg)', color: 'var(--color-tertiary)', boxShadow: 'var(--neu-inset-sm)', border: 'none' }} />
          </div>
        )}

        {message && <p className="text-xs font-medium px-1" style={{ color: 'var(--accent)' }}>{message}</p>}

        <button onClick={save} disabled={saving}
          className="w-full text-white font-semibold py-4 rounded-2xl transition-all active:scale-[0.98] disabled:opacity-50"
          style={{ background: 'var(--accent)', boxShadow: '0 4px 16px rgba(58,184,122,0.30)', fontSize: 15 }}>
          {saving ? 'Saving…' : 'Save changes'}
        </button>

        {email && (
          <button onClick={signOut}
            className="w-full font-semibold py-4 rounded-2xl transition-all active:scale-[0.98] text-sm"
            style={{ background: 'var(--surface)', boxShadow: 'var(--neu-shadow-sm)', border: '1px solid var(--border-glass)', color: 'var(--color-secondary)' }}>
            Sign out
          </button>
        )}
      </div>
    </div>
  )
}

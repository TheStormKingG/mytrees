import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Database } from '../types/database'

type Profile = Database['public']['Tables']['profiles']['Row']

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [schoolGroup, setSchoolGroup] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

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
    setMessage('Saved!')
    setTimeout(() => setMessage(''), 2000)
    setSaving(false)
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/mytrees/'
  }

  const inputCls = "w-full rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none neu-pressed-sm"

  return (
    <div className="px-4 pt-6 pb-4" style={{ background: 'var(--neu-base)' }}>
      <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-6">Profile 👤</h1>

      {/* Avatar card */}
      <div className="neu-raised rounded-2xl p-5 mb-6 flex items-center gap-4" style={{ background: 'var(--neu-base)' }}>
        <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl neu-pressed flex-shrink-0"
          style={{ background: 'var(--neu-base)' }}>
          🌳
        </div>
        <div>
          <div className="text-slate-800 font-bold text-lg">{username || 'Forest keeper'}</div>
          <div className="text-emerald-600 text-sm font-semibold">Level {profile?.level ?? 1} · {profile?.xp ?? 0} XP</div>
          <div className="text-amber-500 text-xs mt-0.5 font-medium">🔥 {profile?.streak_days ?? 0} day streak</div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">Display name</label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)}
            placeholder="Your forest keeper name"
            className={inputCls} style={{ background: 'var(--neu-base)' }} />
        </div>
        <div>
          <label className="block text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">School / youth group</label>
          <input type="text" value={schoolGroup} onChange={e => setSchoolGroup(e.target.value)}
            placeholder="e.g. Green High School"
            className={inputCls} style={{ background: 'var(--neu-base)' }} />
        </div>
        <div>
          <label className="block text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">Email</label>
          <input type="email" value={email} disabled
            className="w-full rounded-xl px-4 py-3 text-sm text-slate-400 neu-pressed-sm opacity-60 cursor-not-allowed outline-none"
            style={{ background: 'var(--neu-base)' }} />
        </div>

        {message && <p className="text-emerald-600 text-xs font-medium">{message}</p>}

        <button onClick={save} disabled={saving}
          className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl transition-all neu-raised-sm text-sm">
          {saving ? 'Saving…' : 'Save changes'}
        </button>

        <button onClick={signOut}
          className="w-full neu-raised-sm text-slate-500 hover:text-slate-700 font-semibold py-3.5 rounded-xl transition-all text-sm"
          style={{ background: 'var(--neu-base)' }}>
          Sign out
        </button>
      </div>
    </div>
  )
}

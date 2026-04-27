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

  return (
    <div className="px-4 pt-6 pb-4">
      <h1 className="text-xl font-bold text-emerald-400 mb-6">Profile 👤</h1>

      {/* Avatar / level badge */}
      <div className="flex items-center gap-4 bg-stone-900 border border-stone-700 rounded-2xl p-4 mb-6">
        <div className="w-16 h-16 bg-emerald-900 rounded-full flex items-center justify-center text-3xl border-2 border-emerald-600">
          🌳
        </div>
        <div>
          <div className="text-stone-100 font-semibold">{username || 'Forest keeper'}</div>
          <div className="text-emerald-400 text-sm">Level {profile?.level ?? 1} · {profile?.xp ?? 0} XP</div>
          <div className="text-orange-400 text-xs mt-0.5">🔥 {profile?.streak_days ?? 0} day streak</div>
        </div>
      </div>

      {/* Edit form */}
      <div className="space-y-4">
        <div>
          <label className="block text-stone-400 text-xs mb-1.5">Display name</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Your forest keeper name"
            className="w-full bg-stone-900 border border-stone-700 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-stone-100 placeholder-stone-600 outline-none"
          />
        </div>

        <div>
          <label className="block text-stone-400 text-xs mb-1.5">School / youth group</label>
          <input
            type="text"
            value={schoolGroup}
            onChange={e => setSchoolGroup(e.target.value)}
            placeholder="e.g. Green High School"
            className="w-full bg-stone-900 border border-stone-700 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-stone-100 placeholder-stone-600 outline-none"
          />
        </div>

        <div>
          <label className="block text-stone-400 text-xs mb-1.5">Email</label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full bg-stone-800/50 border border-stone-800 rounded-xl px-4 py-3 text-sm text-stone-500 outline-none cursor-not-allowed"
          />
        </div>

        {message && <p className="text-emerald-400 text-xs">{message}</p>}

        <button
          onClick={save}
          disabled={saving}
          className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
        >
          {saving ? 'Saving...' : 'Save changes'}
        </button>

        <button
          onClick={signOut}
          className="w-full bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold py-3 rounded-xl transition-colors text-sm"
        >
          Sign out
        </button>
      </div>
    </div>
  )
}

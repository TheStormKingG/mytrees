import { useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabase'
import { applyTheme, getStoredTheme } from '../lib/theme'
import type { Theme } from '../lib/theme'
import type { Database } from '../types/database'

type Profile = Database['public']['Tables']['profiles']['Row']

// ── 50 endangered animal avatars ─────────────────────────────────────────────
const ENDANGERED_AVATARS: { emoji: string; name: string; status: string }[] = [
  { emoji: '🐆', name: 'Jaguar',              status: 'NT'  },
  { emoji: '🐅', name: 'Sumatran Tiger',       status: 'CR'  },
  { emoji: '🦍', name: 'Mountain Gorilla',     status: 'EN'  },
  { emoji: '🐼', name: 'Giant Panda',          status: 'VU'  },
  { emoji: '🦧', name: 'Bornean Orangutan',    status: 'CR'  },
  { emoji: '🐘', name: 'African Forest Elephant', status: 'CR' },
  { emoji: '🦏', name: 'Black Rhinoceros',     status: 'CR'  },
  { emoji: '🦛', name: 'Pygmy Hippo',          status: 'EN'  },
  { emoji: '🐋', name: 'Blue Whale',           status: 'EN'  },
  { emoji: '🦭', name: 'Mediterranean Monk Seal', status: 'EN' },
  { emoji: '🐻‍❄️', name: 'Polar Bear',         status: 'VU'  },
  { emoji: '🦁', name: 'African Lion',         status: 'VU'  },
  { emoji: '🐢', name: 'Leatherback Sea Turtle', status: 'VU' },
  { emoji: '🦅', name: 'Philippine Eagle',     status: 'CR'  },
  { emoji: '🦜', name: 'Kakapo',               status: 'CR'  },
  { emoji: '🦒', name: 'Giraffe',              status: 'VU'  },
  { emoji: '🦓', name: 'Grevy\'s Zebra',       status: 'EN'  },
  { emoji: '🐊', name: 'Gharial',              status: 'CR'  },
  { emoji: '🦦', name: 'Sea Otter',            status: 'EN'  },
  { emoji: '🐬', name: 'Maui Dolphin',         status: 'CR'  },
  { emoji: '🦈', name: 'Whale Shark',          status: 'EN'  },
  { emoji: '🦤', name: 'Dodo (historic)',       status: 'EX'  },
  { emoji: '🐒', name: 'Drill Monkey',         status: 'EN'  },
  { emoji: '🦩', name: 'Roseate Spoonbill',    status: 'NT'  },
  { emoji: '🦚', name: 'Green Peafowl',        status: 'EN'  },
  { emoji: '🦢', name: 'Whooping Crane',       status: 'EN'  },
  { emoji: '🦫', name: 'Giant Otter',          status: 'EN'  },
  { emoji: '🐺', name: 'Ethiopian Wolf',       status: 'EN'  },
  { emoji: '🐎', name: 'Przewalski\'s Horse',  status: 'EN'  },
  { emoji: '🦬', name: 'Wood Bison',           status: 'NT'  },
  { emoji: '🐈', name: 'Iberian Lynx',         status: 'EN'  },
  { emoji: '🦥', name: 'Pygmy Three-toed Sloth', status: 'CR' },
  { emoji: '🦔', name: 'Amur Hedgehog',        status: 'NT'  },
  { emoji: '🦎', name: 'Komodo Dragon',        status: 'EN'  },
  { emoji: '🐸', name: 'Panamanian Golden Frog', status: 'CR' },
  { emoji: '🦋', name: 'Monarch Butterfly',    status: 'EN'  },
  { emoji: '🐝', name: 'Rusty-Patched Bumblebee', status: 'CR' },
  { emoji: '🦀', name: 'Horseshoe Crab',       status: 'VU'  },
  { emoji: '🐇', name: 'Riverine Rabbit',      status: 'CR'  },
  { emoji: '🦌', name: 'Bactrian Camel',       status: 'CR'  },
  { emoji: '🐂', name: 'Kouprey',              status: 'CR'  },
  { emoji: '🐓', name: 'Philippine Cockatoo',  status: 'VU'  },
  { emoji: '🦦', name: 'Hairy-nosed Wombat',   status: 'CR'  },
  { emoji: '🐐', name: 'Nubian Ibex',          status: 'VU'  },
  { emoji: '🦙', name: 'Vicuña',               status: 'LC'  },
  { emoji: '🦟', name: 'Blue Morpho Butterfly', status: 'NT' },
  { emoji: '🐡', name: 'Bumphead Parrotfish',  status: 'VU'  },
  { emoji: '🦭', name: 'Hawaiian Monk Seal',   status: 'EN'  },
  { emoji: '🐓', name: 'California Condor',    status: 'CR'  },
  { emoji: '🦘', name: 'Quokka',               status: 'VU'  },
]

const STATUS_COLOR: Record<string, string> = {
  CR: '#dc2626', EN: '#ea580c', VU: '#d97706', NT: '#65a30d', EX: '#6b7280', LC: '#16a34a',
}

// ── Upload avatar to Supabase Storage ─────────────────────────────────────────
async function uploadAvatarFile(userId: string, file: File): Promise<string | null> {
  const ext  = file.name.split('.').pop() ?? 'jpg'
  const path = `avatars/${userId}.${ext}`
  const { error } = await supabase.storage
    .from('avatars')
    .upload(path, file, { upsert: true, contentType: file.type })
  if (error) { console.error('Upload error:', error); return null }
  const { data } = supabase.storage.from('avatars').getPublicUrl(path)
  return data.publicUrl + `?t=${Date.now()}`
}

// ── Save avatar_url to profiles table ─────────────────────────────────────────
async function saveAvatarUrl(userId: string, url: string): Promise<void> {
  await supabase.from('profiles').upsert({ id: userId, avatar_url: url })
}

// ── Avatar editor sheet ────────────────────────────────────────────────────────
type AvatarTab = 'choose' | 'upload' | 'camera'

function AvatarEditor({
  userId, currentUrl, onSaved, onClose,
}: {
  userId: string
  currentUrl: string | null
  onSaved: (url: string) => void
  onClose: () => void
}) {
  const [tab,       setTab]       = useState<AvatarTab>('choose')
  const [saving,    setSaving]    = useState(false)
  const [cameraErr, setCameraErr] = useState('')
  const fileRef   = useRef<HTMLInputElement>(null)
  const videoRef  = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Start/stop camera
  useEffect(() => {
    if (tab === 'camera') {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
        .then(stream => {
          streamRef.current = stream
          if (videoRef.current) videoRef.current.srcObject = stream
        })
        .catch(() => setCameraErr('Camera access denied — please allow camera permission.'))
    } else {
      streamRef.current?.getTracks().forEach(t => t.stop())
      streamRef.current = null
    }
    return () => { streamRef.current?.getTracks().forEach(t => t.stop()) }
  }, [tab])

  const handleFile = async (file: File) => {
    setSaving(true)
    const url = await uploadAvatarFile(userId, file)
    if (url) { await saveAvatarUrl(userId, url); onSaved(url) }
    setSaving(false)
  }

  const snapPhoto = async () => {
    if (!videoRef.current) return
    const canvas = document.createElement('canvas')
    canvas.width  = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    canvas.getContext('2d')!.drawImage(videoRef.current, 0, 0)
    canvas.toBlob(async blob => {
      if (!blob) return
      await handleFile(new File([blob], 'selfie.jpg', { type: 'image/jpeg' }))
    }, 'image/jpeg', 0.9)
  }

  const pickEmoji = async (emoji: string) => {
    // Render emoji onto canvas → save as PNG blob
    setSaving(true)
    const size   = 256
    const canvas = document.createElement('canvas')
    canvas.width  = size
    canvas.height = size
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = 'var(--bg, #e2ece2)'
    ctx.beginPath(); ctx.arc(size/2, size/2, size/2, 0, Math.PI * 2); ctx.fill()
    ctx.font      = `${size * 0.65}px serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(emoji, size / 2, size / 2 + size * 0.04)
    canvas.toBlob(async blob => {
      if (!blob) { setSaving(false); return }
      const url = await uploadAvatarFile(userId, new File([blob], 'avatar.png', { type: 'image/png' }))
      if (url) { await saveAvatarUrl(userId, url); onSaved(url) }
      setSaving(false)
    }, 'image/png')
  }

  const tabs: { id: AvatarTab; label: string; icon: string }[] = [
    { id: 'choose', label: 'Animals', icon: '🐾' },
    { id: 'upload', label: 'Upload',  icon: '📁' },
    { id: 'camera', label: 'Selfie',  icon: '📸' },
  ]

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
    }} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{
        width: '100%', maxWidth: 480, background: 'var(--surface-solid)',
        borderRadius: '24px 24px 0 0', padding: '20px 0 32px',
        boxShadow: '0 -8px 40px rgba(0,0,0,0.22)',
        maxHeight: '88vh', display: 'flex', flexDirection: 'column',
      }}>
        {/* Handle */}
        <div style={{ width: 40, height: 4, borderRadius: 2, background: 'rgba(163,177,198,0.5)', margin: '0 auto 16px' }} />

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', marginBottom: 16 }}>
          <p style={{ fontSize: 17, fontWeight: 700, color: 'var(--color-fg)', margin: 0 }}>Change profile photo</p>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: 'var(--color-tertiary)', lineHeight: 1 }}>×</button>
        </div>

        {/* Tab bar */}
        <div style={{ display: 'flex', gap: 8, padding: '0 20px', marginBottom: 16 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              flex: 1, padding: '9px 0', borderRadius: 12, border: 'none', cursor: 'pointer',
              fontFamily: 'inherit', fontSize: 12, fontWeight: 700,
              background: tab === t.id ? 'var(--accent)' : 'var(--bg)',
              color: tab === t.id ? '#fff' : 'var(--color-secondary)',
              boxShadow: tab === t.id ? 'none' : 'var(--neu-shadow-xs)',
              transition: 'all 0.15s',
            }}>{t.icon} {t.label}</button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px' }}>
          {/* ── CHOOSE ANIMAL ── */}
          {tab === 'choose' && (
            <div>
              <p style={{ fontSize: 12, color: 'var(--color-tertiary)', marginBottom: 12 }}>
                50 endangered species — each pick supports awareness 🌿
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
                {ENDANGERED_AVATARS.map(av => (
                  <button key={av.name} onClick={() => pickEmoji(av.emoji)} disabled={saving}
                    title={`${av.name} (${av.status})`}
                    style={{
                      background: 'var(--bg)', border: '1px solid rgba(163,177,198,0.2)',
                      borderRadius: 14, padding: '8px 0', cursor: 'pointer',
                      boxShadow: 'var(--neu-shadow-xs)', transition: 'transform 0.1s',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                    }}
                    onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.92)')}
                    onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <span style={{ fontSize: 28, lineHeight: 1.1 }}>{av.emoji}</span>
                    <span style={{
                      fontSize: 7.5, fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase',
                      color: STATUS_COLOR[av.status] ?? '#888',
                    }}>{av.status}</span>
                  </button>
                ))}
              </div>
              {saving && (
                <p style={{ textAlign: 'center', color: 'var(--accent)', fontSize: 13, marginTop: 12 }}>Saving…</p>
              )}
            </div>
          )}

          {/* ── UPLOAD ── */}
          {tab === 'upload' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, paddingTop: 20 }}>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }}
                onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />
              <div style={{
                width: 100, height: 100, borderRadius: '50%', background: 'var(--bg)',
                boxShadow: 'var(--neu-inset)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40,
              }}>📁</div>
              <p style={{ fontSize: 14, color: 'var(--color-secondary)', textAlign: 'center', margin: 0 }}>
                Choose a photo from your device
              </p>
              <button className="btn-primary" onClick={() => fileRef.current?.click()} disabled={saving}
                style={{ width: '100%', maxWidth: 240 }}>
                {saving ? 'Uploading…' : 'Choose photo'}
              </button>
            </div>
          )}

          {/* ── CAMERA ── */}
          {tab === 'camera' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
              {cameraErr ? (
                <p style={{ color: '#dc2626', fontSize: 13, textAlign: 'center', marginTop: 20 }}>{cameraErr}</p>
              ) : (
                <>
                  <video ref={videoRef} autoPlay playsInline muted
                    style={{ width: '100%', maxWidth: 320, borderRadius: 18, background: '#000', boxShadow: 'var(--neu-shadow)' }} />
                  <button className="btn-primary" onClick={snapPhoto} disabled={saving}
                    style={{ width: '100%', maxWidth: 240 }}>
                    {saving ? 'Saving…' : '📸 Take selfie'}
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Main profile page ─────────────────────────────────────────────────────────
export default function ProfilePage() {
  const [profile,      setProfile]      = useState<Profile | null>(null)
  const [email,        setEmail]        = useState('')
  const [username,     setUsername]     = useState('')
  const [schoolGroup,  setSchoolGroup]  = useState('')
  const [avatarUrl,    setAvatarUrl]    = useState<string | null>(null)
  const [userId,       setUserId]       = useState<string | null>(null)
  const [saving,       setSaving]       = useState(false)
  const [message,      setMessage]      = useState('')
  const [theme,        setTheme]        = useState<Theme>(getStoredTheme)
  const [showEditor,   setShowEditor]   = useState(false)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      setEmail(user.email ?? '')
      setUserId(user.id)
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (data) {
        setProfile(data)
        setUsername(data.username ?? '')
        setSchoolGroup(data.school_group ?? '')
        // Use stored avatar_url, or fall back to Google/OAuth provider photo
        setAvatarUrl(
          data.avatar_url ||
          (user.user_metadata?.avatar_url as string | undefined) ||
          (user.user_metadata?.picture    as string | undefined) ||
          null
        )
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
      username:     username     || null,
      school_group: schoolGroup  || null,
      avatar_url:   avatarUrl    || null,
    })
    setMessage('Saved!'); setTimeout(() => setMessage(''), 2000); setSaving(false)
  }

  const signOut = async () => {
    await supabase.auth.signOut(); window.location.href = '/mytrees/'
  }

  const initials = (username || email || '?').charAt(0).toUpperCase()

  return (
    <div>
      <header className="page-header">
        <p className="page-eyebrow">Account</p>
        <h1 className="page-title">Profile</h1>
      </header>

      {/* ── Large avatar hero ────────────────────────────────────────────── */}
      <div className="card" style={{ padding: '28px 20px 20px', marginBottom: 24, textAlign: 'center' }}>
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: 16 }}>
          {avatarUrl ? (
            <img src={avatarUrl} alt="profile"
              style={{
                width: 96, height: 96, borderRadius: '50%', objectFit: 'cover',
                border: '3px solid var(--accent)', boxShadow: 'var(--neu-shadow)',
              }} />
          ) : (
            <div style={{
              width: 96, height: 96, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent-light) 0%, var(--accent) 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 38, fontWeight: 700, color: '#fff',
              border: '3px solid var(--accent)', boxShadow: 'var(--neu-shadow)',
            }}>{initials}</div>
          )}
          {/* Edit button */}
          <button onClick={() => setShowEditor(true)}
            style={{
              position: 'absolute', bottom: -2, right: -2,
              width: 30, height: 30, borderRadius: '50%', border: 'none',
              background: 'var(--accent)', color: '#fff', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
            }}>✏️</button>
        </div>

        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 700, color: 'var(--color-fg)', lineHeight: 1.2, letterSpacing: '-0.03em', margin: '0 0 4px' }}>
          {username || 'Forest keeper'}
        </p>
        {schoolGroup && (
          <p style={{ fontSize: 13, color: 'var(--color-tertiary)', fontStyle: 'italic', margin: '0 0 6px' }}>
            {schoolGroup}
          </p>
        )}
        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', margin: '0 0 2px' }}>
          Level {profile?.level ?? 1} · {(profile?.xp ?? 0).toLocaleString()} XP
        </p>
        <p style={{ fontSize: 12, color: 'var(--xp, #e89e00)', margin: 0 }}>
          🔥 {profile?.streak_days ?? 0} day streak
        </p>
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

      {/* ── Appearance ──────────────────────────────────────────────────── */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, color: 'var(--color-fg)', letterSpacing: '-0.03em', marginBottom: 14 }}>
          Appearance
        </p>
        <div className="card" style={{ padding: '18px 20px' }}>
          <p className="label" style={{ marginBottom: 14 }}>Theme</p>

          {/* Sage Green */}
          <button onClick={() => { setTheme('light'); applyTheme('light') }} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            width: '100%', border: 'none', cursor: 'pointer', padding: '12px 14px', borderRadius: 16,
            marginBottom: 8, fontFamily: 'inherit',
            boxShadow: theme === 'light' ? 'var(--neu-inset-sm)' : 'var(--neu-shadow-xs)',
            background: theme === 'light' ? 'var(--bg)' : 'var(--surface-solid)',
            transition: 'box-shadow 0.2s, background 0.2s',
          } as React.CSSProperties}>
            <div style={{
              width: 40, height: 40, borderRadius: 12, flexShrink: 0,
              background: 'linear-gradient(135deg, #eaf3ea 0%, #d4e4d4 100%)',
              border: '2px solid ' + (theme === 'light' ? 'var(--accent)' : 'transparent'),
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)', transition: 'border-color 0.2s',
            }} />
            <div style={{ flex: 1, textAlign: 'left' }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-fg)', margin: 0 }}>Sage Green</p>
              <p style={{ fontSize: 11, color: 'var(--color-tertiary)', margin: '2px 0 0' }}>Soft sage — default</p>
            </div>
            {theme === 'light' && (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            )}
          </button>

          {/* Deep Forest */}
          <button onClick={() => { setTheme('dark'); applyTheme('dark') }} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            width: '100%', border: 'none', cursor: 'pointer', padding: '12px 14px', borderRadius: 16,
            fontFamily: 'inherit',
            boxShadow: theme === 'dark' ? 'var(--neu-inset-sm)' : 'var(--neu-shadow-xs)',
            background: theme === 'dark' ? 'var(--bg)' : 'var(--surface-solid)',
            transition: 'box-shadow 0.2s, background 0.2s',
          } as React.CSSProperties}>
            <div style={{
              width: 40, height: 40, borderRadius: 12, flexShrink: 0,
              background: 'linear-gradient(135deg, #1e3820 0%, #0f1c0f 100%)',
              border: '2px solid ' + (theme === 'dark' ? '#3ed87a' : 'transparent'),
              boxShadow: '0 2px 8px rgba(0,0,0,0.20)', transition: 'border-color 0.2s',
            }} />
            <div style={{ flex: 1, textAlign: 'left' }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-fg)', margin: 0 }}>Deep Forest</p>
              <p style={{ fontSize: 11, color: 'var(--color-tertiary)', margin: '2px 0 0' }}>Rich dark green — night mode</p>
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

      {/* ── Avatar editor sheet ──────────────────────────────────────────── */}
      {showEditor && userId && (
        <AvatarEditor
          userId={userId}
          currentUrl={avatarUrl}
          onSaved={url => { setAvatarUrl(url); setShowEditor(false) }}
          onClose={() => setShowEditor(false)}
        />
      )}
    </div>
  )
}

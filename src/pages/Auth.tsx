import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

declare const google: {
  accounts: {
    id: {
      initialize: (cfg: object) => void
      renderButton: (el: HTMLElement, opts: object) => void
    }
  }
}

const GOOGLE_CLIENT_ID = '421417281434-druc31nk2guo1t0oomt8g44d886m9m1k.apps.googleusercontent.com'

export default function Auth() {
  const navigate     = useNavigate()
  const googleBtnRef = useRef<HTMLDivElement>(null)
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState<string | null>(null)
  const [message,  setMessage]  = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate('/dashboard', { replace: true })
    })
  }, [navigate])

  useEffect(() => {
    const initGoogle = () => {
      if (typeof google === 'undefined' || !googleBtnRef.current) return
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async (response: { credential: string }) => {
          setLoading(true); setError(null)
          const { error } = await supabase.auth.signInWithIdToken({
            provider: 'google', token: response.credential,
          })
          if (error) { setError(error.message); setLoading(false) }
          else navigate('/dashboard', { replace: true })
        },
      })
      google.accounts.id.renderButton(googleBtnRef.current, {
        theme: 'filled_black',
        size: 'large',
        width: (googleBtnRef.current.offsetWidth || 320),
        text: isSignUp ? 'signup_with' : 'continue_with',
        shape: 'pill',
      })
    }
    if (typeof google !== 'undefined') initGoogle()
    else {
      const s = document.querySelector('script[src*="accounts.google.com/gsi/client"]')
      if (s) { s.addEventListener('load', initGoogle); return () => s.removeEventListener('load', initGoogle) }
    }
  }, [navigate, isSignUp])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError(null); setMessage(null)
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setError(error.message)
      else setMessage('Check your email to confirm your account!')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
      else navigate('/dashboard', { replace: true })
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>

      {/* ── Illustration hero ─────────────────────────────────────────── */}
      <div style={{
        position: 'relative',
        height: '44vh', minHeight: 240,
        background: 'linear-gradient(175deg, #0c2d5c 0%, #0a3d2a 55%, #0c4a1e 100%)',
        overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Soft glow orbs */}
        <div style={{
          position: 'absolute', top: -60, left: -60, width: 260, height: 260,
          borderRadius: '50%', background: 'rgba(56,189,248,0.12)', filter: 'blur(50px)',
        }} />
        <div style={{
          position: 'absolute', bottom: -40, right: -40, width: 220, height: 220,
          borderRadius: '50%', background: 'rgba(58,184,122,0.18)', filter: 'blur(50px)',
        }} />
        <div style={{
          position: 'absolute', top: 40, right: '15%', width: 120, height: 120,
          borderRadius: '50%', background: 'rgba(250,204,21,0.08)', filter: 'blur(30px)',
        }} />

        {/* Stars / sparkles */}
        {['10%','78%','45%','88%','22%'].map((left, i) => (
          <div key={i} style={{
            position: 'absolute', top: `${12 + i * 14}%`, left,
            width: i % 2 === 0 ? 3 : 2, height: i % 2 === 0 ? 3 : 2,
            borderRadius: '50%', background: 'rgba(255,255,255,0.6)',
            animation: `twinkle ${2 + i * 0.4}s ease-in-out infinite`,
          }} />
        ))}

        {/* Floating leaves */}
        <span style={{
          position: 'absolute', top: '18%', left: '12%', fontSize: 28, opacity: 0.7,
          animation: 'floatBob 4.2s ease-in-out infinite',
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
        }}>🍃</span>
        <span style={{
          position: 'absolute', top: '28%', right: '14%', fontSize: 22, opacity: 0.6,
          animation: 'floatBob 5s ease-in-out infinite reverse',
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
        }}>🌿</span>
        <span style={{
          position: 'absolute', bottom: '22%', left: '8%', fontSize: 18, opacity: 0.5,
          animation: 'floatBob 3.8s ease-in-out infinite 1s',
        }}>🌱</span>
        <span style={{
          position: 'absolute', top: '14%', right: '30%', fontSize: 16, opacity: 0.5,
          animation: 'floatBob 6s ease-in-out infinite 0.5s',
        }}>✨</span>

        {/* Main forest scene */}
        <div style={{
          position: 'absolute', bottom: -4, left: 0, right: 0,
          display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
          gap: 0, padding: '0 12px',
        }}>
          <span style={{ fontSize: 52, opacity: 0.55, marginBottom: -4, marginRight: -12, filter: 'drop-shadow(0 -4px 12px rgba(58,184,122,0.3))' }}>🌿</span>
          <span style={{ fontSize: 64, opacity: 0.65, marginBottom: -2, filter: 'drop-shadow(0 -6px 16px rgba(58,184,122,0.25))' }}>🌲</span>
          <span style={{ fontSize: 96, filter: 'drop-shadow(0 0 32px rgba(58,184,122,0.5)) drop-shadow(0 -8px 24px rgba(58,184,122,0.3))', animation: 'floatBob 4s ease-in-out infinite' }}>🌳</span>
          <span style={{ fontSize: 72, opacity: 0.65, marginBottom: -2, filter: 'drop-shadow(0 -6px 16px rgba(58,184,122,0.25))' }}>🌲</span>
          <span style={{ fontSize: 46, opacity: 0.55, marginBottom: -4, marginLeft: -10, filter: 'drop-shadow(0 -4px 12px rgba(58,184,122,0.3))' }}>🌿</span>
        </div>

        {/* Ground mist */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 48,
          background: 'linear-gradient(0deg, rgba(10,30,20,0.9) 0%, transparent 100%)',
        }} />
      </div>

      {/* ── Form panel ───────────────────────────────────────────────── */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(180deg, #0a1e14 0%, #07111e 100%)',
        padding: '28px 24px 40px',
        display: 'flex', flexDirection: 'column',
      }}>

        {/* Heading */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#ffffff', letterSpacing: -0.5, marginBottom: 4 }}>
            {isSignUp ? 'Join MyTrees 🌱' : 'Welcome back 🌳'}
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', fontWeight: 400 }}>
            {isSignUp ? 'Start your personal forest today' : 'Sign in to your forest'}
          </p>
        </div>

        {/* Google Sign-In */}
        <div ref={googleBtnRef} style={{ width: '100%', marginBottom: 20, minHeight: 48 }} />

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontWeight: 500, letterSpacing: 0.5 }}>
            or use email
          </span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
        </div>

        {/* Email / password form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

          {/* Email input */}
          <div style={{ position: 'relative' }}>
            <span style={{
              position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
              fontSize: 16, pointerEvents: 'none',
            }}>📧</span>
            <input
              type="email" placeholder="Email address"
              value={email} onChange={e => setEmail(e.target.value)} required
              style={{
                width: '100%', padding: '15px 16px 15px 46px',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 14, fontSize: 14,
                color: '#ffffff', outline: 'none',
                boxSizing: 'border-box',
                backdropFilter: 'blur(8px)',
                transition: 'border-color 0.2s, background 0.2s',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = 'rgba(58,184,122,0.6)'; e.currentTarget.style.background = 'rgba(255,255,255,0.11)' }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
            />
          </div>

          {/* Password input */}
          <div style={{ position: 'relative' }}>
            <span style={{
              position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
              fontSize: 16, pointerEvents: 'none',
            }}>🔒</span>
            <input
              type="password" placeholder="Password"
              value={password} onChange={e => setPassword(e.target.value)} required
              style={{
                width: '100%', padding: '15px 16px 15px 46px',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 14, fontSize: 14,
                color: '#ffffff', outline: 'none',
                boxSizing: 'border-box',
                backdropFilter: 'blur(8px)',
                transition: 'border-color 0.2s, background 0.2s',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = 'rgba(58,184,122,0.6)'; e.currentTarget.style.background = 'rgba(255,255,255,0.11)' }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
            />
          </div>

          {error   && <p style={{ fontSize: 12, color: '#f87171', margin: '2px 0' }}>{error}</p>}
          {message && <p style={{ fontSize: 12, color: '#4ade80', margin: '2px 0' }}>{message}</p>}

          {/* Submit */}
          <button
            type="submit" disabled={loading}
            style={{
              width: '100%', padding: '16px',
              background: loading ? 'rgba(58,184,122,0.5)' : 'linear-gradient(135deg, #3ab87a 0%, #22a36a 100%)',
              border: 'none', borderRadius: 14, cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: 15, fontWeight: 700, color: '#fff', letterSpacing: 0.3,
              marginTop: 4,
              boxShadow: loading ? 'none' : '0 8px 24px rgba(58,184,122,0.35)',
              transition: 'all 0.2s',
            }}
          >
            {loading ? '…' : isSignUp ? 'Plant your first seed 🌱' : 'Sign in'}
          </button>
        </form>

        {/* Toggle sign up / sign in */}
        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
          </span>
          <button
            onClick={() => { setIsSignUp(!isSignUp); setError(null); setMessage(null) }}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 13, fontWeight: 700, color: '#3ab87a', padding: 0,
            }}
          >
            {isSignUp ? 'Sign in' : 'Sign up'}
          </button>
        </div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes floatBob {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-7px); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.4); }
        }
        input::placeholder { color: rgba(255,255,255,0.3) !important; }
      `}</style>
    </div>
  )
}

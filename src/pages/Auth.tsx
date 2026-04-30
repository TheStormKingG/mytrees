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

// Same slides as AddTree — no fabricated stats
const SLIDES = [
  {
    url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=900&q=85&auto=format&fit=crop',
    head: 'Your tree will outlive you.',
    sub: 'Plant something that lasts longer than a lifetime.',
  },
  {
    url: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=900&q=85&auto=format&fit=crop',
    head: 'The Amazon breathes for all of us.',
    sub: "Every tree you plant adds to the world's lungs.",
  },
  {
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&q=85&auto=format&fit=crop',
    head: 'Breathe easier. Literally.',
    sub: 'A single mature tree absorbs 22 kg of CO₂ every year.',
  },
  {
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=85&auto=format&fit=crop',
    head: 'Children will play in its shade.',
    sub: 'The best time to plant was 20 years ago. The second best time is now.',
  },
  {
    url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&q=85&auto=format&fit=crop',
    head: 'Every tree counts.',
    sub: 'Join a global movement rooted in real action.',
  },
]

export default function Auth() {
  const navigate     = useNavigate()
  const googleBtnRef = useRef<HTMLDivElement>(null)

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState<string | null>(null)
  const [message,  setMessage]  = useState<string | null>(null)

  // ── Carousel ─────────────────────────────────────────────────────────────
  const [slide,  setSlide]  = useState(0)
  const [fadeIn, setFadeIn] = useState(true)

  useEffect(() => {
    const t = setInterval(() => {
      setFadeIn(false)
      setTimeout(() => { setSlide(s => (s + 1) % SLIDES.length); setFadeIn(true) }, 400)
    }, 4500)
    return () => clearInterval(t)
  }, [])

  // ── Redirect if already logged in ────────────────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate('/dashboard', { replace: true })
    })
  }, [navigate])

  // ── Google Identity Services ──────────────────────────────────────────────
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
          else {
            const dest = sessionStorage.getItem('pendingTree') ? '/add-tree?verify=1' : '/dashboard'
            navigate(dest, { replace: true })
          }
        },
      })
      google.accounts.id.renderButton(googleBtnRef.current, {
        theme: 'outline',
        size: 'large',
        width: googleBtnRef.current.offsetWidth || 360,
        text: isSignUp ? 'signup_with' : 'continue_with',
        shape: 'pill',
        logo_alignment: 'left',
      })
    }
    if (typeof google !== 'undefined') initGoogle()
    else {
      const s = document.querySelector('script[src*="accounts.google.com/gsi/client"]')
      if (s) { s.addEventListener('load', initGoogle); return () => s.removeEventListener('load', initGoogle) }
    }
  }, [navigate, isSignUp])

  // ── Email submit ──────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError(null); setMessage(null)
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setError(error.message)
      else setMessage('Check your email to confirm your account!')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
      else {
        const dest = sessionStorage.getItem('pendingTree') ? '/add-tree?verify=1' : '/dashboard'
        navigate(dest, { replace: true })
      }
    }
    setLoading(false)
  }

  return (
    <>
      <style>{`
        /* ── Auth page wrapper — light neumorphic background ─── */
        .auth-page {
          min-height: 100svh;
          background: var(--bg);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 16px 40px;
        }

        /* ── Single modal — same on mobile and desktop ─── */
        .auth-modal {
          width: 100%;
          max-width: 420px;
          background: var(--surface-solid);
          border-radius: var(--r-xl);
          box-shadow: var(--neu-shadow-lg);
          border: 1px solid rgba(192,210,192,0.50);
          overflow: hidden;
        }

        /* ── Carousel inside modal ─── */
        .auth-carousel {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;
        }
        .auth-carousel-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%; object-fit: cover;
          transition: opacity 0.4s ease;
          animation: authKenBurns 4.5s ease-in-out forwards;
        }
        @keyframes authKenBurns {
          0%   { transform: scale(1.0); }
          100% { transform: scale(1.08) translateX(-1%); }
        }
        .auth-carousel-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.58) 100%);
        }
        .auth-carousel-copy {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 16px 20px 14px;
          transition: opacity 0.4s ease;
        }
        .auth-carousel-head {
          font-size: 17px; font-weight: 800; color: #fff;
          line-height: 1.2; letter-spacing: -0.3px; margin: 0 0 3px;
          text-shadow: 0 1px 8px rgba(0,0,0,0.5);
        }
        .auth-carousel-sub {
          font-size: 11px; color: rgba(255,255,255,0.78);
          margin: 0; line-height: 1.4;
          text-shadow: 0 1px 4px rgba(0,0,0,0.5);
        }
        .auth-carousel-dots {
          position: absolute; top: 12px; right: 14px; display: flex; gap: 5px;
        }
        .auth-carousel-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: rgba(255,255,255,0.4); border: none; padding: 0; cursor: pointer;
          transition: background 0.3s, transform 0.3s;
        }
        .auth-carousel-dot.active { background: #fff; transform: scale(1.4); }

        /* ── Form area ─── */
        .auth-form-area {
          padding: 22px 24px 28px;
        }

        /* ── Divider ─── */
        .auth-divider {
          display: flex; align-items: center; gap: 10px; margin-bottom: 14px;
        }
        .auth-divider-line { flex: 1; height: 1px; background: var(--border); }
        .auth-divider-text {
          font-size: 10px; font-weight: 700; letter-spacing: 0.6px;
          color: var(--color-tertiary); text-transform: uppercase;
        }

        /* ── Input icon wrapper ─── */
        .auth-input-wrap { position: relative; margin-bottom: 10px; }
        .auth-input-icon {
          position: absolute; left: 14px; top: 50%;
          transform: translateY(-50%); font-size: 14px; pointer-events: none;
          z-index: 1;
        }
        .auth-input-wrap .input { padding-left: 42px; }
      `}</style>

      <div className="auth-page">
        <div className="auth-modal">

          {/* ── Carousel ──────────────────────────────────────────────────── */}
          <div className="auth-carousel">
            <img key={slide} className="auth-carousel-img" src={SLIDES[slide].url} alt=""
              style={{ opacity: fadeIn ? 1 : 0 }} />
            <div className="auth-carousel-overlay" />
            <div className="auth-carousel-dots">
              {SLIDES.map((_, i) => (
                <button key={i}
                  className={`auth-carousel-dot${i === slide ? ' active' : ''}`}
                  onClick={() => { setFadeIn(false); setTimeout(() => { setSlide(i); setFadeIn(true) }, 400) }}
                />
              ))}
            </div>
            <div className="auth-carousel-copy" style={{ opacity: fadeIn ? 1 : 0 }}>
              <p className="auth-carousel-head">{SLIDES[slide].head}</p>
              <p className="auth-carousel-sub">{SLIDES[slide].sub}</p>
            </div>
          </div>

          {/* ── Form ──────────────────────────────────────────────────────── */}
          <div className="auth-form-area">

            {/* Logo + heading */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span style={{ fontSize: 32, lineHeight: 1, filter: 'drop-shadow(0 2px 8px rgba(36,160,96,0.3))' }}>🌳</span>
              <div>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 800, color: 'var(--color-fg)', lineHeight: 1.1, letterSpacing: '-0.04em' }}>
                  {isSignUp ? 'Join groluv' : 'Welcome back'}
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--color-tertiary)', marginTop: 4 }}>
                  {isSignUp ? 'Start your personal forest today' : 'Sign in to your forest'}
                </p>
              </div>
            </div>

            {/* Google button */}
            <div ref={googleBtnRef} style={{ width: '100%', marginBottom: 14, minHeight: 44 }} />

            {/* Divider */}
            <div className="auth-divider">
              <div className="auth-divider-line" />
              <span className="auth-divider-text">or email</span>
              <div className="auth-divider-line" />
            </div>

            {/* Email + password form */}
            <form onSubmit={handleSubmit}>
              <div className="auth-input-wrap">
                <span className="auth-input-icon">📧</span>
                <input className="input" type="email" placeholder="Email address"
                  value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="auth-input-wrap">
                <span className="auth-input-icon">🔒</span>
                <input className="input" type="password" placeholder="Password"
                  value={password} onChange={e => setPassword(e.target.value)} required />
              </div>

              {error   && <p style={{ fontSize: 12, color: '#ef4444', margin: '2px 0 10px' }}>{error}</p>}
              {message && <p style={{ fontSize: 12, color: 'var(--accent)', margin: '2px 0 10px' }}>{message}</p>}

              <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: 6 }}>
                {loading ? '…' : isSignUp ? '🌱 Plant your first seed' : 'Sign in'}
              </button>
            </form>

            {/* Toggle */}
            <div style={{ marginTop: 18, textAlign: 'center' }}>
              <span style={{ fontSize: 13, color: 'var(--color-tertiary)' }}>
                {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
              </span>
              <button
                onClick={() => { setIsSignUp(!isSignUp); setError(null); setMessage(null) }}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: 13, fontWeight: 700, color: 'var(--accent)',
                  padding: 0, fontFamily: 'inherit',
                }}>
                {isSignUp ? 'Sign in' : 'Sign up'}
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

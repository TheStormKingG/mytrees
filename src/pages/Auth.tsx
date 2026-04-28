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
        width: googleBtnRef.current.offsetWidth || 320,
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

  const forestIllustration = (
    <>
      {/* Glow orbs */}
      <div className="auth-orb auth-orb-1" />
      <div className="auth-orb auth-orb-2" />
      <div className="auth-orb auth-orb-3" />

      {/* Twinkling stars */}
      {[{ l:'10%',t:'12%',d:0 },{ l:'78%',t:'18%',d:0.4 },{ l:'45%',t:'8%',d:0.8 },{ l:'88%',t:'26%',d:1.2 },{ l:'22%',t:'32%',d:1.6 }].map((s,i)=>(
        <div key={i} className="auth-star" style={{ left:s.l, top:s.t, animationDelay:`${s.d}s` }} />
      ))}

      {/* Floating leaves */}
      <span className="auth-leaf" style={{ top:'16%', left:'11%', fontSize:28, animationDuration:'4.2s' }}>🍃</span>
      <span className="auth-leaf" style={{ top:'26%', right:'12%', fontSize:22, animationDuration:'5s', animationDirection:'reverse' }}>🌿</span>
      <span className="auth-leaf" style={{ bottom:'24%', left:'7%', fontSize:18, animationDuration:'3.8s', animationDelay:'1s' }}>🌱</span>
      <span className="auth-leaf" style={{ top:'12%', right:'28%', fontSize:16, animationDuration:'6s', animationDelay:'0.5s' }}>✨</span>

      {/* Trees */}
      <div className="auth-trees">
        <span style={{ fontSize:52, opacity:0.55, marginBottom:-4, marginRight:-12 }}>🌿</span>
        <span style={{ fontSize:64, opacity:0.65, marginBottom:-2 }}>🌲</span>
        <span className="auth-leaf" style={{ fontSize:96, position:'static', animationDuration:'4s', filter:'drop-shadow(0 0 32px rgba(58,184,122,0.5))' }}>🌳</span>
        <span style={{ fontSize:72, opacity:0.65, marginBottom:-2 }}>🌲</span>
        <span style={{ fontSize:46, opacity:0.55, marginBottom:-4, marginLeft:-10 }}>🌿</span>
      </div>

      {/* Ground fade */}
      <div className="auth-ground-fade" />
    </>
  )

  return (
    <>
      <style>{`
        /* ── Auth page ───────────────────────────────────────────── */
        .auth-root {
          min-height: 100vh;
          position: relative;
          background: linear-gradient(175deg, #0c2d5c 0%, #0a3d2a 55%, #0c4a1e 100%);
          overflow: hidden;
        }

        /* Full-screen background illustration (desktop) */
        .auth-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        /* ── Illustration pieces ─────── */
        .auth-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .auth-orb-1 { top:-60px; left:-60px; width:260px; height:260px; background:rgba(56,189,248,0.12); filter:blur(50px); }
        .auth-orb-2 { bottom:-40px; right:-40px; width:220px; height:220px; background:rgba(58,184,122,0.18); filter:blur(50px); }
        .auth-orb-3 { top:40px; right:15%; width:120px; height:120px; background:rgba(250,204,21,0.08); filter:blur(30px); }

        .auth-star {
          position: absolute;
          width: 3px; height: 3px;
          border-radius: 50%;
          background: rgba(255,255,255,0.6);
          animation: twinkle 2s ease-in-out infinite;
        }

        .auth-leaf {
          position: absolute;
          pointer-events: none;
          animation: floatBob 4s ease-in-out infinite;
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
        }

        .auth-trees {
          position: absolute;
          bottom: -4px; left: 0; right: 0;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 0 12px;
        }

        .auth-ground-fade {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 48px;
          background: linear-gradient(0deg, rgba(10,30,20,0.9) 0%, transparent 100%);
        }

        /* ── Mobile layout: stacked ─── */
        .auth-mobile-hero {
          position: relative;
          height: 44vh;
          min-height: 240px;
          overflow: hidden;
        }

        .auth-form-panel {
          position: relative;
          background: linear-gradient(180deg, #0a1e14 0%, #07111e 100%);
          padding: 28px 24px 40px;
          flex: 1;
        }

        .auth-content-mobile { display: flex; flex-direction: column; min-height: 100vh; }
        .auth-content-desktop { display: none; }

        /* ── Desktop layout: centered modal card ─── */
        @media (min-width: 640px) {
          .auth-content-mobile  { display: none; }
          .auth-content-desktop {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 32px 24px;
          }

          .auth-card {
            width: 100%;
            max-width: 420px;
            background: rgba(7, 18, 14, 0.88);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid rgba(255,255,255,0.09);
            border-radius: 28px;
            box-shadow: 0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(58,184,122,0.08);
            padding: 36px 32px 32px;
            position: relative;
            z-index: 10;
          }

          .auth-card-logo {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 24px;
          }
        }

        /* ── Inputs ─────────────────────── */
        .auth-input {
          width: 100%;
          padding: 15px 16px 15px 46px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 14px;
          font-size: 14px;
          color: #ffffff;
          outline: none;
          box-sizing: border-box;
          backdrop-filter: blur(8px);
          transition: border-color 0.2s, background 0.2s;
          font-family: inherit;
        }
        .auth-input::placeholder { color: rgba(255,255,255,0.3); }
        .auth-input:focus {
          border-color: rgba(58,184,122,0.6);
          background: rgba(255,255,255,0.11);
        }

        .auth-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #3ab87a 0%, #22a36a 100%);
          border: none;
          border-radius: 14px;
          cursor: pointer;
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.3px;
          margin-top: 4px;
          box-shadow: 0 8px 24px rgba(58,184,122,0.35);
          transition: all 0.2s;
          font-family: inherit;
        }
        .auth-btn:hover { transform: translateY(-1px); box-shadow: 0 12px 28px rgba(58,184,122,0.45); }
        .auth-btn:active { transform: translateY(0); }
        .auth-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

        /* ── Animations ─────────────────── */
        @keyframes floatBob {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-7px); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.5); }
        }
      `}</style>

      <div className="auth-root">

        {/* ── Full-screen background (always rendered, visible on desktop) ── */}
        <div className="auth-bg">
          {forestIllustration}
        </div>

        {/* ── MOBILE layout ── */}
        <div className="auth-content-mobile">
          {/* Hero illustration panel */}
          <div className="auth-mobile-hero">
            {forestIllustration}
          </div>

          {/* Form panel */}
          <div className="auth-form-panel">
            {formContent({ isSignUp, loading, error, message, email, password, setEmail, setPassword, setIsSignUp, setError, setMessage, handleSubmit, googleBtnRef })}
          </div>
        </div>

        {/* ── DESKTOP layout — centered card ── */}
        <div className="auth-content-desktop">
          <div className="auth-card">
            {/* Logo lockup (desktop card only) */}
            <div className="auth-card-logo">
              <span style={{ fontSize: 32 }}>🌳</span>
              <div>
                <p style={{ fontSize: 20, fontWeight: 800, color: '#fff', lineHeight: 1, letterSpacing: -0.5 }}>MyTrees</p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 1 }}>Grow real trees. Earn XP.</p>
              </div>
            </div>
            {formContent({ isSignUp, loading, error, message, email, password, setEmail, setPassword, setIsSignUp, setError, setMessage, handleSubmit, googleBtnRef })}
          </div>
        </div>

      </div>
    </>
  )
}

// ── Shared form content ──────────────────────────────────────────────────────
function formContent({
  isSignUp, loading, error, message,
  email, password, setEmail, setPassword,
  setIsSignUp, setError, setMessage,
  handleSubmit, googleBtnRef,
}: {
  isSignUp: boolean; loading: boolean; error: string|null; message: string|null
  email: string; password: string
  setEmail: (v:string)=>void; setPassword: (v:string)=>void
  setIsSignUp: (v:boolean)=>void; setError: (v:string|null)=>void; setMessage: (v:string|null)=>void
  handleSubmit: (e:React.FormEvent)=>void
  googleBtnRef: React.RefObject<HTMLDivElement>
}) {
  return (
    <>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#ffffff', letterSpacing: -0.5, marginBottom: 4 }}>
          {isSignUp ? 'Join MyTrees 🌱' : 'Welcome back 🌳'}
        </h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
          {isSignUp ? 'Start your personal forest today' : 'Sign in to your forest'}
        </p>
      </div>

      {/* Google */}
      <div ref={googleBtnRef} style={{ width: '100%', marginBottom: 18, minHeight: 48 }} />

      {/* Divider */}
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:18 }}>
        <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.1)' }} />
        <span style={{ fontSize:11, color:'rgba(255,255,255,0.35)', fontWeight:500, letterSpacing:0.5 }}>or use email</span>
        <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.1)' }} />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:10 }}>
        <div style={{ position:'relative' }}>
          <span style={{ position:'absolute', left:15, top:'50%', transform:'translateY(-50%)', fontSize:15, pointerEvents:'none' }}>📧</span>
          <input className="auth-input" type="email" placeholder="Email address" value={email} onChange={e=>setEmail(e.target.value)} required />
        </div>
        <div style={{ position:'relative' }}>
          <span style={{ position:'absolute', left:15, top:'50%', transform:'translateY(-50%)', fontSize:15, pointerEvents:'none' }}>🔒</span>
          <input className="auth-input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </div>

        {error   && <p style={{ fontSize:12, color:'#f87171', margin:'2px 0' }}>{error}</p>}
        {message && <p style={{ fontSize:12, color:'#4ade80', margin:'2px 0' }}>{message}</p>}

        <button type="submit" disabled={loading} className="auth-btn">
          {loading ? '…' : isSignUp ? 'Plant your first seed 🌱' : 'Sign in'}
        </button>
      </form>

      {/* Toggle */}
      <div style={{ marginTop:20, textAlign:'center' }}>
        <span style={{ fontSize:13, color:'rgba(255,255,255,0.4)' }}>
          {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
        </span>
        <button
          onClick={() => { setIsSignUp(!isSignUp); setError(null); setMessage(null) }}
          style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, fontWeight:700, color:'#3ab87a', padding:0, fontFamily:'inherit' }}
        >
          {isSignUp ? 'Sign in' : 'Sign up'}
        </button>
      </div>
    </>
  )
}

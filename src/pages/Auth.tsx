import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

// Google Identity Services global type
declare const google: {
  accounts: {
    id: {
      initialize: (cfg: object) => void
      renderButton: (el: HTMLElement, opts: object) => void
      prompt: () => void
    }
  }
}

const GOOGLE_CLIENT_ID = '421417281434-druc31nk2guo1t0oomt8g44d886m9m1k.apps.googleusercontent.com'

export default function Auth() {
  const navigate = useNavigate()
  const googleBtnRef = useRef<HTMLDivElement>(null)
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState<string | null>(null)
  const [message, setMessage]   = useState<string | null>(null)

  // Redirect if already signed in
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate('/dashboard', { replace: true })
    })
  }, [navigate])

  // Initialise Google Identity Services
  useEffect(() => {
    const initGoogle = () => {
      if (typeof google === 'undefined' || !googleBtnRef.current) return
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async (response: { credential: string }) => {
          setLoading(true)
          setError(null)
          const { error } = await supabase.auth.signInWithIdToken({
            provider: 'google',
            token: response.credential,
          })
          if (error) { setError(error.message); setLoading(false) }
          else navigate('/dashboard', { replace: true })
        },
      })
      google.accounts.id.renderButton(googleBtnRef.current, {
        theme: 'outline',
        size: 'large',
        width: googleBtnRef.current.offsetWidth || 340,
        text: 'continue_with',
        shape: 'rectangular',
        logo_alignment: 'left',
      })
    }

    // If GIS already loaded, init immediately; otherwise wait for the script
    if (typeof google !== 'undefined') {
      initGoogle()
    } else {
      const script = document.querySelector('script[src*="accounts.google.com/gsi/client"]')
      if (script) {
        script.addEventListener('load', initGoogle)
        return () => script.removeEventListener('load', initGoogle)
      }
    }
  }, [navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)
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
    <div className="min-h-screen flex flex-col items-center justify-center px-5" style={{ background: 'var(--neu-base)' }}>

      {/* Logo */}
      <div className="mb-8 text-center">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center text-5xl mx-auto mb-4 neu-raised"
          style={{ background: 'var(--neu-base)' }}
        >
          🌳
        </div>
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">MyTrees</h1>
        <p className="text-slate-500 text-base mt-2">Grow real trees. Earn XP. Save the planet.</p>
      </div>

      {/* Card */}
      <div className="w-full max-w-sm neu-raised-lg rounded-2xl p-7" style={{ background: 'var(--neu-base)' }}>
        <h2 className="text-xl font-bold text-slate-800 mb-5">
          {isSignUp ? 'Create account' : 'Welcome back'}
        </h2>

        {/* ── Google Sign-In button ──────────────────────────────── */}
        <div ref={googleBtnRef} className="w-full mb-1" style={{ minHeight: 44 }} />

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
          <span className="text-xs font-medium" style={{ color: 'var(--color-tertiary)' }}>or continue with email</span>
          <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
        </div>

        {/* ── Email / password form ─────────────────────────────── */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all neu-pressed-sm"
            style={{ background: 'var(--neu-base)' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all neu-pressed-sm"
            style={{ background: 'var(--neu-base)' }}
          />

          {error   && <p className="text-red-500 text-xs">{error}</p>}
          {message && <p className="text-emerald-600 text-xs">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all text-sm neu-raised-sm"
          >
            {loading ? '…' : isSignUp ? 'Plant your first seed 🌱' : 'Sign in'}
          </button>
        </form>

        <button
          onClick={() => { setIsSignUp(!isSignUp); setError(null); setMessage(null) }}
          className="w-full mt-4 text-slate-400 hover:text-slate-600 text-xs transition-colors font-medium"
        >
          {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
        </button>
      </div>
    </div>
  )
}

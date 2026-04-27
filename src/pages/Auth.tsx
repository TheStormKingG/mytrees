import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Auth() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate('/dashboard', { replace: true })
    })
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

          {error && <p className="text-red-500 text-xs">{error}</p>}
          {message && <p className="text-emerald-600 text-xs">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all text-sm neu-raised-sm"
          >
            {loading ? '...' : isSignUp ? 'Plant your first seed 🌱' : 'Sign in'}
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

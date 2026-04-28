import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Session } from '@supabase/supabase-js'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null | undefined>(undefined)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  // Loading — show spinner while session resolves
  if (session === undefined) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ fontSize: 40 }} className="animate-pulse">🌱</div>
      </div>
    )
  }

  // Authenticated — render normally
  if (session) return <>{children}</>

  // Guest — render blurred content + "Login to view" CTA
  return (
    <>
      <style>{`
        .guest-blur-wrap {
          position: relative;
        }
        /* Block interaction on page content only */
        .guest-blur-wrap .page-container {
          pointer-events: none;
          user-select: none;
        }
        /* Only blur the page content — NOT the bottom nav */
        .guest-blur-wrap .page-container {
          filter: blur(1px) grayscale(1);
          opacity: 0.65;
        }
        .guest-overlay {
          position: fixed;
          bottom: calc(72px + env(safe-area-inset-bottom, 0px));
          left: 0; right: 0;
          display: flex;
          justify-content: center;
          z-index: 200;
          pointer-events: none;
        }
        .guest-login-btn {
          pointer-events: all;
          background: var(--accent);
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          padding: 13px 32px;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          box-shadow: 0 6px 24px rgba(58,184,122,0.45), 0 2px 8px rgba(0,0,0,0.12);
          transition: transform 0.15s, box-shadow 0.15s;
          font-family: inherit;
          letter-spacing: -0.2px;
        }
        .guest-login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(58,184,122,0.5);
        }
        .guest-login-btn:active { transform: scale(0.97); }
      `}</style>

      {/* Blurred page content */}
      <div className="guest-blur-wrap">
        {children}
      </div>

      {/* Floating CTA */}
      <div className="guest-overlay">
        <button className="guest-login-btn" onClick={() => navigate('/auth')}>
          Login to view
        </button>
      </div>
    </>
  )
}

import { useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabase'

declare const google: {
  accounts: { id: { initialize: (cfg: object) => void; renderButton: (el: HTMLElement, opts: object) => void } }
}
const GOOGLE_CLIENT_ID = '421417281434-druc31nk2guo1t0oomt8g44d886m9m1k.apps.googleusercontent.com'

type Stage = 'seed' | 'seedling' | 'sapling' | 'tree'

interface Props {
  stage: Stage
  treeName: string
  /** Called after auth confirmed. Receives uploaded media URLs + caption. */
  onComplete: (mediaUrls: string[], caption: string) => Promise<void>
  onCancel: () => void
}

const STEPS = [
  {
    title: 'Your plant, up close',
    icon: '📸',
    type: 'photo' as const,
    getInstruction: (stage: Stage) =>
      `Take a clear, close-up photo of your ${stage} as it is right now.`,
  },
  {
    title: 'The planting spot',
    icon: '📍',
    type: 'photo' as const,
    getInstruction: (stage: Stage) =>
      stage === 'seed'
        ? 'Photo of the pot or ground where you plan to plant your seed.'
        : 'Photo of the spot — show the prepared ground or hole clearly.',
  },
  {
    title: 'Planting in action',
    icon: '🎥',
    type: 'video' as const,
    getInstruction: (_stage: Stage) =>
      'Record ~30 seconds of yourself placing your plant into its final spot.',
  },
  {
    title: 'Plant in position',
    icon: '🌱',
    type: 'photo' as const,
    getInstruction: (stage: Stage) =>
      `Photo of your ${stage} settled in its spot.`,
  },
  {
    title: 'You with your tree',
    icon: '🤳',
    type: 'photo' as const,
    getInstruction: (_stage: Stage) =>
      'Full-length photo of yourself standing next to where you just planted it.',
  },
  {
    title: 'Your planting caption',
    icon: '✍️',
    type: 'text' as const,
    getInstruction: (_stage: Stage) =>
      'Why did you plant it? Where? Who is it for? (15–45 words)',
  },
]

async function uploadFile(file: File, userId: string, index: number): Promise<string | null> {
  const ext  = file.name.split('.').pop() ?? (file.type.startsWith('video') ? 'mp4' : 'jpg')
  const path = `${userId}/${Date.now()}_${index}.${ext}`
  const { error } = await supabase.storage.from('tree-media').upload(path, file, { upsert: false })
  if (error) return null
  const { data } = supabase.storage.from('tree-media').getPublicUrl(path)
  return data.publicUrl
}

export default function PlantingWizard({ stage, treeName, onComplete, onCancel }: Props) {
  const [step,       setStep]       = useState(0)
  const [dir,        setDir]        = useState(1)
  const [uploading,  setUploading]  = useState(false)
  const [completing, setCompleting] = useState(false)
  const [files,      setFiles]      = useState<(File | null)[]>([null, null, null, null, null])
  const [previews,   setPreviews]   = useState<(string | null)[]>([null, null, null, null, null])
  const [caption,    setCaption]    = useState('')

  // ── Inline login gate ─────────────────────────────────────────────────
  const [showLoginGate, setShowLoginGate] = useState(false)
  const [loginEmail,    setLoginEmail]    = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError,    setLoginError]    = useState<string | null>(null)
  const [loginLoading,  setLoginLoading]  = useState(false)
  const [isSignUp,      setIsSignUp]      = useState(false)
  const googleBtnRef = useRef<HTMLDivElement>(null)

  // After login succeeds, upload + complete
  useEffect(() => {
    if (!showLoginGate) return
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_e, session) => {
      if (!session) return
      setShowLoginGate(false)
      await doUploadAndComplete(session.user.id)
    })
    return () => subscription.unsubscribe()
  }, [showLoginGate]) // eslint-disable-line react-hooks/exhaustive-deps

  // Google button
  useEffect(() => {
    if (!showLoginGate) return
    const init = () => {
      if (typeof google === 'undefined' || !googleBtnRef.current) return
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async (response: { credential: string }) => {
          setLoginLoading(true); setLoginError(null)
          const { error } = await supabase.auth.signInWithIdToken({ provider: 'google', token: response.credential })
          if (error) { setLoginError(error.message); setLoginLoading(false) }
        },
      })
      google.accounts.id.renderButton(googleBtnRef.current!, {
        theme: 'outline', size: 'large',
        width: googleBtnRef.current!.offsetWidth || 300,
        text: isSignUp ? 'signup_with' : 'continue_with',
        shape: 'pill', logo_alignment: 'left',
      })
    }
    const t = setTimeout(() => {
      if (typeof google !== 'undefined') init()
      else {
        const s = document.querySelector('script[src*="accounts.google.com/gsi/client"]')
        if (s) s.addEventListener('load', init)
      }
    }, 80)
    return () => clearTimeout(t)
  }, [showLoginGate, isSignUp])

  const current    = STEPS[step]
  const isLastStep = step === STEPS.length - 1
  const wordCount  = caption.trim().split(/\s+/).filter(Boolean).length
  const captionOk  = wordCount >= 15 && wordCount <= 45
  const canProceed = current.type === 'text' ? captionOk : files[step] !== null

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return
    const nf = [...files]; nf[step] = file
    const np = [...previews]; np[step] = URL.createObjectURL(file)
    setFiles(nf); setPreviews(np)
  }

  const goNext = () => { if (!canProceed) return; setDir(1);  setStep(s => s + 1) }
  const goBack = () => {                            setDir(-1); setStep(s => s - 1) }

  const doUploadAndComplete = async (userId: string) => {
    setUploading(true)
    const uploadedUrls: string[] = []
    for (let i = 0; i < files.length; i++) {
      const f = files[i]
      if (f) {
        const url = await uploadFile(f, userId, i)
        if (url) uploadedUrls.push(url)
      }
    }
    setUploading(false)
    setCompleting(true)
    try { await onComplete(uploadedUrls, caption) } catch { setCompleting(false) }
  }

  const handleComplete = async () => {
    if (!captionOk) return
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setShowLoginGate(true); return }
    await doUploadAndComplete(user.id)
  }

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoginLoading(true); setLoginError(null)
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email: loginEmail, password: loginPassword })
      if (error) { setLoginError(error.message); setLoginLoading(false) }
      else setLoginError('Check your email to confirm, then sign in below.')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email: loginEmail, password: loginPassword })
      if (error) { setLoginError(error.message); setLoginLoading(false) }
    }
  }

  const pct = Math.round(((step + 1) / STEPS.length) * 100)
  const isBusy = uploading || completing

  return (
    <>
      <style>{`
        .wiz-backdrop {
          position: fixed; inset: 0; z-index: 600;
          background: rgba(0,0,0,0.55); backdrop-filter: blur(6px);
          display: flex; align-items: flex-end; justify-content: center; padding: 0;
        }
        @media (min-width: 500px) { .wiz-backdrop { align-items: center; padding: 24px; } }

        .wiz-sheet {
          width: 100%; max-width: 480px;
          background: var(--surface-solid);
          border-radius: 24px 24px 0 0; overflow: hidden;
          max-height: 92svh; display: flex; flex-direction: column;
          animation: wizUp 0.32s cubic-bezier(0.4,0,0.2,1) forwards;
        }
        @media (min-width: 500px) { .wiz-sheet { border-radius: 24px; max-height: 86vh; } }
        @keyframes wizUp {
          from { transform: translateY(50px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }

        .wiz-header { padding: 16px 20px 12px; border-bottom: 1px solid var(--border); flex-shrink: 0; }
        .wiz-progress-track { height: 3px; background: var(--bg); border-radius: 2px; overflow: hidden; margin-top: 8px; }
        .wiz-progress-fill  { height: 100%; background: var(--accent); border-radius: 2px; transition: width 0.35s ease; }

        .wiz-body { flex: 1; overflow: hidden; position: relative; }
        .wiz-scroll { padding: 18px 20px 8px; height: 100%; overflow-y: auto; }

        .wiz-fwd { animation: wizSlideRight 0.26s cubic-bezier(0.4,0,0.2,1) forwards; }
        .wiz-bck { animation: wizSlideLeft  0.26s cubic-bezier(0.4,0,0.2,1) forwards; }
        @keyframes wizSlideRight { from { transform: translateX(50px);  opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes wizSlideLeft  { from { transform: translateX(-50px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

        .wiz-upload {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          border: 2px dashed var(--border); border-radius: 16px; padding: 24px 16px;
          cursor: pointer; background: var(--bg); min-height: 150px; overflow: hidden; text-align: center;
          transition: border-color 0.2s, background 0.2s;
        }
        .wiz-upload:hover { border-color: var(--accent); background: rgba(58,184,122,0.04); }
        .wiz-upload.captured { border-style: solid; border-color: rgba(58,184,122,0.4); padding: 0; background: #000; }

        .wiz-footer {
          padding: 12px 20px; padding-bottom: calc(12px + env(safe-area-inset-bottom, 0px));
          border-top: 1px solid var(--border); display: flex; gap: 10px; flex-shrink: 0;
        }
        .wiz-btn-back { flex: 0 0 auto; padding: 14px 16px; background: var(--bg); box-shadow: var(--neu-shadow-sm); border: none; border-radius: 14px; cursor: pointer; font-size: 14px; font-weight: 600; color: var(--color-secondary); font-family: inherit; }
        .wiz-btn-next { flex: 1; padding: 14px; background: var(--accent); color: #fff; border: none; border-radius: 14px; cursor: pointer; font-size: 15px; font-weight: 700; font-family: inherit; box-shadow: 0 4px 16px rgba(58,184,122,0.35); }
        .wiz-btn-next:disabled { opacity: 0.32; cursor: not-allowed; box-shadow: none; }

        /* ── Login gate — compact, no-scroll ── */
        .wiz-login-gate {
          position: absolute; inset: 0; z-index: 10;
          background: var(--surface-solid);
          display: flex; flex-direction: column; justify-content: center;
          padding: 20px 24px;
          animation: wizUp 0.22s cubic-bezier(0.4,0,0.2,1) forwards;
        }
        .wiz-lg-divider { display: flex; align-items: center; gap: 8px; margin: 10px 0; }
        .wiz-lg-divider-line  { flex: 1; height: 1px; background: var(--border); }
        .wiz-lg-divider-text  { font-size: 10px; font-weight: 700; letter-spacing: 0.6px; color: var(--color-tertiary); text-transform: uppercase; }
        .wiz-lg-input-wrap    { position: relative; margin-bottom: 8px; }
        .wiz-lg-input-icon    { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); font-size: 13px; pointer-events: none; }
        .wiz-lg-input-wrap .input { padding-left: 40px; padding-top: 10px; padding-bottom: 10px; font-size: 14px; }
      `}</style>

      <div className="wiz-backdrop" onClick={e => { if (e.target === e.currentTarget) onCancel() }}>
        <div className="wiz-sheet">

          {/* Header */}
          <div className="wiz-header">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 18 }}>{showLoginGate ? '🔐' : current.icon}</span>
                <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-fg)', margin: 0, letterSpacing: -0.3 }}>
                  {showLoginGate ? 'Login to submit' : current.title}
                </p>
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--color-tertiary)', letterSpacing: 0.5 }}>
                STEP {step + 1}/{STEPS.length}
              </span>
            </div>
            <div className="wiz-progress-track">
              <div className="wiz-progress-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>

          {/* Body */}
          <div className="wiz-body">

            {/* ── Login gate ── */}
            {showLoginGate && (
              <div className="wiz-login-gate">
                <p style={{ fontSize: 15, fontWeight: 800, color: 'var(--color-fg)', margin: '0 0 4px', letterSpacing: -0.3 }}>
                  {isSignUp ? 'Create account to plant' : 'Sign in to plant'}
                </p>
                <p style={{ fontSize: 12, color: 'var(--color-tertiary)', margin: '0 0 14px', lineHeight: 1.45 }}>
                  Your 6 steps are saved — sign in and your tree submits automatically.
                </p>

                <div ref={googleBtnRef} style={{ width: '100%', minHeight: 40, marginBottom: 2 }} />

                <div className="wiz-lg-divider">
                  <div className="wiz-lg-divider-line" /><span className="wiz-lg-divider-text">or email</span><div className="wiz-lg-divider-line" />
                </div>

                <form onSubmit={handleLoginSubmit}>
                  <div className="wiz-lg-input-wrap">
                    <span className="wiz-lg-input-icon">📧</span>
                    <input className="input" type="email" placeholder="Email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required />
                  </div>
                  <div className="wiz-lg-input-wrap">
                    <span className="wiz-lg-input-icon">🔒</span>
                    <input className="input" type="password" placeholder="Password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required />
                  </div>
                  {loginError && (
                    <p style={{ fontSize: 11, margin: '0 0 8px', color: loginError.startsWith('Check') ? 'var(--accent)' : '#ef4444' }}>
                      {loginError}
                    </p>
                  )}
                  <button type="submit" className="btn-primary" disabled={loginLoading} style={{ marginTop: 2, padding: '12px 0' }}>
                    {loginLoading ? '…' : isSignUp ? '🌱 Create & plant' : 'Sign in & plant'}
                  </button>
                </form>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
                  <button onClick={() => { setIsSignUp(!isSignUp); setLoginError(null) }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, color: 'var(--accent)', padding: 0, fontFamily: 'inherit' }}>
                    {isSignUp ? 'Sign in instead' : 'Create account'}
                  </button>
                  <button onClick={() => setShowLoginGate(false)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: 'var(--color-tertiary)', fontFamily: 'inherit' }}>
                    ← Back
                  </button>
                </div>
              </div>
            )}

            <div key={step} className={`wiz-scroll ${dir > 0 ? 'wiz-fwd' : 'wiz-bck'}`}>
              <p style={{ fontSize: 13, color: 'var(--color-secondary)', lineHeight: 1.55, marginBottom: 16 }}>
                {current.getInstruction(stage)}
              </p>

              {current.type !== 'text' && (
                <label className={`wiz-upload${files[step] ? ' captured' : ''}`}>
                  <input type="file" accept={current.type === 'video' ? 'video/*' : 'image/*'}
                    capture="environment" style={{ display: 'none' }} onChange={handleFile} />
                  {previews[step] ? (
                    current.type === 'video'
                      ? <video src={previews[step]!} controls style={{ width: '100%', borderRadius: 14, display: 'block', maxHeight: 240 }} />
                      : <img src={previews[step]!} alt="" style={{ width: '100%', borderRadius: 14, display: 'block', objectFit: 'cover', maxHeight: 240 }} />
                  ) : (
                    <>
                      <span style={{ fontSize: 36, marginBottom: 8, display: 'block' }}>{current.type === 'video' ? '🎥' : '📷'}</span>
                      <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-fg)', margin: '0 0 3px' }}>
                        {current.type === 'video' ? 'Tap to record video' : 'Tap to take photo'}
                      </p>
                      <p style={{ fontSize: 11, color: 'var(--color-tertiary)', margin: 0 }}>
                        {current.type === 'video' ? 'Aim for ~30 seconds' : 'Clear and close-up'}
                      </p>
                    </>
                  )}
                </label>
              )}
              {current.type !== 'text' && files[step] && (
                <p style={{ fontSize: 10, color: 'var(--color-tertiary)', textAlign: 'center', marginTop: 6 }}>Tap to retake</p>
              )}

              {current.type === 'text' && (
                <>
                  <textarea className="input" rows={4} placeholder="Share why you planted it, where, or who it's for…"
                    value={caption} onChange={e => setCaption(e.target.value)} style={{ resize: 'none', lineHeight: 1.6 }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: wordCount < 15 ? 'var(--color-tertiary)' : wordCount > 45 ? '#ef4444' : 'var(--accent)' }}>
                      {wordCount < 15 ? `${15 - wordCount} more word${15 - wordCount !== 1 ? 's' : ''} needed`
                        : wordCount > 45 ? `${wordCount - 45} word${wordCount - 45 !== 1 ? 's' : ''} over`
                        : '✓ Looks good'}
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--color-tertiary)', fontWeight: 600 }}>{wordCount}/45</span>
                  </div>
                  <div style={{ marginTop: 12, padding: '10px 12px', background: 'rgba(58,184,122,0.07)', border: '1px solid rgba(58,184,122,0.2)', borderRadius: 10 }}>
                    <p style={{ fontSize: 10, color: 'var(--color-tertiary)', margin: '0 0 2px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>Planting</p>
                    <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-fg)', margin: 0, textTransform: 'capitalize' }}>{treeName || 'Your tree'} · {stage}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Footer */}
          {!showLoginGate && (
            <div className="wiz-footer">
              <button className="wiz-btn-back" onClick={step > 0 ? goBack : onCancel}>
                {step > 0 ? '← Back' : 'Cancel'}
              </button>
              {isLastStep
                ? <button className="wiz-btn-next" disabled={!captionOk || isBusy} onClick={handleComplete}>
                    {isBusy ? (uploading ? 'Uploading…' : 'Planting…') : '🌱 Plant my tree'}
                  </button>
                : <button className="wiz-btn-next" disabled={!canProceed} onClick={goNext}>Next →</button>
              }
            </div>
          )}

        </div>
      </div>
    </>
  )
}

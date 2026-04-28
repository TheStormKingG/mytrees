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
  onComplete: (mediaUrls: string[], caption: string) => Promise<void>
  onCancel: () => void
}

const STEPS = [
  { title: 'Your plant, up close',  icon: '📸', type: 'photo' as const, getInstruction: (s: Stage) => `Clear close-up photo of your ${s} right now.` },
  { title: 'The planting spot',     icon: '📍', type: 'photo' as const, getInstruction: (s: Stage) => s === 'seed' ? 'Photo of the pot or ground where you will plant your seed.' : 'Photo of the spot — prepared ground or hole clearly visible.' },
  { title: 'Planting in action',    icon: '🎥', type: 'video' as const, getInstruction: (_: Stage) => 'Record ~30 seconds of yourself placing your plant into its final spot.' },
  { title: 'Plant in position',     icon: '🌱', type: 'photo' as const, getInstruction: (s: Stage) => `Photo of your ${s} settled in its spot.` },
  { title: 'You with your tree',    icon: '🤳', type: 'photo' as const, getInstruction: (_: Stage) => 'Full-length photo of yourself standing next to where you just planted it.' },
  { title: 'Your planting caption', icon: '✍️', type: 'text'  as const, getInstruction: (_: Stage) => 'Why did you plant it? Where? Who is it for? (15–45 words)' },
]

// ── Canvas helpers ────────────────────────────────────────────────────────────
function drawCover(ctx: CanvasRenderingContext2D, src: CanvasImageSource, sw: number, sh: number, size: number) {
  const scale = Math.max(size / sw, size / sh)
  const dw = sw * scale, dh = sh * scale
  ctx.drawImage(src, (size - dw) / 2, (size - dh) / 2, dw, dh)
}

function loadImg(file: File): Promise<HTMLImageElement> {
  return new Promise(res => {
    const img = new Image()
    img.onload = () => res(img)
    img.src = URL.createObjectURL(file)
  })
}

function waitFrame(): Promise<void> {
  return new Promise(res => requestAnimationFrame(() => res()))
}

// ── Slideshow MP4 generator ───────────────────────────────────────────────────
// files[0,1,3,4] = photos   files[2] = video
async function generateSlideshowVideo(
  files: (File | null)[],
  onProgress: (pct: number) => void,
): Promise<Blob | null> {
  const SIZE = 720
  const FPS  = 30
  const PHOTO_MS  = 3750   // per photo (4 photos × 3750ms = 15s)
  const MAX_VID_MS = 15000

  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = SIZE
  const ctx = canvas.getContext('2d')!

  // Pick best supported mime type
  const mimeType = ['video/mp4', 'video/webm;codecs=vp8', 'video/webm']
    .find(t => MediaRecorder.isTypeSupported(t)) ?? 'video/webm'

  const stream = canvas.captureStream(FPS)
  const rec    = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 3_500_000 })
  const chunks: Blob[] = []
  rec.ondataavailable = e => { if (e.data.size) chunks.push(e.data) }
  rec.start(200)

  // Compute total duration for progress
  const photoCount  = [0, 1, 3, 4].filter(i => files[i]).length
  const videoFile   = files[2]
  let   totalMs     = photoCount * PHOTO_MS
  let   elapsedMs   = 0

  // ── Phase 1: photos (before video) — indices 0, 1
  for (const idx of [0, 1]) {
    const f = files[idx]; if (!f) continue
    const img = await loadImg(f)
    const t0  = performance.now()
    while (performance.now() - t0 < PHOTO_MS) {
      const p = (performance.now() - t0) / PHOTO_MS
      const s = 1 + p * 0.05
      ctx.save()
      ctx.translate(SIZE / 2, SIZE / 2); ctx.scale(s, s); ctx.translate(-SIZE / 2, -SIZE / 2)
      drawCover(ctx, img, img.naturalWidth, img.naturalHeight, SIZE)
      ctx.restore()
      await waitFrame()
    }
    URL.revokeObjectURL(img.src)
    elapsedMs += PHOTO_MS
    onProgress(Math.round((elapsedMs / totalMs) * 90)) // leave last 10% for post-video photos
  }

  // ── Phase 2: video clip
  if (videoFile) {
    const vid = document.createElement('video')
    vid.muted = true; vid.playsInline = true
    vid.src = URL.createObjectURL(videoFile)
    await new Promise<void>(res => { vid.onloadedmetadata = () => res(); vid.load() })
    const clipMs = Math.min(vid.duration * 1000, MAX_VID_MS)
    totalMs += clipMs
    vid.currentTime = 0
    await new Promise<void>(res => { vid.onseeked = () => res() })
    await vid.play()
    const vt0 = performance.now()
    while (performance.now() - vt0 < clipMs && !vid.ended) {
      drawCover(ctx, vid, vid.videoWidth, vid.videoHeight, SIZE)
      await waitFrame()
    }
    vid.pause()
    URL.revokeObjectURL(vid.src)
    elapsedMs += clipMs
  }

  // ── Phase 3: remaining photos (indices 3, 4)
  for (const idx of [3, 4]) {
    const f = files[idx]; if (!f) continue
    const img = await loadImg(f)
    const t0  = performance.now()
    while (performance.now() - t0 < PHOTO_MS) {
      const p = (performance.now() - t0) / PHOTO_MS
      const s = 1 + p * 0.05
      ctx.save()
      ctx.translate(SIZE / 2, SIZE / 2); ctx.scale(s, s); ctx.translate(-SIZE / 2, -SIZE / 2)
      drawCover(ctx, img, img.naturalWidth, img.naturalHeight, SIZE)
      ctx.restore()
      await waitFrame()
    }
    URL.revokeObjectURL(img.src)
    elapsedMs += PHOTO_MS
    onProgress(Math.round(Math.min(99, (elapsedMs / totalMs) * 100)))
  }

  rec.stop()
  await new Promise<void>(res => { rec.onstop = () => res() })
  onProgress(100)
  return new Blob(chunks, { type: mimeType.split(';')[0] })
}

// ── Storage upload ────────────────────────────────────────────────────────────
async function uploadBlob(blob: Blob, userId: string, name: string): Promise<string | null> {
  const ext  = blob.type.includes('mp4') ? 'mp4' : blob.type.includes('jpeg') ? 'jpg' : 'webm'
  const path = `${userId}/${name}_${Date.now()}.${ext}`
  const { error } = await supabase.storage.from('tree-media').upload(path, blob, { contentType: blob.type, upsert: false })
  if (error) return null
  return supabase.storage.from('tree-media').getPublicUrl(path).data.publicUrl
}

export default function PlantingWizard({ stage, treeName, onComplete, onCancel }: Props) {
  const [step,        setStep]        = useState(0)
  const [dir,         setDir]         = useState(1)
  const [files,       setFiles]       = useState<(File | null)[]>([null, null, null, null, null])
  const [previews,    setPreviews]    = useState<(string | null)[]>([null, null, null, null, null])
  const [caption,     setCaption]     = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [genProgress,  setGenProgress]  = useState(0)
  const [completing,   setCompleting]   = useState(false)

  // ── Login gate ────────────────────────────────────────────────────────
  const [showLoginGate, setShowLoginGate] = useState(false)
  const [loginEmail,    setLoginEmail]    = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError,    setLoginError]    = useState<string | null>(null)
  const [loginLoading,  setLoginLoading]  = useState(false)
  const [isSignUp,      setIsSignUp]      = useState(false)
  const googleBtnRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!showLoginGate) return
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_e, session) => {
      if (!session) return
      setShowLoginGate(false)
      await doGenerateAndComplete(session.user.id)
    })
    return () => subscription.unsubscribe()
  }, [showLoginGate]) // eslint-disable-line

  useEffect(() => {
    if (!showLoginGate) return
    const init = () => {
      if (typeof google === 'undefined' || !googleBtnRef.current) return
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async (r: { credential: string }) => {
          setLoginLoading(true); setLoginError(null)
          const { error } = await supabase.auth.signInWithIdToken({ provider: 'google', token: r.credential })
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
    const t = setTimeout(() => { if (typeof google !== 'undefined') init() }, 80)
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

  const doGenerateAndComplete = async (userId: string) => {
    setIsGenerating(true); setGenProgress(0)
    // Generate slideshow MP4
    let slideshowUrl: string | null = null
    try {
      const blob = await generateSlideshowVideo(files, setGenProgress)
      if (blob) slideshowUrl = await uploadBlob(blob, userId, 'slideshow')
    } catch (err) {
      console.warn('Slideshow generation failed, falling back to no video', err)
    }
    setIsGenerating(false); setCompleting(true)
    const mediaUrls = slideshowUrl ? [slideshowUrl] : []
    try { await onComplete(mediaUrls, caption) } catch { setCompleting(false) }
  }

  const handleComplete = async () => {
    if (!captionOk) return
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setShowLoginGate(true); return }
    await doGenerateAndComplete(user.id)
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

  const pct      = Math.round(((step + 1) / STEPS.length) * 100)
  const isBusy   = isGenerating || completing

  return (
    <>
      <style>{`
        .wiz-backdrop { position:fixed;inset:0;z-index:600;background:rgba(0,0,0,.55);backdrop-filter:blur(6px);display:flex;align-items:flex-end;justify-content:center;padding:0; }
        @media(min-width:500px){.wiz-backdrop{align-items:center;padding:24px;}}
        .wiz-sheet { width:100%;max-width:480px;background:var(--surface-solid);border-radius:24px 24px 0 0;overflow:hidden;max-height:92svh;display:flex;flex-direction:column;animation:wizUp .32s cubic-bezier(.4,0,.2,1) forwards; }
        @media(min-width:500px){.wiz-sheet{border-radius:24px;max-height:86vh;}}
        @keyframes wizUp{from{transform:translateY(50px);opacity:0;}to{transform:translateY(0);opacity:1;}}
        .wiz-header{padding:16px 20px 12px;border-bottom:1px solid var(--border);flex-shrink:0;}
        .wiz-progress-track{height:3px;background:var(--bg);border-radius:2px;overflow:hidden;margin-top:8px;}
        .wiz-progress-fill{height:100%;background:var(--accent);border-radius:2px;transition:width .35s ease;}
        .wiz-body{flex:1;overflow:hidden;position:relative;}
        .wiz-scroll{padding:18px 20px 8px;height:100%;overflow-y:auto;}
        .wiz-fwd{animation:wizSlideRight .26s cubic-bezier(.4,0,.2,1) forwards;}
        .wiz-bck{animation:wizSlideLeft  .26s cubic-bezier(.4,0,.2,1) forwards;}
        @keyframes wizSlideRight{from{transform:translateX(50px);opacity:0;}to{transform:translateX(0);opacity:1;}}
        @keyframes wizSlideLeft {from{transform:translateX(-50px);opacity:0;}to{transform:translateX(0);opacity:1;}}
        .wiz-upload{display:flex;flex-direction:column;align-items:center;justify-content:center;border:2px dashed var(--border);border-radius:16px;padding:24px 16px;cursor:pointer;background:var(--bg);min-height:150px;overflow:hidden;text-align:center;transition:border-color .2s,background .2s;}
        .wiz-upload:hover{border-color:var(--accent);background:rgba(58,184,122,.04);}
        .wiz-upload.captured{border-style:solid;border-color:rgba(58,184,122,.4);padding:0;background:#000;}
        .wiz-footer{padding:12px 20px;padding-bottom:calc(12px + env(safe-area-inset-bottom,0px));border-top:1px solid var(--border);display:flex;gap:10px;flex-shrink:0;}
        .wiz-btn-back{flex:0 0 auto;padding:14px 16px;background:var(--bg);box-shadow:var(--neu-shadow-sm);border:none;border-radius:14px;cursor:pointer;font-size:14px;font-weight:600;color:var(--color-secondary);font-family:inherit;}
        .wiz-btn-next{flex:1;padding:14px;background:var(--accent);color:#fff;border:none;border-radius:14px;cursor:pointer;font-size:15px;font-weight:700;font-family:inherit;box-shadow:0 4px 16px rgba(58,184,122,.35);}
        .wiz-btn-next:disabled{opacity:.32;cursor:not-allowed;box-shadow:none;}
        /* login gate */
        .wiz-login-gate{position:absolute;inset:0;z-index:10;background:var(--surface-solid);display:flex;flex-direction:column;justify-content:center;padding:20px 24px;animation:wizUp .22s cubic-bezier(.4,0,.2,1) forwards;}
        .wiz-lg-divider{display:flex;align-items:center;gap:8px;margin:10px 0;}
        .wiz-lg-divider-line{flex:1;height:1px;background:var(--border);}
        .wiz-lg-divider-text{font-size:10px;font-weight:700;letter-spacing:.6px;color:var(--color-tertiary);text-transform:uppercase;}
        .wiz-lg-iw{position:relative;margin-bottom:8px;}
        .wiz-lg-ic{position:absolute;left:14px;top:50%;transform:translateY(-50%);font-size:13px;pointer-events:none;}
        .wiz-lg-iw .input{padding-left:40px;padding-top:10px;padding-bottom:10px;font-size:14px;}
        /* generation screen */
        .wiz-gen-screen{position:absolute;inset:0;z-index:20;background:var(--surface-solid);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px 28px;text-align:center;}
        .wiz-gen-bar-track{width:100%;height:8px;background:var(--bg);border-radius:4px;overflow:hidden;margin:20px 0 10px;box-shadow:var(--neu-inset-sm);}
        .wiz-gen-bar-fill{height:100%;background:var(--accent);border-radius:4px;transition:width .4s ease;}
      `}</style>

      <div className="wiz-backdrop" onClick={e => { if (e.target === e.currentTarget && !isBusy) onCancel() }}>
        <div className="wiz-sheet">

          {/* Header */}
          <div className="wiz-header">
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ fontSize:18 }}>
                  {isGenerating ? '🎬' : showLoginGate ? '🔐' : current.icon}
                </span>
                <p style={{ fontSize:15, fontWeight:700, color:'var(--color-fg)', margin:0, letterSpacing:-0.3 }}>
                  {isGenerating ? 'Creating your video…' : showLoginGate ? 'Login to submit' : current.title}
                </p>
              </div>
              <span style={{ fontSize:10, fontWeight:700, color:'var(--color-tertiary)', letterSpacing:0.5 }}>
                STEP {step+1}/{STEPS.length}
              </span>
            </div>
            <div className="wiz-progress-track">
              <div className="wiz-progress-fill" style={{ width:`${pct}%` }} />
            </div>
          </div>

          {/* Body */}
          <div className="wiz-body">

            {/* ── Generation progress screen ── */}
            {isGenerating && (
              <div className="wiz-gen-screen">
                <div style={{ fontSize:56, marginBottom:12, animation:'pulse 1.5s ease-in-out infinite' }}>🎬</div>
                <p style={{ fontSize:17, fontWeight:800, color:'var(--color-fg)', margin:'0 0 6px', letterSpacing:-0.3 }}>
                  Building your planting video
                </p>
                <p style={{ fontSize:13, color:'var(--color-tertiary)', lineHeight:1.5, margin:'0 0 4px' }}>
                  Compiling your photos and video clip into one slideshow…
                </p>
                <p style={{ fontSize:11, color:'var(--color-tertiary)', margin:0 }}>Keep this screen open</p>
                <div className="wiz-gen-bar-track">
                  <div className="wiz-gen-bar-fill" style={{ width:`${genProgress}%` }} />
                </div>
                <p style={{ fontSize:13, fontWeight:700, color:'var(--accent)' }}>{genProgress}%</p>
              </div>
            )}

            {/* ── Login gate ── */}
            {!isGenerating && showLoginGate && (
              <div className="wiz-login-gate">
                <p style={{ fontSize:15, fontWeight:800, color:'var(--color-fg)', margin:'0 0 4px', letterSpacing:-0.3 }}>
                  {isSignUp ? 'Create account to plant' : 'Sign in to plant'}
                </p>
                <p style={{ fontSize:12, color:'var(--color-tertiary)', margin:'0 0 14px', lineHeight:1.45 }}>
                  Your 6 steps are saved — sign in and your tree submits automatically.
                </p>
                <div ref={googleBtnRef} style={{ width:'100%', minHeight:40, marginBottom:2 }} />
                <div className="wiz-lg-divider">
                  <div className="wiz-lg-divider-line" /><span className="wiz-lg-divider-text">or email</span><div className="wiz-lg-divider-line" />
                </div>
                <form onSubmit={handleLoginSubmit}>
                  <div className="wiz-lg-iw"><span className="wiz-lg-ic">📧</span>
                    <input className="input" type="email" placeholder="Email" value={loginEmail} onChange={e=>setLoginEmail(e.target.value)} required />
                  </div>
                  <div className="wiz-lg-iw"><span className="wiz-lg-ic">🔒</span>
                    <input className="input" type="password" placeholder="Password" value={loginPassword} onChange={e=>setLoginPassword(e.target.value)} required />
                  </div>
                  {loginError && <p style={{ fontSize:11, margin:'0 0 8px', color:loginError.startsWith('Check')?'var(--accent)':'#ef4444' }}>{loginError}</p>}
                  <button type="submit" className="btn-primary" disabled={loginLoading} style={{ marginTop:2, padding:'12px 0' }}>
                    {loginLoading ? '…' : isSignUp ? '🌱 Create & plant' : 'Sign in & plant'}
                  </button>
                </form>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:12 }}>
                  <button onClick={()=>{setIsSignUp(!isSignUp);setLoginError(null)}} style={{ background:'none',border:'none',cursor:'pointer',fontSize:12,fontWeight:700,color:'var(--accent)',padding:0,fontFamily:'inherit' }}>
                    {isSignUp ? 'Sign in instead' : 'Create account'}
                  </button>
                  <button onClick={()=>setShowLoginGate(false)} style={{ background:'none',border:'none',cursor:'pointer',fontSize:12,color:'var(--color-tertiary)',fontFamily:'inherit' }}>
                    ← Back
                  </button>
                </div>
              </div>
            )}

            {/* ── Wizard steps ── */}
            {!isGenerating && (
              <div key={step} className={`wiz-scroll ${dir>0?'wiz-fwd':'wiz-bck'}`}>
                <p style={{ fontSize:13, color:'var(--color-secondary)', lineHeight:1.55, marginBottom:16 }}>
                  {current.getInstruction(stage)}
                </p>

                {current.type !== 'text' && (
                  <label className={`wiz-upload${files[step]?' captured':''}`}>
                    <input type="file" accept={current.type==='video'?'video/*':'image/*'}
                      capture="environment" style={{ display:'none' }} onChange={handleFile} />
                    {previews[step] ? (
                      current.type === 'video'
                        ? <video src={previews[step]!} controls style={{ width:'100%',borderRadius:14,display:'block',maxHeight:240 }} />
                        : <img src={previews[step]!} alt="" style={{ width:'100%',borderRadius:14,display:'block',objectFit:'cover',maxHeight:240 }} />
                    ) : (
                      <>
                        <span style={{ fontSize:36, marginBottom:8, display:'block' }}>{current.type==='video'?'🎥':'📷'}</span>
                        <p style={{ fontSize:13, fontWeight:600, color:'var(--color-fg)', margin:'0 0 3px' }}>{current.type==='video'?'Tap to record video':'Tap to take photo'}</p>
                        <p style={{ fontSize:11, color:'var(--color-tertiary)', margin:0 }}>{current.type==='video'?'Aim for ~30 seconds':'Clear and close-up'}</p>
                      </>
                    )}
                  </label>
                )}
                {current.type !== 'text' && files[step] && (
                  <p style={{ fontSize:10, color:'var(--color-tertiary)', textAlign:'center', marginTop:6 }}>Tap to retake</p>
                )}

                {current.type === 'text' && (
                  <>
                    <textarea className="input" rows={4} placeholder="Share why you planted it, where, or who it's for…"
                      value={caption} onChange={e=>setCaption(e.target.value)} style={{ resize:'none', lineHeight:1.6 }} />
                    <div style={{ display:'flex', justifyContent:'space-between', marginTop:5 }}>
                      <span style={{ fontSize:11, fontWeight:600, color:wordCount<15?'var(--color-tertiary)':wordCount>45?'#ef4444':'var(--accent)' }}>
                        {wordCount<15?`${15-wordCount} more word${15-wordCount!==1?'s':''} needed`:wordCount>45?`${wordCount-45} over`:'✓ Looks good'}
                      </span>
                      <span style={{ fontSize:11, color:'var(--color-tertiary)', fontWeight:600 }}>{wordCount}/45</span>
                    </div>
                    <div style={{ marginTop:12, padding:'10px 12px', background:'rgba(58,184,122,.07)', border:'1px solid rgba(58,184,122,.2)', borderRadius:10 }}>
                      <p style={{ fontSize:10, color:'var(--color-tertiary)', margin:'0 0 2px', fontWeight:700, textTransform:'uppercase', letterSpacing:0.5 }}>Planting</p>
                      <p style={{ fontSize:13, fontWeight:700, color:'var(--color-fg)', margin:0, textTransform:'capitalize' }}>{treeName||'Your tree'} · {stage}</p>
                    </div>
                  </>
                )}
              </div>
            )}

          </div>

          {/* Footer */}
          {!showLoginGate && !isGenerating && (
            <div className="wiz-footer">
              <button className="wiz-btn-back" onClick={step>0?goBack:onCancel}>{step>0?'← Back':'Cancel'}</button>
              {isLastStep
                ? <button className="wiz-btn-next" disabled={!captionOk||completing} onClick={handleComplete}>
                    {completing ? 'Planting…' : '🌱 Plant my tree'}
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

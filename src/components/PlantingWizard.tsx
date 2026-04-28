import { useState } from 'react'

type Stage = 'seed' | 'seedling' | 'sapling' | 'tree'

interface Props {
  stage: Stage
  treeName: string
  onComplete: () => Promise<void>
  onCancel: () => void
}

const STEPS = [
  {
    title: 'Your plant, up close',
    icon: '📸',
    type: 'photo' as const,
    getInstruction: (stage: Stage) =>
      `Take a clear, close-up photo of your ${stage} as it is right now — hold it in your hand, place it on a flat surface, or photograph it clearly on the ground.`,
  },
  {
    title: 'The planting spot',
    icon: '📍',
    type: 'photo' as const,
    getInstruction: (stage: Stage) =>
      stage === 'seed'
        ? 'Take a photo of the pot or patch of ground where you plan to plant your seed. The soil should be clearly visible.'
        : 'Take a photo of the spot — show the prepared ground or hole clearly.',
  },
  {
    title: 'Planting in action',
    icon: '🎥',
    type: 'video' as const,
    getInstruction: (_stage: Stage) =>
      'Record a 30-second video of yourself placing your plant into its final spot. Show the full moment — from picking it up to settling it in.',
  },
  {
    title: 'Plant in position',
    icon: '🌱',
    type: 'photo' as const,
    getInstruction: (stage: Stage) =>
      `Take a photo of your ${stage} now settled in its spot. It should be clearly visible in the ground or pot.`,
  },
  {
    title: 'You with your tree',
    icon: '🤳',
    type: 'photo' as const,
    getInstruction: (_stage: Stage) =>
      'Take a full-length photo of yourself standing next to where you just planted it. Your whole body should be visible.',
  },
  {
    title: 'Your planting caption',
    icon: '✍️',
    type: 'text' as const,
    getInstruction: (_stage: Stage) =>
      'Write a caption for your planting moment. Share why you planted it, where, or who it is for. Minimum 15 words, maximum 45.',
  },
]

export default function PlantingWizard({ stage, treeName, onComplete, onCancel }: Props) {
  const [step,       setStep]       = useState(0)
  const [dir,        setDir]        = useState(1)   // 1 = forward, -1 = back
  const [completing, setCompleting] = useState(false)
  const [files,      setFiles]      = useState<(File | null)[]>([null, null, null, null, null])
  const [previews,   setPreviews]   = useState<(string | null)[]>([null, null, null, null, null])
  const [caption,    setCaption]    = useState('')

  const current    = STEPS[step]
  const isLastStep = step === STEPS.length - 1
  const wordCount  = caption.trim().split(/\s+/).filter(Boolean).length
  const captionOk  = wordCount >= 15 && wordCount <= 45

  const canProceed = current.type === 'text' ? captionOk : files[step] !== null

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const nf = [...files];  nf[step] = file
    const np = [...previews]; np[step] = URL.createObjectURL(file)
    setFiles(nf); setPreviews(np)
  }

  const goNext = () => { if (!canProceed) return; setDir(1);  setStep(s => s + 1) }
  const goBack = () => {                            setDir(-1); setStep(s => s - 1) }

  const handleComplete = async () => {
    if (!captionOk) return
    setCompleting(true)
    try { await onComplete() } catch { setCompleting(false) }
  }

  const pct = Math.round(((step + 1) / STEPS.length) * 100)

  return (
    <>
      <style>{`
        .wiz-backdrop {
          position: fixed; inset: 0; z-index: 600;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(6px);
          display: flex; align-items: flex-end; justify-content: center;
          padding: 0;
        }
        @media (min-width: 500px) {
          .wiz-backdrop { align-items: center; padding: 24px; }
        }

        .wiz-sheet {
          width: 100%; max-width: 480px;
          background: var(--surface-solid);
          border-radius: 24px 24px 0 0;
          overflow: hidden;
          max-height: 92svh;
          display: flex; flex-direction: column;
          animation: wizUp 0.32s cubic-bezier(0.4,0,0.2,1) forwards;
        }
        @media (min-width: 500px) {
          .wiz-sheet { border-radius: 24px; max-height: 86vh; }
        }
        @keyframes wizUp {
          from { transform: translateY(50px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }

        .wiz-header {
          padding: 18px 20px 14px;
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
        }
        .wiz-progress-track {
          height: 3px; background: var(--bg); border-radius: 2px;
          overflow: hidden; margin-top: 10px;
        }
        .wiz-progress-fill {
          height: 100%; background: var(--accent); border-radius: 2px;
          transition: width 0.35s ease;
        }

        .wiz-body { flex: 1; overflow: hidden; position: relative; }
        .wiz-scroll { padding: 20px 20px 8px; height: 100%; overflow-y: auto; }

        .wiz-fwd {
          animation: wizSlideRight 0.26s cubic-bezier(0.4,0,0.2,1) forwards;
        }
        .wiz-bck {
          animation: wizSlideLeft 0.26s cubic-bezier(0.4,0,0.2,1) forwards;
        }
        @keyframes wizSlideRight {
          from { transform: translateX(50px); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes wizSlideLeft {
          from { transform: translateX(-50px); opacity: 0; }
          to   { transform: translateX(0);     opacity: 1; }
        }

        .wiz-upload {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          border: 2px dashed var(--border);
          border-radius: 16px; padding: 32px 20px;
          cursor: pointer; background: var(--bg);
          transition: border-color 0.2s, background 0.2s;
          min-height: 170px; overflow: hidden;
          text-align: center;
        }
        .wiz-upload:hover { border-color: var(--accent); background: rgba(58,184,122,0.04); }
        .wiz-upload.captured {
          border-style: solid; border-color: rgba(58,184,122,0.4);
          padding: 0; background: #000;
        }

        .wiz-footer {
          padding: 12px 20px;
          padding-bottom: calc(12px + env(safe-area-inset-bottom, 0px));
          border-top: 1px solid var(--border);
          display: flex; gap: 10px; flex-shrink: 0;
        }
        .wiz-btn-back {
          flex: 0 0 auto; padding: 14px 18px;
          background: var(--bg); box-shadow: var(--neu-shadow-sm);
          border: none; border-radius: 14px; cursor: pointer;
          font-size: 14px; font-weight: 600; color: var(--color-secondary);
          font-family: inherit; transition: opacity 0.15s;
        }
        .wiz-btn-next {
          flex: 1; padding: 14px;
          background: var(--accent); color: #fff;
          border: none; border-radius: 14px; cursor: pointer;
          font-size: 15px; font-weight: 700; font-family: inherit;
          box-shadow: 0 4px 16px rgba(58,184,122,0.35);
          transition: opacity 0.15s;
        }
        .wiz-btn-next:disabled { opacity: 0.32; cursor: not-allowed; box-shadow: none; }
      `}</style>

      <div className="wiz-backdrop" onClick={e => { if (e.target === e.currentTarget) onCancel() }}>
        <div className="wiz-sheet">

          {/* ── Header ── */}
          <div className="wiz-header">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 20 }}>{current.icon}</span>
                <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-fg)', margin: 0, letterSpacing: -0.3 }}>
                  {current.title}
                </p>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-tertiary)', letterSpacing: 0.5 }}>
                STEP {step + 1} OF {STEPS.length}
              </span>
            </div>
            <div className="wiz-progress-track">
              <div className="wiz-progress-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>

          {/* ── Body ── */}
          <div className="wiz-body">
            <div key={step} className={`wiz-scroll ${dir > 0 ? 'wiz-fwd' : 'wiz-bck'}`}>

              {/* Instruction */}
              <p style={{ fontSize: 13, color: 'var(--color-secondary)', lineHeight: 1.6, marginBottom: 18 }}>
                {current.getInstruction(stage)}
              </p>

              {/* Photo / video capture */}
              {current.type !== 'text' && (
                <label className={`wiz-upload${files[step] ? ' captured' : ''}`}>
                  <input
                    type="file"
                    accept={current.type === 'video' ? 'video/*' : 'image/*'}
                    capture="environment"
                    style={{ display: 'none' }}
                    onChange={handleFile}
                  />
                  {previews[step] ? (
                    current.type === 'video'
                      ? <video src={previews[step]!} controls
                          style={{ width: '100%', borderRadius: 14, display: 'block', maxHeight: 260 }} />
                      : <img src={previews[step]!} alt=""
                          style={{ width: '100%', borderRadius: 14, display: 'block', objectFit: 'cover', maxHeight: 260 }} />
                  ) : (
                    <>
                      <span style={{ fontSize: 40, marginBottom: 10, display: 'block' }}>
                        {current.type === 'video' ? '🎥' : '📷'}
                      </span>
                      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-fg)', margin: '0 0 4px' }}>
                        {current.type === 'video' ? 'Tap to record video' : 'Tap to take photo'}
                      </p>
                      <p style={{ fontSize: 12, color: 'var(--color-tertiary)', margin: 0 }}>
                        {current.type === 'video' ? 'Aim for ~30 seconds' : 'Make it clear and close-up'}
                      </p>
                    </>
                  )}
                </label>
              )}

              {/* Retake hint */}
              {current.type !== 'text' && files[step] && (
                <p style={{ fontSize: 11, color: 'var(--color-tertiary)', textAlign: 'center', marginTop: 8 }}>
                  Tap the photo to retake
                </p>
              )}

              {/* Caption textarea */}
              {current.type === 'text' && (
                <>
                  <textarea
                    className="input"
                    rows={5}
                    placeholder="Share why you planted it, where, or who it's for…"
                    value={caption}
                    onChange={e => setCaption(e.target.value)}
                    style={{ resize: 'none', lineHeight: 1.6 }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                    <span style={{
                      fontSize: 11, fontWeight: 600,
                      color: wordCount < 15 ? 'var(--color-tertiary)' : wordCount > 45 ? '#ef4444' : 'var(--accent)',
                    }}>
                      {wordCount < 15
                        ? `${15 - wordCount} more word${15 - wordCount !== 1 ? 's' : ''} needed`
                        : wordCount > 45
                          ? `${wordCount - 45} word${wordCount - 45 !== 1 ? 's' : ''} over limit`
                          : '✓ Looks good'}
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--color-tertiary)', fontWeight: 600 }}>
                      {wordCount} / 45
                    </span>
                  </div>

                  {/* Tree recap */}
                  <div style={{
                    marginTop: 16, padding: '12px 14px',
                    background: 'rgba(58,184,122,0.07)', border: '1px solid rgba(58,184,122,0.2)',
                    borderRadius: 12,
                  }}>
                    <p style={{ fontSize: 11, color: 'var(--color-tertiary)', margin: '0 0 3px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>Planting</p>
                    <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-fg)', margin: 0, textTransform: 'capitalize' }}>
                      {treeName || 'Your tree'} · {stage}
                    </p>
                  </div>
                </>
              )}

            </div>
          </div>

          {/* ── Footer ── */}
          <div className="wiz-footer">
            <button className="wiz-btn-back" onClick={step > 0 ? goBack : onCancel}>
              {step > 0 ? '← Back' : 'Cancel'}
            </button>
            {isLastStep
              ? <button className="wiz-btn-next" disabled={!captionOk || completing} onClick={handleComplete}>
                  {completing ? 'Planting…' : '🌱 Plant my tree'}
                </button>
              : <button className="wiz-btn-next" disabled={!canProceed} onClick={goNext}>
                  Next →
                </button>
            }
          </div>

        </div>
      </div>
    </>
  )
}

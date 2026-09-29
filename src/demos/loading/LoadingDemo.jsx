import { useEffect, useState } from 'react'

/** 加载类 demo：spinner/dots/progress/ring/skeleton/overlay/skeleton-table/typing */
export default function LoadingDemo({ variant, value = 0, text = '' }) {
  const [prog, setProg] = useState(variant === 'progress' ? value : 0)
  const [typed, setTyped] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (variant === 'ring' && prog < value) {
      const t = setTimeout(() => setProg((p) => Math.min(value, p + 6)), 30)
      return () => clearTimeout(t)
    }
  }, [variant, prog, value])

  useEffect(() => {
    if (variant !== 'typing') return
    if (typed >= text.length) return
    const t = setTimeout(() => setTyped((n) => n + 1), 30)
    return () => clearTimeout(t)
  }, [variant, typed, text])

  if (variant === 'spinner') {
    return (
      <div className="d-root" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        {[16, 24, 32].map((s) => <span key={s} className="d-spinner" style={{ width: s, height: s }} />)}
        <span className="d-label" style={{ margin: 0 }}>加载中…</span>
      </div>
    )
  }

  if (variant === 'dots') {
    return (
      <div className="d-root" style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ background: 'var(--code-bg)', borderRadius: 16, padding: '10px 14px', display: 'flex', gap: 5 }} role="status" aria-label="对方正在输入">
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--text-muted)', animation: `d-bounce .6s ${i * 0.15}s infinite ease-in-out` }} />
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'progress') {
    const complete = prog >= 100
    return (
      <div className="d-root" style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%' }}>
        <span style={{ flex: 1, height: 8, borderRadius: 999, background: 'var(--border)', overflow: 'hidden' }}>
          <span
            style={{
              display: 'block', height: '100%', borderRadius: 999,
              background: complete ? 'var(--ok)' : prog < 0 ? 'var(--accent)' : 'var(--accent)',
              width: prog < 0 ? '100%' : `${prog}%`,
              backgroundImage: prog < 0 ? 'repeating-linear-gradient(45deg,transparent,transparent 6px,rgba(255,255,255,.35) 6px,rgba(255,255,255,.35) 12px)' : undefined,
              transition: 'width .2s ease, background .2s ease',
            }}
          />
        </span>
        <span className="d-label" style={{ margin: 0, fontVariantNumeric: 'tabular-nums' }}>{prog < 0 ? '…' : `${prog}%`}</span>
        <span style={{ display: 'flex', gap: 4 }}>
          <button type="button" className="d-btn" style={{ padding: '0 8px' }} aria-label="减少" onClick={() => setProg((p) => (p < 0 ? value : Math.max(0, p - 10)))}>−</button>
          <button type="button" className="d-btn" style={{ padding: '0 8px' }} aria-label="增加" onClick={() => setProg((p) => (p < 0 ? value : Math.min(100, p + 10)))}>＋</button>
        </span>
      </div>
    )
  }

  if (variant === 'ring') {
    const r = 26
    const c = 2 * Math.PI * r
    const complete = prog >= value && value >= 100
    return (
      <div className="d-root" style={{ display: 'flex', justifyContent: 'center' }}>
        <svg width="72" height="72" role="img" aria-label={`进度 ${prog}%`}>
          <circle cx="36" cy="36" r={r} fill="none" stroke="var(--border)" strokeWidth="6" />
          <circle
            cx="36" cy="36" r={r} fill="none"
            stroke={value >= 100 ? 'var(--ok)' : 'var(--accent)'}
            strokeWidth="6" strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c - (c * prog) / 100}
            transform="rotate(-90 36 36)"
            style={{ transition: 'stroke-dashoffset .1s linear' }}
          />
          <text x="36" y="41" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text)">{prog}</text>
        </svg>
      </div>
    )
  }

  if (variant === 'skeleton' || variant === 'skeleton-table') {
    const shimmer = { background: 'var(--border)', position: 'relative', overflow: 'hidden', borderRadius: 6 }
    if (variant === 'skeleton') {
      return (
        <div className="d-root" style={cardBox}>
          {loaded ? (
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <span style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--accent-soft)', color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>四</span>
              <div style={{ fontSize: 13 }}>
                <strong>四喜</strong>
                <div className="d-label" style={{ margin: 0 }}>刚刚发布了组件词典 v1.0。</div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <span style={{ ...shimmer, width: 40, height: 40, borderRadius: '50%', flexShrink: 0 }} className="d-shimmer" />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ ...shimmer, height: 10, width: '60%' }} className="d-shimmer" />
                <span style={{ ...shimmer, height: 10, width: '90%' }} className="d-shimmer" />
              </div>
            </div>
          )}
          <div style={{ marginTop: 10, height: 52, borderRadius: 8, background: loaded ? 'linear-gradient(135deg,#60a5fa,#34d399)' : undefined }} className={loaded ? '' : 'd-shimmer'} />
          <div style={{ textAlign: 'center', marginTop: 10 }}>
            <button type="button" className="d-tab" style={{ fontSize: 11, color: 'var(--accent)' }} onClick={() => setLoaded((l) => !l)}>
              切换到{loaded ? '骨架' : '加载完成'}
            </button>
          </div>
        </div>
      )
    }
    return (
      <div className="d-root" style={cardBox}>
        {loaded ? (
          <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse' }}>
            <tbody>
              {[['组件总数', '212'], ['分类', '26'], ['渲染器', '45'], ['构建产物', '67 KB gzip']].map(([k, v]) => (
                <tr key={k}><td style={{ padding: '5px 0', color: 'var(--text-muted)' }}>{k}</td><td style={{ textAlign: 'right', fontWeight: 600 }}>{v}</td></tr>
              ))}
            </tbody>
          </table>
        ) : (
          [0, 1, 2, 3].map((i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
              <span style={{ ...shimmer, height: 10, width: `${35 + i * 8}%` }} className="d-shimmer" />
              <span style={{ ...shimmer, height: 10, width: '18%' }} className="d-shimmer" />
            </div>
          ))
        )}
        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <button type="button" className="d-btn" style={{ padding: '3px 14px', fontSize: 12 }} onClick={() => setLoaded((l) => !l)}>{loaded ? '重置' : 'Load'}</button>
        </div>
      </div>
    )
  }

  if (variant === 'overlay') {
    return <OverlayLoadingInner />
  }

  if (variant === 'typing') {
    return (
      <div className="d-root">
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, minHeight: 44 }}>
          {text.slice(0, typed)}
          {typed < text.length || <span style={{ opacity: 0 }}>·</span>}
          <span className="d-caret-blink" style={{ display: 'inline-block', width: 2, height: 14, background: 'var(--accent)', verticalAlign: 'text-bottom', marginLeft: 1 }} />
        </p>
        <button type="button" className="d-btn" style={{ padding: '2px 12px', fontSize: 11, marginTop: 8 }} onClick={() => setTyped(0)}>Replay</button>
      </div>
    )
  }

  return null
}

function OverlayLoadingInner() {
  const [busy, setBusy] = useState(true)
  return (
    <div className="d-root" style={{ position: 'relative', border: '1px solid var(--border)', borderRadius: 10, padding: 14, width: '100%', minHeight: 96 }}>
      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>数据面板</div>
      <div className="d-label" style={{ margin: 0 }}>这里是面板正文内容占位。</div>
      <button type="button" className="d-btn" style={{ marginTop: 10, padding: '3px 12px', fontSize: 12 }} onClick={() => setBusy(true)}>Refresh</button>
      {busy && (
        <div style={{ position: 'absolute', inset: 0, borderRadius: 10, background: 'color-mix(in srgb, var(--surface) 72%, transparent)', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(1px)' }}>
          <span className="d-spinner" />
          <span className="d-label" style={{ margin: 0 }}>加载中</span>
        </div>
      )}
      <AutoHide busy={busy} setBusy={setBusy} />
    </div>
  )
}

function AutoHide({ busy, setBusy }) {
  useEffect(() => {
    if (!busy) return
    const t = setTimeout(() => setBusy(false), 2000)
    return () => clearTimeout(t)
  }, [busy, setBusy])
  return null
}

const cardBox = { border: '1px solid var(--border)', borderRadius: 10, padding: 12, width: '100%', background: 'var(--surface)' }

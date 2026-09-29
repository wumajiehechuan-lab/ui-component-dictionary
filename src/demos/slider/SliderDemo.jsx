import { useRef, useState } from 'react'

/**
 * 滑块 demo：基础/区间/刻度/垂直/输入/气泡/渐变/音量 参数化。
 * 轨道统一用百分比定位，支持横向与纵向。
 */
export default function SliderDemo({ min = 0, max = 100, defaultValue = 50, range, marks, vertical, withInput, tooltip, gradient, volume }) {
  const initial = Array.isArray(defaultValue) ? defaultValue : [defaultValue]
  const [vals, setVals] = useState(initial)
  const [drag, setDrag] = useState(null)
  const [muted, setMuted] = useState(false)
  const prevVol = useRef(45)
  const trackRef = useRef(null)

  const pct = (v) => ((v - min) / (max - min)) * 100

  const valueFromEvent = (e) => {
    const rect = trackRef.current.getBoundingClientRect()
    const raw = vertical
      ? min + (1 - (e.clientY - rect.top) / rect.height) * (max - min)
      : min + ((e.clientX - rect.left) / rect.width) * (max - min)
    let v = Math.round(Math.max(min, Math.min(max, raw)))
    if (marks) v = marks.reduce((a, b) => (Math.abs(b - raw) < Math.abs(a - raw) ? b : a), marks[0])
    return v
  }

  const applyValue = (idx, v) => {
    setVals((prev) => {
      const next = [...prev]
      if (range) next[idx] = idx === 0 ? Math.min(v, prev[1]) : Math.max(v, prev[0])
      else next[0] = v
      return next
    })
  }

  const onTrackDown = (e) => {
    const v = valueFromEvent(e)
    const idx = range ? (Math.abs(v - vals[0]) <= Math.abs(v - vals[1]) ? 0 : 1) : 0
    applyValue(idx, v)
    setDrag(idx)
    const move = (ev) => applyValue(idx, valueFromEvent(ev))
    const up = () => {
      setDrag(null)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
  }

  const Thumb = ({ idx }) => (
    <span
      role="slider"
      aria-valuenow={vals[idx]}
      aria-valuemin={min}
      aria-valuemax={max}
      tabIndex={0}
      onKeyDown={(e) => {
        const d = e.key === 'ArrowRight' || e.key === 'ArrowUp' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowDown' ? -1 : 0
        if (d) { e.preventDefault(); applyValue(idx, Math.max(min, Math.min(max, vals[idx] + d))) }
      }}
      style={{
        position: 'absolute',
        left: vertical ? '50%' : `${pct(vals[idx])}%`,
        bottom: vertical ? `${pct(vals[idx])}%` : undefined,
        top: vertical ? undefined : '50%',
        transform: `translate(${vertical ? '-50%, 50%' : '-50%, -50%'}) scale(${drag === idx ? 1.2 : 1})`,
        width: 16,
        height: 16,
        borderRadius: '50%',
        background: 'var(--surface)',
        border: '2px solid var(--accent)',
        boxShadow: 'var(--shadow)',
        cursor: 'grab',
        transition: drag === idx ? 'none' : 'transform .1s ease',
      }}
    >
      {tooltip && drag === idx && (
        <span style={{ position: 'absolute', bottom: 22, left: '50%', transform: 'translateX(-50%)', background: 'var(--text)', color: 'var(--bg)', fontSize: 11, borderRadius: 5, padding: '2px 6px', whiteSpace: 'nowrap' }}>
          {vals[idx]}
        </span>
      )}
    </span>
  )

  const lo = range ? vals[0] : min
  const hi = range ? vals[1] : vals[0]
  const mutedNow = volume && (muted || vals[0] === 0)

  const sliderEl = (
    <div style={{ display: 'flex', alignItems: vertical ? 'flex-end' : 'center', gap: 12, width: '100%' }}>
      {volume && (
        <button
          type="button"
          className="d-btn"
          style={{ border: 'none', background: 'transparent', fontSize: 16, padding: 2 }}
          aria-label="静音切换"
          onClick={() => {
            if (mutedNow) { setVals([prevVol.current]); setMuted(false) } else { prevVol.current = vals[0] || 45; setVals([0]); setMuted(true) }
          }}
        >
          {mutedNow ? '🔇' : '🔊'}
        </button>
      )}
      <div
        ref={trackRef}
        onPointerDown={onTrackDown}
        style={{
          position: 'relative',
          background: gradient || (mutedNow ? 'var(--border)' : 'var(--border)'),
          borderRadius: 999,
          width: vertical ? 6 : '100%',
          height: vertical ? 120 : 6,
          cursor: 'pointer',
          flexShrink: 0,
        }}
      >
        {!gradient && (
          <span
            style={{
              position: 'absolute',
              background: 'var(--accent)',
              borderRadius: 999,
              left: vertical ? 0 : `${pct(lo)}%`,
              bottom: vertical ? `${pct(lo)}%` : 0,
              width: vertical ? '100%' : `${pct(hi) - pct(lo)}%`,
              height: vertical ? `${pct(hi) - pct(lo)}%` : '100%',
              transition: drag === null ? 'none' : 'none',
            }}
          />
        )}
        {marks && !vertical && marks.map((m) => (
          <span key={m} style={{ position: 'absolute', left: `${pct(m)}%`, top: 10, transform: 'translateX(-50%)', fontSize: 10, color: 'var(--text-muted)' }}>{m}</span>
        ))}
        <Thumb idx={0} />
        {range && <Thumb idx={1} />}
      </div>
      {!withInput && !volume && (
        <span className="d-label" style={{ margin: 0, whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>
          {range ? `${vals[0]} – ${vals[1]}` : `${vals[0]}${gradient ? '°' : ''}`}
        </span>
      )}
      {withInput && (
        <input
          className="d-input"
          type="number"
          aria-label="精确数值"
          value={vals[0]}
          onChange={(e) => { const v = Number(e.target.value); if (!Number.isNaN(v)) applyValue(0, Math.max(min, Math.min(max, v))) }}
          style={{ width: 68 }}
        />
      )}
    </div>
  )

  return <div className="d-root">{sliderEl}</div>
}

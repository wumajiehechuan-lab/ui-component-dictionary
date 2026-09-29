import { useEffect, useRef, useState } from 'react'

const WEEK = ['日', '一', '二', '三', '四', '五', '六']
const ymd = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
const sameDay = (a, b) => a && b && ymd(a) === ymd(b)

function monthGrid(year, month) {
  const first = new Date(year, month, 1)
  const start = new Date(first)
  start.setDate(1 - first.getDay())
  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    return d
  })
}

/** 日期时间类 demo：10 条数据一个渲染器（variant 参数化） */
export default function CalendarDemo({ variant = 'date-picker', placeholder, presets, slots, disabled, seconds = 90 }) {
  const today = new Date()
  const [open, setOpen] = useState(variant === 'inline' || variant === 'week')
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [picked, setPicked] = useState(null)
  const [range, setRange] = useState([null, null])
  const [time, setTime] = useState('09:30')
  const [slot, setSlot] = useState(null)
  const [preset, setPreset] = useState(null)
  const [left, setLeft] = useState(seconds)
  const grid = monthGrid(cursor.getFullYear(), cursor.getMonth())

  useEffect(() => {
    if (variant !== 'countdown') return
    const t = setInterval(() => setLeft((s) => (s <= 0 ? seconds : s - 1)), 1000)
    return () => clearInterval(t)
  }, [variant, seconds])

  const panel = (children) => (
    <div className="d-root" style={{ position: 'relative' }}>
      {children}
    </div>
  )

  const header = (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
      <button type="button" className="d-btn" style={{ border: 'none', background: 'transparent', padding: '2px 8px' }} aria-label="上一月" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}>‹</button>
      <strong style={{ fontSize: 13 }}>{cursor.getFullYear()} 年 {cursor.getMonth() + 1} 月</strong>
      <button type="button" className="d-btn" style={{ border: 'none', background: 'transparent', padding: '2px 8px' }} aria-label="下一月" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}>›</button>
    </div>
  )

  const dayCell = (d) => {
    const other = d.getMonth() !== cursor.getMonth()
    const isToday = sameDay(d, today)
    const isPicked = sameDay(d, picked) || (range[0] && sameDay(d, range[0])) || (range[1] && sameDay(d, range[1]))
    const inRange = range[0] && range[1] && d > range[0] && d < range[1]
    return (
      <button
        key={ymd(d)}
        type="button"
        onClick={() => {
          if (variant === 'range') {
            if (!range[0] || (range[0] && range[1])) setRange([d, null])
            else if (d < range[0]) setRange([d, range[0]])
            else setRange([range[0], d])
          } else {
            setPicked(d)
            if (variant === 'date-picker' || variant === 'month') setOpen(false)
          }
        }}
        style={{
          border: 'none',
          borderRadius: 6,
          background: isPicked ? 'var(--accent)' : inRange ? 'var(--accent-soft)' : 'transparent',
          color: other ? 'var(--text-muted)' : isPicked ? 'var(--accent-text)' : 'var(--text)',
          outline: isToday && !isPicked ? '1px solid var(--accent)' : 'none',
          fontSize: 12,
          padding: '4px 0',
          cursor: 'pointer',
        }}
      >
        {d.getDate()}
      </button>
    )
  }

  if (variant === 'countdown') {
    const h = String(Math.floor(left / 3600)).padStart(2, '0')
    const m = String(Math.floor((left % 3600) / 60)).padStart(2, '0')
    const s = String(left % 60).padStart(2, '0')
    const urgent = left <= 10
    return panel(
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }} role="timer" aria-label="倒计时">
        {[h, m, s].map((v, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ background: urgent ? 'var(--danger)' : 'var(--code-bg)', color: urgent ? '#fff' : 'var(--text)', borderRadius: 8, padding: '8px 10px', fontVariantNumeric: 'tabular-nums', fontWeight: 700, fontSize: 18 }}>{v}</span>
            {i < 2 && <strong style={{ color: 'var(--text-muted)' }}>:</strong>}
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'slots') {
    return panel(
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, width: '100%' }}>
        {slots.map((sl) => {
          const off = disabled?.includes(sl)
          return (
            <button key={sl} type="button" disabled={off} className="d-btn" style={{ fontSize: 12, padding: '6px 0', opacity: off ? 0.4 : 1, background: slot === sl ? 'var(--accent)' : 'var(--surface)', color: slot === sl ? 'var(--accent-text)' : 'var(--text)', borderColor: slot === sl ? 'var(--accent)' : undefined }} onClick={() => setSlot(sl)}>
              {sl}
            </button>
          )
        })}
      </div>
    )
  }

  if (variant === 'relative') {
    return panel(
      <div style={{ width: '100%' }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {presets.map((p) => (
            <button key={p} type="button" className="d-btn" style={{ fontSize: 12, padding: '4px 10px', borderRadius: 999, background: preset === p ? 'var(--accent-soft)' : 'var(--surface)', color: preset === p ? 'var(--accent)' : 'var(--text)', borderColor: preset === p ? 'var(--accent)' : undefined }} onClick={() => setPreset(p)}>
              {p}
            </button>
          ))}
        </div>
        <div className="d-label" style={{ marginTop: 8 }}>
          {preset && preset !== '自定义' ? `${preset}（${today.getMonth() + 1}-${today.getDate()} 起）` : '选择一个快捷区间'}
        </div>
      </div>
    )
  }

  if (variant === 'time') {
    return panel(
      <div>
        <input
          className="d-input"
          placeholder={placeholder}
          value={time}
          onChange={(e) => setTime(e.target.value)}
          onFocus={() => setOpen(true)}
          readOnly
          aria-label="时间选择"
        />
        {open && (
          <div className="d-menu" style={{ display: 'flex', gap: 4 }}>
            <div style={{ flex: 1, maxHeight: 120, overflowY: 'auto' }}>
              {Array.from({ length: 24 }, (_, h) => String(h).padStart(2, '0')).map((h) => (
                <button key={h} type="button" className={`d-option${time.startsWith(h) ? ' selected' : ''}`} onClick={() => { setTime(h + time.slice(2)); }}>{h} 时</button>
              ))}
            </div>
            <div style={{ flex: 1, maxHeight: 120, overflowY: 'auto' }}>
              {['00', '15', '30', '45'].map((mm) => (
                <button key={mm} type="button" className={`d-option${time.endsWith(mm) ? ' selected' : ''}`} onClick={() => { setTime(time.slice(0, 3) + mm); setOpen(false) }}>{mm} 分</button>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  if (variant === 'datetime') {
    return panel(
      <div>
        <input className="d-input" placeholder={placeholder} value={picked ? `${ymd(picked)} ${time}` : ''} readOnly aria-label="日期时间" />
        {open && (
          <div className="d-menu" style={{ maxWidth: 260 }}>
            {header}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
              {WEEK.map((w) => <span key={w} className="d-label" style={{ textAlign: 'center', margin: 0 }}>{w}</span>)}
              {grid.map(dayCell)}
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 8, alignItems: 'center' }}>
              <input className="d-input" type="time" value={time} onChange={(e) => setTime(e.target.value)} style={{ flex: 1 }} aria-label="时间" />
              <button type="button" className="d-btn" style={{ background: 'var(--accent)', color: 'var(--accent-text)', borderColor: 'var(--accent)', padding: '6px 14px' }} disabled={!picked} onClick={() => setOpen(false)}>OK</button>
            </div>
          </div>
        )}
      </div>
    )
  }

  // date-picker / inline / range / week / month 共用日历网格
  return panel(
    <div>
      {variant !== 'inline' && variant !== 'week' && (
        <input className="d-input" placeholder={placeholder} readOnly value={
          variant === 'range' ? (range[0] ? `${ymd(range[0])} — ${range[1] ? ymd(range[1]) : '…'}` : '') : picked ? ymd(picked) : ''
        } aria-label={placeholder || '日期'} onFocus={() => setOpen(true)} />
      )}
      {open && (
        <div className={variant === 'inline' || variant === 'week' ? '' : 'd-menu'} style={variant === 'inline' || variant === 'week' ? { border: '1px solid var(--border)', borderRadius: 8, padding: 10, background: 'var(--surface)', width: '100%' } : { maxWidth: 250 }}>
          {header}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
            {WEEK.map((w) => <span key={w} className="d-label" style={{ textAlign: 'center', margin: 0 }}>{w}</span>)}
            {grid.map(dayCell)}
          </div>
          {variant === 'range' && <div className="d-label" style={{ marginTop: 6 }}>再次点击完成范围选择</div>}
        </div>
      )}
    </div>
  )
}

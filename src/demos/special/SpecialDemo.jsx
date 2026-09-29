import { useRef, useState } from 'react'
import { Dropdown } from '../_shared/Dropdown.jsx'
import { useClickOutside } from '../_shared/useClickOutside.js'

/** 星级评分 */
export function RatingDemo({ max = 5, defaultValue = 0 }) {
  const [val, setVal] = useState(defaultValue)
  const [hover, setHover] = useState(null)
  const shown = hover ?? val
  return (
    <div className="d-root" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div role="slider" aria-label="评分" aria-valuenow={val} aria-valuemin={0} aria-valuemax={max} onMouseLeave={() => setHover(null)} style={{ display: 'flex', gap: 2 }}>
        {Array.from({ length: max }, (_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`${i + 1} 星`}
            onMouseEnter={() => setHover(i + 1)}
            onClick={() => setVal(val === i + 1 ? 0 : i + 1)}
            style={{ border: 'none', background: 'transparent', fontSize: 22, padding: 0, color: i < shown ? '#f5b301' : 'var(--border-strong)', transition: 'color .12s ease', cursor: 'pointer', lineHeight: 1 }}
          >
            ★
          </button>
        ))}
      </div>
      <span className="d-label" style={{ margin: 0 }}>{val || '未评分'}</span>
    </div>
  )
}

/** 取色器（预设色板） */
export function ColorPickerDemo({ colors = [], defaultValue }) {
  const [val, setVal] = useState(defaultValue || colors[0])
  const [open, setOpen] = useState(false)
  const ref = useClickOutside(() => setOpen(false), open)
  return (
    <div className="d-root" ref={ref} style={{ maxWidth: 180 }}>
      <button type="button" className="d-btn" style={{ width: '100%', justifyContent: 'flex-start', gap: 8 }} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <span style={{ width: 18, height: 18, borderRadius: 5, background: val, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.15)' }} />
        <code style={{ fontSize: 12 }}>{val}</code>
      </button>
      {open && (
        <div className="d-menu" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, padding: 8 }}>
          {colors.map((c) => (
            <button
              key={c}
              type="button"
              aria-label={c}
              onClick={() => { setVal(c); setOpen(false) }}
              style={{ width: 30, height: 30, borderRadius: 7, border: val === c ? '2px solid var(--accent)' : 'none', background: c, cursor: 'pointer' }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

/** 搜索输入框 */
export function SearchInputDemo({ placeholder }) {
  const [text, setText] = useState('')
  const [searching, setSearching] = useState(false)
  return (
    <div className="d-root">
      <div className="d-select-box" style={{ borderRadius: 999, padding: '4px 12px', gap: 8 }}>
        <span className="d-placeholder" aria-hidden>⌕</span>
        <input
          className="d-input"
          style={{ border: 'none', background: 'transparent', padding: 0, flex: 1 }}
          placeholder={placeholder}
          aria-label="搜索"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { setSearching(true); setTimeout(() => setSearching(false), 900) } }}
        />
        {text && (
          <button type="button" className="d-chip-x" aria-label="清空" onClick={() => setText('')}>✕</button>
        )}
      </div>
      {searching && <div className="d-label" style={{ marginTop: 6 }}>搜索中…</div>}
    </div>
  )
}

/** 手机号输入 */
export function PhoneInputDemo({ codes = [] }) {
  const [code, setCode] = useState(codes[0])
  const [digits, setDigits] = useState('')
  const valid = digits.length === 11
  return (
    <div className="d-root">
      <div style={{ display: 'flex', gap: 6 }}>
        <Dropdown
          trigger={(open) => (
            <button type="button" className="d-btn" style={{ whiteSpace: 'nowrap' }}>{code} <span className={`d-select-arrow${open ? ' open' : ''}`}>▼</span></button>
          )}
        >
          {codes.map((c) => (
            <button key={c} type="button" className={`d-option${code === c ? ' selected' : ''}`} onClick={() => setCode(c)}>{c}</button>
          ))}
        </Dropdown>
        <input
          className="d-input"
          inputMode="numeric"
          aria-label="手机号"
          placeholder="输入手机号"
          value={digits.replace(/(\d{3})(\d{4})(\d{0,4})/, '$1 $2 $3').trim()}
          onChange={(e) => setDigits(e.target.value.replace(/\D/g, '').slice(0, 11))}
          style={{ flex: 1 }}
        />
      </div>
      {digits && (
        <div className="d-label" style={{ marginTop: 6, color: valid ? 'var(--ok)' : 'var(--danger)' }}>
          {valid ? '✓ 格式正确' : '✗ 请输入 11 位手机号'}
        </div>
      )}
    </div>
  )
}

/** 金额输入 */
export function AmountInputDemo({ prefix = '¥', placeholder }) {
  const [raw, setRaw] = useState('')
  const [blur, setBlur] = useState(false)
  const num = Number(raw.replace(/,/g, ''))
  const shown = raw === '' ? '' : blur && !Number.isNaN(num) ? num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') : raw
  const invalid = raw !== '' && (Number.isNaN(num) || num < 0)
  return (
    <div className="d-root">
      <div className="d-select-box" style={{ padding: '4px 12px' }}>
        <span className="d-placeholder" style={{ fontWeight: 600 }}>{prefix}</span>
        <input
          className="d-input"
          inputMode="decimal"
          aria-label="金额"
          placeholder={placeholder}
          value={shown}
          onChange={(e) => { setRaw(e.target.value.replace(/[^\d.]/g, '')); setBlur(false) }}
          onBlur={() => setBlur(true)}
          style={{ border: 'none', background: 'transparent', padding: 0, flex: 1 }}
        />
      </div>
      {invalid && <div className="d-label" style={{ marginTop: 6, color: 'var(--danger)' }}>请输入有效金额</div>}
    </div>
  )
}

/** 签名板 */
export function SignatureDemo() {
  const canvasRef = useRef(null)
  const drawing = useRef(false)
  const [hasInk, setHasInk] = useState(false)

  const pos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    return [e.clientX - rect.left, e.clientY - rect.top]
  }
  const start = (e) => {
    drawing.current = true
    const ctx = canvasRef.current.getContext('2d')
    ctx.beginPath()
    ctx.moveTo(...pos(e))
  }
  const move = (e) => {
    if (!drawing.current) return
    const ctx = canvasRef.current.getContext('2d')
    ctx.strokeStyle = 'var(--text)'
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.lineTo(...pos(e))
    ctx.stroke()
    setHasInk(true)
  }
  const clear = () => {
    const c = canvasRef.current
    c.getContext('2d').clearRect(0, 0, c.width, c.height)
    setHasInk(false)
  }

  return (
    <div className="d-root">
      <canvas
        ref={canvasRef}
        width={260}
        height={90}
        aria-label="签名板"
        style={{ width: '100%', border: '1px solid var(--border-strong)', borderRadius: 8, background: 'var(--surface)', borderBottom: '1px dashed var(--border-strong)', touchAction: 'none', cursor: 'crosshair' }}
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={() => (drawing.current = false)}
        onPointerLeave={() => (drawing.current = false)}
      />
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <button type="button" className="d-btn" style={{ padding: '4px 12px', fontSize: 12 }} onClick={clear}>Clear</button>
        <button type="button" className="d-btn" style={{ padding: '4px 12px', fontSize: 12, opacity: hasInk ? 1 : 0.5 }} disabled={!hasInk} onClick={() => { }}>Done</button>
      </div>
    </div>
  )
}

/** 表情选择器 */
export function EmojiPickerDemo({ groups = {} }) {
  const names = Object.keys(groups)
  const [tab, setTab] = useState(names[0])
  const [open, setOpen] = useState(false)
  const [preview, setPreview] = useState(null)
  const ref = useClickOutside(() => setOpen(false), open)
  return (
    <div className="d-root" ref={ref} style={{ maxWidth: 220 }}>
      <button type="button" className="d-btn" aria-label="插入表情" aria-expanded={open} onClick={() => setOpen((o) => !o)}>☺ 表情</button>
      {open && (
        <div className="d-menu" style={{ maxWidth: 220 }}>
          <div style={{ display: 'flex', gap: 4, marginBottom: 6 }}>
            {names.map((n) => (
              <button key={n} type="button" className="d-tab" style={{ fontSize: 12, padding: '3px 10px', background: tab === n ? 'var(--accent-soft)' : 'transparent', color: tab === n ? 'var(--accent)' : 'var(--text-muted)', borderRadius: 6 }} onClick={() => setTab(n)}>
                {n}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 2 }}>
            {groups[tab].map((em) => (
              <button key={em} type="button" style={{ border: 'none', background: 'transparent', fontSize: 17, padding: '3px 0', borderRadius: 6, cursor: 'pointer' }}
                onMouseEnter={() => setPreview(em)}
                onClick={() => { setPreview(em); setOpen(false) }}
              >
                {em}
              </button>
            ))}
          </div>
          {preview && <div className="d-label" style={{ marginTop: 6 }}>选中：{preview}</div>}
        </div>
      )}
    </div>
  )
}

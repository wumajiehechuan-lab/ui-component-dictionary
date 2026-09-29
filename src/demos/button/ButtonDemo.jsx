import { useState } from 'react'
import { Dropdown } from '../_shared/Dropdown.jsx'

const base = 'd-btn'

/** 按钮类 demo：一个渲染器服务 10 条数据（variant 参数化） */
export default function ButtonDemo({ variant = 'primary', label = '按钮', options, defaultValue, menu, ariaLabel }) {
  const [loading, setLoading] = useState(false)
  const [sel, setSel] = useState(defaultValue || options?.[0])
  const [sent, setSent] = useState(false)

  if (variant === 'group') {
    return (
      <div className="d-root" style={{ display: 'inline-flex', borderRadius: 9, overflow: 'hidden', border: '1px solid var(--border-strong)' }}>
        {options.map((o, i) => (
          <button
            key={o}
            type="button"
            className={base}
            style={{
              border: 'none',
              borderRadius: 0,
              borderRight: i < options.length - 1 ? '1px solid var(--border-strong)' : 'none',
              background: sel === o ? 'var(--accent)' : 'var(--surface)',
              color: sel === o ? 'var(--accent-text)' : 'var(--text)',
            }}
            onClick={() => setSel(o)}
          >
            {o}
          </button>
        ))}
      </div>
    )
  }

  if (variant === 'split') {
    return (
      <div className="d-root" style={{ display: 'inline-flex' }}>
        <button type="button" className={base} style={{ borderRadius: '8px 0 0 8px', background: 'var(--accent)', color: 'var(--accent-text)', borderColor: 'var(--accent)' }}>
          {label}
        </button>
        <Dropdown
          align="right"
          className=""
          trigger={(open) => (
            <button type="button" className={base} style={{ borderRadius: '0 8px 8px 0', borderLeft: 'none', background: 'var(--accent)', color: 'var(--accent-text)', borderColor: 'var(--accent)', padding: '7px 8px' }} aria-label="更多保存选项">
              <span className={`d-select-arrow${open ? ' open' : ''}`}>▼</span>
            </button>
          )}
        >
          {menu.map((m) => (
            <button key={m} type="button" className="d-option">{m}</button>
          ))}
        </Dropdown>
      </div>
    )
  }

  if (variant === 'fab') {
    return (
      <div className="d-root" style={{ minHeight: 80, position: 'relative', width: '100%' }}>
        <button
          type="button"
          aria-label={ariaLabel || label}
          className={base}
          style={{ position: 'absolute', right: 16, bottom: 8, width: 48, height: 48, borderRadius: '50%', background: 'var(--accent)', color: 'var(--accent-text)', borderColor: 'var(--accent)', fontSize: 22, boxShadow: 'var(--shadow-lg)' }}
        >
          {label}
        </button>
      </div>
    )
  }

  if (variant === 'loading') {
    return (
      <button
        type="button"
        className={base}
        style={{ background: 'var(--accent)', color: 'var(--accent-text)', borderColor: 'var(--accent)', opacity: loading ? 0.85 : 1 }}
        onClick={() => setLoading((l) => !l)}
      >
        {loading && <span className="d-spinner" style={{ borderTopColor: 'var(--accent-text)', width: 12, height: 12 }} />}
        {label}
      </button>
    )
  }

  if (variant === 'icon') {
    return (
      <button type="button" className={base} aria-label={ariaLabel || label} style={{ width: 36, height: 36, fontSize: 16, padding: 0 }}>
        {label}
      </button>
    )
  }

  const styleByVariant = {
    primary: { background: 'var(--accent)', color: 'var(--accent-text)', borderColor: 'var(--accent)' },
    secondary: {},
    dashed: { borderStyle: 'dashed', color: 'var(--text-muted)' },
    text: { border: 'none', background: 'transparent', color: 'var(--accent)' },
    danger: { background: 'var(--danger)', color: '#fff', borderColor: 'var(--danger)' },
  }[variant] || {}

  return (
    <button type="button" className={base} style={styleByVariant}>
      {variant === 'dashed' && <span aria-hidden>＋</span>}
      {label}
    </button>
  )
}

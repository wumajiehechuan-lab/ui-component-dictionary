import { useEffect, useRef, useState } from 'react'
import { useClickOutside } from '../_shared/useClickOutside.js'

/** 浮层类 demo：modal/drawer/popover/tooltip/popconfirm/lightbox/bottom-sheet/fullscreen/hover-flyout/toast */
export default function OverlayDemo({ variant, title, body, text, tip, trigger, columns, options, message, sample }) {
  const [open, setOpen] = useState(false)

  if (variant === 'modal') {
    return (
      <div className="d-root" style={{ textAlign: 'center' }}>
        <button type="button" className="d-btn" onClick={() => setOpen(true)}>打开对话框</button>
        {open && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setOpen(false)}>
            <div role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()} style={{ background: 'var(--surface)', borderRadius: 14, boxShadow: 'var(--shadow-lg)', padding: 20, width: 280, animation: 'd-pop .2s ease' }}>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{title}</div>
              <p className="d-label" style={{ margin: '0 0 16px' }}>{body}</p>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <button type="button" className="d-btn" style={{ padding: '5px 14px' }} onClick={() => setOpen(false)}>取消</button>
                <button type="button" className="d-btn" style={{ padding: '5px 14px', background: 'var(--danger)', color: '#fff', borderColor: 'var(--danger)' }} onClick={() => setOpen(false)}>确定</button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  if (variant === 'drawer') {
    return (
      <div className="d-root" style={{ textAlign: 'center' }}>
        <button type="button" className="d-btn" onClick={() => setOpen(true)}>打开抽屉</button>
        {open && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,.45)' }} onClick={() => setOpen(false)}>
            <div role="dialog" aria-label={title} style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 280, background: 'var(--surface)', padding: 16, animation: 'd-slide-left .25s ease' }} onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <strong style={{ fontSize: 14 }}>{title}</strong>
                <button type="button" className="d-chip-x" aria-label="关闭" onClick={() => setOpen(false)}>✕</button>
              </div>
              {['概要信息', '修改记录', '关联文件', '操作日志'].map((r) => (
                <div key={r} style={{ padding: '9px 0', borderBottom: '1px solid var(--border)', fontSize: 12.5, color: 'var(--text-muted)' }}>{r}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  if (variant === 'popover') {
    return (
      <div className="d-root" style={{ position: 'relative', textAlign: 'center', padding: '26px 0' }}>
        <button type="button" className="d-btn" aria-expanded={open} onClick={() => setOpen((o) => !o)}>点我气泡</button>
        {open && (
          <div className="d-menu" style={{ bottom: '100%', top: 'auto', marginBottom: 8, left: '50%', transform: 'translateX(-50%)', right: 'auto', width: 200, textAlign: 'left' }}>
            <strong style={{ fontSize: 13 }}>{title}</strong>
            <p className="d-label" style={{ margin: '4px 0 0' }}>{body}</p>
            <span style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', border: '6px solid transparent', borderTopColor: 'var(--border-strong)' }} />
          </div>
        )}
      </div>
    )
  }

  if (variant === 'tooltip') {
    return (
      <div className="d-root" style={{ textAlign: 'center', padding: '20px 0' }}>
        <button type="button" className="d-btn" aria-label={tip} style={{ position: 'relative' }}
          onMouseEnter={(e) => { const t = e.currentTarget.querySelector('.d-tip'); setTimeout(() => (t.style.opacity = 1), 300) }}
          onMouseLeave={(e) => { const t = e.currentTarget.querySelector('.d-tip'); t.style.opacity = 0 }}
          onFocus={(e) => { const t = e.currentTarget.querySelector('.d-tip'); t.style.opacity = 1 }}
          onBlur={(e) => { const t = e.currentTarget.querySelector('.d-tip'); t.style.opacity = 0 }}
        >
          ⓘ
          <span className="d-tip" style={{ position: 'absolute', bottom: '130%', left: '50%', transform: 'translateX(-50%)', background: 'var(--text)', color: 'var(--bg)', fontSize: 11, borderRadius: 6, padding: '4px 8px', whiteSpace: 'nowrap', opacity: 0, transition: 'opacity .1s ease', pointerEvents: 'none' }}>{tip}</span>
        </button>
      </div>
    )
  }

  if (variant === 'popconfirm') {
    return <PopconfirmInner text={text} />
  }

  if (variant === 'lightbox') {
    return (
      <div className="d-root">
        <div
          role="button"
          tabIndex={0}
          aria-label="放大查看图片"
          onClick={() => setOpen(true)}
          onKeyDown={(e) => e.key === 'Enter' && setOpen(true)}
          style={{ width: 90, height: 64, borderRadius: 8, background: 'linear-gradient(135deg,#f472b6,#fb923c)', cursor: 'zoom-in', margin: '0 auto' }}
        />
        {open && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setOpen(false)}>
            <div style={{ width: 'min(70vw, 420px)', aspectRatio: '3/2', borderRadius: 12, background: 'linear-gradient(135deg,#60a5fa,#34d399)', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
              <button type="button" aria-label="关闭预览" onClick={() => setOpen(false)} style={{ position: 'absolute', top: -34, right: 0, border: 'none', background: 'transparent', color: '#fff', fontSize: 18, cursor: 'pointer' }}>✕</button>
              {['‹', '›'].map((a, i) => (
                <button key={a} type="button" aria-label={i ? '下一张' : '上一张'} style={{ position: 'absolute', top: '50%', [i ? 'right' : 'left']: -46, transform: 'translateY(-50%)', border: 'none', background: 'transparent', color: '#fff', fontSize: 22, cursor: 'pointer' }}>{a}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  if (variant === 'bottom-sheet') {
    return (
      <div className="d-root" style={{ position: 'relative', height: 190, borderRadius: 16, border: '1px solid var(--border)', overflow: 'hidden', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button type="button" className="d-btn" onClick={() => setOpen(true)}>打开底部面板</button>
        {open && (
          <>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.4)' }} onClick={() => setOpen(false)} />
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: 'var(--surface)', borderRadius: '16px 16px 0 0', padding: 10, animation: 'd-slide-up .25s ease' }}>
              <span style={{ display: 'block', width: 36, height: 4, borderRadius: 4, background: 'var(--border-strong)', margin: '0 auto 10px' }} />
              {options.map((o) => (
                <button key={o} type="button" className="d-tree-row" style={{ justifyContent: 'center', padding: '10px 0', fontSize: 13 }} onClick={() => setOpen(false)}>{o}</button>
              ))}
            </div>
          </>
        )}
      </div>
    )
  }

  if (variant === 'fullscreen') {
    return (
      <div className="d-root" style={{ position: 'relative', height: 170, borderRadius: 12, border: '1px solid var(--border)', overflow: 'hidden', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button type="button" className="d-btn" onClick={() => setOpen(true)}>⌘K 打开</button>
        {open && (
          <div style={{ position: 'absolute', inset: 0, background: 'var(--bg)', paddingTop: 34, animation: 'd-fade .15s ease' }}>
            <div style={{ maxWidth: 260, margin: '0 auto', position: 'relative' }}>
              <input className="d-input" autoFocus placeholder="输入命令或搜索…" aria-label="命令搜索" onKeyDown={(e) => e.key === 'Escape' && setOpen(false)} />
              <button type="button" className="d-chip-x" aria-label="关闭" style={{ position: 'absolute', right: 8, top: 8 }} onClick={() => setOpen(false)}>✕</button>
              <p className="d-label" style={{ marginTop: 8 }}>Esc 关闭 · 输入以筛选</p>
            </div>
          </div>
        )}
      </div>
    )
  }

  if (variant === 'hover-flyout') {
    return <FlyoutInner trigger={trigger} columns={columns} />
  }

  if (variant === 'toast') {
    return <ToastInner message={message} />
  }

  return null
}

function PopconfirmInner({ text }) {
  const [open, setOpen] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const ref = useClickOutside(() => setOpen(false), open)
  return (
    <div className="d-root" ref={ref} style={{ position: 'relative', textAlign: 'center' }}>
      <button type="button" className="d-btn" style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {deleted ? '已删除' : '删除'}
      </button>
      {open && !deleted && (
        <div className="d-menu" style={{ bottom: '100%', top: 'auto', marginBottom: 8, left: '50%', transform: 'translateX(-50%)', right: 'auto', width: 200, textAlign: 'left' }}>
          <p style={{ margin: '2px 0 10px', fontSize: 12.5, color: 'var(--text)' }}>⚠ {text}</p>
          <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
            <button type="button" className="d-btn" style={{ padding: '3px 12px', fontSize: 12 }} onClick={() => setOpen(false)}>取消</button>
            <button type="button" className="d-btn" style={{ padding: '3px 12px', fontSize: 12, background: 'var(--danger)', color: '#fff', borderColor: 'var(--danger)' }} onClick={() => { setDeleted(true); setOpen(false) }}>确定</button>
          </div>
        </div>
      )}
    </div>
  )
}

function FlyoutInner({ trigger, columns }) {
  const [show, setShow] = useState(false)
  const timer = useRef(null)
  return (
    <div className="d-root" style={{ display: 'flex', justifyContent: 'center', padding: '34px 0' }}>
      <div style={{ position: 'relative' }}
        onMouseEnter={() => { timer.current = setTimeout(() => setShow(true), 150) }}
        onMouseLeave={() => { clearTimeout(timer.current); setShow(false) }}
      >
        <button type="button" className="d-tab" style={{ fontWeight: 600 }}>{trigger} ▾</button>
        {show && (
          <div className="d-menu" style={{ top: '100%', left: '50%', transform: 'translateX(-50%)', right: 'auto', display: 'flex', gap: 18, padding: 12, width: 240 }}>
            {columns.map((col, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {col.map((l) => <button key={l} type="button" className="d-option" style={{ fontSize: 12.5 }}>{l}</button>)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ToastInner({ message }) {
  const [toasts, setToasts] = useState([])
  return (
    <div className="d-root" style={{ position: 'relative', height: 170, border: '1px dashed var(--border-strong)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <button type="button" className="d-btn" onClick={() => setToasts((ts) => (ts.length < 3 ? [...ts, Date.now()] : ts))}>Show toast</button>
      <div style={{ position: 'absolute', top: 8, right: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {toasts.map((id) => <ToastCard key={id} message={message} onDone={() => setToasts((ts) => ts.filter((t) => t !== id))} />)}
      </div>
    </div>
  )
}

function ToastCard({ message, onDone }) {
  const [leaving, setLeaving] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setLeaving(true), 3000)
    return () => clearTimeout(t)
  }, [])
  useEffect(() => {
    if (!leaving) return
    const t = setTimeout(onDone, 200)
    return () => clearTimeout(t)
  }, [leaving, onDone])
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 9, boxShadow: 'var(--shadow-lg)', padding: '7px 10px', fontSize: 12, minWidth: 170, opacity: leaving ? 0 : 1, transform: leaving ? 'translateX(12px)' : 'none', transition: 'all .2s ease' }}>
      <span style={{ color: 'var(--ok)' }}>✓</span>
      {message}
      <button type="button" className="d-chip-x" aria-label="关闭通知" onClick={() => setLeaving(true)}>✕</button>
    </div>
  )
}

import { useRef, useState } from 'react'

/** 卡片类 demo：media/profile/stat/pricing/action/expandable/product/hover-card/login/kanban */
export default function CardDemo({ variant, title, excerpt, meta, name, role, stats, label, value, delta, bars, plan, price, features, popular, desc, button, detail, origin, handle, bio, members, due }) {
  const [follow, setFollow] = useState(false)
  const [open, setOpen] = useState(false)
  const [cart, setCart] = useState(0)
  const [btn, setBtn] = useState('idle')
  const [pwd, setPwd] = useState('')
  const [email, setEmail] = useState('')
  const [logging, setLogging] = useState(false)
  const [show, setShow] = useState(false)
  const [dragging, setDragging] = useState(false)

  const card = { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, boxShadow: 'var(--shadow)', width: '100%', transition: 'transform .15s ease, box-shadow .15s ease' }

  if (variant === 'media') {
    return (
      <div className="d-root" style={{ ...card, overflow: 'hidden', cursor: 'pointer' }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)' }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow)' }}
      >
        <div style={{ height: 90, background: 'linear-gradient(135deg,#60a5fa,#a78bfa)' }} />
        <div style={{ padding: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 700 }}>{title}</div>
          <p className="d-label" style={{ margin: '4px 0 8px' }}>{excerpt}</p>
          <div className="d-label" style={{ margin: 0 }}>{meta}</div>
        </div>
      </div>
    )
  }

  if (variant === 'profile') {
    return (
      <div className="d-root" style={{ ...card, padding: 16, textAlign: 'center' }}>
        <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--accent-soft)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', fontSize: 20, fontWeight: 700 }}>{name.slice(0, 1)}</div>
        <div style={{ fontSize: 15, fontWeight: 700 }}>{name}</div>
        <div className="d-label" style={{ margin: '2px 0 10px' }}>{role}</div>
        <button type="button" className="d-btn" style={{ background: follow ? 'var(--surface)' : 'var(--accent)', color: follow ? 'var(--accent)' : 'var(--accent-text)', borderColor: 'var(--accent)', padding: '5px 20px' }} onClick={() => setFollow((f) => !f)}>
          {follow ? 'Following' : 'Follow'}
        </button>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 12, fontSize: 11, color: 'var(--text-muted)' }}>
          {stats.map((s) => <span key={s}>{s}</span>)}
        </div>
      </div>
    )
  }

  if (variant === 'stat') {
    const positive = !delta.startsWith('-')
    return (
      <div className="d-root" style={{ ...card, padding: 14 }}>
        <div className="d-label" style={{ margin: 0 }}>{label}</div>
        <div style={{ fontSize: 26, fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>{value}</div>
        <span title={`较上期 ${delta}`} style={{ fontSize: 12, color: positive ? 'var(--ok)' : 'var(--danger)', fontWeight: 600 }}>{delta}</span>
        <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 28, marginTop: 8 }}>
          {bars.map((b, i) => (
            <span key={i} style={{ flex: 1, height: `${(b / Math.max(...bars)) * 100}%`, background: i === bars.length - 1 ? 'var(--accent)' : 'var(--border)', borderRadius: 2 }} />
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'pricing') {
    return (
      <div className="d-root" style={{ ...card, padding: 16, borderColor: popular ? 'var(--accent)' : undefined, position: 'relative' }}>
        {popular && <span style={{ position: 'absolute', top: -9, right: 12, background: 'var(--accent)', color: 'var(--accent-text)', fontSize: 10, borderRadius: 999, padding: '2px 8px' }}>最受欢迎</span>}
        <div style={{ fontSize: 13, fontWeight: 600 }}>{plan}</div>
        <div style={{ fontSize: 24, fontWeight: 800, margin: '4px 0 10px' }}>{price}</div>
        <ul style={{ listStyle: 'none', margin: '0 0 12px', padding: 0, fontSize: 12.5, color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: 5 }}>
          {features.map((f) => <li key={f}><span style={{ color: 'var(--ok)', marginRight: 6 }}>✓</span>{f}</li>)}
        </ul>
        <button type="button" className="d-btn" style={{ width: '100%', justifyContent: 'center', background: 'var(--accent)', color: 'var(--accent-text)', borderColor: 'var(--accent)' }}>Choose</button>
      </div>
    )
  }

  if (variant === 'action') {
    return (
      <div className="d-root" style={{ ...card, padding: 16, textAlign: 'center' }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--accent-soft)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', fontSize: 18 }}>⛁</div>
        <div style={{ fontSize: 14, fontWeight: 700 }}>{title}</div>
        <p className="d-label" style={{ margin: '4px 0 12px' }}>{desc}</p>
        <button
          type="button"
          className="d-btn"
          style={{ background: 'var(--accent)', color: 'var(--accent-text)', borderColor: 'var(--accent)' }}
          onClick={() => { setBtn('loading'); setTimeout(() => setBtn('done'), 900) }}
        >
          {btn === 'loading' ? <span className="d-spinner" style={{ borderTopColor: 'var(--accent-text)', width: 12, height: 12 }} /> : btn === 'done' ? '✓ 已连接' : button}
        </button>
      </div>
    )
  }

  if (variant === 'expandable') {
    return (
      <div className="d-root" style={card}>
        <button type="button" onClick={() => setOpen((o) => !o)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', border: 'none', background: 'transparent', padding: 12, fontSize: 13.5, fontWeight: 600, color: 'var(--text)', cursor: 'pointer' }}>
          {title}
          <span style={{ transition: 'transform .2s ease', transform: open ? 'rotate(180deg)' : 'none' }}>▾</span>
        </button>
        {open && (
          <div style={{ padding: '0 12px 12px', fontSize: 12.5, color: 'var(--text-muted)' }}>
            {detail}
            <a href="#expandable" onClick={(e) => e.preventDefault()} style={{ color: 'var(--accent)', marginLeft: 6 }}>了解更多 →</a>
          </div>
        )}
      </div>
    )
  }

  if (variant === 'product') {
    return (
      <div className="d-root" style={{ ...card, overflow: 'hidden', width: '100%' }}>
        <div style={{ position: 'relative', height: 84, background: 'linear-gradient(135deg,#34d399,#22d3ee)' }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,.9)', fontSize: 12, opacity: 0, background: 'rgba(0,0,0,.25)', transition: 'opacity .15s ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
          >
            快速加入购物车
          </div>
        </div>
        <div style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13.5, fontWeight: 600 }}>{name}</div>
            <div><span style={{ color: 'var(--accent)', fontWeight: 700 }}>{price}</span> <span className="d-label" style={{ textDecoration: 'line-through', margin: 0 }}>{origin}</span></div>
          </div>
          <button type="button" className="d-btn" aria-label="加入购物车" style={{ width: 32, height: 32, padding: 0, borderRadius: '50%', background: 'var(--accent)', color: 'var(--accent-text)', borderColor: 'var(--accent)' }} onClick={() => setCart((c) => c + 1)}>🛒</button>
        </div>
        {cart > 0 && <div className="d-label" style={{ padding: '0 12px 10px', margin: 0 }}>已加购 {cart} 件</div>}
      </div>
    )
  }

  if (variant === 'hover-card') {
    return (
      <div className="d-root" style={{ position: 'relative', padding: '30px 0', textAlign: 'center' }}>
        <span
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          style={{ color: 'var(--accent)', fontWeight: 600, cursor: 'pointer' }}
        >
          {handle}
        </span>
        {show && (
          <div style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, boxShadow: 'var(--shadow-lg)', padding: 12, width: 200, textAlign: 'left', zIndex: 30 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--accent-soft)', color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{name.slice(0, 1)}</span>
              <strong style={{ fontSize: 13 }}>{name}</strong>
            </div>
            <p className="d-label" style={{ margin: '8px 0' }}>{bio}</p>
            <button type="button" className="d-btn" style={{ width: '100%', justifyContent: 'center', background: follow ? 'var(--surface)' : 'var(--accent)', color: follow ? 'var(--accent)' : 'var(--accent-text)', borderColor: 'var(--accent)', padding: '4px 0', fontSize: 12 }} onClick={() => setFollow((f) => !f)}>
              {follow ? 'Following' : 'Follow'}
            </button>
          </div>
        )}
      </div>
    )
  }

  if (variant === 'login') {
    return (
      <div className="d-root" style={{ ...card, padding: 18, maxWidth: 280, margin: '0 auto' }}>
        <div style={{ fontSize: 16, fontWeight: 700, textAlign: 'center', marginBottom: 12 }}>{title}</div>
        <input className="d-input" placeholder="邮箱" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="邮箱" style={{ marginBottom: 8 }} />
        <input className="d-input" type="password" placeholder="密码" value={pwd} onChange={(e) => setPwd(e.target.value)} aria-label="密码" style={{ marginBottom: 10 }} />
        <button
          type="button"
          className="d-btn"
          style={{ width: '100%', justifyContent: 'center', background: 'var(--accent)', color: 'var(--accent-text)', borderColor: 'var(--accent)' }}
          onClick={() => { setLogging(true); setTimeout(() => setLogging(false), 800) }}
        >
          {logging ? <span className="d-spinner" style={{ borderTopColor: 'var(--accent-text)', width: 12, height: 12 }} /> : 'Sign in'}
        </button>
        {!pwd && !logging && <div className="d-label" style={{ marginTop: 8, color: 'var(--danger)' }}>请输入密码</div>}
        <div style={{ textAlign: 'center', marginTop: 10 }}>
          <a href="#forgot" onClick={(e) => e.preventDefault()} style={{ fontSize: 12, color: 'var(--accent)' }}>忘记密码？</a>
        </div>
      </div>
    )
  }

  if (variant === 'kanban') {
    return (
      <div className="d-root" style={{ display: 'flex', gap: 10, width: '100%' }}>
        <div
          draggable
          onDragStart={() => setDragging(true)}
          onDragEnd={() => setDragging(false)}
          style={{ ...card, padding: 10, cursor: 'grab', borderLeft: '3px solid var(--accent)', opacity: dragging ? 0.5 : 1, boxShadow: dragging ? 'var(--shadow-lg)' : 'var(--shadow)' }}
        >
          <div style={{ fontSize: 13, fontWeight: 600 }}>{title}</div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 8, gap: 6 }}>
            {members?.map((m, i) => (
              <span key={i} style={{ width: 20, height: 20, borderRadius: '50%', background: ['var(--accent-soft)', 'var(--code-bg)'][i % 2], color: 'var(--accent)', fontSize: 10, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--surface)' }}>{m}</span>
            ))}
            <span className="d-label" style={{ marginLeft: 'auto', margin: 0 }}>⏰ {due}</span>
          </div>
        </div>
        <div style={{ ...card, padding: 10, opacity: 0.6, borderStyle: 'dashed', minHeight: 56, flex: 1 }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>拖到这里</div>
        </div>
      </div>
    )
  }

  return null
}

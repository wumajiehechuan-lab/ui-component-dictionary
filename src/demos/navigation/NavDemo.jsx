import { useRef, useState } from 'react'

/** 导航类 demo：breadcrumb/pagination/bottom/sidebar/topbar/anchor/ellipsis/mini/drawer/back-top/route-tabs */
export default function NavDemo({ variant, items = [], pages = 8, current: initCurrent = 1, active: initActive, sections, groups, tabs = [], tabsInit = 0, recs }) {
  const [current, setCurrent] = useState(initCurrent)
  const [active, setActive] = useState(initActive ?? items[0])
  const [expanded, setExpanded] = useState(false)
  const [openTabs, setOpenTabs] = useState(tabs)
  const [tabActive, setTabActive] = useState(tabs[tabsInit])
  const [drawer, setDrawer] = useState(false)
  const scrollRef = useRef(null)

  if (variant === 'breadcrumb' || variant === 'breadcrumb-ellipsis') {
    const idx = items.length - 1
    return (
      <div className="d-root" style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', fontSize: 13 }}>
        {items.map((it, i) => {
          const isCurrent = i === idx
          const collapsed = variant === 'breadcrumb-ellipsis' && !expanded && i > 0 && i < idx - 1
          if (collapsed) {
            return i === 1 ? (
              <button key="ellipsis" type="button" className="d-btn" style={{ padding: '0 8px', fontSize: 12 }} aria-label="展开层级" onClick={() => setExpanded(true)}>…</button>
            ) : null
          }
          return (
            <span key={it} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              {i > 0 && <span className="d-placeholder">›</span>}
              <span
                onClick={isCurrent ? undefined : () => setActive(it)}
                style={{ color: isCurrent ? 'var(--text-muted)' : 'var(--accent)', cursor: isCurrent ? 'default' : 'pointer' }}
                onMouseEnter={(e) => { if (!isCurrent) e.target.style.textDecoration = 'underline' }}
                onMouseLeave={(e) => { e.target.style.textDecoration = 'none' }}
              >
                {it}
              </span>
            </span>
          )
        })}
      </div>
    )
  }

  if (variant === 'pagination') {
    const nums = pages <= 6 ? Array.from({ length: pages }, (_, i) => i + 1) : [1, 2, 3, '…', pages]
    return (
      <div className="d-root" style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        <button type="button" className="d-btn" style={{ padding: '4px 10px' }} disabled={current === 1} onClick={() => setCurrent((c) => c - 1)}>‹</button>
        {nums.map((n, i) =>
          n === '…' ? (
            <span key={`e${i}`} className="d-label" style={{ margin: 0 }}>…</span>
          ) : (
            <button
              key={n}
              type="button"
              className="d-btn"
              style={{ padding: '4px 10px', background: current === n ? 'var(--accent)' : 'var(--surface)', color: current === n ? 'var(--accent-text)' : 'var(--text)', borderColor: current === n ? 'var(--accent)' : undefined }}
              onClick={() => setCurrent(n)}
            >
              {n}
            </button>
          )
        )}
        <button type="button" className="d-btn" style={{ padding: '4px 10px' }} disabled={current === pages} onClick={() => setCurrent((c) => c + 1)}>›</button>
      </div>
    )
  }

  if (variant === 'pagination-mini') {
    return (
      <div className="d-root" style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
        <button type="button" className="d-btn" style={{ padding: '4px 10px' }} disabled={current === 1} onClick={() => setCurrent((c) => c - 1)}>‹</button>
        <span style={{ fontSize: 13, fontVariantNumeric: 'tabular-nums' }}>{current} / {pages}</span>
        <button type="button" className="d-btn" style={{ padding: '4px 10px' }} disabled={current === pages} onClick={() => setCurrent((c) => c + 1)}>›</button>
      </div>
    )
  }

  if (variant === 'bottom') {
    return (
      <div className="d-root" style={{ maxWidth: 300 }}>
        <div style={{ display: 'flex', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 6 }}>
          {items.map((it) => (
            <button
              key={it.label}
              type="button"
              onClick={() => setActive(it.label)}
              style={{ flex: 1, border: 'none', background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '6px 0', borderRadius: 8, position: 'relative', color: active === it.label ? 'var(--accent)' : 'var(--text-muted)', fontSize: 11, cursor: 'pointer' }}
            >
              {active === it.label && <span style={{ position: 'absolute', top: -6, width: 18, height: 3, borderRadius: 3, background: 'var(--accent)' }} />}
              <span style={{ fontSize: 15 }}>{it.icon}</span>
              {it.label}
              {it.badge && <span style={{ position: 'absolute', top: 2, right: '22%', background: 'var(--danger)', color: '#fff', borderRadius: 999, fontSize: 9, padding: '0 4px' }}>{it.badge}</span>}
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'sidebar') {
    return (
      <div className="d-root" style={{ width: 170 }}>
        {items.map((it) => (
          <div key={it.label}>
            <button
              type="button"
              onClick={() => setActive(it.label)}
              style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', border: 'none', background: active === it.label ? 'var(--accent-soft)' : 'transparent', color: active === it.label ? 'var(--accent)' : 'var(--text)', borderLeft: `3px solid ${active === it.label ? 'var(--accent)' : 'transparent'}`, borderRadius: '0 7px 7px 0', padding: '7px 10px', fontSize: 13, cursor: 'pointer' }}
            >
              <span aria-hidden>{it.icon}</span> {it.label}
            </button>
            {it.children && (
              <div style={{ marginLeft: 14, borderLeft: '1px dashed var(--border-strong)', paddingLeft: 6 }}>
                {it.children.map((c) => (
                  <button key={c} type="button" className="d-tree-row" style={{ fontSize: 12.5, color: active === c ? 'var(--accent)' : 'var(--text-muted)' }} onClick={() => setActive(c)}>{c}</button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'topbar') {
    return (
      <div className="d-root" style={{ display: 'flex', alignItems: 'center', gap: 14, width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '8px 14px' }}>
        <span style={{ width: 24, height: 24, borderRadius: 6, background: 'var(--accent)', color: 'var(--accent-text)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12 }}>典</span>
        {items.map((it) => (
          <button
            key={it}
            type="button"
            onClick={() => setActive(it)}
            style={{ border: 'none', background: 'transparent', fontSize: 13, color: active === it ? 'var(--text)' : 'var(--text-muted)', fontWeight: active === it ? 600 : 400, boxShadow: active === it ? 'inset 0 -2px 0 var(--accent)' : 'none', padding: '4px 2px', cursor: 'pointer' }}
          >
            {it}
          </button>
        ))}
        <span style={{ marginLeft: 'auto', display: 'flex', gap: 10, alignItems: 'center' }}>
          <span className="d-placeholder">⌕</span>
          <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--code-bg)', fontSize: 11, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>四</span>
        </span>
      </div>
    )
  }

  if (variant === 'anchor') {
    const go = (i) => scrollRef.current?.querySelectorAll('section')[i]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    return (
      <div className="d-root" style={{ display: 'flex', gap: 12 }}>
        <div ref={scrollRef} style={{ flex: 1, height: 120, overflowY: 'auto', border: '1px solid var(--border)', borderRadius: 8, padding: 10 }}>
          {sections.map((s, i) => (
            <section key={s} style={{ height: 60, marginBottom: 8, borderRadius: 6, background: 'var(--code-bg)', padding: 8, fontSize: 12, color: 'var(--text-muted)' }}>
              <strong style={{ color: 'var(--text)' }}>{s}</strong>：第 {i + 1} 节内容占位。
            </section>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 64 }}>
          {sections.map((s, i) => (
            <button key={s} type="button" onClick={() => go(i)} className="d-tab" style={{ fontSize: 12, textAlign: 'left', padding: '3px 8px', color: 'var(--accent)' }}>{s}</button>
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'drawer') {
    return (
      <div className="d-root" style={{ position: 'relative', height: 150, border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', background: 'var(--bg)' }}>
        <button type="button" className="d-btn" style={{ margin: 12 }} aria-label="打开导航抽屉" onClick={() => setDrawer(true)}>☰</button>
        {drawer && (
          <>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.4)' }} onClick={() => setDrawer(false)} />
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 130, background: 'var(--surface)', padding: 12, boxShadow: 'var(--shadow-lg)' }}>
              <button type="button" className="d-chip-x" aria-label="关闭抽屉" onClick={() => setDrawer(false)} style={{ float: 'right' }}>✕</button>
              {items.map((it) => (
                <button key={it} type="button" className="d-tree-row" style={{ fontSize: 13, color: active === it ? 'var(--accent)' : undefined, fontWeight: active === it ? 600 : 400 }} onClick={() => { setActive(it); setDrawer(false) }}>{it}</button>
              ))}
            </div>
          </>
        )}
      </div>
    )
  }

  if (variant === 'back-top') {
    return (
      <div className="d-root" style={{ position: 'relative', height: 150, border: '1px solid var(--border)', borderRadius: 10, overflowY: 'auto', background: 'var(--bg)', scrollBehavior: 'smooth' }}>
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} style={{ padding: '10px 14px', fontSize: 12, color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>第 {i + 1} 行内容…</div>
        ))}
        <button
          type="button"
          className="d-btn"
          aria-label="回到顶部"
          style={{ position: 'sticky', bottom: 12, left: 'calc(100% - 52px)', width: 34, height: 34, borderRadius: '50%', padding: 0, background: 'var(--accent)', color: 'var(--accent-text)', borderColor: 'var(--accent)', boxShadow: 'var(--shadow-lg)' }}
          onClick={(e) => e.currentTarget.closest('div').scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ↑
        </button>
      </div>
    )
  }

  if (variant === 'route-tabs') {
    return (
      <div className="d-root">
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
          {openTabs.length === 0 && <span className="d-label">所有页签已关闭</span>}
          {openTabs.map((t) => (
            <span
              key={t}
              role="tab"
              aria-selected={t === tabActive}
              onClick={() => setTabActive(t)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 7, fontSize: 12, cursor: 'pointer', background: t === tabActive ? 'var(--accent-soft)' : 'var(--code-bg)', color: t === tabActive ? 'var(--accent)' : 'var(--text-muted)', fontWeight: t === tabActive ? 600 : 400 }}
            >
              {t}
              <button type="button" className="d-chip-x" aria-label={`关闭 ${t}`} onClick={(e) => { e.stopPropagation(); const next = openTabs.filter((x) => x !== t); setOpenTabs(next); if (t === tabActive) setTabActive(next[0]) }}>✕</button>
            </span>
          ))}
          {openTabs.length > 0 && (
            <button type="button" className="d-btn" style={{ padding: '3px 10px', fontSize: 11 }} onClick={() => { setOpenTabs([]); setTabActive(null) }}>全部关闭</button>
          )}
        </div>
        <div className="d-panel">{tabActive ? <>当前路由：<strong>{tabActive}</strong></> : '没有打开的页面'}</div>
      </div>
    )
  }

  return null
}

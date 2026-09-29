import { useEffect, useRef, useState } from 'react'

const frame = { maxWidth: 250, margin: '0 auto', border: '1px solid var(--border)', borderRadius: 18, background: 'var(--surface)', overflow: 'hidden', position: 'relative', width: '100%' }

/** 移动端类 demo：swipe-cell/action-sheet/search-bar/pull-refresh/fab-dial/segmented/index-list/number-keyboard/carousel/notched-tabbar/sms-verify/toggle-list */
export default function MobileDemo({ variant, title, actions, options, segments, groups, items, prefix, pages = [], label }) {
  const [active, setActive] = useState(segments?.[0] || items?.[0]?.label)
  const [sheet, setSheet] = useState(false)
  const [swiped, setSwiped] = useState(false)
  const [focus, setFocus] = useState(false)
  const [query, setQuery] = useState('')
  const [fab, setFab] = useState(false)
  const [page, setPage] = useState(0)
  const [pull, setPull] = useState(0)
  const [refreshing, setRefreshing] = useState(false)
  const [amount, setAmount] = useState('')
  const [code, setCode] = useState(['', '', '', ''])
  const [cd, setCd] = useState(0)
  const [toggles, setToggles] = useState(items?.map((it) => it[1]) || [])
  const [bubble, setBubble] = useState('C')
  const listRef = useRef(null)
  const dragX = useRef(null)

  useEffect(() => {
    if (cd <= 0) return
    const t = setTimeout(() => setCd((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [cd])

  if (variant === 'swipe-cell') {
    return (
      <div className="d-root" style={frame}>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, display: 'flex' }}>
            {actions.map((a, i) => (
              <button key={a} type="button" style={{ border: 'none', background: i ? 'var(--danger)' : 'var(--accent)', color: '#fff', fontSize: 12, width: 52, cursor: 'pointer' }}
                onClick={() => { setSwiped(false); setPull(1); setTimeout(() => setPull(0), 500) }}
              >
                {a}
              </button>
            ))}
          </div>
          <div
            onPointerDown={(e) => (dragX.current = e.clientX)}
            onPointerMove={(e) => { if (dragX.current !== null && dragX.current - e.clientX > 30) setSwiped(true) }}
            onPointerUp={() => (dragX.current = null)}
            style={{ background: 'var(--surface)', padding: '13px 14px', fontSize: 13, transform: swiped ? 'translateX(-96px)' : 'none', transition: 'transform .2s ease', cursor: 'grab', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <span aria-hidden>📄</span>{title}
            <span className="d-placeholder" style={{ marginLeft: 'auto' }}>{swiped ? '松开操作' : '← 左滑'}</span>
          </div>
        </div>
        {swiped && <div style={{ fontSize: 11, color: 'var(--ok)', textAlign: 'center', padding: 6 }}>点击按钮试试（演示重置）</div>}
      </div>
    )
  }

  if (variant === 'action-sheet') {
    return (
      <div className="d-root" style={{ ...frame, height: 210, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
        <button type="button" className="d-btn" style={{ marginBottom: 40 }} onClick={() => setSheet(true)}>分享</button>
        {sheet && (
          <>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.4)' }} onClick={() => setSheet(false)} />
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: 'var(--surface)', borderRadius: '14px 14px 0 0', padding: 6, animation: 'd-slide-up .25s ease' }}>
              <div className="d-label" style={{ textAlign: 'center', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>{title}</div>
              {options.map((o) => (
                <button key={o} type="button" className="d-tree-row" style={{ justifyContent: 'center', padding: '11px 0', fontSize: 13.5 }} onClick={() => setSheet(false)}>{o}</button>
              ))}
              <button type="button" className="d-tree-row" style={{ justifyContent: 'center', padding: '11px 0', fontSize: 13.5, fontWeight: 700, borderTop: '6px solid var(--bg)', borderRadius: '0 0 14px 14px', color: 'var(--text)' }} onClick={() => setSheet(false)}>取消</button>
            </div>
          </>
        )}
      </div>
    )
  }

  if (variant === 'search-bar') {
    return (
      <div className="d-root" style={{ ...frame, padding: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            onClick={() => setFocus(true)}
            style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6, background: focus ? 'var(--surface)' : 'var(--code-bg)', border: focus ? '1px solid var(--accent)' : '1px solid transparent', borderRadius: 999, padding: '7px 12px', transition: 'all .2s ease' }}
          >
            <span className="d-placeholder">⌕</span>
            <input
              className="d-input"
              placeholder="搜索"
              aria-label="搜索"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onBlur={() => setFocus(false)}
              style={{ border: 'none', background: 'transparent', padding: 0, flex: 1, fontSize: 13 }}
            />
          </div>
          {focus && <button type="button" className="d-tab" style={{ color: 'var(--accent)', fontSize: 13 }} onClick={() => { setFocus(false); setQuery('') }}>取消</button>}
        </div>
        {focus && <div className="d-label" style={{ marginTop: 10 }}>搜索「{query || '…'}」的结果会显示在这里</div>}
      </div>
    )
  }

  if (variant === 'pull-refresh') {
    return (
      <div
        className="d-root"
        ref={listRef}
        style={{ ...frame, height: 190, overflowY: 'auto' }}
        onScroll={(e) => {
          const el = e.currentTarget
          if (el.scrollTop < -0) return
        }}
        onPointerDown={(e) => { if (listRef.current.scrollTop <= 0) dragX.current = e.clientY }}
        onPointerMove={(e) => {
          if (dragX.current !== null && !refreshing) {
            const d = e.clientY - dragX.current
            if (d > 0 && listRef.current.scrollTop <= 0) setPull(Math.min(60, d * 0.5))
          }
        }}
        onPointerUp={() => {
          if (pull >= 40) { setRefreshing(true); setTimeout(() => { setRefreshing(false); setPull(0) }, 1000) } else setPull(0)
          dragX.current = null
        }}
      >
        <div style={{ height: pull, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', transition: refreshing ? 'none' : 'height .2s ease' }}>
          {refreshing ? <span className="d-spinner" /> : <span style={{ transform: `rotate(${pull * 5}deg)`, color: pull >= 40 ? 'var(--accent)' : 'var(--text-muted)' }}>↓</span>}
        </div>
        {refreshing && <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--ok)', padding: 4 }}>已更新</div>}
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} style={{ padding: '10px 14px', fontSize: 12.5, borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>列表项 {i + 1}</div>
        ))}
      </div>
    )
  }

  if (variant === 'fab-dial') {
    return (
      <div className="d-root" style={{ ...frame, height: 200, position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: 16, right: 14, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
          {fab && items?.map((a, i) => (
            <button key={a} type="button" className="d-btn" style={{ borderRadius: 999, padding: '5px 14px', fontSize: 12, boxShadow: 'var(--shadow)', animation: `d-fade .15s ${i * 0.04}s ease` }} onClick={() => setFab(false)}>
              {a}
            </button>
          ))}
          <button
            type="button"
            aria-label={fab ? '收起操作' : '展开操作'}
            onClick={() => setFab((f) => !f)}
            style={{ width: 46, height: 46, borderRadius: '50%', border: 'none', background: 'var(--accent)', color: 'var(--accent-text)', fontSize: 22, cursor: 'pointer', boxShadow: 'var(--shadow-lg)', transition: 'transform .2s ease', transform: fab ? 'rotate(45deg)' : 'none' }}
          >
            ＋
          </button>
        </div>
      </div>
    )
  }

  if (variant === 'segmented') {
    return (
      <div className="d-root" style={{ ...frame, padding: 14 }}>
        <div style={{ position: 'relative', display: 'flex', background: 'var(--code-bg)', borderRadius: 9, padding: 2 }}>
          <span style={{ position: 'absolute', top: 2, bottom: 2, width: 'calc(50% - 2px)', left: active === segments[0] ? 2 : '50%', background: 'var(--surface)', borderRadius: 7, boxShadow: 'var(--shadow)', transition: 'left .2s ease' }} />
          {segments.map((s) => (
            <button key={s} type="button" onClick={() => setActive(s)} style={{ flex: 1, position: 'relative', zIndex: 1, border: 'none', background: 'transparent', padding: '6px 0', fontSize: 13, fontWeight: active === s ? 600 : 400, color: active === s ? 'var(--text)' : 'var(--text-muted)', cursor: 'pointer' }}>
              {s}
            </button>
          ))}
        </div>
        <div className="d-label" style={{ marginTop: 12, textAlign: 'center' }}>当前视图：{active}</div>
      </div>
    )
  }

  if (variant === 'index-list') {
    return (
      <div className="d-root" style={{ ...frame, height: 200, display: 'flex', position: 'relative' }}>
        <div
          ref={listRef}
          style={{ flex: 1, overflowY: 'auto' }}
          onScroll={(e) => {
            const headers = e.currentTarget.querySelectorAll('b')
            headers.forEach((h) => {
              if (h.offsetTop - e.currentTarget.scrollTop <= 10) setBubble(h.textContent)
            })
          }}
        >
          {Object.entries(groups).map(([letter, names]) => (
            <div key={letter}>
              <b id={`grp-${letter}`} style={{ display: 'block', background: 'var(--code-bg)', padding: '3px 12px', fontSize: 11, color: 'var(--text-muted)' }}>{letter}</b>
              {names.map((n) => <div key={n} style={{ padding: '8px 12px', fontSize: 12.5, borderBottom: '1px solid var(--border)' }}>{n}</div>)}
            </div>
          ))}
        </div>
        <div style={{ width: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: 9.5, color: 'var(--accent)', padding: '6px 0', gap: 1 }}>
          {Object.keys(groups).map((l) => (
            <button key={l} type="button" aria-label={`跳到 ${l}`} style={{ border: 'none', background: 'transparent', color: bubble === l ? 'var(--accent)' : 'var(--text-muted)', fontWeight: bubble === l ? 700 : 400, cursor: 'pointer', padding: 0 }}
              onClick={() => listRef.current?.querySelector(`#grp-${l}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              {l}
            </button>
          ))}
        </div>
        <span style={{ position: 'absolute', right: 26, top: 40, width: 30, height: 30, borderRadius: '50%', background: 'var(--accent)', color: 'var(--accent-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>{bubble}</span>
      </div>
    )
  }

  if (variant === 'number-keyboard') {
    return (
      <div className="d-root" style={{ ...frame, padding: 12 }}>
        <div style={{ textAlign: 'right', fontSize: 24, fontWeight: 700, fontVariantNumeric: 'tabular-nums', padding: '8px 4px', minHeight: 40 }}>
          {prefix}{amount || <span className="d-placeholder">0.00</span>}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '⌫'].map((k) => (
            <button
              key={k}
              type="button"
              className="d-btn"
              aria-label={k === '⌫' ? '删除' : k}
              style={{ padding: '10px 0', fontSize: 16, background: 'var(--code-bg)', borderColor: 'transparent', borderRadius: 9 }}
              onClick={() => {
                if (k === '⌫') setAmount((a) => a.slice(0, -1))
                else if (k === '.' ) setAmount((a) => (a.includes('.') ? a : a + '.'))
                else if (amount.split('.')[1]?.length >= 2) return
                else setAmount((a) => (a === '' && k === '0' ? '' : a + k))
              }}
            >
              {k}
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'carousel') {
    return (
      <div className="d-root" style={{ ...frame, height: 230, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          <div style={{ display: 'flex', width: '300%', height: '100%', transform: `translateX(-${page * 33.333}%)`, transition: 'transform .3s ease' }}>
            {pages.map(([t, d], i) => (
              <div key={i} style={{ width: '33.3333%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 16, textAlign: 'center' }}>
                <div style={{ width: 110, height: 80, borderRadius: 12, background: `linear-gradient(135deg, hsl(${i * 60 + 200} 70% 68%), hsl(${i * 60 + 250} 70% 60%))` }} />
                <strong style={{ fontSize: 15 }}>{t}</strong>
                <span className="d-label" style={{ margin: 0 }}>{d}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', padding: 12 }}>
          <button type="button" className="d-tab" style={{ fontSize: 12, color: 'var(--text-muted)' }} onClick={() => setPage(pages.length - 1)}>跳过</button>
          <div style={{ display: 'flex', gap: 5, margin: '0 auto' }}>
            {pages.map((_, i) => (
              <span key={i} style={{ width: i === page ? 16 : 7, height: 7, borderRadius: 999, background: i === page ? 'var(--accent)' : 'var(--border-strong)', transition: 'width .2s ease' }} />
            ))}
          </div>
          <button type="button" className="d-btn" style={{ padding: '4px 16px', fontSize: 12, background: 'var(--accent)', color: 'var(--accent-text)', borderColor: 'var(--accent)' }} onClick={() => setPage((p) => (p < pages.length - 1 ? p + 1 : 0))}>
            {page === pages.length - 1 ? '开始使用' : '下一步'}
          </button>
        </div>
      </div>
    )
  }

  if (variant === 'notched-tabbar') {
    return (
      <div className="d-root" style={{ ...frame, height: 130, display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', width: '100%', background: 'var(--surface)', borderTop: '1px solid var(--border)', padding: '6px 4px 10px' }}>
          {items.slice(0, 2).map((it) => (
            <TabItem key={it} label={it} active={active === it} onClick={() => setActive(it)} />
          ))}
          <div style={{ width: 56 }} />
          {items.slice(2).map((it) => (
            <TabItem key={it} label={it} active={active === it} onClick={() => setActive(it)} />
          ))}
        </div>
        <button
          type="button"
          aria-label="主操作"
          style={{ position: 'absolute', left: '50%', bottom: 16, transform: 'translateX(-50%)', width: 48, height: 48, borderRadius: '50%', border: '3px solid var(--surface)', background: 'var(--accent)', color: 'var(--accent-text)', fontSize: 20, cursor: 'pointer', boxShadow: 'var(--shadow-lg)' }}
        >
          ＋
        </button>
      </div>
    )
  }

  if (variant === 'sms-verify') {
    return (
      <div className="d-root" style={{ ...frame, padding: 16 }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
          <span className="d-chip" style={{ fontSize: 12 }}>+86</span>
          <input className="d-input" placeholder="手机号" inputMode="numeric" aria-label="手机号" style={{ flex: 1, fontSize: 13 }} />
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 12 }}>
          {code.map((v, i) => (
            <input
              key={i}
              className={`d-otp-cell ${v ? 'filled' : ''}`}
              value={v}
              aria-label={`第 ${i + 1} 位验证码`}
              inputMode="numeric"
              maxLength={1}
              style={{ width: 38, height: 42, textAlign: 'center', fontSize: 18, border: '1px solid var(--border-strong)', borderRadius: 9, background: 'var(--surface)', color: 'var(--text)' }}
              onChange={(e) => setCode((c) => { const n = [...c]; n[i] = e.target.value.replace(/\D/g, ''); return n })}
            />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <button type="button" className="d-tab" style={{ fontSize: 12, color: cd > 0 ? 'var(--text-muted)' : 'var(--accent)' }} disabled={cd > 0} onClick={() => setCd(10)}>
            {cd > 0 ? `重新发送 (${cd}s)` : '发送验证码'}
          </button>
        </div>
        <button type="button" className="d-btn" style={{ width: '100%', justifyContent: 'center', background: code.every(Boolean) ? 'var(--accent)' : 'var(--border)', borderColor: 'transparent', color: code.every(Boolean) ? 'var(--accent-text)' : 'var(--text-muted)' }}>
          验证并登录
        </button>
      </div>
    )
  }

  if (variant === 'toggle-list') {
    return (
      <div className="d-root" style={{ ...frame, padding: 12 }}>
        <div style={{ border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
          {items.map(([label], i) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 14px', borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <span style={{ fontSize: 13 }}>{label}</span>
              <button
                type="button"
                role="switch"
                aria-checked={toggles[i]}
                aria-label={label}
                onClick={() => setToggles((t) => t.map((v, j) => (j === i ? !v : v)))}
                style={{ width: 44, height: 26, borderRadius: 999, border: 'none', background: toggles[i] ? 'var(--ok)' : 'var(--border-strong)', position: 'relative', cursor: 'pointer', transition: 'background .2s ease' }}
              >
                <span style={{ position: 'absolute', top: 2, left: toggles[i] ? 20 : 2, width: 22, height: 22, borderRadius: '50%', background: '#fff', boxShadow: 'var(--shadow)', transition: 'left .2s ease' }} />
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return null
}

function TabItem({ label, active, onClick }) {
  return (
    <button type="button" onClick={onClick} style={{ flex: 1, border: 'none', background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, fontSize: 10, color: active ? 'var(--accent)' : 'var(--text-muted)', cursor: 'pointer', padding: 0 }}>
      <span style={{ fontSize: 15 }}>{label === '首页' ? '⌂' : label === '任务' ? '☑' : label === '报告' ? '▤' : '👤'}</span>
      {label}
    </button>
  )
}

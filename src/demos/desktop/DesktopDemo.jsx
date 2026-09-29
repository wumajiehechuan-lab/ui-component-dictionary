import { useEffect, useState } from 'react'

/** 桌面端类 demo：command-palette/title-bar/resizable/selection-toolbar/notification-tray/shortcuts/window-tabs/status-bar */
export default function DesktopDemo({ variant, title, panels = [], text, sample, groups = {}, tabs: tabList = [], branch, position, problems = [], commands = [] }) {
  const [query, setQuery] = useState('')
  const [sel, setSel] = useState(0)
  const [hoverCtl, setHoverCtl] = useState(null)
  const [toasts, setToasts] = useState([])
  const [openTabs, setOpenTabs] = useState(tabList)
  const [tabActive, setTabActive] = useState(tabList.find(([, dirty]) => dirty)?.[0] || tabList[0]?.[0])
  const [flash, setFlash] = useState(null)

  if (variant === 'command-palette') {
    const filtered = commands.filter(([, label]) => label.toLowerCase().includes(query.toLowerCase()))
    return (
      <div className="d-root" style={{ border: '1px solid var(--border)', borderRadius: 12, boxShadow: 'var(--shadow-lg)', overflow: 'hidden', width: '100%', maxWidth: 320, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderBottom: '1px solid var(--border)' }}>
          <span className="d-placeholder">⌕</span>
          <input
            className="d-input"
            placeholder="输入命令…"
            aria-label="命令搜索"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSel(0) }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(filtered.length - 1, s + 1)) }
              if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(0, s - 1)) }
              if (e.key === 'Enter' && filtered[sel]) { setFlash(filtered[sel][1]); setTimeout(() => setFlash(null), 700) }
              if (e.key === 'Escape') setQuery('')
            }}
            style={{ border: 'none', background: 'transparent', padding: 0, flex: 1 }}
          />
          <kbd style={{ fontSize: 10, background: 'var(--code-bg)', borderRadius: 4, padding: '1px 5px', color: 'var(--text-muted)' }}>Esc</kbd>
        </div>
        <div style={{ maxHeight: 170, overflowY: 'auto', padding: 4 }}>
          {filtered.length === 0 && <div className="d-label" style={{ padding: 10, textAlign: 'center' }}>无匹配命令</div>}
          {filtered.map(([grp, label, kbd], i) => (
            <div key={label}>
              {(i === 0 || filtered[i - 1][0] !== grp) && <div className="d-label" style={{ padding: '5px 8px 2px', margin: 0, textTransform: 'none' }}>{grp}</div>}
              <button
                type="button"
                onClick={() => { setFlash(label); setTimeout(() => setFlash(null), 700) }}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', border: 'none', background: i === sel ? 'var(--accent-soft)' : 'transparent', color: i === sel ? 'var(--accent)' : 'var(--text)', padding: '7px 10px', fontSize: 12.5, borderRadius: 6, cursor: 'pointer' }}
              >
                <span>{label}</span>
                <kbd style={{ fontSize: 10, background: 'var(--code-bg)', borderRadius: 4, padding: '1px 5px', color: 'var(--text-muted)' }}>{kbd}</kbd>
              </button>
            </div>
          ))}
        </div>
        {flash && <div className="d-label" style={{ borderTop: '1px solid var(--border)', padding: '6px 12px', margin: 0, color: 'var(--ok)' }}>已执行：{flash}</div>}
      </div>
    )
  }

  if (variant === 'title-bar') {
    return (
      <div className="d-root" style={{ display: 'flex', alignItems: 'center', background: 'var(--code-bg)', borderRadius: '10px 10px 0 0', borderBottom: '1px solid var(--border)', padding: '6px 10px', width: '100%', userSelect: 'none' }}>
        <span style={{ display: 'flex', gap: 6, marginRight: 10 }}>
          {['#ff5f57', '#febc2e', '#28c840'].map((c) => <span key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />)}
        </span>
        <span style={{ fontSize: 12, color: 'var(--text-muted)', marginRight: 14 }}>{title}</span>
        <span style={{ display: 'flex', gap: 2, margin: '0 auto' }}>
          {['文件', '视图'].map((t) => <button key={t} type="button" className="d-tab" style={{ fontSize: 12, padding: '2px 10px' }}>{t}</button>)}
        </span>
        <span style={{ display: 'flex', gap: 2 }}>
          {['─', '□', '✕'].map((g, i) => (
            <button
              key={g}
              type="button"
              aria-label={['最小化', '最大化', '关闭'][i]}
              onMouseEnter={() => setHoverCtl(g)}
              onMouseLeave={() => setHoverCtl(null)}
              style={{ width: 26, height: 22, border: 'none', borderRadius: 4, fontSize: 10, cursor: 'pointer', background: hoverCtl === g ? (g === '✕' ? 'var(--danger)' : 'var(--border)') : 'transparent', color: hoverCtl === g && g === '✕' ? '#fff' : 'var(--text-muted)' }}
            >
              {g}
            </button>
          ))}
        </span>
      </div>
    )
  }

  if (variant === 'resizable') {
    return (
      <div className="d-root" style={{ display: 'flex', height: 140, border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', width: '100%' }}>
        {panels.map((p, i) => (
          <div key={p} style={{ display: 'flex', flex: i === 1 ? 2 : 1, minWidth: 0 }}>
            {i > 0 && <div style={{ width: 5, background: 'var(--border)', cursor: 'col-resize', flexShrink: 0 }} title="拖动调整" />}
            <div style={{ flex: 1, background: i === 1 ? 'var(--accent-soft)' : 'var(--code-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11.5, color: 'var(--text-muted)', minWidth: 0 }}>{p}</div>
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'selection-toolbar') {
    return <SelectionToolbarInner text={text} />
  }

  if (variant === 'notification-tray') {
    return (
      <div className="d-root" style={{ position: 'relative', height: 170, border: '1px dashed var(--border-strong)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <button type="button" className="d-btn" onClick={() => setToasts((t) => (t.length < 3 ? [{ id: Date.now(), title: sample.title, body: sample.body }, ...t] : t))}>🔔 推送通知</button>
        <div style={{ position: 'absolute', bottom: 8, right: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {toasts.map((t) => <TrayCard key={t.id} n={t} onDone={() => setToasts((ts) => ts.filter((x) => x.id !== t.id))} />)}
        </div>
      </div>
    )
  }

  if (variant === 'shortcuts') {
    return (
      <div className="d-root" style={{ width: '100%', maxWidth: 300, margin: '0 auto' }}>
        {Object.entries(groups).map(([grp, list]) => (
          <div key={grp} style={{ marginBottom: 10 }}>
            <div className="d-label" style={{ borderBottom: '1px solid var(--border)', paddingBottom: 3, marginBottom: 4 }}>{grp}</div>
            {list.map(([label, combo]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12.5, padding: '5px 6px', borderRadius: 6, background: flash === label ? 'var(--accent-soft)' : 'transparent', transition: 'background .15s ease' }}>
                {label}
                <span style={{ display: 'flex', gap: 3 }}>
                  {combo.split('+').map((k) => <kbd key={k} style={{ fontSize: 10, background: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: 4, padding: '1px 5px', color: 'var(--text-muted)' }}>{k}</kbd>)}
                </span>
              </div>
            ))}
          </div>
        ))}
        <div
          tabIndex={0}
          aria-label="在此区域试按快捷键"
          onKeyDown={(e) => {
            for (const [, list] of Object.entries(groups)) {
              for (const [label, combo] of list) {
                const keys = combo.split('+')
                const main = keys[keys.length - 1]
                const ctrl = keys.includes('Ctrl')
                if (e.key.toLowerCase() === main.toLowerCase() && (e.ctrlKey || !ctrl) && ((ctrl && e.ctrlKey) || !ctrl)) {
                  e.preventDefault()
                  setFlash(label)
                  setTimeout(() => setFlash(null), 600)
                }
              }
            }
          }}
          style={{ border: '1px dashed var(--border-strong)', borderRadius: 8, textAlign: 'center', fontSize: 11.5, color: 'var(--text-muted)', padding: 8, outline: 'none' }}
        >
          点击此处后试按 Ctrl+S / Ctrl+F
        </div>
      </div>
    )
  }

  if (variant === 'window-tabs') {
    return (
      <div className="d-root" style={{ width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, borderBottom: '1px solid var(--border)', paddingBottom: 0 }}>
          {openTabs.map(([name, dirty]) => (
            <span
              key={name}
              onClick={() => setTabActive(name)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', fontSize: 12.5, cursor: 'pointer', borderRadius: '8px 8px 0 0', background: tabActive === name ? 'var(--surface-hover)' : 'transparent', color: tabActive === name ? 'var(--text)' : 'var(--text-muted)', fontWeight: tabActive === name ? 600 : 400, border: tabActive === name ? '1px solid var(--border)' : '1px solid transparent', borderBottom: 'none' }}
            >
              {name}
              {dirty && <span title="未保存" style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)' }} />}
              <button type="button" className="d-chip-x" aria-label={`关闭 ${name}`} onClick={(e) => { e.stopPropagation(); const next = openTabs.filter(([n]) => n !== name); setOpenTabs(next); if (tabActive === name) setTabActive(next[0]?.[0] || null) }}>✕</button>
            </span>
          ))}
          <button type="button" className="d-btn" aria-label="新建页签" style={{ width: 24, height: 24, padding: 0, fontSize: 13 }} onClick={() => setOpenTabs((t) => [...t, [`untitled-${t.length + 1}.md`, false]])}>＋</button>
          <span className="d-placeholder" style={{ marginLeft: 'auto', fontSize: 12 }}>⧉</span>
        </div>
        <div className="d-panel">{tabActive ? <>正在查看：<strong>{tabActive}</strong></> : '没有打开的文件'}</div>
      </div>
    )
  }

  if (variant === 'status-bar') {
    return (
      <div className="d-root" style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'var(--code-bg)', borderRadius: 8, padding: '4px 10px', fontSize: 11.5, color: 'var(--text-muted)', width: '100%', height: 28 }}>
        <button type="button" className="d-btn" style={{ border: 'none', background: 'transparent', color: 'var(--accent)', fontSize: 11.5, padding: '2px 6px' }}>⑂ {branch}</button>
        <span>⇄</span>
        <span style={{ margin: '0 auto' }}>{position}　Spaces: 2</span>
        <span style={{ color: 'var(--text-muted)' }}>✕ {problems[0]}</span>
        <span style={{ color: '#f59e0b' }}>⚠ {problems[1]}</span>
        <span className="d-chip" style={{ fontSize: 10, background: 'var(--surface)', color: 'var(--text-muted)' }}>JSON</span>
      </div>
    )
  }

  return null
}

function SelectionToolbarInner({ text }) {
  const [pos, setPos] = useState(null)
  const [active, setActive] = useState([])
  return (
    <div className="d-root" style={{ position: 'relative', width: '100%' }}>
      {pos && (
        <div style={{ position: 'absolute', left: `${pos.x}%`, top: -34, transform: 'translateX(-50%)', display: 'flex', gap: 2, background: 'var(--text)', borderRadius: 8, padding: 4, boxShadow: 'var(--shadow-lg)', zIndex: 30, animation: 'd-fade .12s ease' }}>
          {['B', 'I', 'H', '🔗'].map((g) => (
            <button key={g} type="button" aria-label={`格式 ${g}`} onClick={() => setActive((a) => (a.includes(g) ? a.filter((x) => x !== g) : [...a, g]))}
              style={{ border: 'none', borderRadius: 5, width: 24, height: 22, background: active.includes(g) ? 'rgba(255,255,255,.25)' : 'transparent', color: '#fff', fontSize: 11, cursor: 'pointer' }}
            >
              {g}
            </button>
          ))}
        </div>
      )}
      <p
        style={{ fontSize: 13, lineHeight: 1.8, margin: 0, color: 'var(--text-muted)' }}
        onMouseUp={(e) => {
          const s = window.getSelection()
          if (s && !s.isCollapsed && e.currentTarget.contains(s.anchorNode)) {
            const rect = e.currentTarget.getBoundingClientRect()
            const range = s.getRangeAt(0).getBoundingClientRect()
            setPos({ x: ((range.left + range.width / 2 - rect.left) / rect.width) * 100 })
          } else {
            setPos(null)
            setActive([])
          }
        }}
      >
        {text}
      </p>
    </div>
  )
}

function TrayCard({ n, onDone }) {
  const [paused, setPaused] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [progress, setProgress] = useState(100)
  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setProgress((p) => { if (p <= 0) { clearInterval(t); setLeaving(true); return 0 } return p - 2.5 }), 100)
    return () => clearInterval(t)
  }, [paused])
  useEffect(() => {
    if (!leaving) return
    const t = setTimeout(onDone, 200)
    return () => clearTimeout(t)
  }, [leaving, onDone])
  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      style={{ width: 200, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, boxShadow: 'var(--shadow-lg)', padding: 10, fontSize: 12, opacity: leaving ? 0 : 1, transform: leaving ? 'translateX(14px)' : 'none', transition: 'all .2s ease' }}
    >
      <div style={{ display: 'flex', gap: 7, alignItems: 'flex-start' }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', marginTop: 4, flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <b>{n.title}</b>
          <div className="d-label" style={{ margin: 0 }}>{n.body}</div>
        </div>
        <button type="button" className="d-chip-x" aria-label="关闭通知" onClick={() => setLeaving(true)}>✕</button>
      </div>
      <span style={{ display: 'block', height: 2, borderRadius: 2, background: 'var(--border)', marginTop: 7 }}>
        <span style={{ display: 'block', height: '100%', background: 'var(--accent)', width: `${progress}%`, borderRadius: 2 }} />
      </span>
    </div>
  )
}

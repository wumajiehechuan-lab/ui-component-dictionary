import { useState } from 'react'
import { useClickOutside } from '../_shared/useClickOutside.js'
import { Dropdown } from '../_shared/Dropdown.jsx'

function MenuList({ items, danger = [], icons, shortcuts, checked, onToggle }) {
  return items.map((it) => {
    const isDanger = danger.includes(it)
    const hasKbd = shortcuts?.find(([k]) => k === it)
    return (
      <button key={it} type="button" className="d-option" style={{ color: isDanger ? 'var(--danger)' : undefined }} onClick={() => checked && onToggle(it)}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          {checked && <span style={{ width: 14, display: 'inline-block', textAlign: 'center', color: 'var(--accent)' }}>{checked.includes(it) ? '☑' : '☐'}</span>}
          {icons && <span aria-hidden>{icons[it] || '·'}</span>}
          {it}
        </span>
        {hasKbd && <kbd style={{ fontSize: 10, background: 'var(--code-bg)', borderRadius: 4, padding: '1px 5px', color: 'var(--text-muted)' }}>{hasKbd[1]}</kbd>}
      </button>
    )
  })
}

/** 菜单类 demo：dropdown/context/bar/checkbox/submenu/icon/kebab/shortcut/user */
export default function MenuDemo({ variant = 'dropdown', items = [], danger, icons, shortcuts, checked: initChecked, submenu, menus, user }) {
  const [open, setOpen] = useState(false)
  const [flash, setFlash] = useState(null)
  const [checked, setChecked] = useState(initChecked || [])
  const [openBar, setOpenBar] = useState(null)
  const [openSub, setOpenSub] = useState(null)
  const ref = useClickOutside(() => { setOpen(false); setOpenBar(null); setOpenSub(null) }, true)

  const pick = (it) => {
    setFlash(it)
    setTimeout(() => setFlash(null), 500)
    setOpen(false)
  }

  const withFlash = (node) => (
    <div className="d-root" ref={ref} style={{ position: 'relative' }}>
      {node}
      {flash && <div className="d-label" style={{ marginTop: 6, color: 'var(--ok)' }}>已执行：{flash}</div>}
    </div>
  )

  if (variant === 'context') {
    return withFlash(
      <div style={{ border: '1px dashed var(--border-strong)', borderRadius: 8, padding: '26px 14px', textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', position: 'relative', width: '100%' }}>
        在此区域右键打开菜单
        <ContextMenuInner items={items} danger={danger} onPick={pick} />
      </div>
    )
  }

  if (variant === 'bar') {
    return withFlash(
      <div style={{ display: 'flex', gap: 2, borderBottom: '1px solid var(--border)', width: '100%' }}>
        {Object.keys(menus).map((label) => (
          <div key={label} style={{ position: 'relative' }} onMouseEnter={() => openBar && setOpenBar(label)}>
            <button
              type="button"
              className="d-tab"
              style={{ background: openBar === label ? 'var(--surface-hover)' : 'transparent' }}
              onClick={() => setOpenBar(openBar === label ? null : label)}
            >
              {label}
            </button>
            {openBar === label && (
              <div className="d-menu" style={{ top: '100%' }}>
                <MenuList items={menus[label]} onPick={pick} onToggle={pick} />
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'user') {
    return withFlash(
      <Dropdown
        align="right"
        trigger={() => (
          <span style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--accent-soft)', color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13 }}>
            {user.name.slice(0, 1)}
          </span>
        )}
      >
        <div style={{ padding: '6px 10px' }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>{user.name}</div>
          <div className="d-label" style={{ margin: 0 }}>{user.email}</div>
        </div>
        <div style={{ borderTop: '1px solid var(--border)', margin: '4px 0' }} />
        <MenuList items={items} danger={danger} onPick={pick} onToggle={pick} />
      </Dropdown>
    )
  }

  const triggerLabel = variant === 'kebab' ? '⋯' : variant === 'dropdown' ? 'Actions ▾' : variant === 'checkbox' ? '显示列 ▾' : variant === 'submenu' ? '操作 ▾' : '菜单 ▾'

  return withFlash(
    <Dropdown
      align={variant === 'kebab' ? 'right' : 'left'}
      trigger={() => (
        <button type="button" className="d-btn" style={variant === 'kebab' ? { width: 34, height: 30, padding: 0, letterSpacing: 1 } : {}}>
          {triggerLabel}
        </button>
      )}
    >
      <MenuList items={items} danger={danger} icons={variant === 'icon' ? { [items[0]]: '↗', [items[1]]: '⧉', [items[2]]: '🗄', [items[3]]: '🗑' } : undefined} shortcuts={shortcuts} checked={variant === 'checkbox' ? checked : undefined} onToggle={(it) => setChecked((c) => (c.includes(it) ? c.filter((x) => x !== it) : [...c, it]))} />
      {variant === 'submenu' && submenu && (
        <div style={{ position: 'relative' }} onMouseEnter={() => setOpenSub(Object.keys(submenu)[0])} onMouseLeave={() => setOpenSub(null)}>
          <button type="button" className="d-option" style={{ justifyContent: 'space-between' }}>
            {Object.keys(submenu)[0]} <span>›</span>
          </button>
          {openSub && (
            <div className="d-menu" style={{ left: '100%', top: 0, marginTop: -4 }}>
              {submenu[openSub].map((s) => (
                <button key={s} type="button" className="d-option" onClick={() => pick(s)}>{s}</button>
              ))}
            </div>
          )}
        </div>
      )}
      {variant === 'checkbox' && <div className="d-label" style={{ borderTop: '1px solid var(--border)', marginTop: 4, paddingTop: 6, marginBottom: 0 }}>已选 {checked.length} 列</div>}
    </Dropdown>
  )
}

function ContextMenuInner({ items, danger, onPick }) {
  const [pos, setPos] = useState(null)
  const ref = useClickOutside(() => setPos(null), !!pos)
  return (
    <div
      ref={ref}
      style={{ position: 'absolute', inset: 0 }}
      onContextMenu={(e) => {
        e.preventDefault()
        const rect = e.currentTarget.getBoundingClientRect()
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
      }}
    >
      {pos && (
        <div className="d-menu" style={{ left: pos.x, top: pos.y, right: 'auto', minWidth: 120 }}>
          <MenuList items={items} danger={danger} onPick={onPick} onToggle={onPick} />
        </div>
      )}
    </div>
  )
}

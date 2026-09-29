import { useState } from 'react'

/** 可关闭标签 Closable Tabs：× 关闭，全部关闭出恢复入口 */
export default function ClosableTabsDemo({ tabs = [] }) {
  const [openTabs, setOpenTabs] = useState(tabs)
  const [active, setActive] = useState(0)

  const close = (i) => {
    const next = openTabs.filter((_, idx) => idx !== i)
    setOpenTabs(next)
    if (i < active) setActive((a) => a - 1)
    else if (i === active) setActive(Math.min(active, next.length - 1))
  }

  if (openTabs.length === 0) {
    return (
      <div className="d-root">
        <div className="d-empty">
          所有标签已关闭。
          <button
            type="button"
            className="d-btn"
            style={{ marginLeft: 10, padding: '3px 12px', fontSize: 12 }}
            onClick={() => {
              setOpenTabs(tabs)
              setActive(0)
            }}
          >
            恢复
          </button>
        </div>
      </div>
    )
  }

  const current = openTabs[Math.min(active, openTabs.length - 1)]

  return (
    <div className="d-root">
      <div className="d-tablist" role="tablist" style={{ gap: 4 }}>
        {openTabs.map((t, i) => (
          <span
            key={t}
            role="tab"
            aria-selected={i === active}
            tabIndex={0}
            className="d-tab"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              cursor: 'pointer',
              color: i === active ? 'var(--accent)' : 'var(--text-muted)',
              fontWeight: i === active ? 600 : 400,
              borderBottom: i === active ? '2px solid var(--accent)' : '2px solid transparent',
              borderRadius: '6px 6px 0 0',
            }}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setActive(i)
            }}
          >
            {t}
            <button
              type="button"
              className="d-chip-x"
              aria-label={`关闭 ${t}`}
              onClick={(e) => {
                e.stopPropagation()
                close(i)
              }}
            >
              ✕
            </button>
          </span>
        ))}
      </div>
      <div className="d-panel" role="tabpanel">
        <strong>{current}</strong>：面板内容。
      </div>
    </div>
  )
}

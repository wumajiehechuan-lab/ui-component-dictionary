import { useState } from 'react'
import { TabPanel } from '../_shared/tabsCommon.jsx'

/** 可拖动标签 Draggable Tabs：原生 HTML5 DnD 重排 */
export default function DraggableTabsDemo({ tabs = [] }) {
  const [order, setOrder] = useState(tabs)
  const [active, setActive] = useState(0)
  const [dragIndex, setDragIndex] = useState(null)
  const [overIndex, setOverIndex] = useState(null)

  const handleDragStart = (i) => (e) => {
    setDragIndex(i)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', String(i))
  }

  const handleDragOver = (i) => (e) => {
    e.preventDefault()
    setOverIndex(i)
  }

  const handleDrop = (i) => (e) => {
    e.preventDefault()
    const from = dragIndex
    setDragIndex(null)
    setOverIndex(null)
    if (from === null || from === i) return
    setOrder((prev) => {
      const next = [...prev]
      const [moved] = next.splice(from, 1)
      next.splice(i, 0, moved)
      return next
    })
    // 活动标签跟随被拖动的那个
    setActive(i)
  }

  return (
    <div className="d-root">
      <div className="d-tablist" role="tablist" style={{ gap: 4 }}>
        {order.map((t, i) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={i === active}
            tabIndex={i === active ? 0 : -1}
            className="d-tab"
            draggable
            onDragStart={handleDragStart(i)}
            onDragOver={handleDragOver(i)}
            onDragLeave={() => setOverIndex((o) => (o === i ? null : o))}
            onDrop={handleDrop(i)}
            onDragEnd={() => {
              setDragIndex(null)
              setOverIndex(null)
            }}
            style={{
              border: '1px solid ' + (overIndex === i && dragIndex !== null && dragIndex !== i ? 'var(--accent)' : 'var(--border)'),
              borderRadius: 8,
              opacity: dragIndex === i ? 0.4 : 1,
              transform: dragIndex === i ? 'translateY(-2px)' : 'none',
              boxShadow: dragIndex === i ? 'var(--shadow-lg)' : 'none',
              background: i === active ? 'var(--accent-soft)' : 'var(--surface)',
              color: i === active ? 'var(--accent)' : 'var(--text-muted)',
              fontWeight: i === active ? 600 : 400,
              cursor: dragIndex === i ? 'grabbing' : 'grab',
              transition: 'box-shadow .15s ease, opacity .15s ease',
            }}
            onClick={() => setActive(i)}
          >
            {t}
          </button>
        ))}
      </div>
      <TabPanel tab={order[active]} />
    </div>
  )
}

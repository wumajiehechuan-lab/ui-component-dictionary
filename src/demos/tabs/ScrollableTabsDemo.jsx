import { useRef } from 'react'
import { useTabs } from '../_shared/useTabs.js'
import { TabPanel, useTabPositions } from '../_shared/tabsCommon.jsx'

/** 可滚动标签 Scrollable Tabs：横向溢出滚动 + 边缘渐隐 */
export default function ScrollableTabsDemo({ tabs = [] }) {
  const { active, setActive } = useTabs(tabs.length)
  const { listRef, pos } = useTabPositions(tabs.length, active)
  const scrollerRef = useRef(null)

  const activate = (i) => {
    setActive(i)
    // 点选后自动滚入视野
    requestAnimationFrame(() => {
      const el = scrollerRef.current?.querySelectorAll('[role="tab"]')[i]
      el?.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' })
    })
  }

  return (
    <div className="d-root">
      <div
        ref={scrollerRef}
        style={{
          overflowX: 'auto',
          scrollbarWidth: 'thin',
          maskImage: 'linear-gradient(to right, transparent 0, #000 14px, #000 calc(100% - 14px), transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0, #000 14px, #000 calc(100% - 14px), transparent 100%)',
        }}
      >
        <div className="d-tablist" role="tablist" ref={listRef} style={{ width: 'max-content', borderBottom: '1px solid var(--border)', minWidth: '100%' }}>
          {tabs.map((t, i) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={i === active}
              tabIndex={i === active ? 0 : -1}
              className="d-tab"
              style={{ color: i === active ? 'var(--accent)' : 'var(--text-muted)' }}
              onClick={() => activate(i)}
            >
              {t}
            </button>
          ))}
          <span className="d-indicator" style={{ left: pos.left, width: pos.width }} />
        </div>
      </div>
      <TabPanel tab={tabs[active]} />
    </div>
  )
}

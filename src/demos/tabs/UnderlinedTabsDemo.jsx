import { useTabs } from '../_shared/useTabs.js'
import { TabPanel, useTabPositions } from '../_shared/tabsCommon.jsx'

/** 下划线标签 Underlined Tabs：细线跟随滑动 */
export default function UnderlinedTabsDemo({ tabs = [] }) {
  const { active, setActive, onKeyDown } = useTabs(tabs.length)
  const { listRef, pos } = useTabPositions(tabs.length, active)

  return (
    <div className="d-root">
      <div className="d-tablist" role="tablist" ref={listRef} onKeyDown={onKeyDown} style={{ borderBottom: '1px solid var(--border)' }}>
        {tabs.map((t, i) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={i === active}
            tabIndex={i === active ? 0 : -1}
            className="d-tab"
            style={i === active ? { color: 'var(--accent)' } : undefined}
            onClick={() => setActive(i)}
          >
            {t}
          </button>
        ))}
        <span className="d-indicator" style={{ left: pos.left, width: pos.width }} />
      </div>
      <TabPanel tab={tabs[active]} />
    </div>
  )
}

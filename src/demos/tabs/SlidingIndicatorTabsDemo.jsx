import { useTabs } from '../_shared/useTabs.js'
import { TabPanel, useTabPositions } from '../_shared/tabsCommon.jsx'

/** 滑动指示标签：填充背景块在标签间滑动 */
export default function SlidingIndicatorTabsDemo({ tabs = [] }) {
  const { active, setActive, onKeyDown } = useTabs(tabs.length)
  const { listRef, pos } = useTabPositions(tabs.length, active)

  return (
    <div className="d-root">
      <div
        className="d-tablist"
        role="tablist"
        ref={listRef}
        onKeyDown={onKeyDown}
        style={{
          background: 'var(--code-bg)',
          borderRadius: 10,
          padding: 4,
        }}
      >
        <span
          aria-hidden
          style={{
            position: 'absolute',
            top: 4,
            bottom: 4,
            left: pos.left,
            width: pos.width,
            background: 'var(--surface)',
            borderRadius: 7,
            boxShadow: 'var(--shadow)',
            transition: 'left .25s ease-out, width .25s ease-out',
          }}
        />
        {tabs.map((t, i) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={i === active}
            tabIndex={i === active ? 0 : -1}
            className="d-tab"
            style={{ zIndex: 1, color: i === active ? 'var(--text)' : 'var(--text-muted)' }}
            onClick={() => setActive(i)}
          >
            {t}
          </button>
        ))}
      </div>
      <TabPanel tab={tabs[active]} />
    </div>
  )
}

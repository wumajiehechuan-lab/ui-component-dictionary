import { useTabs } from '../_shared/useTabs.js'
import { TabPanel } from '../_shared/tabsCommon.jsx'

/** 卡片标签 Contained Tabs：活动标签与面板连体 */
export default function ContainedTabsDemo({ tabs = [] }) {
  const { active, setActive, onKeyDown } = useTabs(tabs.length)

  return (
    <div className="d-root">
      <div className="d-tablist" role="tablist" onKeyDown={onKeyDown} style={{ gap: 4, zIndex: 1 }}>
        {tabs.map((t, i) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={i === active}
            tabIndex={i === active ? 0 : -1}
            className="d-tab"
            style={
              i === active
                ? {
                    background: 'var(--surface)',
                    border: '1px solid var(--border-strong)',
                    borderBottomColor: 'var(--surface)',
                    borderRadius: '8px 8px 0 0',
                    color: 'var(--text)',
                    fontWeight: 600,
                    marginBottom: -1,
                  }
                : {
                    background: 'var(--code-bg)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px 8px 0 0',
                  }
            }
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

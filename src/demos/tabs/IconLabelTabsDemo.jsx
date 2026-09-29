import { useTabs } from '../_shared/useTabs.js'
import { TabPanel } from '../_shared/tabsCommon.jsx'

/** 图标文字标签 Icon + Label Tabs */
export default function IconLabelTabsDemo({ tabs = [], icons = [] }) {
  const { active, setActive, onKeyDown } = useTabs(tabs.length)

  return (
    <div className="d-root">
      <div
        className="d-tablist"
        role="tablist"
        onKeyDown={onKeyDown}
        style={{ gap: 6, borderBottom: '1px solid var(--border)', paddingBottom: 2 }}
      >
        {tabs.map((t, i) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={i === active}
            tabIndex={i === active ? 0 : -1}
            className="d-tab"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              padding: '6px 12px',
              color: i === active ? 'var(--accent)' : 'var(--text-muted)',
              boxShadow: i === active ? 'inset 0 -2px 0 var(--accent)' : 'none',
            }}
            onClick={() => setActive(i)}
          >
            <span style={{ fontSize: 15 }}>{icons[i] || '□'}</span>
            <span style={{ fontSize: 12 }}>{t}</span>
          </button>
        ))}
      </div>
      <TabPanel tab={tabs[active]} />
    </div>
  )
}

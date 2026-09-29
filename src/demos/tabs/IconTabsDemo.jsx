import { useTabs } from '../_shared/useTabs.js'
import { tabPanelText } from '../_shared/tabsCommon.jsx'

/** 图标标签 Icon Tabs：纯图标 + 提示 */
export default function IconTabsDemo({ tabs = [], icons = [] }) {
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
            aria-label={t}
            tabIndex={i === active ? 0 : -1}
            title={t}
            className="d-tab"
            style={{
              fontSize: 17,
              padding: '6px 12px',
              borderRadius: 6,
              color: i === active ? 'var(--accent)' : 'var(--text-muted)',
              background: i === active ? 'var(--accent-soft)' : 'transparent',
            }}
            onClick={() => setActive(i)}
          >
            {icons[i] || '□'}
          </button>
        ))}
      </div>
      <div className="d-label" style={{ marginTop: 8 }}>
        {tabPanelText(tabs[active])}
      </div>
    </div>
  )
}

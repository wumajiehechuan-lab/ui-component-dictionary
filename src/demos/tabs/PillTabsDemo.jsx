import { useTabs } from '../_shared/useTabs.js'
import { tabPanelText } from '../_shared/tabsCommon.jsx'

/** 胶囊标签 Pill Tabs：活动项胶囊填充 */
export default function PillTabsDemo({ tabs = [] }) {
  const { active, setActive, onKeyDown } = useTabs(tabs.length)

  return (
    <div className="d-root">
      <div className="d-tablist" role="tablist" onKeyDown={onKeyDown} style={{ gap: 8 }}>
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
                ? { background: 'var(--accent)', color: 'var(--accent-text)', borderRadius: 999, fontWeight: 600 }
                : { border: '1px solid var(--border-strong)', borderRadius: 999 }
            }
            onClick={() => setActive(i)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="d-panel" role="tabpanel">
        {tabPanelText(tabs[active])}
      </div>
    </div>
  )
}

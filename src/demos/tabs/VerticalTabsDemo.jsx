import { useTabs } from '../_shared/useTabs.js'
import { tabPanelText } from '../_shared/tabsCommon.jsx'

/** 垂直标签 Vertical Tabs：左侧纵向 + 右侧面板 */
export default function VerticalTabsDemo({ tabs = [] }) {
  const { active, setActive, onKeyDown } = useTabs(tabs.length)

  return (
    <div className="d-root" style={{ display: 'flex', gap: 12, maxWidth: 340 }}>
      <div role="tablist" aria-orientation="vertical" onKeyDown={onKeyDown} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
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
                    background: 'var(--accent-soft)',
                    color: 'var(--accent)',
                    fontWeight: 600,
                    borderLeft: '3px solid var(--accent)',
                    borderRadius: '0 6px 6px 0',
                  }
                : { textAlign: 'left', borderLeft: '3px solid transparent', borderRadius: '0 6px 6px 0' }
            }
            onClick={() => setActive(i)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="d-panel" role="tabpanel" style={{ flex: 1, marginTop: 0 }}>
        {tabPanelText(tabs[active])}
      </div>
    </div>
  )
}

import { useTabs } from '../_shared/useTabs.js'
import { TabPanel } from '../_shared/tabsCommon.jsx'

/** 文件夹标签 Folder-style Tabs：页签与面板无缝相连 */
export default function FolderTabsDemo({ tabs = [] }) {
  const { active, setActive, onKeyDown } = useTabs(tabs.length)

  return (
    <div className="d-root">
      <div className="d-tablist" role="tablist" onKeyDown={onKeyDown} style={{ gap: 2, zIndex: 1, alignItems: 'flex-end' }}>
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
                    borderBottom: 'none',
                    borderRadius: '10px 10px 0 0',
                    color: 'var(--text)',
                    fontWeight: 600,
                    marginBottom: -1,
                    paddingBottom: 9,
                  }
                : {
                    background: 'var(--code-bg)',
                    border: '1px solid var(--border)',
                    borderBottom: 'none',
                    borderRadius: '10px 10px 0 0',
                    color: 'var(--text-muted)',
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

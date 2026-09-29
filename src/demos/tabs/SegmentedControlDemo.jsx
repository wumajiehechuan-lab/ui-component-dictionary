import { useTabs } from '../_shared/useTabs.js'
import { useTabPositions } from '../_shared/tabsCommon.jsx'

/** 分段控制 Segmented Control：灰轨道 + 凸起滑块 */
export default function SegmentedControlDemo({ tabs = [] }) {
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
          border: '1px solid var(--border)',
          borderRadius: 10,
          padding: 3,
          gap: 0,
        }}
      >
        <span
          aria-hidden
          style={{
            position: 'absolute',
            top: 3,
            bottom: 3,
            left: pos.left,
            width: pos.width,
            background: 'var(--surface)',
            borderRadius: 8,
            boxShadow: 'var(--shadow)',
            transition: 'left .2s ease',
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
            style={{
              flex: 1,
              justifyContent: 'center',
              zIndex: 1,
              color: i === active ? 'var(--text)' : 'var(--text-muted)',
              fontWeight: i === active ? 600 : 400,
            }}
            onClick={() => setActive(i)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="d-label" style={{ marginTop: 8 }}>
        当前分段：{tabs[active]}
      </div>
    </div>
  )
}

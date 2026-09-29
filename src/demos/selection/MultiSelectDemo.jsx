import { useState } from 'react'
import { Dropdown } from '../_shared/Dropdown.jsx'
import { Chip } from '../_shared/Chip.jsx'

/** 下拉多选 Multi-select：chip 可删，列表勾选不收起 */
export default function MultiSelectDemo({ placeholder, options = [], defaultValue = [] }) {
  const [selected, setSelected] = useState(defaultValue)

  const toggle = (opt) =>
    setSelected((s) => (s.includes(opt) ? s.filter((x) => x !== opt) : [...s, opt]))

  const label =
    selected.length === 0 ? placeholder : `${selected.length} 项已选：${selected.join('、')}`

  return (
    <div className="d-root">
      <Dropdown
        trigger={(open) => (
          <div className={`d-select-box${open ? ' focused' : ''}`} style={{ borderColor: open ? 'var(--accent)' : undefined }}>
            {selected.length === 0 ? (
              <span className="d-placeholder">{placeholder}</span>
            ) : (
              selected.map((s) => (
                <Chip
                  key={s}
                  label={s}
                  onRemove={(e) => {
                    e.stopPropagation()
                    toggle(s)
                  }}
                />
              ))
            )}
            <span className={`d-select-arrow${open ? ' open' : ''}`}>▼</span>
          </div>
        )}
      >
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            role="option"
            aria-selected={selected.includes(opt)}
            className={`d-option${selected.includes(opt) ? ' selected' : ''}`}
            title={label}
            onClick={() => toggle(opt)}
          >
            {opt}
            {selected.includes(opt) && <span>✓</span>}
          </button>
        ))}
      </Dropdown>
    </div>
  )
}

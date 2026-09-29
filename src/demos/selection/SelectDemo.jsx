import { useState } from 'react'
import { Dropdown } from '../_shared/Dropdown.jsx'

/** 下拉单选 Select：支持 options 数组、groups 分组、prefix 前缀图标、size 尺寸 */
export default function SelectDemo({ placeholder, options = [], groups, prefix, size }) {
  const [value, setValue] = useState(null)
  const small = size === 'small'

  const optionBtn = (opt) => (
    <button
      key={opt}
      type="button"
      role="option"
      aria-selected={value === opt}
      className={`d-option${value === opt ? ' selected' : ''}`}
      onClick={() => setValue(opt)}
    >
      {opt}
      {value === opt && <span>✓</span>}
    </button>
  )

  return (
    <div className="d-root" style={small ? { maxWidth: 170 } : undefined}>
      <Dropdown
        trigger={(open) => (
          <button type="button" className={`d-btn${open ? ' open' : ''}`} style={{ width: '100%', justifyContent: 'space-between', ...(small ? { padding: '4px 10px', fontSize: 12 } : {}) }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, overflow: 'hidden' }}>
              {prefix && <span aria-hidden>{prefix}</span>}
              <span className={value ? '' : 'd-placeholder'} style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{value || placeholder}</span>
            </span>
            <span className={`d-select-arrow${open ? ' open' : ''}`}>▼</span>
          </button>
        )}
      >
        {groups
          ? groups.map((g) => (
              <div key={g.label}>
                <div className="d-label" style={{ padding: '4px 10px', margin: 0, fontSize: 10.5, textTransform: 'none' }}>{g.label}</div>
                {g.options.map(optionBtn)}
              </div>
            ))
          : options.map(optionBtn)}
      </Dropdown>
    </div>
  )
}

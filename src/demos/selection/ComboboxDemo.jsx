import { useState } from 'react'
import { useClickOutside } from '../_shared/useClickOutside.js'

/** 组合框 Combobox：可输入过滤，只能选已有项 */
export default function ComboboxDemo({ placeholder, options = [] }) {
  const [text, setText] = useState('')
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const [highlight, setHighlight] = useState(0)

  const matches = options.filter((o) => o.toLowerCase().includes(text.toLowerCase()))
  const wrapRef = useClickOutside(() => setOpen(false), open)

  const commit = (opt) => {
    setSelected(opt)
    setText(opt)
    setOpen(false)
  }

  const onKeyDown = (e) => {
    if (!open) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlight((h) => Math.min(h + 1, matches.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlight((h) => Math.max(h - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (matches[highlight]) commit(matches[highlight])
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div className="d-root" ref={wrapRef} onKeyDown={onKeyDown}>
      <input
        className="d-input"
        placeholder={placeholder}
        aria-label="组合框"
        value={text}
        onChange={(e) => {
          setText(e.target.value)
          setSelected(null)
          setOpen(true)
          setHighlight(0)
        }}
        onFocus={() => setOpen(true)}
      />
      {open && (
        <div className="d-menu" role="listbox">
          {matches.length === 0 ? (
            <div className="d-option d-placeholder">无匹配项</div>
          ) : (
            matches.map((opt, i) => (
              <button
                key={opt}
                type="button"
                role="option"
                aria-selected={selected === opt}
                className={`d-option${i === highlight ? ' highlighted' : ''}${selected === opt ? ' selected' : ''}`}
                onMouseEnter={() => setHighlight(i)}
                onClick={() => commit(opt)}
              >
                {opt}
                {selected === opt && <span>✓</span>}
              </button>
            ))
          )}
        </div>
      )}
      {selected && (
        <div className="d-label" style={{ marginTop: 6 }}>
          已选：{selected}
        </div>
      )}
    </div>
  )
}

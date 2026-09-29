import { useState } from 'react'
import { useClickOutside } from '../_shared/useClickOutside.js'

/** 自动完成 Autocomplete：核心是自由文本，输入时出建议 */
export default function AutocompleteDemo({ placeholder, options = [] }) {
  const [text, setText] = useState('')
  const [open, setOpen] = useState(false)
  const wrapRef = useClickOutside(() => setOpen(false), open)

  const suggestions = text ? options.filter((o) => o.includes(text)).slice(0, 5) : []

  return (
    <div className="d-root" ref={wrapRef}>
      <input
        className="d-input"
        placeholder={placeholder}
        aria-label="自动完成输入"
        value={text}
        onChange={(e) => {
          setText(e.target.value)
          setOpen(true)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setOpen(false)
        }}
      />
      {open && suggestions.length > 0 && (
        <div className="d-menu">
          {suggestions.map((opt) => (
            <button
              key={opt}
              type="button"
              className="d-option"
              onClick={() => {
                setText(opt)
                setOpen(false)
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
      {text && (
        <div className="d-label" style={{ marginTop: 6 }}>
          当前输入：{text}（可保留任意文字）
        </div>
      )}
    </div>
  )
}

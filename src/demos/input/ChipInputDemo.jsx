import { useRef, useState } from 'react'
import { Chip } from '../_shared/Chip.jsx'

/** 芯片输入 Chip Input：chip 风格 + 一键建议 */
export default function ChipInputDemo({ placeholder, defaultValue = [], suggestions = [] }) {
  const [chips, setChips] = useState(defaultValue)
  const [text, setText] = useState('')
  const inputRef = useRef(null)

  const add = (value) => {
    const v = (value || text).trim()
    if (!v || chips.includes(v)) return
    setChips((c) => [...c, v])
    setText('')
  }

  const remaining = suggestions.filter((s) => !chips.includes(s))

  return (
    <div className="d-root">
      <div className="d-select-box" style={{ cursor: 'text' }} onClick={() => inputRef.current?.focus()}>
        {chips.map((c) => (
          <Chip key={c} label={c} onRemove={() => setChips((cs) => cs.filter((x) => x !== c))} />
        ))}
        <input
          ref={inputRef}
          className="d-input"
          style={{ flex: 1, minWidth: 90, border: 'none', background: 'transparent', padding: '2px 4px' }}
          placeholder={chips.length === 0 ? placeholder : ''}
          aria-label="芯片输入"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              add()
            } else if (e.key === 'Backspace' && !text) {
              setChips((c) => c.slice(0, -1))
            }
          }}
        />
      </div>
      {remaining.length > 0 && (
        <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
          {remaining.map((s) => (
            <button key={s} type="button" className="d-btn" style={{ padding: '2px 10px', fontSize: 11.5, borderRadius: 999 }} onClick={() => add(s)}>
              + {s}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

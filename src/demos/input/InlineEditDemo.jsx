import { useState } from 'react'

/** 行内编辑 Inline Edit：点击就地变输入框 */
export default function InlineEditDemo({ initialValue = '' }) {
  const [value, setValue] = useState(initialValue)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')

  const start = () => {
    setDraft(value)
    setEditing(true)
  }

  const save = () => {
    const v = draft.trim()
    if (v) setValue(v)
    setEditing(false)
  }

  if (!editing) {
    return (
      <div className="d-root">
        <span
          className="d-inline-edit"
          role="button"
          tabIndex={0}
          aria-label={`编辑：${value}`}
          style={{ borderBottom: '1px dashed var(--border-strong)' }}
          onClick={start}
          onKeyDown={(e) => {
            if (e.key === 'Enter') start()
          }}
        >
          {value}
          <span className="d-placeholder" aria-hidden>
            ✎
          </span>
        </span>
      </div>
    )
  }

  return (
    <div className="d-root" style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
      <input
        className="d-input"
        style={{ flex: 1 }}
        aria-label="编辑值"
        autoFocus
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') save()
          else if (e.key === 'Escape') setEditing(false)
        }}
      />
      <button type="button" className="d-btn" aria-label="保存" onClick={save} style={{ padding: '5px 10px', color: 'var(--ok)', borderColor: 'var(--border-strong)' }}>
        ✓
      </button>
      <button type="button" className="d-btn" aria-label="取消" onClick={() => setEditing(false)} style={{ padding: '5px 10px', color: 'var(--danger)' }}>
        ✕
      </button>
    </div>
  )
}

import { useRef, useState } from 'react'

/** 标签输入 Tag Input：回车成标签，可删 */
export default function TagInputDemo({ placeholder, defaultValue = [] }) {
  const [tags, setTags] = useState(defaultValue)
  const [text, setText] = useState('')
  const [dup, setDup] = useState(false)
  const inputRef = useRef(null)

  const addTag = () => {
    const t = text.trim()
    if (!t) return
    if (tags.includes(t)) {
      setDup(true)
      setTimeout(() => setDup(false), 600)
      return
    }
    setTags((ts) => [...ts, t])
    setText('')
  }

  const removeLast = () => {
    setTags((ts) => ts.slice(0, -1))
  }

  return (
    <div
      className="d-select-box"
      style={{
        cursor: 'text',
        flexWrap: 'wrap',
        borderColor: dup ? 'var(--danger)' : undefined,
        transform: dup ? 'translateX(2px)' : 'none',
        transition: 'transform .1s ease, border-color .15s ease',
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {tags.map((t) => (
        <span key={t} className="d-chip" style={{ background: 'var(--code-bg)', color: 'var(--text)' }}>
          {t}
          <button type="button" className="d-chip-x" aria-label={`删除 ${t}`} onClick={() => setTags((ts) => ts.filter((x) => x !== t))}>
            ✕
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        className="d-input"
        style={{ flex: 1, minWidth: 90, border: 'none', background: 'transparent', padding: '2px 4px' }}
        placeholder={tags.length === 0 ? placeholder : ''}
        aria-label="标签输入"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault()
            addTag()
          } else if (e.key === 'Backspace' && !text) {
            removeLast()
          }
        }}
      />
    </div>
  )
}

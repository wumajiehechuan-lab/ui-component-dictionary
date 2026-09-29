import { useRef, useState } from 'react'
import { useClickOutside } from '../_shared/useClickOutside.js'

/**
 * 提及输入 Mentions：输入 @ 弹出建议，插入高亮提及 token（用 \u200B 包裹标记）。
 * 演示版用受控文本 + 正则渲染提及，token 以 @名字 空格结束。
 */
export default function MentionsDemo({ placeholder, people = [] }) {
  const [text, setText] = useState('')
  const [query, setQuery] = useState(null) // @ 后的过滤词
  const [queryStart, setQueryStart] = useState(-1)
  const areaRef = useRef(null)
  const popRef = useClickOutside(() => {
    setQuery(null)
    setQueryStart(-1)
  }, query !== null)

  const matches = query !== null ? people.filter((p) => p.toLowerCase().startsWith(query.toLowerCase())).slice(0, 5) : []

  const onChange = (e) => {
    const v = e.target.value
    setText(v)
    const pos = e.target.selectionStart
    // 检查光标前是否有未完成的 @词
    const before = v.slice(0, pos)
    const atIdx = before.lastIndexOf('@')
    if (atIdx !== -1) {
      const frag = before.slice(atIdx + 1)
      if (!/\s/.test(frag) && !frag.includes('@')) {
        setQuery(frag)
        setQueryStart(atIdx)
        return
      }
    }
    setQuery(null)
    setQueryStart(-1)
  }

  const insertMention = (name) => {
    const area = areaRef.current
    const pos = area.selectionStart
    const next = text.slice(0, queryStart) + '@' + name + ' ' + text.slice(pos)
    setText(next)
    setQuery(null)
    setQueryStart(-1)
    requestAnimationFrame(() => {
      const caret = queryStart + name.length + 2
      area.focus()
      area.setSelectionRange(caret, caret)
    })
  }

  const onKeyDown = (e) => {
    if (query !== null && matches.length > 0) {
      if (e.key === 'Escape') {
        setQuery(null)
        setQueryStart(-1)
      }
    } else if (e.key === 'Backspace') {
      // 一次删除整个 @提及
      const pos = areaRef.current.selectionStart
      const m = [...text.slice(0, pos).matchAll(/@[\w\u4e00-\u9fa5]+ $/g)]
      if (m.length) {
        e.preventDefault()
        const start = pos - m[0][0].length
        setText(text.slice(0, start) + text.slice(pos))
        requestAnimationFrame(() => areaRef.current?.setSelectionRange(start, start))
      }
    }
  }

  // 渲染：把已完成的 @名字 标成高亮 token
  const renderText = () => {
    const parts = []
    const regex = /@[\w\u4e00-\u9fa5]+ /g
    let last = 0
    let m
    while ((m = regex.exec(text)) !== null) {
      if (m.index > last) parts.push(<span key={`t${m.index}`}>{text.slice(last, m.index)}</span>)
      parts.push(
        <span key={`m${m.index}`} style={{ background: 'var(--accent-soft)', color: 'var(--accent)', borderRadius: 4, padding: '0 2px', fontWeight: 600 }}>
          {m[0].trim()}
          {'\u00A0'}
        </span>
      )
      last = m.index + m[0].length
    }
    if (last < text.length) parts.push(<span key="tail">{text.slice(last)}</span>)
    return parts
  }

  return (
    <div className="d-root" ref={popRef} style={{ position: 'relative' }}>
      <textarea
        ref={areaRef}
        className="d-input"
        rows={3}
        placeholder={placeholder}
        aria-label="提及输入"
        value={text}
        onChange={onChange}
        onKeyDown={onKeyDown}
        style={{ resize: 'none', lineHeight: 1.7 }}
      />
      {/* 高亮渲染层（演示示意：输入框下方实时展示 token 效果） */}
      {text && (
        <div className="d-label" style={{ lineHeight: 1.9 }}>
          提及效果：{renderText()}
        </div>
      )}
      {query !== null && matches.length > 0 && (
        <div className="d-menu" style={{ bottom: 'calc(100% + 4px)', top: 'auto', maxHeight: 170 }}>
          {matches.map((p) => (
            <button key={p} type="button" className="d-option" onMouseDown={(e) => e.preventDefault()} onClick={() => insertMention(p)}>
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

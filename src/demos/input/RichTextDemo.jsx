import { useRef, useState } from 'react'

/** 富文本编辑器（简化演示版）：contenteditable + 加粗/斜体/列表三个按钮 */
export default function RichTextDemo({ initialHtml = '' }) {
  const areaRef = useRef(null)
  const [marks, setMarks] = useState({ bold: false, italic: false, list: false })

  const refreshMarks = () => {
    try {
      setMarks({
        bold: document.queryCommandState('bold'),
        italic: document.queryCommandState('italic'),
        list: document.queryCommandState('insertUnorderedList'),
      })
    } catch {
      /* 某些浏览器可能抛错，忽略 */
    }
  }

  const exec = (cmd) => {
    areaRef.current?.focus()
    document.execCommand(cmd)
    refreshMarks()
  }

  const btnStyle = (on) => ({
    padding: '4px 12px',
    fontWeight: on ? 700 : 400,
    background: on ? 'var(--accent-soft)' : 'var(--surface)',
    color: on ? 'var(--accent)' : 'var(--text)',
  })

  return (
    <div className="d-root" style={{ maxWidth: 340 }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
        <button type="button" className="d-btn" style={btnStyle(marks.bold)} aria-label="加粗" onClick={() => exec('bold')}>
          B
        </button>
        <button type="button" className="d-btn" style={{ ...btnStyle(marks.italic), fontStyle: 'italic' }} aria-label="斜体" onClick={() => exec('italic')}>
          I
        </button>
        <button type="button" className="d-btn" style={btnStyle(marks.list)} aria-label="无序列表" onClick={() => exec('insertUnorderedList')}>
          • List
        </button>
      </div>
      <div
        ref={areaRef}
        contentEditable
        suppressContentEditableWarning
        aria-label="富文本编辑区"
        className="d-input"
        style={{ minHeight: 84, lineHeight: 1.7 }}
        onKeyUp={refreshMarks}
        onMouseUp={refreshMarks}
        dangerouslySetInnerHTML={{ __html: initialHtml }}
      />
    </div>
  )
}

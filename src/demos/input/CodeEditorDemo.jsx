import { useState } from 'react'

/** 代码编辑器（简化演示版）：行号 + 等宽 textarea，Tab 插两空格 */
export default function CodeEditorDemo({ initialCode = '' }) {
  const [code, setCode] = useState(initialCode)
  const lineCount = code.split('\n').length

  const onKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const el = e.target
      const { selectionStart: s, selectionEnd: end } = el
      const next = code.slice(0, s) + '  ' + code.slice(end)
      setCode(next)
      requestAnimationFrame(() => el.setSelectionRange(s + 2, s + 2))
    }
  }

  return (
    <div className="d-root" style={{ maxWidth: 360 }}>
      <div
        style={{
          display: 'flex',
          border: '1px solid var(--border-strong)',
          borderRadius: 8,
          background: 'var(--code-bg)',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden
          style={{
            padding: '10px 6px',
            textAlign: 'right',
            color: 'var(--text-muted)',
            fontSize: 12,
            lineHeight: 1.6,
            userSelect: 'none',
            minWidth: 30,
            borderRight: '1px solid var(--border)',
          }}
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <textarea
          className="d-input"
          aria-label="代码编辑区"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={onKeyDown}
          spellCheck={false}
          style={{
            flex: 1,
            minHeight: 110,
            border: 'none',
            background: 'transparent',
            fontFamily: 'ui-monospace, Consolas, monospace',
            fontSize: 12.5,
            lineHeight: 1.6,
            resize: 'vertical',
            whiteSpace: 'pre',
          }}
        />
      </div>
    </div>
  )
}

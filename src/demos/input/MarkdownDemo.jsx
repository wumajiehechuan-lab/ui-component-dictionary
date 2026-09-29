import { useMemo, useState } from 'react'

/**
 * Markdown 编辑器（简化演示版）：textarea + 极简正则渲染。
 * 支持：标题 #~###、加粗 **x**、行内代码 `x`、无序列表 - 。
 */
function renderMarkdown(src) {
  const lines = src.split('\n')
  const out = []
  let inList = false

  const inline = (s) =>
    s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code style="background:var(--code-bg);padding:1px 4px;border-radius:4px">$1</code>')

  for (const line of lines) {
    const h = line.match(/^(#{1,3})\s+(.*)/)
    const li = line.match(/^-\s+(.*)/)
    if (li) {
      if (!inList) {
        out.push('<ul style="margin:4px 0;padding-left:20px">')
        inList = true
      }
      out.push(`<li>${inline(li[1])}</li>`)
      continue
    }
    if (inList) {
      out.push('</ul>')
      inList = false
    }
    if (h) {
      const size = [20, 16, 14][h[1].length - 1]
      out.push(`<h${h[1].length + 1} style="font-size:${size}px;margin:8px 0 4px">${inline(h[2])}</h${h[1].length + 1}>`)
    } else if (line.trim()) {
      out.push(`<p style="margin:4px 0">${inline(line)}</p>`)
    }
  }
  if (inList) out.push('</ul>')
  return out.join('')
}

export default function MarkdownDemo({ initialText = '' }) {
  const [text, setText] = useState(initialText)
  const html = useMemo(() => renderMarkdown(text), [text])

  return (
    <div className="d-root" style={{ display: 'flex', gap: 10, maxWidth: 420 }}>
      <textarea
        className="d-input"
        aria-label="Markdown 源码"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ flex: 1, minHeight: 130, resize: 'vertical', fontSize: 12, lineHeight: 1.6 }}
      />
      <div
        className="d-input"
        aria-label="Markdown 预览"
        style={{ flex: 1, minHeight: 130, background: 'var(--code-bg)', overflow: 'auto', fontSize: 12 }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}

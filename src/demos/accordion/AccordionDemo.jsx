import { useState } from 'react'

function Section({ title, body, open, onToggle, bordered, faq, first, children }) {
  return (
    <div style={bordered ? { border: '1px solid var(--border)', borderRadius: 10, marginBottom: 8, overflow: 'hidden', background: 'var(--surface)' } : faq ? { borderBottom: '1px solid var(--border)' } : { borderBottom: first ? 'none' : '1px solid var(--border)' }}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, width: '100%', border: 'none', background: open && bordered ? 'var(--accent-soft)' : 'transparent', padding: bordered ? '10px 14px' : '10px 2px', fontSize: 13.5, fontWeight: 600, color: 'var(--text)', cursor: 'pointer', textAlign: 'left' }}
      >
        {title}
        <span style={{ transition: 'transform .2s ease', transform: open ? 'rotate(45deg)' : 'rotate(0)', color: 'var(--text-muted)', fontWeight: 400 }}>{faq ? '＋' : '▾'}</span>
      </button>
      {open && (
        <div style={{ padding: bordered ? '0 14px 12px' : faq ? '0 24px 12px 2px' : '0 2px 12px', fontSize: 12.5, color: 'var(--text-muted)' }}>
          {body || children}
        </div>
      )}
    </div>
  )
}

/** 折叠类 demo：多开 / 单开 / 盒状 / FAQ / 嵌套 */
export default function AccordionDemo({ items = [], multiple, bordered, faq, nested }) {
  const [openSet, setOpenSet] = useState(() => new Set(faq ? [] : [0]))
  const [innerOpen, setInnerOpen] = useState(() => new Set())

  const toggle = (i) => {
    setOpenSet((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else {
        if (!multiple && !faq && !nested) next.clear()
        next.add(i)
      }
      return next
    })
  }

  return (
    <div className="d-root" style={{ width: '100%' }}>
      {items.map((it, i) => (
        <div key={i} style={{ borderLeft: nested && it.children ? '1px solid var(--border)' : 'none' }}>
          <Section
            title={it.title}
            body={it.body}
            bordered={bordered}
            faq={faq}
            first={i === 0 && !bordered && !faq}
            open={openSet.has(i)}
            onToggle={() => toggle(i)}
          >
            {nested && it.children ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {it.children.map((c, j) => (
                  <div key={j} style={{ borderLeft: '2px solid var(--border)', paddingLeft: 10 }}>
                    <button
                      type="button"
                      onClick={() => setInnerOpen((prev) => { const n = new Set(prev); n.has(j) ? n.delete(j) : n.add(j); return n })}
                      aria-expanded={innerOpen.has(j)}
                      style={{ display: 'flex', justifyContent: 'space-between', width: '100%', border: 'none', background: 'transparent', padding: '6px 0', fontSize: 12.5, fontWeight: 600, color: 'var(--text)', cursor: 'pointer' }}
                    >
                      {c.title}
                      <span style={{ transform: innerOpen.has(j) ? 'rotate(180deg)' : 'none', transition: 'transform .2s ease', color: 'var(--text-muted)' }}>▾</span>
                    </button>
                    {innerOpen.has(j) && <div className="d-label" style={{ paddingBottom: 8 }}>{c.body}</div>}
                  </div>
                ))}
              </div>
            ) : (
              it.body
            )}
          </Section>
        </div>
      ))}
    </div>
  )
}

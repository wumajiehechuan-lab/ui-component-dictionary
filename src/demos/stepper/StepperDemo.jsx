import { useState } from 'react'

/** 步骤条 demo：horizontal/vertical/dots/bar/numbered/editable 参数化 */
export default function StepperDemo({ steps = [], current = 0, vertical, dots, bar, numbered, editable, clickable, descriptions = [] }) {
  const [cur, setCur] = useState(current)

  if (dots) {
    return (
      <div className="d-root" style={{ display: 'flex', gap: 8, justifyContent: 'center' }} role="tablist">
        {steps.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`第 ${i + 1} 页`}
            onClick={clickable ? () => setCur(i) : undefined}
            style={{
              height: 8,
              width: i === cur ? 26 : 8,
              borderRadius: 999,
              border: 'none',
              background: i === cur ? 'var(--accent)' : 'var(--border-strong)',
              transition: 'width .2s ease, background .2s ease',
              cursor: clickable ? 'pointer' : 'default',
            }}
          />
        ))}
      </div>
    )
  }

  if (bar) {
    return (
      <div className="d-root">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {steps.map((s, i) => (
            <div key={s} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 12, color: i <= cur ? 'var(--accent)' : 'var(--text-muted)', fontWeight: i === cur ? 600 : 400, whiteSpace: 'nowrap' }}>{s}</span>
              {i < steps.length - 1 && (
                <span style={{ flex: 1, height: 4, borderRadius: 4, background: 'var(--border)', overflow: 'hidden' }}>
                  <span style={{ display: 'block', height: '100%', background: 'var(--accent)', width: `${Math.max(0, Math.min(1, cur - i)) * 100}%`, transition: 'width .3s ease' }} />
                </span>
              )}
            </div>
          ))}
        </div>
        {clickable && (
          <div style={{ display: 'flex', gap: 8, marginTop: 10, justifyContent: 'center' }}>
            <button type="button" className="d-btn" style={{ padding: '3px 12px', fontSize: 12 }} onClick={() => setCur((c) => Math.max(0, c - 1))}>Back</button>
            <button type="button" className="d-btn" style={{ padding: '3px 12px', fontSize: 12, background: 'var(--accent)', color: 'var(--accent-text)', borderColor: 'var(--accent)' }} onClick={() => setCur((c) => Math.min(steps.length - 1, c + 1))}>Next</button>
          </div>
        )}
      </div>
    )
  }

  const items = steps.map((s, i) => {
    const done = i < cur
    const isCur = i === cur
    const canJump = clickable && (editable ? i <= cur : true)
    return (
      <div key={s} style={{ display: 'flex', gap: 10, flex: vertical ? 'none' : 1, alignItems: vertical ? 'flex-start' : 'center', minWidth: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span
            style={{
              width: 26,
              height: 26,
              borderRadius: '50%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              flexShrink: 0,
              background: done || isCur ? 'var(--accent)' : 'var(--surface)',
              color: done || isCur ? 'var(--accent-text)' : 'var(--text-muted)',
              border: done || isCur ? 'none' : '1px solid var(--border-strong)',
              fontWeight: 600,
              transition: 'background .15s ease, color .15s ease',
            }}
          >
            {done ? '✓' : i + 1}
          </span>
          {i < steps.length - 1 && vertical && <span style={{ width: 2, flex: 1, minHeight: 18, background: done ? 'var(--accent)' : 'var(--border)' }} />}
        </div>
        <div style={{ paddingTop: vertical ? 3 : 0 }}>
          <div
            onClick={canJump ? () => setCur(i) : undefined}
            style={{
              fontSize: 13,
              whiteSpace: 'nowrap',
              color: i <= cur ? 'var(--text)' : 'var(--text-muted)',
              fontWeight: isCur ? 600 : 400,
              cursor: canJump ? 'pointer' : 'default',
              textDecoration: editable && done ? 'underline' : 'none',
            }}
          >
            {s}
            {editable && done && <span className="d-placeholder" style={{ marginLeft: 4, fontSize: 11 }}>✎</span>}
          </div>
          {vertical && descriptions[i] && <div className="d-label" style={{ marginTop: 2 }}>{descriptions[i]}</div>}
        </div>
        {!vertical && i < steps.length - 1 && <span style={{ flex: 1, height: 2, background: done ? 'var(--accent)' : 'var(--border)', margin: '0 4px', minWidth: 14 }} />}
      </div>
    )
  })

  return (
    <div
      className="d-root"
      style={vertical ? { display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 260 } : { display: 'flex', width: '100%' }}
      role="list"
    >
      {items}
    </div>
  )
}

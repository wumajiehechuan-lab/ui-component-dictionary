import { useEffect, useState } from 'react'

/** 数据展示类 demo：table/timeline/stats/descriptions/ranking/bar-chart/code-block/progress-list/avatar-group */
export default function DataDemo({ variant, columns, rows, selectedRow, events, stats, items, ranking, data, labels, lang, code, avatars, overflow }) {
  const [sel, setSel] = useState(selectedRow ?? -1)
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  if (variant === 'table') {
    return (
      <div className="d-root" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c} style={{ textAlign: 'left', padding: '7px 8px', borderBottom: '1px solid var(--border-strong)', color: 'var(--text-muted)', fontWeight: 600 }}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={i}
                onClick={() => setSel(i)}
                style={{ background: sel === i ? 'var(--accent-soft)' : 'transparent', cursor: 'pointer', borderBottom: '1px solid var(--border)' }}
                onMouseEnter={(e) => { if (sel !== i) e.currentTarget.style.background = 'var(--surface-hover)' }}
                onMouseLeave={(e) => { if (sel !== i) e.currentTarget.style.background = 'transparent' }}
              >
                {r.map((cell, j) => (
                  <td key={j} style={{ padding: '7px 8px', whiteSpace: 'nowrap' }}>
                    {j === 2 ? (
                      <span style={{ fontSize: 11, borderRadius: 999, padding: '1px 8px', background: cell === '已同步' ? 'rgba(34,197,94,.14)' : cell === '失败' ? 'rgba(239,68,68,.14)' : 'var(--code-bg)', color: cell === '已同步' ? 'var(--ok)' : cell === '失败' ? 'var(--danger)' : 'var(--text-muted)' }}>{cell}</span>
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  if (variant === 'timeline') {
    return (
      <div className="d-root" style={{ position: 'relative', paddingLeft: 18, width: '100%' }}>
        <span style={{ position: 'absolute', left: 5, top: 6, bottom: 6, width: 2, background: 'var(--border)' }} />
        {events.map(([t, d, ts], i) => (
          <div key={i} style={{ position: 'relative', marginBottom: 12 }}>
            <span style={{ position: 'absolute', left: -18, top: 4, width: 10, height: 10, borderRadius: '50%', background: i === 0 ? 'var(--accent)' : 'var(--border-strong)', border: '2px solid var(--surface)' }} />
            <div style={{ fontSize: 13, fontWeight: 600 }}>{t}</div>
            <div className="d-label" style={{ margin: '2px 0 0' }}>{d} · {ts}</div>
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'stats') {
    return (
      <div className="d-root" style={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
        {stats.map((s, i) => (
          <div key={i} style={{ textAlign: 'center', padding: '0 14px', borderLeft: i > 0 ? '1px solid var(--border)' : 'none', transition: 'transform .12s ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = '')}
          >
            <div className="d-label" style={{ margin: 0 }}>{s.label}</div>
            <div style={{ fontSize: 20, fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>{s.value}</div>
            <div style={{ fontSize: 11, color: s.delta.startsWith('+') ? 'var(--ok)' : s.delta === '0' ? 'var(--text-muted)' : 'var(--danger)' }}>{s.delta}</div>
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'descriptions') {
    return (
      <div className="d-root" style={{ border: '1px solid var(--border)', borderRadius: 10, padding: 8, width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          {items.map(([k, v], i) => (
            <div key={i} style={{ display: 'flex', gap: 8, fontSize: 12, padding: '5px 6px', borderRadius: 6 }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <span className="d-label" style={{ margin: 0, minWidth: 58, textAlign: 'right' }}>{k}</span>
              <span style={{ color: 'var(--text)' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'ranking') {
    const list = rows || []
    const max = Math.max(...list.map(([, v]) => v))
    return (
      <div className="d-root" style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
        {list.map(([name, v], i) => (
          <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5 }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <span style={{ width: 18, textAlign: 'center', fontWeight: 700, color: i < 3 ? 'var(--accent)' : 'var(--text-muted)' }}>{i + 1}</span>
            <span style={{ width: 110, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
            <span style={{ flex: 1, height: 6, borderRadius: 4, background: 'var(--border)' }}>
              <span style={{ display: 'block', height: '100%', borderRadius: 4, background: i < 3 ? 'var(--accent)' : 'var(--border-strong)', width: mounted ? `${(v / max) * 100}%` : 0, transition: 'width .4s ease' }} />
            </span>
            <span className="d-label" style={{ margin: 0 }}>{v}</span>
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'bar-chart') {
    const max = Math.max(...data)
    return (
      <div className="d-root" style={{ width: '100%' }}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 80 }}>
          {data.map((v, i) => (
            <div key={i} style={{ flex: 1, position: 'relative', height: '100%', display: 'flex', alignItems: 'flex-end' }}>
              <span className="d-label" style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', margin: 0, opacity: 0, transition: 'opacity .12s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
              >
                {v}
              </span>
              <span
                title={`数值 ${v}`}
                onMouseEnter={(e) => { e.currentTarget.parentNode.querySelector('.d-label').style.opacity = 1 }}
                onMouseLeave={(e) => { e.currentTarget.parentNode.querySelector('.d-label').style.opacity = 0 }}
                style={{ display: 'block', width: '100%', borderRadius: '4px 4px 0 0', background: v === max ? 'var(--accent)' : 'var(--border-strong)', height: mounted ? `${(v / max) * 100}%` : 0, transition: 'height .3s ease', cursor: 'pointer' }}
              />
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
          {labels.map((l) => <span key={l} className="d-label" style={{ flex: 1, textAlign: 'center', margin: 0 }}>{l}</span>)}
        </div>
      </div>
    )
  }

  if (variant === 'code-block') {
    const [copied, setCopied] = useState(false)
    return (
      <div className="d-root" style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--code-bg)', padding: '6px 10px' }}>
          <span className="d-label" style={{ margin: 0 }}>{lang}</span>
          <button
            type="button"
            className="d-btn"
            style={{ padding: '2px 10px', fontSize: 11 }}
            onClick={() => { navigator.clipboard?.writeText(code).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 1200) }}
          >
            {copied ? '已复制' : '复制'}
          </button>
        </div>
        <pre style={{ margin: 0, padding: 12, background: '#16181d', color: '#c9d1d9', fontSize: 12, lineHeight: 1.6, overflowX: 'auto' }}>{code}</pre>
      </div>
    )
  }

  if (variant === 'progress-list') {
    return (
      <div className="d-root" style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
        {rows.map(([label, v]) => (
          <div key={label} title={`${label}：${v}%`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}>
              <span>{label}</span>
              <span className="d-label" style={{ margin: 0 }}>{v}%</span>
            </div>
            <span style={{ display: 'block', height: 6, borderRadius: 4, background: 'var(--border)' }}>
              <span style={{ display: 'block', height: '100%', borderRadius: 4, width: mounted ? `${v}%` : 0, background: v >= 90 ? 'var(--danger)' : 'var(--accent)', transition: 'width .4s ease' }} />
            </span>
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'avatar-group') {
    return (
      <div className="d-root" style={{ display: 'flex', justifyContent: 'center' }}>
        {avatars.map((a, i) => (
          <span
            key={i}
            style={{ width: 34, height: 34, borderRadius: '50%', background: ['var(--accent-soft)', 'var(--code-bg)'][i % 2], color: 'var(--accent)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--surface)', marginLeft: i ? -10 : 0, fontSize: 13, transition: 'transform .12s ease', cursor: 'default', zIndex: avatars.length - i }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = '')}
          >
            {a}
          </span>
        ))}
        {overflow > 0 && (
          <span style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--border)', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--surface)', marginLeft: -10, fontSize: 11 }}>+{overflow}</span>
        )}
      </div>
    )
  }

  return null
}

import { useState } from 'react'

const HUES = ['rgba(59,130,246,.14)', 'rgba(34,197,94,.14)', 'rgba(249,115,22,.14)', 'rgba(168,85,247,.14)', 'rgba(236,72,153,.14)']
const HUE_TEXT = ['#3b82f6', '#22c55e', '#f97316', '#a855f7', '#ec4899']
const STATUS = { 成功: 'var(--ok)', 处理中: 'var(--accent)', 已排队: 'var(--text-muted)', 失败: 'var(--danger)', 已跳过: 'var(--text-muted)', 已完成: 'var(--ok)', 进行中: 'var(--accent)' }

/** 标签徽章类 demo：colored/badge/status-pill/removable/outline/count/filter-bar/new-badge/status-group */
export default function TagDemo({ variant, tags = [], count, pills, emphasized, rows, filters, feature }) {
  const [chips, setChips] = useState(tags)
  const [sel, setSel] = useState(0)
  const [activeFilters, setActiveFilters] = useState(filters)
  const [dismissed, setDismissed] = useState(false)
  const [badgeState, setBadgeState] = useState(count > 0 ? 'count' : 'none')

  if (variant === 'badge') {
    return (
      <div className="d-root" style={{ display: 'flex', gap: 26, justifyContent: 'center' }}>
        <button
          type="button"
          aria-label={`通知，${count} 条`}
          onClick={() => setBadgeState((s) => (s === 'count' ? 'dot' : s === 'dot' ? 'none' : 'count'))}
          style={{ position: 'relative', border: 'none', background: 'transparent', fontSize: 22, cursor: 'pointer', color: 'var(--text-muted)' }}
        >
          🔔
          {badgeState === 'count' && (
            <span style={{ position: 'absolute', top: -4, right: -10, background: 'var(--danger)', color: '#fff', fontSize: 10, borderRadius: 999, padding: '1px 5px', fontWeight: 600 }}>
              {count > 99 ? '99+' : count}
            </span>
          )}
          {badgeState === 'dot' && <span style={{ position: 'absolute', top: 0, right: -2, width: 8, height: 8, borderRadius: '50%', background: 'var(--danger)' }} />}
        </button>
      </div>
    )
  }

  if (variant === 'colored' || variant === 'status-group') {
    return (
      <div className="d-root" style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
        {tags.map((t, i) => (
          <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: HUES[i % HUES.length], color: HUE_TEXT[i % HUES.length], borderRadius: 6, padding: '2px 9px', fontSize: 12, transition: 'filter .12s ease', cursor: 'default' }}
            onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(.96)')}
            onMouseLeave={(e) => (e.currentTarget.style.filter = '')}
          >
            {variant === 'status-group' && <span style={{ width: 7, height: 7, borderRadius: '50%', background: STATUS[t] || 'var(--text-muted)' }} />}
            {t}
          </span>
        ))}
      </div>
    )
  }

  if (variant === 'status-pill') {
    return (
      <div className="d-root" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        {pills.map((p) => (
          <span key={p} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, borderRadius: 999, padding: '3px 12px', fontSize: 12, fontWeight: 600, background: `${STATUS[p] || 'var(--text-muted)'}1f`, color: STATUS[p] || 'var(--text-muted)' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: STATUS[p] || 'var(--text-muted)' }} />
            {p}
          </span>
        ))}
      </div>
    )
  }

  if (variant === 'removable') {
    return (
      <div className="d-root" style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
        {chips.map((c) => (
          <span key={c} className="d-chip">
            {c}
            <button type="button" className="d-chip-x" aria-label={`删除 ${c}`} onClick={() => setChips((cs) => cs.filter((x) => x !== c))}>✕</button>
          </span>
        ))}
        {chips.length < tags.length && (
          <button type="button" className="d-btn" style={{ border: 'none', background: 'transparent', color: 'var(--accent)', fontSize: 12, padding: '2px 4px' }} onClick={() => setChips(tags)}>重置</button>
        )}
      </div>
    )
  }

  if (variant === 'outline') {
    return (
      <div className="d-root" style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
        {tags.map((t, i) => (
          <span key={t} style={{ border: `1px solid ${i === emphasized ? 'var(--accent)' : 'var(--border-strong)'}`, color: i === emphasized ? 'var(--accent)' : 'var(--text-muted)', borderRadius: 6, padding: '2px 10px', fontSize: 12, transition: 'background .12s ease', cursor: 'default' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            {t}
          </span>
        ))}
      </div>
    )
  }

  if (variant === 'count') {
    return (
      <div className="d-root" style={{ width: 200 }}>
        {rows.map(([label, n], i) => (
          <button
            key={label}
            type="button"
            onClick={() => setSel(i)}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', border: 'none', background: sel === i ? 'var(--accent-soft)' : 'transparent', borderRadius: 7, padding: '6px 10px', fontSize: 13, color: sel === i ? 'var(--accent)' : 'var(--text)', cursor: 'pointer', fontWeight: sel === i ? 600 : 400 }}
          >
            {label}
            <span style={{ fontSize: 11, background: sel === i ? 'var(--accent)' : 'var(--code-bg)', color: sel === i ? 'var(--accent-text)' : 'var(--text-muted)', borderRadius: 999, padding: '1px 8px' }}>{n}</span>
          </button>
        ))}
      </div>
    )
  }

  if (variant === 'filter-bar') {
    return (
      <div className="d-root" style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
        <span className="d-label" style={{ margin: 0 }}>筛选:</span>
        {activeFilters.map((f) => (
          <span key={f} className="d-chip" style={{ background: 'var(--code-bg)', color: 'var(--text)' }}>
            {f}
            <button type="button" className="d-chip-x" aria-label={`删除筛选 ${f}`} onClick={() => setActiveFilters((fs) => fs.filter((x) => x !== f))}>✕</button>
          </span>
        ))}
        {activeFilters.length > 0 && (
          <button type="button" className="d-btn" style={{ border: 'none', background: 'transparent', color: 'var(--accent)', fontSize: 12, padding: '2px 4px' }} onClick={() => setActiveFilters([])}>清空</button>
        )}
        {activeFilters.length === 0 && <span className="d-label" style={{ margin: 0 }}>未启用筛选</span>}
      </div>
    )
  }

  if (variant === 'new-badge') {
    return (
      <div className="d-root" style={{ position: 'relative', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px', width: '100%', fontSize: 13 }}>
        <span style={{ position: 'absolute', top: -8, right: 10, background: 'linear-gradient(135deg,#f97316,#ec4899)', color: '#fff', fontSize: 10, fontWeight: 700, borderRadius: 999, padding: '2px 8px', letterSpacing: 1, transition: 'transform .15s ease' }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'rotate(-4deg) scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = '')}
        >
          NEW
        </span>
        {feature}
      </div>
    )
  }

  return null
}

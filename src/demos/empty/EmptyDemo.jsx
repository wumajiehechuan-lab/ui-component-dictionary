/** 空状态类 demo：no-data/no-results/network/first-use/no-permission/empty-cart */
export default function EmptyDemo({ variant, title, hint, action, keyword, suggestions, steps, recs }) {
  const inner = { textAlign: 'center', padding: '16px 10px', width: '100%' }
  const icon = { fontSize: 30, marginBottom: 6, opacity: 0.8 }

  if (variant === 'no-data') {
    return (
      <div className="d-root" style={inner}>
        <div style={icon}>
          <svg width="52" height="40" viewBox="0 0 52 40" style={{ opacity: 0.5 }}>
            <rect x="4" y="10" width="30" height="24" rx="3" fill="none" stroke="var(--border-strong)" strokeWidth="2" />
            <rect x="18" y="4" width="30" height="24" rx="3" fill="var(--code-bg)" stroke="var(--border-strong)" strokeWidth="2" />
          </svg>
        </div>
        <div style={{ fontSize: 14, fontWeight: 700 }}>{title}</div>
        <p className="d-label" style={{ margin: '4px 0 12px' }}>{hint}</p>
        <button type="button" className="d-btn" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>{action}</button>
      </div>
    )
  }

  if (variant === 'no-results') {
    return (
      <div className="d-root" style={inner}>
        <div style={icon}>⌕</div>
        <div style={{ fontSize: 14, fontWeight: 700 }}>{title || '没有找到相关结果'}</div>
        <p className="d-label" style={{ margin: '4px 0 10px' }}>没有找到与「{keyword}」相关的结果</p>
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
          {suggestions.map((s) => (
            <button key={s} type="button" className="d-btn" style={{ fontSize: 11.5, padding: '3px 12px', borderRadius: 999 }}>试试：{s}</button>
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'network') {
    return (
      <div className="d-root" style={inner}>
        <div style={icon}>🔌</div>
        <div style={{ fontSize: 14, fontWeight: 700 }}>{title}</div>
        <p className="d-label" style={{ margin: '4px 0 12px' }}>{hint}</p>
        <button type="button" className="d-btn" style={{ background: 'var(--accent)', color: 'var(--accent-text)', borderColor: 'var(--accent)' }}>重新连接</button>
      </div>
    )
  }

  if (variant === 'first-use') {
    return (
      <div className="d-root" style={inner}>
        <div style={icon}>👋</div>
        <div style={{ fontSize: 14, fontWeight: 700 }}>欢迎使用</div>
        <ol style={{ margin: '8px auto 12px', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12.5, color: 'var(--text-muted)', maxWidth: 160 }}>
          {steps.map((s, i) => <li key={s}><b style={{ color: 'var(--accent)', marginRight: 6 }}>{i + 1}.</b>{s}</li>)}
        </ol>
        <button type="button" className="d-btn" style={{ background: 'var(--accent)', color: 'var(--accent-text)', borderColor: 'var(--accent)' }}>导入示例数据</button>
      </div>
    )
  }

  if (variant === 'no-permission') {
    return (
      <div className="d-root" style={inner}>
        <div style={icon}>🔒</div>
        <div style={{ fontSize: 14, fontWeight: 700 }}>没有访问权限</div>
        <p className="d-label" style={{ margin: '4px 0 12px' }}>{hint}</p>
        <button type="button" className="d-btn" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>申请权限</button>
      </div>
    )
  }

  if (variant === 'empty-cart') {
    return (
      <div className="d-root" style={inner}>
        <div style={icon}>🛒</div>
        <div style={{ fontSize: 14, fontWeight: 700 }}>购物车还是空的</div>
        <p className="d-label" style={{ margin: '4px 0 12px' }}>快去挑选心仪的商品吧</p>
        <button type="button" className="d-btn" style={{ background: 'var(--accent)', color: 'var(--accent-text)', borderColor: 'var(--accent)' }}>去逛逛</button>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 14 }}>
          {recs.map((r, i) => (
            <div key={r} style={{ width: 74, borderRadius: 8, border: '1px solid var(--border)', padding: 6, fontSize: 11, color: 'var(--text-muted)', transition: 'transform .15s ease', cursor: 'pointer' }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = '')}
            >
              <div style={{ height: 36, borderRadius: 6, background: `linear-gradient(135deg, hsl(${i * 70 + 200} 70% 70%), hsl(${i * 70 + 240} 70% 62%))` }} />
              <div style={{ marginTop: 4 }}>{r}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return null
}

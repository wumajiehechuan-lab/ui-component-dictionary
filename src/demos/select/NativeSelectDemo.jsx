/** 原生下拉 Native Select：真实 <select>，仅样式定制 */
export default function NativeSelectDemo({ options = [] }) {
  return (
    <div className="d-root" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ position: 'relative', flex: 1 }}>
        <select
          aria-label="原生下拉选择"
          defaultValue=""
          style={{
            width: '100%',
            appearance: 'none',
            border: '1px solid var(--border-strong)',
            borderRadius: 8,
            background: 'var(--surface)',
            color: 'var(--text)',
            padding: '8px 30px 8px 12px',
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          <option value="" disabled>选择城市…</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <span className="d-placeholder" style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', fontSize: 11 }}>▼</span>
      </div>
    </div>
  )
}

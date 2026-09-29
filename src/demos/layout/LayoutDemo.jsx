import { useRef, useState } from 'react'

const blockStyle = (tint) => ({
  borderRadius: 8,
  background: tint || 'var(--code-bg)',
  border: '1px solid var(--border)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 11.5,
  color: 'var(--text-muted)',
  minHeight: 34,
  padding: 4,
})

const block = (label, tint) => <div style={blockStyle(tint)}>{label}</div>

/** 布局类 demo：grid/split/stack/holy-grail/masonry/centered/sticky-header/responsive-collapse */
export default function LayoutDemo({ variant, blocks = 6, left, right, panels, label }) {
  const [width, setWidth] = useState(100)
  const [split, setSplit] = useState(30)
  const [gap, setGap] = useState('medium')
  const [align, setAlign] = useState('stretch')
  const [collapsed, setCollapsed] = useState(false)
  const [narrow, setNarrow] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const frameRef = useRef(null)
  const dragging = useRef(null)

  const startDrag = (which) => (e) => {
    dragging.current = which
    e.preventDefault()
    const move = (ev) => {
      const rect = frameRef.current.getBoundingClientRect()
      if (which === 'split') setSplit(Math.max(20, Math.min(80, ((ev.clientX - rect.left) / rect.width) * 100)))
      else {
        const pos = (ev.clientX - rect.left) / rect.width
        setNarrow(pos < 0.5)
      }
    }
    const up = () => {
      dragging.current = null
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
  }

  if (variant === 'grid') {
    return (
      <div className="d-root">
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${width > 66 ? 3 : width > 33 ? 2 : 1}, 1fr)`, gap: 8, width: `${width}%`, margin: '0 auto', transition: 'all .2s ease' }}>
          {Array.from({ length: blocks }, (_, i) => block(`Block ${i + 1}`, i % 2 ? 'var(--code-bg)' : 'var(--accent-soft)'))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
          <span className="d-label" style={{ margin: 0 }}>容器宽度</span>
          <input type="range" min={20} max={100} value={width} onChange={(e) => setWidth(Number(e.target.value))} style={{ flex: 1 }} aria-label="容器宽度" />
        </div>
      </div>
    )
  }

  if (variant === 'split') {
    return (
      <div className="d-root">
        <div ref={frameRef} style={{ display: 'flex', height: 110, border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', width: '100%' }}>
          <div style={{ width: `${split}%`, background: 'var(--code-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11.5, color: 'var(--text-muted)' }}>{left}</div>
          <div
            role="separator"
            aria-orientation="vertical"
            onPointerDown={startDrag('split')}
            onDoubleClick={() => setSplit(30)}
            title="拖动调整，双击重置"
            style={{ width: 6, background: 'var(--border)', cursor: 'col-resize', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <span style={{ width: 2, height: 18, borderRadius: 2, background: 'var(--border-strong)' }} />
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11.5, color: 'var(--text-muted)' }}>{right}</div>
        </div>
        <div className="d-label" style={{ marginTop: 6, textAlign: 'center' }}>拖动分隔条调整 · 双击重置</div>
      </div>
    )
  }

  if (variant === 'stack') {
    const gapMap = { small: 4, medium: 10, large: 20 }
    const alignMap = { start: 'flex-start', center: 'center', end: 'flex-end' }
    return (
      <div className="d-root">
        <div style={{ display: 'flex', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
          <select className="d-input" style={{ width: 90, fontSize: 12 }} value={gap} onChange={(e) => setGap(e.target.value)} aria-label="间距">
            {['small', 'medium', 'large'].map((g) => <option key={g}>{g}</option>)}
          </select>
          <select className="d-input" style={{ width: 90, fontSize: 12 }} value={align} onChange={(e) => setAlign(e.target.value)} aria-label="对齐">
            {['start', 'center', 'end'].map((a) => <option key={a}>{a}</option>)}
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: gapMap[gap], alignItems: alignMap[align], transition: 'gap .15s ease' }}>
          {Array.from({ length: blocks }, (_, i) => (
            <div key={i} style={{ ...blockStyle(i % 2 ? 'var(--code-bg)' : 'var(--accent-soft)'), width: i === 1 ? '100%' : '70%', minHeight: 28 }}>{`Row ${i + 1}`}</div>
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'holy-grail') {
    return (
      <div className="d-root">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, height: 150 }}>
          {block('Header 头部')}
          <div style={{ display: 'flex', gap: 6, flex: 1 }}>
            {!collapsed && <div style={{ width: '22%' }}>{block('侧栏')}</div>}
            <div style={{ flex: 1 }}>{block('Main 主内容区', 'var(--accent-soft)')}</div>
            {!collapsed && <div style={{ width: '22%' }}>{block('侧栏')}</div>}
          </div>
          {block('Footer 底部')}
        </div>
        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <button type="button" className="d-tab" style={{ fontSize: 11, color: 'var(--accent)' }} onClick={() => setCollapsed((c) => !c)}>
            {collapsed ? '展开侧栏' : '收起侧栏'}
          </button>
        </div>
      </div>
    )
  }

  if (variant === 'masonry') {
    const heights = [60, 90, 40, 74, 56, 96, 48, 66]
    const cols = [[], [], []]
    heights.forEach((h, i) => cols[i % 3].push(h))
    return (
      <div className="d-root">
        <div style={{ display: 'flex', gap: 8 }}>
          {cols.map((col, ci) => (
            <div key={ci} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {col.map((h, i) => (
                <div key={i} style={{ height: h, borderRadius: 8, background: `linear-gradient(135deg, hsl(${(ci * 60 + i * 25 + 200) % 360} 60% 72%), hsl(${(ci * 60 + i * 25 + 240) % 360} 60% 64%))` }} />
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'centered') {
    return (
      <div className="d-root" style={{ height: 150, background: 'var(--bg)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '72%', maxWidth: 260, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, boxShadow: 'var(--shadow)', padding: 16, textAlign: 'center', fontSize: 13 }}>{label}</div>
      </div>
    )
  }

  if (variant === 'sticky-header') {
    return (
      <div ref={frameRef} className="d-root" style={{ height: 150, overflowY: 'auto', borderRadius: 10, border: '1px solid var(--border)', scrollBehavior: 'smooth' }}>
        <div style={{ position: 'sticky', top: 0, background: 'var(--surface)', padding: '9px 14px', fontSize: 13, fontWeight: 600, zIndex: 5, transition: 'box-shadow .12s ease' }}
          onScroll={undefined}
        >
          固定头部
        </div>
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} style={{ padding: '9px 14px', fontSize: 12, color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>第 {i + 1} 行内容…</div>
        ))}
      </div>
    )
  }

  if (variant === 'responsive-collapse') {
    return (
      <div className="d-root">
        <div style={{ position: 'relative', height: 130, border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', width: `${width}%`, margin: '0 auto', transition: 'width .2s ease', background: 'var(--surface)' }}>
          {!narrow && <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 80, background: 'var(--code-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'var(--text-muted)' }}>侧栏</div>}
          {narrow && (
            <button type="button" className="d-btn" aria-label="打开侧栏" style={{ position: 'absolute', top: 8, left: 8, padding: '2px 8px' }} onClick={() => setDrawer(true)}>☰</button>
          )}
          {narrow && drawer && (
            <>
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.4)' }} onClick={() => setDrawer(false)} />
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 80, background: 'var(--accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'var(--accent)' }}>抽屉</div>
            </>
          )}
          <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: narrow ? 0 : 80, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11.5, color: 'var(--text-muted)' }}>内容区</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
          <span className="d-label" style={{ margin: 0 }}>宽度</span>
          <input type="range" min={30} max={100} value={width} onChange={(e) => setWidth(Number(e.target.value))} style={{ flex: 1 }} aria-label="框架宽度" />
        </div>
      </div>
    )
  }

  return null
}

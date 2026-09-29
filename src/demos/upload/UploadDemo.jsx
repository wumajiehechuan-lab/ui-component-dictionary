import { useEffect, useState } from 'react'

const GRADS = ['linear-gradient(135deg,#60a5fa,#a78bfa)', 'linear-gradient(135deg,#f472b6,#fb923c)', 'linear-gradient(135deg,#34d399,#22d3ee)', 'linear-gradient(135deg,#fbbf24,#f87171)']

function FileRow({ name, size, seededFail }) {
  const [progress, setProgress] = useState(0)
  const [state, setState] = useState('uploading')

  useEffect(() => {
    if (state !== 'uploading') return
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(t); setState(seededFail ? 'error' : 'done'); return 100 }
        return Math.min(100, p + 10 + Math.random() * 15)
      })
    }, 180)
    return () => clearInterval(t)
  }, [state, seededFail])

  if (state === 'uploading') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
        <span style={{ flexShrink: 0 }}>📄</span>
        <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
        <span style={{ width: 60, height: 4, borderRadius: 4, background: 'var(--border)' }}>
          <span style={{ display: 'block', height: '100%', width: `${Math.min(100, progress)}%`, background: 'var(--accent)', borderRadius: 4 }} />
        </span>
      </div>
    )
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
      <span style={{ flexShrink: 0 }}>{state === 'done' ? '✅' : '⚠️'}</span>
      <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
      <span className="d-label" style={{ margin: 0 }}>{size}</span>
      {state === 'error' && <button type="button" className="d-btn" style={{ padding: '1px 8px', fontSize: 11, color: 'var(--accent)', borderColor: 'var(--accent)' }} onClick={() => { setProgress(0); setState('uploading') }}>重试</button>}
    </div>
  )
}

/** 上传类 demo：click/drag/avatar/photo-wall/file-list/folder */
export default function UploadDemo({ variant = 'click', initial = 0 }) {
  const [rows, setRows] = useState(variant === 'file-list' ? [['需求文档-v2.pdf', '1.2 MB', true]] : [])
  const [dragOver, setDragOver] = useState(false)
  const [tiles, setTiles] = useState(initial)
  const [uploading, setUploading] = useState(false)
  const [updated, setUpdated] = useState(false)

  if (variant === 'avatar') {
    return (
      <div className="d-root" style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ position: 'relative' }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: updated ? GRADS[2] : 'var(--code-bg)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 600 }}>
            {uploading ? <span className="d-spinner" /> : updated ? '四' : '用户'}
          </div>
          <button
            type="button"
            aria-label="更换头像"
            className="d-btn"
            style={{ position: 'absolute', right: -2, bottom: -2, width: 28, height: 28, borderRadius: '50%', padding: 0, fontSize: 13, background: 'var(--accent)', color: 'var(--accent-text)', borderColor: 'var(--surface)' }}
            onClick={() => { setUploading(true); setTimeout(() => { setUploading(false); setUpdated(true) }, 900) }}
          >
            📷
          </button>
        </div>
      </div>
    )
  }

  if (variant === 'photo-wall') {
    return (
      <div className="d-root">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {Array.from({ length: tiles }, (_, i) => (
            <div key={i} style={{ position: 'relative', aspectRatio: '1', borderRadius: 8, background: GRADS[i % 4], cursor: 'pointer' }}>
              <button type="button" aria-label="删除图片" className="d-chip-x" style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(0,0,0,.45)', color: '#fff', width: 20, height: 20, borderRadius: '50%', fontSize: 11 }} onClick={() => setTiles((t) => t - 1)}>✕</button>
            </div>
          ))}
          <button
            type="button"
            aria-label="添加图片"
            onClick={() => setTiles((t) => t + 1)}
            style={{ aspectRatio: '1', borderRadius: 8, border: '1px dashed var(--border-strong)', background: 'transparent', color: 'var(--text-muted)', fontSize: 20, cursor: 'pointer' }}
          >
            ＋
          </button>
        </div>
      </div>
    )
  }

  if (variant === 'folder') {
    return (
      <div className="d-root">
        <button type="button" className="d-btn" onClick={() => setRows([['素材/封面.png', '300 KB'], ['素材/正文.md', '12 KB']])}>📁 Upload folder</button>
        <div style={{ marginTop: 10, display: rows.length ? 'block' : 'none' }}>
          {rows.map(([n, s]) => (
            <div key={n} style={{ marginLeft: n.includes('/') ? 14 : 0 }}>
              <FileRow name={n.split('/').pop()} size={s} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'file-list') {
    return (
      <div className="d-root">
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); setRows((r) => [...r, ['新文件.pdf', '820 KB']]) }}
          style={{ border: `1px dashed ${dragOver ? 'var(--accent)' : 'var(--border-strong)'}`, borderRadius: 8, padding: '10px 0', textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', background: dragOver ? 'var(--accent-soft)' : 'transparent', transition: 'all .15s ease' }}
        >
          拖拽文件到此处，或点击添加
          <button type="button" className="d-btn" style={{ marginLeft: 8, padding: '2px 10px', fontSize: 12 }} onClick={() => setRows((r) => (r.length < 3 ? [...r, ['报告.docx', '260 KB']] : r))}>添加文件</button>
        </div>
        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {rows.map(([n, s, fail], i) => <FileRow key={`${n}${i}`} name={n} size={s} seededFail={fail} />)}
        </div>
      </div>
    )
  }

  // click / drag 共用
  return (
    <div className="d-root">
      <div
        onDragOver={(e) => { if (variant === 'drag') { e.preventDefault(); setDragOver(true) } }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); setRows([['拖入的文件.zip', '1.8 MB']]) }}
        style={variant === 'drag' ? {
          border: `1px dashed ${dragOver ? 'var(--accent)' : 'var(--border-strong)'}`,
          borderRadius: 10,
          padding: '22px 12px',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: 12.5,
          background: dragOver ? 'var(--accent-soft)' : 'transparent',
          transition: 'all .15s ease',
          width: '100%',
        } : {}}
      >
        {variant === 'drag' ? (
          <>
            <div style={{ fontSize: 22, marginBottom: 4 }}>⬆</div>
            点击或拖拽文件到此处
          </>
        ) : (
          <button type="button" className="d-btn" onClick={() => setRows([['作品集.pdf', '3.4 MB']])}>
            ⬆ Upload
          </button>
        )}
      </div>
      {rows.map(([n, s], i) => <FileRow key={i} name={n} size={s} />)}
    </div>
  )
}

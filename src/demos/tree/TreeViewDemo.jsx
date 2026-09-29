import { useState } from 'react'

function Node({ node, depth, sel, setSel, checkable, checked = new Set(), setChecked, searchTerm }) {
  const [open, setOpen] = useState(depth < 1)
  const kids = node.children || []
  const hit = searchTerm && node.label.toLowerCase().includes(searchTerm.toLowerCase())
  const state = checked.has(node.label)
  const allKidsIn = kids.length > 0 && kids.every((k) => checked.has(k.label))
  const someKidsIn = kids.some((k) => checked.has(k.label) || (k.children || []).some((g) => checked.has(g.label)))
  const mark = kids.length ? (allKidsIn || (state && kids.length) ? true : someKidsIn ? 'ind' : false) : state

  return (
    <div>
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 6px', borderRadius: 6, background: sel === node.label ? 'var(--accent-soft)' : 'transparent', cursor: 'pointer', paddingLeft: 4 + depth * 16 }}
        onMouseEnter={(e) => { if (sel !== node.label) e.currentTarget.style.background = 'var(--surface-hover)' }}
        onMouseLeave={(e) => { if (sel !== node.label) e.currentTarget.style.background = 'transparent' }}
        onClick={() => setSel?.(node.label)}
      >
        {kids.length > 0 ? (
          <button type="button" className="d-caret" aria-label={open ? '收起' : '展开'} onClick={(e) => { e.stopPropagation(); setOpen((o) => !o) }}>{open ? '▾' : '▸'}</button>
        ) : (
          <span className="d-caret" style={{ color: 'var(--border-strong)' }}>·</span>
        )}
        {checkable && (
          <span
            role="checkbox"
            aria-checked={mark === 'ind' ? 'mixed' : !!mark}
            onClick={(e) => { e.stopPropagation(); setChecked((prev) => { const n = new Set(prev); if (mark === true) { n.delete(node.label); kids.forEach((k) => n.delete(k.label)) } else { n.add(node.label); kids.forEach((k) => n.add(k.label)) } return n }) }}
            style={{ width: 15, height: 15, borderRadius: 4, border: '1.5px solid ' + (mark ? 'var(--accent)' : 'var(--border-strong)'), background: mark ? 'var(--accent)' : 'var(--surface)', color: '#fff', fontSize: 10, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative', flexShrink: 0 }}
          >
            {mark === 'ind' ? <span style={{ width: 7, height: 2, background: '#fff' }} /> : mark ? '✓' : ''}
          </span>
        )}
        <span style={{ fontSize: 12.5, fontWeight: sel === node.label ? 600 : 400, color: sel === node.label ? 'var(--accent)' : 'var(--text)', background: hit ? 'var(--accent-soft)' : undefined, borderRadius: 3 }}>
          {searchTerm && hit
            ? node.label.split(new RegExp(`(${searchTerm})`, 'i')).map((part, i) => (part.toLowerCase() === searchTerm.toLowerCase() ? <mark key={i} style={{ background: 'var(--accent-soft)', color: 'var(--accent)', padding: 0 }}>{part}</mark> : part))
            : node.label}
        </span>
      </div>
      {kids.length > 0 && open && (
        <div style={{ marginLeft: 14, borderLeft: '1px dashed var(--border-strong)', paddingLeft: 4 }}>
          {kids.map((k) => <Node key={k.label} node={k} depth={depth + 1} sel={sel} setSel={setSel} checkable={checkable} checked={checked} setChecked={setChecked} searchTerm={searchTerm} />)}
        </div>
      )}
    </div>
  )
}

/** 树类 demo：file/selectable/checkable/org/searchable/draggable/comments */
export default function TreeViewDemo({ variant = 'file', nodes, root, items, folder, selectable, searchTerm: external, name, text, replies }) {
  const [sel, setSel] = useState(null)
  const [checked, setChecked] = useState(new Set())
  const [term, setTerm] = useState('')
  const [nest, setNest] = useState(() => new Set(items ? [] : []))
  const [dropped, setDropped] = useState([])
  const [comments, setComments] = useState([])

  if (variant === 'org') {
    return (
      <div className="d-root" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
        <OrgNode node={root} depth={0} sel={sel} setSel={setSel} path={[root.label]} />
      </div>
    )
  }

  if (variant === 'searchable') {
    return (
      <div className="d-root" style={{ width: '100%' }}>
        <input className="d-input" placeholder="搜索节点…" aria-label="搜索树节点" value={term} onChange={(e) => setTerm(e.target.value)} style={{ marginBottom: 8 }} />
        <div style={{ maxHeight: 130, overflowY: 'auto' }}>
          {nodes.map((n) => <Node key={n.label} node={n} depth={0} sel={sel} setSel={setSel} searchTerm={term} />)}
        </div>
        {term && !JSON.stringify(nodes).toLowerCase().includes(term.toLowerCase()) && <div className="d-label">无匹配节点</div>}
      </div>
    )
  }

  if (variant === 'checkable') {
    return (
      <div className="d-root" style={{ width: '100%' }}>
        {nodes.map((n) => <Node key={n.label} node={n} depth={0} checkable checked={checked} setChecked={setChecked} />)}
        <div className="d-label" style={{ borderTop: '1px solid var(--border)', marginTop: 6, paddingTop: 6 }}>已选 {checked.size} 项</div>
      </div>
    )
  }

  if (variant === 'draggable') {
    return (
      <div className="d-root" style={{ width: '100%' }}>
        {[...items.filter((x) => !dropped.includes(x)).map((it) => ({ label: it, leaf: true })), ...(dropped.length ? [{ label: folder, children: dropped.map((d) => ({ label: d })) }] : [{ label: folder, children: [] }])].map((n) => (
          <Node key={n.label} node={n} depth={0} sel={sel} setSel={setSel} />
        ))}
        <div className="d-label" style={{ marginTop: 6 }}>提示：将条目拖入下方文件夹（演示版暂用点击切换）</div>
        <button type="button" className="d-btn" style={{ padding: '3px 12px', fontSize: 11.5, marginTop: 4 }} onClick={() => setDropped((d) => (d.length ? [] : items))}>
          {dropped.length ? '移出文件夹' : '全部拖入文件夹'}
        </button>
      </div>
    )
  }

  if (variant === 'comments') {
    return (
      <div className="d-root" style={{ width: '100%' }}>
        <CommentRow name={root?.name} text={root?.text} depth={0} comments={comments} setComments={setComments} rootKey="root" />
        {(replies || []).map((r) => (
          <div key={r.name + r.text} style={{ marginLeft: 18, borderLeft: '1px dashed var(--border-strong)', paddingLeft: 8 }}>
            <CommentRow name={r.name} text={r.text} depth={1} comments={comments} setComments={setComments} rootKey={r.name} />
            {(r.replies || []).map((rr) => (
              <div key={rr.name + rr.text} style={{ marginLeft: 18, borderLeft: '1px dashed var(--border-strong)', paddingLeft: 8 }}>
                <CommentRow name={rr.name} text={rr.text} depth={2} comments={comments} setComments={setComments} rootKey={rr.name + rr.text} />
              </div>
            ))}
          </div>
        ))}
        {comments.map((c, i) => (
          <div key={i} style={{ marginLeft: 18 * (c.depth + 1), borderLeft: '1px dashed var(--border-strong)', paddingLeft: 8 }}>
            <div style={{ fontSize: 12.5, padding: '4px 0', background: 'var(--accent-soft)', borderRadius: 6 }}>
              <b style={{ color: 'var(--accent)' }}>{c.name}</b>：{c.text}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // file / selectable
  return (
    <div className="d-root" style={{ width: '100%' }}>
      {nodes.map((n) => <Node key={n.label} node={n} depth={0} sel={sel} setSel={setSel} />)}
    </div>
  )
}

function OrgNode({ node, depth, sel, setSel, path }) {
  const highlighted = path.includes(sel)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <button
        type="button"
        onClick={() => setSel(node.label)}
        style={{ border: '1px solid ' + (highlighted ? 'var(--accent)' : 'var(--border)'), background: highlighted ? 'var(--accent-soft)' : 'var(--surface)', color: highlighted ? 'var(--accent)' : 'var(--text)', borderRadius: 8, padding: '5px 14px', fontSize: 12, cursor: 'pointer', boxShadow: 'var(--shadow)' }}
      >
        {node.label}
      </button>
      {node.children && (
        <>
          <span style={{ width: 2, height: 12, background: 'var(--border-strong)' }} />
          <div style={{ display: 'flex', gap: 14, position: 'relative', paddingTop: 0 }}>
            {node.children.length > 1 && <span style={{ position: 'absolute', top: 0, left: '14%', right: '14%', height: 2, background: 'var(--border-strong)' }} />}
            {node.children.map((c) => (
              <div key={c.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ width: 2, height: 12, background: 'var(--border-strong)' }} />
                <OrgNode node={c} depth={depth + 1} sel={sel} setSel={setSel} path={[...path, c.label]} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function CommentRow({ name, text, depth, comments, setComments, rootKey }) {
  const [replying, setReplying] = useState(false)
  const [draft, setDraft] = useState('')
  return (
    <div style={{ padding: '4px 0' }}>
      <div style={{ display: 'flex', gap: 7 }}>
        <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--accent-soft)', color: 'var(--accent)', fontSize: 11, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 600 }}>{name.slice(0, 1)}</span>
        <div style={{ flex: 1 }}>
          <b style={{ fontSize: 12.5 }}>{name}</b>
          <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{text}</div>
          <button type="button" className="d-tab" style={{ fontSize: 11, padding: '1px 0', color: 'var(--accent)' }} onClick={() => setReplying((r) => !r)}>回复</button>
        </div>
      </div>
      {replying && (
        <div style={{ display: 'flex', gap: 6, marginLeft: 31, marginTop: 4 }}>
          <input
            className="d-input"
            autoFocus
            placeholder={`回复 ${name}…`}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && draft.trim()) {
                setComments((cs) => [...cs, { name: '我', text: draft.trim(), depth }])
                setDraft('')
                setReplying(false)
              }
            }}
            style={{ fontSize: 12, padding: '4px 8px' }}
          />
        </div>
      )}
    </div>
  )
}

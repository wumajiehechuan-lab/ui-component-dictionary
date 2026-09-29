import { useState } from 'react'
import { useClickOutside } from '../_shared/useClickOutside.js'

function TreeRows({ node, depth, selected, onSelect }) {
  const [expanded, setExpanded] = useState(depth === 0)
  const hasChildren = node.children && node.children.length > 0

  return (
    <>
      <button
        type="button"
        className={`d-tree-row${selected === node.label ? ' selected' : ''}`}
        style={{ paddingLeft: 8 + depth * 16 }}
        onClick={() => onSelect(node)}
      >
        <span
          className="d-caret"
          role="button"
          tabIndex={-1}
          aria-label={expanded ? '收起' : '展开'}
          onClick={(e) => {
            e.stopPropagation()
            if (hasChildren) setExpanded((x) => !x)
          }}
        >
          {hasChildren ? (expanded ? '▾' : '▸') : '·'}
        </span>
        {node.label}
      </button>
      {hasChildren && expanded && (
        <div className="d-tree-children">
          {node.children.map((child) => (
            <TreeRows
              key={child.label}
              node={child}
              depth={depth + 1}
              selected={selected}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </>
  )
}

/** 树选择 Tree Select：单面板纵向树，单选 */
export default function TreeSelectDemo({ placeholder, tree }) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const wrapRef = useClickOutside(() => setOpen(false), open)

  return (
    <div className="d-root" ref={wrapRef}>
      <button
        type="button"
        className={`d-btn${open ? ' open' : ''}`}
        style={{ width: '100%', justifyContent: 'space-between' }}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={selected ? '' : 'd-placeholder'}>{selected || placeholder}</span>
        <span className={`d-select-arrow${open ? ' open' : ''}`}>▼</span>
      </button>
      {open && (
        <div className="d-menu" role="tree">
          <TreeRows
            node={tree}
            depth={0}
            selected={selected}
            onSelect={(node) => {
              setSelected(node.label)
              setOpen(false)
            }}
          />
        </div>
      )}
    </div>
  )
}

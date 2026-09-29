import { useState } from 'react'
import { useClickOutside } from '../_shared/useClickOutside.js'

/**
 * 级联选择 Cascader：多列层级，选中一级后旁边加载下一列（300ms 模拟异步）。
 */
export default function CascaderDemo({ placeholder, tree }) {
  const [open, setOpen] = useState(false)
  const [path, setPath] = useState([]) // 已确认的各级 {label}
  const [columns, setColumns] = useState([tree.children]) // 当前展示的列
  const [loadingCol, setLoadingCol] = useState(null)
  const wrapRef = useClickOutside(() => setOpen(false), open)

  const pick = (item, colIndex) => {
    const nextPath = path.slice(0, colIndex + 1)
    nextPath[colIndex] = item
    setPath(nextPath)
    if (item.children) {
      // 模拟异步加载下级
      setLoadingCol(colIndex + 1)
      setColumns((c) => c.slice(0, colIndex + 1))
      setTimeout(() => {
        setColumns((c) => [...c.slice(0, colIndex + 1), item.children])
        setLoadingCol(null)
      }, 300)
    } else {
      // 叶子：确认完整路径并关闭
      setColumns((c) => c.slice(0, colIndex + 1))
      setOpen(false)
    }
  }

  const display = path.length ? path.map((p) => p.label).join(' / ') : placeholder

  return (
    <div className="d-root" ref={wrapRef}>
      <button
        type="button"
        className={`d-btn${open ? ' open' : ''}`}
        style={{ width: '100%', justifyContent: 'space-between' }}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={path.length ? '' : 'd-placeholder'} style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {display}
        </span>
        <span className={`d-select-arrow${open ? ' open' : ''}`}>▼</span>
      </button>
      {open && (
        <div className="d-menu" style={{ display: 'flex', gap: 2, padding: 4, maxWidth: 340 }}>
          {columns.map((col, ci) => (
            <div key={ci} style={{ minWidth: 96, borderRight: ci < columns.length - 1 ? '1px solid var(--border)' : 'none' }}>
              {col.map((item) => {
                const active = path[ci] === item
                return (
                  <button
                    key={item.label}
                    type="button"
                    className={`d-option${active ? ' selected' : ''}`}
                    onClick={() => pick(item, ci)}
                  >
                    <span>{item.label}</span>
                    {item.children && <span className="d-placeholder">›</span>}
                  </button>
                )
              })}
              {loadingCol === ci && (
                <div className="d-loading">
                  <span className="d-spinner" /> 加载中…
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

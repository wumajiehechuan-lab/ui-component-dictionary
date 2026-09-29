import { useState } from 'react'
import { useClickOutside } from './useClickOutside.js'

/**
 * Dropdown 外壳：触发按钮 + 弹出面板。
 * 自带：展开/收起、点外关闭、Esc 关闭、aria-expanded。
 * children 为面板内容；trigger 支持函数 (open) => node 或直接节点。
 */
export function Dropdown({ trigger, children, align = 'left', className = '' }) {
  const [open, setOpen] = useState(false)
  const wrapRef = useClickOutside(() => setOpen(false), open)

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') setOpen(false)
  }

  const triggerNode = typeof trigger === 'function' ? trigger(open) : trigger

  return (
    <div
      ref={wrapRef}
      className={`d-dropdown ${className}`}
      style={{ position: 'relative', width: '100%' }}
      onKeyDown={handleKeyDown}
    >
      <span
        onClick={() => setOpen((o) => !o)}
        role="button"
        tabIndex={0}
        aria-haspopup="listbox"
        aria-expanded={open}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setOpen((o) => !o)
          }
        }}
        style={{ display: 'block', width: '100%', cursor: 'pointer' }}
      >
        {triggerNode}
      </span>
      {open && (
        <div
          className="d-menu"
          role="listbox"
          style={align === 'right' ? { left: 'auto', right: 0 } : undefined}
        >
          {children}
        </div>
      )}
    </div>
  )
}

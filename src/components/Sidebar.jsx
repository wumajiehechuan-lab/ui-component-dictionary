import { useMemo } from 'react'

/**
 * 左侧分类导航：26 项（含 All），每项显示计数徽标，点击过滤主区。
 */
export default function Sidebar({ categories, active, onSelect, countOf }) {
  const items = useMemo(
    () => categories.filter((c) => c.key !== 'all'),
    [categories]
  )
  const allItem = categories.find((c) => c.key === 'all')

  const renderItem = (cat) => (
    <li key={cat.key}>
      <button
        type="button"
        className={`sidebar-item${active === cat.key ? ' active' : ''}`}
        onClick={() => onSelect(cat.key)}
        aria-pressed={active === cat.key}
      >
        <span>
          {cat.name_en}
          <span className="zh">{cat.name_zh}</span>
        </span>
        <span className="sidebar-count">{countOf(cat.key)}</span>
      </button>
    </li>
  )

  return (
    <nav className="sidebar" aria-label="组件分类">
      <ul className="sidebar-list">
        {allItem && renderItem(allItem)}
        {items.map(renderItem)}
      </ul>
    </nav>
  )
}

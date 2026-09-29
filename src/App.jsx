import { useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import Sidebar from './components/Sidebar.jsx'
import CardGrid from './components/CardGrid.jsx'
import { useTheme } from './hooks/useTheme.js'
import { useFilter } from './hooks/useFilter.js'
import { components, total } from './data/components/index.js'
import categories from './data/categories.json'
import './styles/tokens.css'
import './styles/base.css'
import './styles/layout.css'

export default function App() {
  const [searchText, setSearchText] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const { theme, setTheme } = useTheme()

  const filtered = useFilter(components, activeCategory, searchText)

  // 调试/截图辅助：?limit=N 只渲染前 N 张卡
  const limitParam = Number(new URLSearchParams(window.location.search).get('limit'))
  const visible = limitParam > 0 ? filtered.slice(0, limitParam) : filtered

  const countOf = useMemo(() => {
    const map = new Map()
    for (const c of components) {
      map.set(c.category, (map.get(c.category) || 0) + 1)
    }
    return (key) => {
      if (key === 'all') return total
      return map.get(key) || 0
    }
  }, [])

  const categoryNameOf = useMemo(() => {
    const map = new Map(categories.map((c) => [c.key, `${c.name_en} ${c.name_zh}`]))
    return (key) => map.get(key) || key
  }, [])

  return (
    <div className="app">
      <Header
        searchText={searchText}
        onSearchChange={setSearchText}
        matched={filtered.length}
        total={total}
        theme={theme}
        onToggleTheme={setTheme}
      />
      <div className="body">
        <Sidebar
          categories={categories}
          active={activeCategory}
          onSelect={setActiveCategory}
          countOf={countOf}
        />
        <main className="main">
          {filtered.length === 0 ? (
            <p className="empty-tip">
              {countOf(activeCategory) === 0
                ? '该分类组件整理中，敬请期待'
                : '没有匹配的组件，换个关键词试试'}
            </p>
          ) : (
            <CardGrid components={visible} categoryNameOf={categoryNameOf} />
          )}
        </main>
      </div>
    </div>
  )
}

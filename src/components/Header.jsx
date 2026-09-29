/**
 * 头部区：标题 / 副标题 / 使用口诀 / 搜索框 / 计数 / 主题切换。
 */
export default function Header({
  searchText,
  onSearchChange,
  matched,
  total,
  theme,
  onToggleTheme,
}) {
  return (
    <header className="header">
      <div className="header-top">
        <div>
          <h1 className="header-title">Vibe Coding UI 组件词典</h1>
          <p className="header-subtitle">
            把脑子里的样子写成标准名称，再交给模型。卡片一样大，上面的组件可以点。复制
            AI Prompt，应能直接做出同款组件。
          </p>
          <p className="header-motto">
            以后按这个说：<strong>名称 + 变体 + 结构 + 交互 + 状态 + 动效</strong>
            。细线跟着 Tab 走，请写 underlined tabs，不要写 slider。
          </p>
        </div>
        <div className="header-controls">
          <div className="search-wrap">
            <input
              type="search"
              className="search-input"
              placeholder="搜中文名、英文名或别名"
              aria-label="搜索组件"
              value={searchText}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchText && (
              <button
                type="button"
                className="search-clear"
                aria-label="清空搜索"
                onClick={() => onSearchChange('')}
              >
                ✕
              </button>
            )}
          </div>
          <span className="count-badge" aria-live="polite">
            {matched}/{total}
          </span>
          <div className="theme-toggle" role="group" aria-label="主题切换">
            <button
              type="button"
              className={theme === 'light' ? 'active' : ''}
              onClick={() => onToggleTheme('light')}
            >
              浅色
            </button>
            <button
              type="button"
              className={theme === 'dark' ? 'active' : ''}
              onClick={() => onToggleTheme('dark')}
            >
              深色
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

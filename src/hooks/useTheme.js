import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'ucid-theme'

function getInitialTheme() {
  // index.html 内联脚本已把主题写进 dataset（含 URL 参数覆盖），优先采用，避免闪烁后被覆盖
  const domTheme = document.documentElement?.dataset?.theme
  if (domTheme === 'light' || domTheme === 'dark') return domTheme
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    /* localStorage 不可用时忽略 */
  }
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return 'light'
}

/**
 * 主题状态 hook：切换 + localStorage 持久化 + 写入 documentElement.dataset.theme。
 * index.html 已有内联脚本预设初值，防刷新闪烁。
 */
export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* 忽略持久化失败 */
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, setTheme, toggleTheme }
}

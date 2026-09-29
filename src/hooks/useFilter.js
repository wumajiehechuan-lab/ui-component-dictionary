import { useMemo } from 'react'

/**
 * 搜索 × 分类叠加过滤。
 * 命中范围：name_zh + name_en + aliases（不区分大小写），与需求口径一致。
 * 返回过滤后数组；计数由调用方取 filtered.length / total。
 */
export function useFilter(components, activeCategory, searchText) {
  return useMemo(() => {
    let list = components
    if (activeCategory && activeCategory !== 'all') {
      list = list.filter((c) => c.category === activeCategory)
    }
    const q = (searchText || '').trim().toLowerCase()
    if (q) {
      list = list.filter((c) => {
        const haystack = [c.name_zh, c.name_en, ...(c.aliases || [])]
          .join(' ')
          .toLowerCase()
        return haystack.includes(q)
      })
    }
    return list
  }, [components, activeCategory, searchText])
}

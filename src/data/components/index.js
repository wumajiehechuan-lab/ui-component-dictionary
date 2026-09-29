/**
 * 数据层唯一入口：聚合 data/components/ 下全部分类 JSON，导出扁平数组与总数。
 * 新增组件 = 在对应分类 json 加一条；新增分类 = 新建一个 json 文件，本文件零改动。
 */
const modules = import.meta.glob('./*.json', { eager: true })

export const components = Object.values(modules)
  .flatMap((m) => m.default)
  .map((c) => Object.freeze(c))

export const total = components.length

/** dev-only 数据完整性校验：id 唯一、category/字段齐备、demo.type 存在 */
if (import.meta.env.DEV) {
  const ids = new Set()
  const categoryKeys = new Set(
    (await import('../categories.json')).default.map((c) => c.key)
  )
  for (const c of components) {
    const label = c.id || '(missing id)'
    if (ids.has(c.id)) console.error(`[词典数据] id 重复: ${label}`)
    ids.add(c.id)
    for (const field of ['category', 'name_zh', 'name_en', 'when_to_use', 'prompt_en', 'prompt_zh', 'demo']) {
      if (!c[field]) console.error(`[词典数据] ${label} 缺字段: ${field}`)
    }
    if (c.category && !categoryKeys.has(c.category)) {
      console.error(`[词典数据] ${label} 非法分类: ${c.category}`)
    }
    if (c.demo && !c.demo.type) console.error(`[词典数据] ${label} demo 缺 type`)
  }
}

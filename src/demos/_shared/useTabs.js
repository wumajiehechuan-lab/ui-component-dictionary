import { useState } from 'react'

/**
 * Tab 公共状态机：activeIndex + 键盘左右方向键。
 * 12 个 Tab 类 demo 复用，各 demo 只负责视觉变体与附加行为。
 */
export function useTabs(count, initial = 0) {
  const [active, setActive] = useState(initial)

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      setActive((i) => (i + 1) % count)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      setActive((i) => (i - 1 + count) % count)
    }
  }

  return { active, setActive, onKeyDown }
}

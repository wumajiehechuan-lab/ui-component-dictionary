import { useEffect, useRef } from 'react'

/**
 * 点击元素外部时触发回调（用于下拉类 demo 的点外关闭）。
 */
export function useClickOutside(onOutside, active = true) {
  const ref = useRef(null)
  const cbRef = useRef(onOutside)
  cbRef.current = onOutside

  useEffect(() => {
    if (!active) return
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        cbRef.current(e)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [active])

  return ref
}

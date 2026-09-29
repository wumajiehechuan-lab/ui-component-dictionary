import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * 剪贴板复制 hook。
 * 降级链：navigator.clipboard → 隐藏 textarea + execCommand('copy')（file:// 场景）。
 * 返回 { copied, copy }：copy 成功后 copied=true，约 1.5s 自动复原。
 */
export function useCopy(resetMs = 1500) {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const fallbackCopy = useCallback(async (text) => {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    try {
      const ok = document.execCommand('copy')
      if (!ok) throw new Error('execCommand copy failed')
      return true
    } finally {
      document.body.removeChild(textarea)
    }
  }, [])

  const copy = useCallback(
    async (text) => {
      let ok = false
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text)
          ok = true
        } else {
          ok = await fallbackCopy(text)
        }
      } catch {
        try {
          ok = await fallbackCopy(text)
        } catch {
          ok = false
        }
      }
      if (ok) {
        setCopied(true)
        clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => setCopied(false), resetMs)
      }
      return ok
    },
    [fallbackCopy, resetMs]
  )

  return { copied, copy }
}

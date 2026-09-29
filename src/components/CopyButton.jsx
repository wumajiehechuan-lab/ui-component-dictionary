import { useCopy } from '../hooks/useCopy.js'

/**
 * 复制按钮：写入剪贴板成功后短暂显示「已复制」。
 */
export default function CopyButton({ text }) {
  const { copied, copy } = useCopy()

  return (
    <button
      type="button"
      className={`copy-btn${copied ? ' copied' : ''}`}
      aria-label="复制 AI Prompt"
      onClick={() => copy(text)}
    >
      {copied ? '已复制' : '复制'}
    </button>
  )
}

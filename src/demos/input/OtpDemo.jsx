import { useRef, useState } from 'react'

/** 验证码输入 OTP：6 位分格，跳格/退格/粘贴填满 */
export default function OtpDemo({ length = 6 }) {
  const [values, setValues] = useState(Array(length).fill(''))
  const inputsRef = useRef([])

  const setDigit = (i, digit) => {
    setValues((v) => {
      const next = [...v]
      next[i] = digit
      return next
    })
  }

  const handleChange = (i) => (e) => {
    const raw = e.target.value.replace(/\D/g, '')
    if (!raw) {
      setDigit(i, '')
      return
    }
    // 输入多位（如粘贴到单格）时依次填入
    const chars = raw.slice(0, length - i).split('')
    setValues((v) => {
      const next = [...v]
      chars.forEach((ch, k) => (next[i + k] = ch))
      return next
    })
    const target = Math.min(i + chars.length, length - 1)
    inputsRef.current[target]?.focus()
  }

  const handleKeyDown = (i) => (e) => {
    if (e.key === 'Backspace') {
      if (values[i]) {
        setDigit(i, '')
      } else if (i > 0) {
        inputsRef.current[i - 1]?.focus()
        setDigit(i - 1, '')
      }
      e.preventDefault()
    } else if (e.key === 'ArrowLeft' && i > 0) {
      inputsRef.current[i - 1]?.focus()
      e.preventDefault()
    } else if (e.key === 'ArrowRight' && i < length - 1) {
      inputsRef.current[i + 1]?.focus()
      e.preventDefault()
    }
  }

  const handlePaste = (i) => (e) => {
    const text = (e.clipboardData.getData('text') || '').replace(/\D/g, '')
    if (!text) return
    e.preventDefault()
    setValues((v) => {
      const next = [...v]
      text
        .slice(0, length)
        .split('')
        .forEach((ch, k) => (next[k] = ch))
      return next
    })
    inputsRef.current[Math.min(text.length, length - 1)]?.focus()
  }

  return (
    <div className="d-root">
      <div className="d-otp" role="group" aria-label="验证码输入">
        {values.map((v, i) => (
          <input
            key={i}
            ref={(el) => (inputsRef.current[i] = el)}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={length}
            aria-label={`第 ${i + 1} 位`}
            className={v ? 'filled' : ''}
            value={v}
            onChange={handleChange(i)}
            onKeyDown={handleKeyDown(i)}
            onPaste={handlePaste(i)}
            onFocus={(e) => e.target.select()}
          />
        ))}
      </div>
      <div className="d-label" style={{ marginTop: 8 }}>
        支持自动跳格、退格回退、粘贴填满
      </div>
    </div>
  )
}

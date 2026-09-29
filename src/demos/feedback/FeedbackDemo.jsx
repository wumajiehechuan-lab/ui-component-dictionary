import { useEffect, useState } from 'react'

const TONE = {
  info: ['var(--accent)', 'ℹ'],
  success: ['var(--ok)', '✓'],
  warning: ['#f59e0b', '⚠'],
  danger: ['var(--danger)', '✕'],
}

/** 反馈类 demo：alert/message/result/validation/cooldown/callout/task-progress/coach-mark/inline-error/undo */
export default function FeedbackDemo({ variant, items, buttons, files, tip, seconds = 10, reason, item }) {
  const [closed, setClosed] = useState(new Set())
  const [msg, setMsg] = useState(null)
  const [resultKind, setResultKind] = useState('success')
  const [input, setInput] = useState('')
  const [checking, setChecking] = useState(false)
  const [cd, setCd] = useState(0)
  const [done, setDone] = useState(0)
  const [dismissed, setDismissed] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const [restored, setRestored] = useState(false)

  useEffect(() => {
    if (cd <= 0) return
    const t = setTimeout(() => setCd((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [cd])

  if (variant === 'alert') {
    return (
      <div className="d-root" style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
        {items.map(([tone, t, d], i) =>
          closed.has(i) ? null : (
            <div key={i} style={{ display: 'flex', gap: 10, borderRadius: 9, padding: '9px 12px', background: `color-mix(in srgb, ${TONE[tone][0]} 10%, transparent)`, borderLeft: `3px solid ${TONE[tone][0]}` }}>
              <span style={{ color: TONE[tone][0], fontWeight: 700 }}>{TONE[tone][1]}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{t}</div>
                <div className="d-label" style={{ margin: 0 }}>{d}</div>
              </div>
              <button type="button" className="d-chip-x" aria-label="关闭提示" onClick={() => setClosed((s) => new Set(s).add(i))}>✕</button>
            </div>
          )
        )}
      </div>
    )
  }

  if (variant === 'message') {
    return (
      <div className="d-root" style={{ position: 'relative', textAlign: 'center', height: 110, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <div style={{ position: 'absolute', top: 6, left: 0, right: 0, textAlign: 'center' }}>
          {msg && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 999, boxShadow: 'var(--shadow-lg)', padding: '5px 14px', fontSize: 12.5 }}>
              <b style={{ color: TONE[msg][0] }}>{TONE[msg][1]}</b>
              {msg === '成功' ? '操作已成功完成' : msg === '失败' ? '操作失败，请重试' : '正在处理…'}
            </span>
          )}
        </div>
        {buttons.map((b) => (
          <button key={b} type="button" className="d-btn" style={{ padding: '4px 16px', fontSize: 12 }} onClick={() => { setMsg(b); setTimeout(() => setMsg(null), 2000) }}>{b}</button>
        ))}
      </div>
    )
  }

  if (variant === 'result') {
    const ok = resultKind === 'success'
    return (
      <div className="d-root" style={{ textAlign: 'center', padding: '14px 0' }}>
        <div style={{ width: 52, height: 52, borderRadius: '50%', margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: '#fff', background: ok ? 'var(--ok)' : 'var(--danger)' }}>{ok ? '✓' : '✕'}</div>
        <div style={{ fontSize: 16, fontWeight: 700 }}>{ok ? '提交成功' : '提交失败'}</div>
        <p className="d-label" style={{ margin: '6px 0 14px' }}>{ok ? '内容已保存，可在列表中查看。' : '服务器开小差了，请稍后重试。'}</p>
        <button type="button" className="d-btn" style={{ background: 'var(--accent)', color: 'var(--accent-text)', borderColor: 'var(--accent)' }}>{ok ? '查看列表' : '重新提交'}</button>
        <div style={{ marginTop: 14 }}>
          <button type="button" className="d-tab" style={{ fontSize: 11, color: 'var(--text-muted)' }} onClick={() => setResultKind(ok ? 'error' : 'success')}>
            切换到{ok ? '失败' : '成功'}示例
          </button>
        </div>
      </div>
    )
  }

  if (variant === 'validation') {
    const bad = input.trim().toLowerCase() === 'taken'
    return (
      <div className="d-root">
        <label className="d-label" htmlFor="v-username" style={{ display: 'block' }}>用户名</label>
        <input
          id="v-username"
          className="d-input"
          placeholder="试试输入 taken"
          value={input}
          onChange={(e) => { setInput(e.target.value); setChecking(true); setTimeout(() => setChecking(false), 500) }}
        />
        <div className="d-label" style={{ marginTop: 6, color: !input ? 'var(--text-muted)' : checking ? 'var(--text-muted)' : bad ? 'var(--danger)' : 'var(--ok)' }}>
          {!input ? '输入以检查可用性' : checking ? '检查中…' : bad ? '✗ 已被占用' : '✓ 可用'}
        </div>
      </div>
    )
  }

  if (variant === 'cooldown') {
    return (
      <div className="d-root" style={{ textAlign: 'center' }}>
        <button
          type="button"
          className="d-btn"
          disabled={cd > 0}
          style={cd > 0 ? { opacity: 0.6 } : { background: 'var(--accent)', color: 'var(--accent-text)', borderColor: 'var(--accent)' }}
          onClick={() => setCd(seconds)}
        >
          {cd > 0 ? `重新获取 (${cd}s)` : '获取验证码'}
        </button>
      </div>
    )
  }

  if (variant === 'callout') {
    return (
      <div className="d-root" style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
        {items.map(([tone, text]) => (
          <div key={tone} style={{ borderLeft: `3px solid ${tone === '提示' ? 'var(--accent)' : '#f59e0b'}`, background: 'var(--code-bg)', borderRadius: '0 8px 8px 0', padding: '9px 12px', fontSize: 12.5 }}>
            <strong style={{ fontSize: 12.5, color: tone === '提示' ? 'var(--accent)' : '#f59e0b' }}>{tone}</strong>
            <span style={{ color: 'var(--text-muted)' }}>　{text}</span>
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'task-progress') {
    const pct = Math.round((done / files.length) * 100)
    return (
      <div className="d-root" style={{ width: '100%' }}>
        {files.map((f, i) => (
          <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, padding: '4px 0' }}>
            <span style={{ flex: 1 }}>{f}</span>
            {i < done ? <span style={{ color: 'var(--ok)' }}>✓ 已完成</span> : i === done ? <span className="d-loading" style={{ padding: 0 }}><span className="d-spinner" /> 上传中…</span> : <span className="d-placeholder">排队中</span>}
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6, fontSize: 12 }}>
          <span className="d-label" style={{ margin: 0 }}>{done}/{files.length} 完成</span>
          <button type="button" className="d-btn" style={{ padding: '2px 10px', fontSize: 11 }} onClick={() => setDone(0)}>Restart</button>
        </div>
        <span style={{ display: 'block', height: 4, borderRadius: 4, background: 'var(--border)', marginTop: 6 }}>
          <span style={{ display: 'block', height: '100%', borderRadius: 4, width: `${pct}%`, background: 'var(--accent)', transition: 'width .8s ease' }} />
        </span>
        <Ticker onTick={() => setDone((d) => Math.min(files.length, d + 1))} active={done < files.length} />
      </div>
    )
  }

  if (variant === 'coach-mark') {
    return (
      <div className="d-root" style={{ textAlign: 'center' }}>
        {!dismissed && (
          <div style={{ position: 'relative', display: 'inline-block', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, boxShadow: 'var(--shadow-lg)', padding: '10px 14px', fontSize: 12.5, marginBottom: 26 }}>
            {tip}
            <span style={{ position: 'absolute', bottom: -6, left: '50%', transform: 'translateX(-50%) rotate(45deg)', width: 10, height: 10, background: 'var(--surface)', borderRight: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }} />
            <button type="button" className="d-btn" style={{ marginLeft: 10, padding: '2px 10px', fontSize: 11, color: 'var(--accent)', borderColor: 'var(--accent)' }} onClick={() => setDismissed(true)}>知道了</button>
          </div>
        )}
        <div>
          <button type="button" className="d-btn" style={{ background: 'var(--accent)', color: 'var(--accent-text)', borderColor: 'var(--accent)' }}>复制提示词</button>
          {dismissed && (
            <button type="button" className="d-tab" style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 10 }} onClick={() => setDismissed(false)}>重播</button>
          )}
        </div>
      </div>
    )
  }

  if (variant === 'inline-error') {
    return <InlineErrorInner reason={reason} />
  }

  if (variant === 'undo') {
    return (
      <div className="d-root" style={{ position: 'relative', paddingBottom: 34 }}>
        {!deleted && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1px solid var(--border)', borderRadius: 9, padding: '9px 12px', fontSize: 13 }}>
            📄 {item}
            <button
              type="button"
              className="d-chip-x"
              aria-label={`删除 ${item}`}
              style={{ marginLeft: 'auto' }}
              onClick={() => { setDeleted(true); setRestored(false) }}
            >
              🗑
            </button>
          </div>
        )}
        {deleted && (
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: 'var(--text)', color: 'var(--bg)', borderRadius: 8, padding: '8px 12px', fontSize: 12.5, display: 'flex', alignItems: 'center', gap: 10, animation: 'd-slide-up .2s ease' }}>
            <span style={{ flex: 1 }}>{restored ? '已恢复' : '已删除'}</span>
            <button
              type="button"
              onClick={() => { setDeleted(false); setRestored(true); setTimeout(() => setRestored(false), 1500) }}
              style={{ border: 'none', background: 'transparent', color: '#fbbf24', fontWeight: 600, cursor: 'pointer', fontSize: 12.5 }}
            >
              撤销
            </button>
          </div>
        )}
      </div>
    )
  }

  return null
}

function Ticker({ onTick, active }) {
  useEffect(() => {
    if (!active) return
    const t = setTimeout(onTick, 850)
    return () => clearTimeout(t)
  }, [active, onTick])
  return null
}

function InlineErrorInner({ reason }) {
  const [retrying, setRetrying] = useState(false)
  return (
    <div className="d-root" style={{ border: '1px dashed var(--border-strong)', borderRadius: 10, padding: 18, textAlign: 'center', width: '100%' }}>
      {retrying ? (
        <span className="d-loading"><span className="d-spinner" /> 重试中…</span>
      ) : (
        <>
          <div style={{ fontSize: 22, marginBottom: 4 }}>🔌</div>
          <div style={{ fontSize: 14, fontWeight: 700 }}>失败</div>
          <p className="d-label" style={{ margin: '4px 0 12px' }}>{reason}</p>
          <button
            type="button"
            className="d-btn"
            style={{ background: 'var(--accent)', color: 'var(--accent-text)', borderColor: 'var(--accent)' }}
            onClick={() => { setRetrying(true); setTimeout(() => setRetrying(false), 1000) }}
          >
            重试
          </button>
        </>
      )}
    </div>
  )
}

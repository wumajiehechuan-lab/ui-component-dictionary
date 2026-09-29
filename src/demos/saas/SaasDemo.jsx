import { useEffect, useState } from 'react'
import { Dropdown } from '../_shared/Dropdown.jsx'
import { Chip } from '../_shared/Chip.jsx'

/** SaaS/智能应用类 demo：chat-input/chat-bubble/prompt-card/model-selector/citation/token-meter/agent-status/code-diff/thinking/suggestions/invite/quota */
export default function SaasDemo({ variant, model, category, title, preview, uses, models = [], sources = [[], []], used = 60, segments = [], steps = [], lines = [], chips = [], pending = [], rows = [] }) {
  const [val, setVal] = useState('')
  const [sending, setSending] = useState(false)
  const [copied, setCopied] = useState(false)
  const [currentModel, setCurrentModel] = useState(models[0]?.name)
  const [agentStep, setAgentStep] = useState(0)
  const [agentRun, setAgentRun] = useState(true)
  const [thinkOpen, setThinkOpen] = useState(true)
  const [selChip, setSelChip] = useState(null)
  const [email, setEmail] = useState('')
  const [invites, setInvites] = useState(pending)
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (variant !== 'agent-status' || !agentRun || agentStep >= steps.length) return
    const t = setTimeout(() => setAgentStep((s) => s + 1), 1200)
    return () => clearTimeout(t)
  }, [variant, agentRun, agentStep, steps.length])

  if (variant === 'chat-input') {
    return (
      <div className="d-root" style={{ border: '1px solid var(--border-strong)', borderRadius: 14, background: 'var(--surface)', padding: 10, width: '100%' }}>
        <textarea
          rows={val.split('\n').length}
          className="d-input"
          placeholder="给 AI 发送消息…"
          aria-label="AI 对话输入"
          value={val}
          onChange={(e) => setVal(e.target.value.slice(0, 400))}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey && val.trim()) { e.preventDefault(); setSending(true); setTimeout(() => { setSending(false); setVal('') }, 1200) } }}
          style={{ border: 'none', background: 'transparent', padding: 0, resize: 'none', maxHeight: 88 }}
        />
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 6 }}>
          <span className="d-chip" style={{ fontSize: 11 }}>{model}</span>
          <span style={{ marginLeft: 8, color: 'var(--text-muted)', fontSize: 13, cursor: 'pointer' }} aria-hidden>📎</span>
          <button
            type="button"
            aria-label={sending ? '停止' : '发送'}
            disabled={!val.trim() && !sending}
            onClick={() => { if (sending) { setSending(false) } else { setSending(true); setTimeout(() => { setSending(false); setVal('') }, 1200) } }}
            style={{ marginLeft: 'auto', width: 30, height: 30, borderRadius: '50%', border: 'none', background: val.trim() || sending ? 'var(--accent)' : 'var(--border)', color: '#fff', cursor: 'pointer', fontSize: 13 }}
          >
            {sending ? '■' : '↑'}
          </button>
        </div>
      </div>
    )
  }

  if (variant === 'chat-bubble') {
    return (
      <div className="d-root" style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
        <div style={{ alignSelf: 'flex-end', background: 'var(--accent)', color: 'var(--accent-text)', borderRadius: '14px 14px 3px 14px', padding: '8px 12px', fontSize: 12.5, maxWidth: '80%' }}>
          帮我总结一下六要素口诀
          <div style={{ fontSize: 10, opacity: 0.7, marginTop: 3, textAlign: 'right' }}>14:02</div>
        </div>
        <div style={{ alignSelf: 'flex-start', display: 'flex', gap: 6, maxWidth: '86%' }}>
          <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--accent-soft)', color: 'var(--accent)', fontSize: 10, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 700 }}>AI</span>
          <div style={{ background: 'var(--code-bg)', borderRadius: '14px 14px 14px 3px', padding: '8px 12px', fontSize: 12.5 }}>
            名称、变体、结构、交互、状态、动效——按这个顺序描述，模型理解最稳。
            <div style={{ display: 'flex', gap: 8, marginTop: 5, alignItems: 'center' }}>
              <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>14:03</span>
              <button type="button" aria-label="复制" className="d-chip-x" onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1000) }}>⧉</button>
              <button type="button" aria-label="重新生成" className="d-chip-x">↻</button>
              {copied && <span style={{ fontSize: 10, color: 'var(--ok)' }}>已复制</span>}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'prompt-card') {
    return (
      <div className="d-root" style={{ border: '1px solid var(--border)', borderRadius: 12, padding: 12, width: '100%' }}>
        <span className="d-chip" style={{ fontSize: 10.5 }}>{category}</span>
        <div style={{ fontSize: 14, fontWeight: 700, margin: '6px 0' }}>{title}</div>
        <div style={{ position: 'relative' }}>
          <code style={{ display: 'block', background: 'var(--code-bg)', borderRadius: 8, padding: 8, fontSize: 11.5, color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{preview}</code>
          <button
            type="button"
            aria-label="复制模板"
            onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1000) }}
            style={{ position: 'absolute', right: 6, top: 5, border: 'none', background: 'var(--surface)', borderRadius: 6, padding: '2px 6px', fontSize: 11, cursor: 'pointer', boxShadow: 'var(--shadow)', opacity: 0.9 }}
          >
            {copied ? '✓' : '⧉'}
          </button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
          <span className="d-label" style={{ margin: 0 }}>已被使用 {uses} 次</span>
          <button type="button" className="d-btn" style={{ padding: '3px 14px', fontSize: 12, background: 'var(--accent)', color: 'var(--accent-text)', borderColor: 'var(--accent)' }}>使用</button>
        </div>
      </div>
    )
  }

  if (variant === 'model-selector') {
    return (
      <div className="d-root" style={{ maxWidth: 240 }}>
        <Dropdown
          trigger={(open) => (
            <button type="button" className="d-btn" style={{ width: '100%', justifyContent: 'space-between' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ok)' }} />
                {currentModel}
              </span>
              <span className={`d-select-arrow${open ? ' open' : ''}`}>▼</span>
            </button>
          )}
        >
          {models.map((m) => (
            <button
              key={m.name}
              type="button"
              disabled={m.disabled}
              className={`d-option${currentModel === m.name ? ' selected' : ''}`}
              style={m.disabled ? { opacity: 0.45, cursor: 'not-allowed' } : undefined}
              onClick={() => { if (!m.disabled) setCurrentModel(m.name) }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: m.disabled ? 'var(--text-muted)' : 'var(--ok)' }} />
                {m.name}
                <span className="d-chip" style={{ fontSize: 10, padding: '0 6px' }}>{m.tag}</span>
                {m.disabled && <span style={{ fontSize: 10, color: 'var(--danger)' }}>配额用尽</span>}
              </span>
              <span style={{ display: 'inline-flex', gap: 2 }}>
                {[1, 2, 3].map((b) => <span key={b} style={{ width: 4, height: 4 + b * 2, borderRadius: 1, background: b <= m.speed ? 'var(--accent)' : 'var(--border)' }} />)}
              </span>
            </button>
          ))}
        </Dropdown>
      </div>
    )
  }

  if (variant === 'citation') {
    return (
      <div className="d-root" style={{ width: '100%' }}>
        <p style={{ fontSize: 12.5, margin: 0, lineHeight: 1.7 }}>
          按六要素描述组件，模型命中率最高
          <sup style={{ color: 'var(--accent)', cursor: 'pointer' }}>[1]</sup>
          <sup style={{ color: 'var(--accent)', cursor: 'pointer' }}>[2]</sup>
          ，复制即可使用。
        </p>
        <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
          {sources.map(([site, t], i) => (
            <div key={i} style={{ position: 'relative' }}>
              <span tabIndex={0} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, border: '1px solid var(--border)', borderRadius: 7, padding: '3px 8px', fontSize: 11, cursor: 'pointer' }}
                onMouseEnter={(e) => (e.currentTarget.nextElementSibling.style.opacity = 1)}
                onMouseLeave={(e) => (e.currentTarget.nextElementSibling.style.opacity = 0)}
              >
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: ['var(--accent)', 'var(--ok)'][i] }} />
                {site}
              </span>
              <div style={{ position: 'absolute', bottom: '130%', left: 0, width: 190, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, boxShadow: 'var(--shadow-lg)', padding: 8, fontSize: 11, color: 'var(--text-muted)', opacity: 0, transition: 'opacity .15s ease', pointerEvents: 'none', zIndex: 30 }}>
                「{t}」
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'token-meter') {
    let acc = 0
    return (
      <div className="d-root" style={{ width: '100%' }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>本月用量</div>
        <span style={{ display: 'flex', height: 14, borderRadius: 999, overflow: 'hidden' }}>
          {segments.map(([label, w], i) => (
            <span key={label} title={`${label}：${(w * 20).toLocaleString()}k`} style={{ width: mounted ? `${w}%` : 0, background: ['var(--accent)', '#a78bfa', 'var(--border)'][i], transition: 'width .3s ease' }} />
          ))}
          <span title={`剩余：${((100 - used) * 20).toLocaleString()}k`} style={{ flex: 1, background: 100 - used < 15 ? 'var(--danger)' : 'var(--border)', transition: 'width .3s ease' }} />
        </span>
        <div style={{ display: 'flex', gap: 12, marginTop: 8, fontSize: 11, color: 'var(--text-muted)' }}>
          {segments.map(([label], i) => (
            <span key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: ['var(--accent)', '#a78bfa'][i] }} />{label}
            </span>
          ))}
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--border)' }} />剩余
          </span>
          <span style={{ marginLeft: 'auto', fontVariantNumeric: 'tabular-nums' }}>{(used / 50).toFixed(1)}M / 2.0M</span>
        </div>
      </div>
    )
  }

  if (variant === 'agent-status') {
    return (
      <div className="d-root" style={{ border: '1px solid var(--border)', borderRadius: 12, padding: 12, width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <strong style={{ fontSize: 13 }}>研究员</strong>
          <span className="d-chip" style={{ fontSize: 10, background: 'var(--code-bg)', color: 'var(--text-muted)' }}>
            {agentRun && agentStep < steps.length ? '运行中' : '已完成'}
          </span>
        </div>
        {steps.map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, padding: '4px 0' }}>
            {i < agentStep ? <span style={{ color: 'var(--ok)' }}>✓</span> : i === agentStep && agentRun ? <span className="d-spinner" style={{ width: 12, height: 12 }} /> : <span style={{ width: 12, height: 12, borderRadius: '50%', border: '1.5px solid var(--border-strong)' }} />}
            <span style={{ color: i <= agentStep ? 'var(--text)' : 'var(--text-muted)', fontWeight: i === agentStep ? 600 : 400 }}>{s}</span>
          </div>
        ))}
        <button type="button" className="d-btn" style={{ marginTop: 8, padding: '3px 14px', fontSize: 12, color: 'var(--danger)', borderColor: 'var(--danger)' }} onClick={() => setAgentRun(false)}>Stop</button>
      </div>
    )
  }

  if (variant === 'code-diff') {
    return (
      <div className="d-root" style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)', width: '100%' }}>
        <div style={{ background: 'var(--code-bg)', padding: '6px 10px', fontSize: 11.5, color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
          <code>greet.js</code>
          <span><b style={{ color: 'var(--ok)' }}>+1</b> <b style={{ color: 'var(--danger)' }}>−1</b></span>
        </div>
        <pre style={{ margin: 0, padding: 10, fontSize: 12, lineHeight: 1.7, fontFamily: 'ui-monospace,Consolas,monospace', overflowX: 'auto' }}>
          {lines.map((l, i) => (
            <div key={i} style={{ background: l.type === 'added' ? 'rgba(34,197,94,.15)' : l.type === 'removed' ? 'rgba(239,68,68,.15)' : 'transparent', padding: '0 4px', borderRadius: 3, color: l.type === 'added' ? 'var(--ok)' : l.type === 'removed' ? 'var(--danger)' : 'var(--text)' }}>
              {l.type === 'added' ? '+' : l.type === 'removed' ? '−' : ' '} {l.text}
            </div>
          ))}
        </pre>
      </div>
    )
  }

  if (variant === 'thinking') {
    const done = agentStep >= steps.length
    return (
      <div className="d-root" style={{ width: '100%' }}>
        <button type="button" onClick={() => setThinkOpen((o) => !o)} aria-expanded={thinkOpen} style={{ display: 'flex', alignItems: 'center', gap: 8, border: 'none', background: 'var(--code-bg)', borderRadius: 8, padding: '7px 12px', fontSize: 12.5, width: '100%', cursor: 'pointer', color: done ? 'var(--text-muted)' : 'var(--accent)' }}>
          <span className={done ? '' : 'd-shimmer-text'} style={{ flex: 1, textAlign: 'left' }}>{done ? '已完成思考' : '思考中…'}</span>
          <span style={{ transform: thinkOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s ease' }}>▾</span>
        </button>
        {thinkOpen && (
          <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 5, paddingLeft: 10, borderLeft: '2px solid var(--border)' }}>
            {steps.map((s, i) => (
              <span key={s} style={{ fontSize: 12, color: 'var(--text-muted)', opacity: done || i < agentStep ? 1 : 0.4, transition: 'opacity .2s ease' }}>{i + 1}. {s}</span>
            ))}
          </div>
        )}
      </div>
    )
  }

  if (variant === 'suggestions') {
    return (
      <div className="d-root" style={{ width: '100%' }}>
        <p style={{ fontSize: 12.5, color: 'var(--text-muted)', margin: '0 0 10px', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          六要素口诀是：名称、变体、结构、交互、状态、动效。按这个顺序组织提示词…
        </p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {chips.map((c) => (
            <button
              key={c}
              type="button"
              disabled={selChip !== null && selChip !== c}
              onClick={() => setSelChip(c)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 4, border: '1px solid ' + (selChip === c ? 'var(--accent)' : 'var(--border-strong)'), background: selChip === c ? 'var(--accent-soft)' : 'var(--surface)', color: selChip === c ? 'var(--accent)' : 'var(--text)', borderRadius: 999, padding: '4px 12px', fontSize: 12, cursor: selChip && selChip !== c ? 'default' : 'pointer', opacity: selChip && selChip !== c ? 0.5 : 1 }}
            >
              <span aria-hidden>✦</span>{c}
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'invite') {
    return (
      <div className="d-root" style={{ width: '100%' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <input className="d-input" placeholder="邮箱地址" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="邀请邮箱" style={{ flex: 1, fontSize: 12.5 }} />
          <select className="d-input" style={{ width: 74, fontSize: 12.5 }} aria-label="角色"><option>成员</option><option>管理员</option></select>
          <button
            type="button"
            className="d-btn"
            style={{ padding: '5px 14px', background: 'var(--accent)', color: 'var(--accent-text)', borderColor: 'var(--accent)', fontSize: 12.5, whiteSpace: 'nowrap' }}
            onClick={() => { if (email.includes('@')) { setInvites((iv) => [...iv, [email, '成员']]); setEmail('') } }}
          >
            邀请
          </button>
        </div>
        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {invites.map(([em, role], i) => (
            <div key={em + i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, animation: 'd-fade .15s ease' }}>
              <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>{em}</span>
              <span className="d-chip" style={{ fontSize: 10.5 }}>{role}</span>
              <span style={{ fontSize: 11, color: 'var(--ok)' }}>已发送</span>
              <button type="button" className="d-tab" style={{ fontSize: 11, color: 'var(--danger)' }} onClick={() => setInvites((iv) => iv.filter((_, j) => j !== i))}>撤回</button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'quota') {
    return (
      <div className="d-root" style={{ border: '1px solid var(--border)', borderRadius: 12, padding: 14, width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <strong style={{ fontSize: 13 }}>免费版</strong>
          <span className="d-chip" style={{ fontSize: 10.5, background: 'var(--code-bg)', color: 'var(--text-muted)' }}>当前方案</span>
        </div>
        {rows.map(([label, pct, text]) => (
          <div key={label} style={{ marginBottom: 10 }} title={`${label}：${text}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}>
              <span>{label}</span>
              <span className="d-label" style={{ margin: 0, color: pct >= 100 ? 'var(--danger)' : undefined }}>{text}</span>
            </div>
            <span style={{ display: 'block', height: 6, borderRadius: 4, background: 'var(--border)' }}>
              <span style={{ display: 'block', height: '100%', borderRadius: 4, width: mounted ? `${Math.min(100, pct)}%` : 0, background: pct >= 100 ? 'var(--danger)' : 'var(--accent)', transition: 'width .4s ease' }} />
            </span>
          </div>
        ))}
        <button type="button" className="d-btn" style={{ width: '100%', justifyContent: 'center', background: 'var(--accent)', color: 'var(--accent-text)', borderColor: 'var(--accent)' }}>升级 Pro</button>
      </div>
    )
  }

  return null
}

import { Component } from 'react'

/**
 * 演示级错误边界：单个 demo 崩溃只影响自己那张卡，
 * 错误信息直接渲染出来，方便 headless 排查。
 */
export default class DemoErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    const { error } = this.state
    if (error) {
      return (
        <div className="demo-error" style={{ padding: 12, fontSize: 12, color: '#c0392b' }}>
          <div style={{ fontWeight: 600 }}>演示崩溃：{this.props.name || 'unknown'}</div>
          <div style={{ marginTop: 4, wordBreak: 'break-all' }}>{String(error && error.message)}</div>
        </div>
      )
    }
    return this.props.children
  }
}

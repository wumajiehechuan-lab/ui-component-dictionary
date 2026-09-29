import { useEffect, useRef, useState } from 'react'

/**
 * Tab 类 demo 公共内容：根据标签名生成面板文案。
 */
export function tabPanelText(tab) {
  if (tab === 'Overview')
    return (
      <>
        <strong>Overview</strong>：账户总览与最近动态。
      </>
    )
  if (tab === 'Billing')
    return (
      <>
        <strong>Billing</strong>：账单、发票与支付方式。
      </>
    )
  if (tab === 'Settings')
    return (
      <>
        <strong>Settings</strong>：偏好设置与安全选项。
      </>
    )
  return (
    <>
      <strong>{tab}</strong>：面板内容。
    </>
  )
}

/**
 * 通用 Tab 面板。
 */
export function TabPanel({ tab }) {
  return (
    <div className="d-panel" role="tabpanel">
      {tabPanelText(tab)}
    </div>
  )
}

/**
 * 测量 tab 元素位置，用于滑动指示器/滑块定位。
 * 返回 ref 挂到 tablist 容器，positions 为各 tab 的 {left, width}。
 */
export function useTabPositions(count, active) {
  const listRef = useRef(null)
  const [positions, setPositions] = useState([])

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const measure = () => {
      const rects = Array.from(list.querySelectorAll('[role="tab"]')).map((el) => ({
        left: el.offsetLeft,
        width: el.offsetWidth,
      }))
      setPositions(rects)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(list)
    return () => ro.disconnect()
  }, [count])

  return { listRef, pos: positions[active] || { left: 0, width: 0 } }
}

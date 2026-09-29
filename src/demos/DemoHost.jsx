import { getDemoRenderer } from './registry.js'
import DemoErrorBoundary from './DemoErrorBoundary.jsx'
import './_shared/demo.css'

/**
 * 演示分发器：按 demo.type 取渲染器，其余 demo 字段作为 props 传入。
 * 每个渲染器单独包 ErrorBoundary，崩溃不扩散。
 */
export default function DemoHost({ demo }) {
  if (!demo) return null
  const Renderer = getDemoRenderer(demo.type)
  return (
    <DemoErrorBoundary name={demo.type}>
      <Renderer {...demo} />
    </DemoErrorBoundary>
  )
}

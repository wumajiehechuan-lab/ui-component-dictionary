import ComponentCard from './ComponentCard.jsx'

/**
 * 卡片栅格：等宽自适应换列。
 */
export default function CardGrid({ components, categoryNameOf }) {
  return (
    <div className="card-grid">
      {components.map((c) => (
        <ComponentCard
          key={c.id}
          component={c}
          categoryName={categoryNameOf(c.category)}
        />
      ))}
    </div>
  )
}

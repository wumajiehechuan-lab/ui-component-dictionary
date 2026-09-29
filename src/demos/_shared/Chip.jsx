/**
 * Chip：可删除标签。多选 / 标签输入类 demo 复用。
 */
export function Chip({ label, onRemove }) {
  return (
    <span className="d-chip">
      {label}
      {onRemove && (
        <button
          type="button"
          className="d-chip-x"
          aria-label={`删除 ${label}`}
          onClick={onRemove}
        >
          ✕
        </button>
      )}
    </span>
  )
}

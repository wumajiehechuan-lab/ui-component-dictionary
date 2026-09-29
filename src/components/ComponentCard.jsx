import CopyButton from './CopyButton.jsx'
import DemoHost from '../demos/DemoHost.jsx'

/**
 * 组件卡片：演示区 + 中文俗称 + 标准英文 + 别名 + 分类 + 何时使用 + 英文 Prompt + 复制。
 */
export default function ComponentCard({ component, categoryName }) {
  const {
    name_zh,
    name_en,
    aliases = [],
    category,
    when_to_use,
    prompt_en,
    prompt_zh,
    demo,
  } = component

  return (
    <article className="card">
      <div className="card-demo">
        <DemoHost demo={demo} />
      </div>
      <div className="card-body">
        <div className="card-name-row">
          <span className="card-name-zh">{name_zh}</span>
          <span className="card-name-en">{name_en}</span>
          {aliases.map((a) => (
            <span key={a} className="card-alias">
              {a}
            </span>
          ))}
          {categoryName && <span className="card-category">{categoryName}</span>}
        </div>
        <p className="card-when">{when_to_use}</p>
        <div className="card-prompt">{prompt_en}</div>
        <div className="card-footer">
          <span className="zh-prompt-hint" title={prompt_zh}>
            附中文对照提示词
          </span>
          <CopyButton text={prompt_en} />
        </div>
      </div>
    </article>
  )
}

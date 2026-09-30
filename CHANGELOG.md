# 更新日志 (Changelog)

本文件记录发布版本的变更。桌面版发布包见 [GitHub Releases](https://github.com/wumajiehechuan-lab/ui-component-dictionary/releases)。

格式参考 [Keep a Changelog](https://keepachangelog.com/)。

## [1.0.0] - 2026-09-29

### 新增

- 212 个 UI 组件卡片，覆盖 26 个分类（含 All）
- 双语 AI Prompt（英文交付 + 中文对照），按六要素模板撰写，一键复制
- 可交互演示：45+ 个参数化渲染器，原生实现不依赖任何组件库
- 搜索：命中中文俗称 / 标准英文名 / 别名（不区分大小写），与分类叠加生效
- 分类徽标、深浅双主题（localStorage 记忆，CSS 变量组织）
- 每张 demo 独立错误边界，单卡崩溃不影响整页
- Windows 桌面版（Electron 免安装便携包，双击 exe 即用，断网可用）

### 已知简化

- 富文本 / Markdown / 代码编辑器三个 demo 为形态示意版，对应 Prompt 仍按完整体验撰写（Prompt 是给 AI 的交付物，不跟随演示降级）

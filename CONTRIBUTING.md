# 贡献指南 (Contributing)

感谢你关注 Vibe Coding UI 组件词典！这是一个个人维护的开源项目，欢迎提交 Issue 与 PR。

## 环境要求

- Node.js 18+
- Git
- 桌面版打包需设 `ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/`（仅 `desktop/` 用到）

## 本地开发（Web 版）

```bash
npm install
npm run dev      # 开发预览 http://localhost:5173
npm run build    # 构建到 dist/（注意：dist 需经 HTTP 服务打开，不能 file:// 直开）
```

Windows 用户也可双击根目录 `start.bat` 一键启动开发服务器。

## 新增一个组件（三步）

1. **加数据**：在 `src/data/components/<分类>.json` 追加一条（新分类则新建 json 文件，零代码改动）。字段见 README「新增一个组件」表。
2. **加渲染器**（仅当 `demo.type` 是新形态）：在 `src/demos/<分类>/` 写一个 `XxxDemo.jsx`，并在 `src/demos/registry.js` 注册一行。未注册的 type 自动显示「演示待实现」占位——数据可以先入库，渲染器后补。
3. **自检**：dev 模式控制台无 `[词典数据]` 校验报错；搜索 / 分类 / 复制 / 演示均正常。

提交前请自测：搜索命中、复制生效、深浅主题切换、无意外占位卡。

## 桌面版

```bash
cd desktop
npm install     # 走 npmmirror 需设 ELECTRON_MIRROR
npm start       # 开发调试
npm run package # 打包到 desktop/release/UI组件词典-win32-x64/
```

产物为免安装便携文件夹，双击 `UI组件词典.exe` 即用，无网络要求。打包时 `--ignore node_modules`（主进程只用内置模块）。

## 代码风格

- 组件用函数式组件 + hooks；命名 PascalCase（组件）/ camelCase（函数与变量）。
- 运行时只允许 `react` + `react-dom`，任何 demo 不得引入第三方库（离线承诺靠这条保证）。
- 中文注释随意，代码标识符用英文。

## 许可证

本项目以 MIT 许可证开源。提交贡献即表示你同意该贡献在 MIT 许可证下发布。

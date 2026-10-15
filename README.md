# 拾光梦 · NPS 插件 —— 配置教程与更新日志

为作者自制的 NotchPeninsula（灵动岛）插件提供**一份统一的在线文档站**：
每个插件一个独立分区，包含完整的配置教程与逐版本的更新日志。

站点使用 [VitePress](https://vitepress.dev/)（即 vuejs.org 所使用的文档框架）构建，
部署在 Cloudflare Pages。

## 收录的插件

| 插件 | dll | 插件标识 | 当前版本 |
| --- | --- | --- | --- |
| 局域网推送网桥 | `NpsPushBridge.dll` | `com.nps.pushbridge` | 1.6.0 |
| 双因素验证 | `Nps2FA.dll` | `com.nps.twofactor` | 1.2.0 |
| 剪贴板历史 | `NpsClipboard.dll` | `com.nps.clipboard` | 1.1.0 |
| 音量控制 | `NpsVolumeControl.dll` | `com.nps.volumecontrol` | 1.1.1 |
| 媒体增强 | `NpsMediaEnhancement.dll` | `com.nps.mediaenhancement` | 1.1.0 |
| NPS · Minecraft | `NpsMinecraft.dll` | `com.nps.dynamicisland` | 1.0.0 |

## 目录结构

```
.
├─ docs/
│  ├─ .vitepress/
│  │  ├─ config.mts          # 站点配置：导航、侧边栏、搜索、页脚
│  │  └─ theme/
│  │     ├─ index.ts         # 主题入口（滚动进场动画）
│  │     └─ custom.css       # 主题样式：配色令牌、组件动效、更新日志组件
│  ├─ public/                # 静态资源（logo 等），原样复制到产物根目录
│  ├─ index.md               # 首页（VitePress home layout）
│  ├─ guide/                 # 配置教程
│  │  ├─ index.md            # 快速上手（全部插件的共性部分）
│  │  └─ <插件 id>.md        # 每个插件一页
│  └─ changelog/             # 更新日志
│     ├─ index.md            # 全部版本一览 + 标签说明
│     └─ <插件 id>.md        # 每个插件一页
├─ package.json
└─ .gitignore
```

插件 id 取值：`pushbridge` / `twofactor` / `clipboard` / `volume` / `mediaenhancement` / `minecraft`。

## 本地开发

需要 Node.js 18 或更高版本。

```bash
npm install         # 首次
npm run docs:dev    # 启动开发服务器（默认 http://localhost:5173）
```

其他命令：

```bash
npm run docs:build    # 构建到 docs/.vitepress/dist
npm run docs:preview  # 预览构建产物
```

## 部署到 Cloudflare Pages

在 Cloudflare Pages 里连接本仓库，按下表填写：

| 配置项 | 值 |
| --- | --- |
| 生产分支 | `main` |
| 构建命令 | `npm install && npm run docs:build` |
| 构建输出目录 | `docs/.vitepress/dist` |
| 根目录 | 留空（仓库根） |
| 环境变量 | `NODE_VERSION` = `20`（或更高） |

推送提交后 Cloudflare 会自动构建并发布。

> **为什么构建命令要带上 `npm install`，以及为什么仓库里没有 `package-lock.json`**
>
> VitePress 的工具链依赖 esbuild 与 rollup 的「平台二进制」包，它们通过 npm 的
> `optionalDependencies` 机制按当前平台安装。实践中出现过 npm 静默跳过这些可选依赖的情况
> （Windows 本地就复现过，需要手动补装 `@rollup/rollup-win32-x64-msvc` 与 `@esbuild/win32-x64`）。
>
> 如果把这个状态下生成的 lock 文件提交上去，Linux 构建环境会照它执行，从而漏装
> `linux-x64` 的那几个二进制包，构建直接失败。因此仓库**有意不提交 lock 文件**，
> 由 `npm install` 在构建机上重新解析 —— 这样平台包一定能装对。
> `package.json` 里 VitePress 已锁定到精确版本，依赖漂移的风险可控。

若你的构建环境 npm 版本较新、希望更保险，也可以把构建命令写成：

```bash
npm install --include=optional && npm run docs:build
```

## 维护须知

### 新增一个插件

1. 在 `docs/guide/` 与 `docs/changelog/` 下各加一个 `<插件 id>.md`；
2. 在 `docs/.vitepress/config.mts` 的 `PLUGINS` 数组里加一项 ——
   侧边栏会自动生成对应的分区；
3. 首页 `docs/index.md` 的 `features` 里加一张卡片；
4. 若该插件有独立配色，在 `docs/.vitepress/theme/custom.css` 里按需补充。

### 更新日志的写法

每条改动前带一个彩色标签，用行内 HTML 包裹：

```markdown
## v1.2.0 <span class="rel-date">2026-10-05</span> <span class="rel-badge">最新</span>

- <span class="rel-tag rel-add">新增</span> 这一版新增了什么
- <span class="rel-tag rel-fix">修复</span> 修掉了什么问题
```

可用标签：`rel-add`（新增）、`rel-opt`（优化）、`rel-fix`（修复）、
`rel-chg`（调整）、`rel-sec`（安全）、`rel-del`（移除）。
最新版本记得加 `<span class="rel-badge">最新</span>`，并在切换版本时把它移到新的首条。

### 文档约定

- 站点只描述**当前版本的实际行为**，不写「以前是怎样、现在改成了怎样」的变更叙事
  （变更叙事属于更新日志页的职责）；
- 涉及宿主能力边界的说明要如实写出，并点明是**宿主的限制**而非插件的取舍；
- 代码注释与文档中的技术结论都应有仓库内的依据（源码常量、自检断言、实测记录）。

## 相关链接

- 宿主 NotchPeninsula：<https://github.com/GEORGEWWWWU/NotchPeninsula>
- 插件市场：<https://nps.georgewu.top/market>

---
title: NPS · Minecraft 更新日志
description: NPS · Minecraft（NpsMinecraft）的版本更新记录。
---

共 **5 个版本、20 项改动**。当前最新版本 **v1.1.2**（2026-11-14）。

## v1.1.2 <span class="rel-date">2026-11-14</span> <span class="rel-badge">最新</span>

- <span class="rel-tag rel-opt">优化</span> **取色改走宿主公开的逐元素明暗 API**：组件里的方块名 / 百分比 / 耐久数值、详情页每一行文字，以及耐久弧、挖掘弧、耐久条，都按自己脚下那块底色判黑白。判定与平滑交给宿主（24×6 网格，已把玻璃的明度补偿与雾度算进去），实体 / 亚克力 / 液态玻璃同一套口径
- <span class="rel-tag rel-opt">优化</span> **语义色保留色相**：连接状态点（绿 / 红）与低耐久告警条只在对比度不足时压暗或提亮，不再被洗成纯黑白
- <span class="rel-tag rel-chg">调整</span> **需要宿主 2.2.3 及以上**（该版本起提供逐元素明暗 API），低于此版本会把本插件判为不兼容而不加载
- <span class="rel-tag rel-del">移除</span> 插件内的背板采样实现整体删除

## v1.1.1 <span class="rel-date">2026-11-07</span>

- <span class="rel-tag rel-opt">优化</span> **文字逐元素取色**：组件里的方块名 / 百分比 / 耐久数值与详情页每一行文字，都改为按**自己身后的真实底色**挑深字或浅字。此前用的是写死的浅色（#F5F5F8 / #C6C8D0），浅色壁纸或白色窗口下几乎看不见

## v1.1.0 <span class="rel-date">2026-11-07</span>

- <span class="rel-tag rel-add">新增</span> **实况窗（岛左侧常驻气泡）**：连接到游戏后在灵动岛左侧常驻一个圆形气泡，外圈进度弧平时显示**手持物品耐久比例**，内圈是当前物品的 16×16 纹理（最近邻放大，保持方块观感）。左右键点气泡展开的就是原来的 Minecraft 详情页
- <span class="rel-tag rel-add">新增</span> **挖掘进度与破坏反馈**：挖掘时进度弧切换为挖掘进度、状态行显示「挖掘中」；方块被破坏的瞬间满圈亮一下（约 0.8 秒，状态「已破坏」），随后自动回落到耐久
- <span class="rel-tag rel-add">新增</span> **未连接态**：与游戏断开时气泡保留但进度弧转为不确定态旋转、状态显示「未连接」，重连后自动恢复
- <span class="rel-tag rel-add">新增</span> **响应宿主插件级开关**：宿主「设置 → 实况窗管理」关掉本插件的实况窗时气泡挂起，主岛组件照常显示；重新打开后继续更新
- <span class="rel-tag rel-fix">修复</span> **工程引用指向已迁移的宿主目录**：`ProjectReference` 仍指向 `Zhaogmz\NotchPeninsula`，宿主迁到 `Zhaogmz\NPSPlugins\NotchPeninsula` 后无法编译；改为新路径后恢复可编译

## v1.0.1 <span class="rel-date">2026-10-17</span>

- <span class="rel-tag rel-add">新增</span> **卸载时清掉留在宿主设置里的值**：宿主只提供读写、不提供删除，卸载后这些设置项原本会永久残留、重装回来时带着上次的状态。现在只删本插件前缀的值，不删键（键里还有宿主主题与其他插件的设置）
- <span class="rel-tag rel-chg">调整</span> 适配宿主 2.0.1 的卸载登记接口，用反射探测：旧宿主上退化为「不注册清理」，插件照常加载 —— 不会因为缺这个接口导致整个插件加载失败

## v1.0.0 <span class="rel-date">2026-10-06</span>

- <span class="rel-tag rel-add">新增</span> 首个版本：Fabric 模组采集、NPS 插件呈现，两端由本地回环 UDP（`127.0.0.1:25585`）单行文本协议驱动
- <span class="rel-tag rel-add">新增</span> **挖掘进度上岛**：环形进度条套在方块图标外，右侧依次是方块名与百分比
- <span class="rel-tag rel-add">新增</span> **方块放置余量**：手持方块右键放置时展开显示该方块在背包中的剩余总数，3.2 秒后自动收起
- <span class="rel-tag rel-add">新增</span> **滚轮切换物品**：显示当前选中物品的名称与持有数量；单个物品不显示 `×1`
- <span class="rel-tag rel-add">新增</span> **手持物品常驻**：待机态只画一个图标，主手优先、主手为空取副手，两手都空时显示 Minecraft 图标
- <span class="rel-tag rel-add">新增</span> **耐久显示**：可损坏物品旁画一条耐久条与 `剩余/上限`，低于两成转为告警色
- <span class="rel-tag rel-add">新增</span> **物品图标**：模组下发资源包里 16×16 纹理的 Base64，插件解码后按物品缓存，以最近邻采样绘制原版像素纹理
- <span class="rel-tag rel-add">新增</span> 按 `G` 键手动把当前手持物品唤出到岛上；左键点击组件展开详情页（连接状态、报文统计）
- <span class="rel-tag rel-chg">调整</span> 模组端**不绘制任何界面**，动态岛只呈现在 Windows 桌面上
- <span class="rel-tag rel-chg">调整</span> 与游戏断开（8 秒收不到报文）时整块内容自动隐藏，退出游戏后岛上不会残留

---

::: tip 双端都要装
这个插件由 **Fabric 模组**（游戏内）与 **NPS 插件**（Windows）两部分组成，缺一不可。
安装与配置见 [NPS · Minecraft 配置教程](/guide/minecraft)。
:::

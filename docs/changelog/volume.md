---
title: 音量控制 更新日志
description: NpsVolumeControl 的完整版本更新记录，从 1.0.0 到 1.1.1。
---

共 **3 个版本、15 项改动**。当前最新版本 **v1.1.1**（2026-10-07）。

## v1.1.1 <span class="rel-date">2026-10-07</span> <span class="rel-badge">最新</span>

- <span class="rel-tag rel-fix">修复</span> **滚轮接管范围收紧**：此前光标落在岛体任意位置都会调音量，导致时钟、媒体等其它组件上的滚动也被吃掉；现改为只在音量组件自己的矩形内接管

## v1.1.0 <span class="rel-date">2026-10-05</span>

- <span class="rel-tag rel-chg">调整</span> **收起态改为悬浮显示**：平时只画一个喇叭图标，鼠标悬停才在右侧显示百分比，不再常驻占位
- <span class="rel-tag rel-opt">优化</span> 组件宽度改为按悬浮状态动态申请，岛体展开与收起有平滑过渡
- <span class="rel-tag rel-add">新增</span> 音量合成器忽略名单：自动跳过宿主自身与 Rainmeter 会话，避免与频谱采样互相干扰
- <span class="rel-tag rel-chg">调整</span> 合成器视口从 2 行增加到 3 行，收起态百分比字号加大到 15px
- <span class="rel-tag rel-fix">修复</span> 详情页列表滚轮方向相反（向前推应为列表回滚），与系统语义对齐
- <span class="rel-tag rel-del">移除</span> 移除插件自建的配置窗口与内嵌文档，交付形态精简为单个 dll + `plugin.json`

## v1.0.0 <span class="rel-date">2026-10-05</span>

- <span class="rel-tag rel-add">新增</span> 首个版本：把系统主音量搬上灵动岛，收起态显示「图标 + 百分比」
- <span class="rel-tag rel-add">新增</span> **岛上滚轮直接调音量**：按住光标在岛体上滚动即可，滚到顶 / 底有轻微提示动画
- <span class="rel-tag rel-add">新增</span> 左键单击切换静音，右键单击展开详情页
- <span class="rel-tag rel-add">新增</span> **音量合成器进详情页**：顶部主音量卡（图标 + 百分比 + 静音 + 拖动滑块），下方逐应用音量列表
- <span class="rel-tag rel-add">新增</span> **滚轮逐进度条路由**：悬浮在哪个应用的进度条上，滚轮就调那一个应用，每格 2%；详情页其它区域滚动列表，详情页外完全不接管
- <span class="rel-tag rel-add">新增</span> 应用行点行首即可单独静音；写入即时生效，与 Windows 自带的音量合成器等价
- <span class="rel-tag rel-fix">修复</span> 设置窗口 / 详情页按钮误释放宿主共享字体面导致的全岛乱码与宿主闪退

---

::: info 关于前身
本插件的前身是「任务栏状态」（`com.nps.taskbarisland`），当时把音量 / 网络 / 输入法 / 托盘四项一起搬上岛。
后来按「只做音量」重新聚焦，标识与显示名都已更换，宿主会把它当作一个全新插件。
如果你还装着旧版，请先删除旧的 dll —— 两者会同时显示。
:::

---
title: NPS · Minecraft 更新日志
description: NPS · Minecraft（NpsMinecraft）的版本更新记录。
---

共 **1 个版本、10 项改动**。当前最新版本 **v1.0.0**（2026-10-06）。

## v1.0.0 <span class="rel-date">2026-10-06</span> <span class="rel-badge">最新</span>

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

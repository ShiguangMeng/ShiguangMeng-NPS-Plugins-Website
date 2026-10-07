---
title: 剪贴板历史 更新日志
description: NpsClipboard 的完整版本更新记录，从 1.0.0 到 1.1.0。
---

共 **2 个版本、11 项改动**。当前最新版本 **v1.1.0**（2026-10-07）。

## v1.1.0 <span class="rel-date">2026-10-07</span> <span class="rel-badge">最新</span>

- <span class="rel-tag rel-add">新增</span> **滚轮翻阅**：详情页直接滚动滚轮翻看历史，`▲` `▼` 按钮与按住拖动滚动全部保留
- <span class="rel-tag rel-fix">修复</span> **稳定性修复**：重写剪贴板监听生命周期，修复每次复制造成的整机卡顿与宿主闪退
- <span class="rel-tag rel-chg">调整</span> **纯图标常驻**：岛上仅显示剪贴板图标，宽度收紧至 18px

## v1.0.0 <span class="rel-date">2026-10-05</span>

- <span class="rel-tag rel-add">新增</span> 首个版本：插件加载期间持续监听系统剪贴板，把每次复制记成历史
- <span class="rel-tag rel-add">新增</span> 岛图标常驻 + 最新一条内容预览，预览随复制自动刷新
- <span class="rel-tag rel-add">新增</span> 详情页每页固定 4 条，`▲` `▼` 逐行滚动，列表区可按住拖动滚动
- <span class="rel-tag rel-add">新增</span> **单击整行即重新复制**到剪贴板，并短暂高亮作为反馈
- <span class="rel-tag rel-add">新增</span> **图钉固定**：固定条目置顶显示、永不被自动淘汰，只能手动删除
- <span class="rel-tag rel-add">新增</span> 一键清空只清未固定的条目，并告知清空了几条、保留了几条
- <span class="rel-tag rel-add">新增</span> 历史保存在注册表（随宿主设置隔离），重启宿主后依然保留
- <span class="rel-tag rel-chg">调整</span> 容量上限：最多 50 条，超出时淘汰最旧的未固定条目；单条最多记录 5000 个字符

---

::: tip 1.1.0 的修复值得注意
如果你在 1.0.0 上遇到过「复制之后整机卡顿」或「宿主闪退」，那是监听生命周期的缺陷，
1.1.0 已彻底修复 —— 详见 [配置教程](/guide/clipboard) 末尾的说明。
:::

---
title: 媒体增强 更新日志
description: NpsMediaEnhancement 的版本更新记录。
---

共 **1 个版本、16 项改动**。当前最新版本 **v1.0.0**（2026-10-12）。

## v1.0.0 <span class="rel-date">2026-10-12</span> <span class="rel-badge">最新</span>

- <span class="rel-tag rel-add">新增</span> 首个版本：复刻宿主的媒体模块外观上岛 —— 收起态为**封面 + 歌词 + 右侧频谱条**，宽度自适应当前内容
- <span class="rel-tag rel-add">新增</span> **自研歌词同步引擎**：歌词随播放进度实时对应，收起态与详情页两处一致；逐字歌词带字级扫光
- <span class="rel-tag rel-add">新增</span> **接入 PlayerCap 数据源**（独立本地服务，`127.0.0.1:8765`）：提供真实播放进度、整首歌词、逐字时间轴、封面与频谱；离线时**自动回退**到系统媒体时间轴 → 内存进度源 → 本地外推时钟
- <span class="rel-tag rel-add">新增</span> **多级歌词来源**：PlayerCap → 网易云落月接口（两步流程）→ 酷狗官方三段链路 → LRCLIB 兜底，任一可用即用
- <span class="rel-tag rel-add">新增</span> **逐字歌词**支持：网易云 `yrc` 与酷狗 KRC（含解密）双端接入，字内插值按字符数加权
- <span class="rel-tag rel-add">新增</span> **跨源补译文**：酷狗侧不提供翻译时，借网易云同曲的翻译并在 500 ms 容差内合并；副行取「翻译优先、其次音译」
- <span class="rel-tag rel-add">新增</span> **详情页两页**（底部指示点切换）：页 1 = 播放详情（封面 + 曲名歌手 + 双行歌词 + 频谱带 + 控制按钮），页 2 = 全部会话列表（软件图标 + 软件名 + 当前歌曲 + 逐项控制）
- <span class="rel-tag rel-add">新增</span> **四种频谱样式**：波形 / 竖条 / 镜像 / 圆点，在页 2 的选择器里即点即换，选择会被记住
- <span class="rel-tag rel-add">新增</span> **歌词延迟补偿**：页 1 右下角 `(−) 数值 (+)`，0.1 秒一步、上限 ±10 秒，点数值归零，用于弥补不同播放器上报时间的系统性偏差
- <span class="rel-tag rel-add">新增</span> **悬浮显示播放控件**：鼠标停在歌词区时显示上一曲 / 播放暂停 / 下一曲，歌词让位、组件同步收缩
- <span class="rel-tag rel-add">新增</span> **双击封面启动音乐软件**：按会话的应用标识解析可执行文件，UWP 与桌面程序都支持
- <span class="rel-tag rel-add">新增</span> **「重新匹配播放进度」按钮**（页 2 底部）：拖动进度条或歌词错位时重新定位，四种状态反馈；PlayerCap 在线时明确提示「进度由播放器直读 · 无需匹配」
- <span class="rel-tag rel-add">新增</span> **多语言歌词渲染**：中文 / 日文 / 韩文 / 西里尔文等按「宿主自定义字体优先、逐字符回退」处理，画不出的字回退系统字体而不出现方块
- <span class="rel-tag rel-opt">优化</span> 歌词推进改由**渲染帧驱动**，后台节拍只负责采集与取词 —— 消除逐字高亮的卡顿
- <span class="rel-tag rel-opt">优化</span> 歌词排版按内容自适应：有译文 / 音译时才双行（原文缩小 + 副行小字），否则单行大字；无歌词时退回显示歌名
- <span class="rel-tag rel-chg">调整</span> 播放控制统一走系统媒体接口（上一曲 / 播放暂停 / 下一曲 / 进度跳转），PlayerCap 仅作为只读的数据来源
- <span class="rel-tag rel-sec">安全</span> **零改动宿主源码**：插件只通过宿主公开的插件契约交互，宿主仓库逐字节未改动

---

::: tip 首次使用请先看配置教程
这个插件的数据源与回退链比较多，安装后建议按 [媒体增强 配置教程](/guide/mediaenhancement) 走一遍
—— 尤其是 PlayerCap 的启动方式与「关闭宿主原生媒体控制」这两步。
:::

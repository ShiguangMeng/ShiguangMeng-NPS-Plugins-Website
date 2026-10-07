---
title: 局域网推送网桥 更新日志
description: NpsPushBridge 的完整版本更新记录，从 1.0.0 到 1.5.0。
---

共 **7 个版本、25 项改动**。当前最新版本 **v1.5.0**（2026-09-27）。

## v1.5.0 <span class="rel-date">2026-09-27</span> <span class="rel-badge">最新</span>

- <span class="rel-tag rel-add">新增</span> 安装更简单：配置教程与更新日志已写进 dll，插件目录里只放一个 `NpsPushBridge.dll` 就够，不必再放置附加文件
- <span class="rel-tag rel-chg">调整</span> 分发方式改为单个 dll 文件（不再提供 zip 安装包）
- <span class="rel-tag rel-fix">修复</span> 「面板显示时长」滑块此前拖动无效（它想改的是提醒停留时长，而那个由宿主固定），现改为真正生效的面板自动收起延迟，0.5～60 秒可调
- <span class="rel-tag rel-add">新增</span> 新增「忽略外部鼠标操作」开关：勾选后配置摘要卡片永不自动收起

## v1.4.5 <span class="rel-date">2026-09-25</span>

- <span class="rel-tag rel-add">新增</span> 配置界面改为 WinUI 3 风格：全新配色、圆角与控件样式，按钮悬停有渐变动画
- <span class="rel-tag rel-add">新增</span> 标题栏「更新日志」按钮：在配置窗口内分屏查看各版本改动，内容长了可上下滚动
- <span class="rel-tag rel-add">新增</span> 插件信息补充作者元数据，插件中心现在会显示作者名
- <span class="rel-tag rel-opt">优化</span> 一键静默升级时一并更新配置教程与更新日志（原来只替换 dll）
- <span class="rel-tag rel-opt">优化</span> 右键展开的「配置摘要卡片」动画更顺滑：内容随面板等比缩放，展开过程不再跳位
- <span class="rel-tag rel-fix">修复</span> 标题栏「更新日志」按钮上半截点不中（落在窗口拖动条里，要找准位置才响应）

## v1.4.0 <span class="rel-date">2026-09-23</span>

- <span class="rel-tag rel-add">新增</span> 配置窗口可自由摆放：拖动标题条移动、拖窗口边缘缩放、标题栏一键置顶
- <span class="rel-tag rel-add">新增</span> 白名单 / 端口 / 图标映射改为真正的输入框（光标定位、选中、复制粘贴、方向键、双击全选）
- <span class="rel-tag rel-add">新增</span> 界面字体自动跟随灵动岛设置里的自定义字体
- <span class="rel-tag rel-add">新增</span> 右键状态灯展开「配置摘要卡片」，不再与宿主设置界面同时弹出
- <span class="rel-tag rel-fix">修复</span> 多显示器不同缩放下的按钮错位、偶发闪退、个别按钮点不中

## v1.3.0 <span class="rel-date">2026-09-22</span>

- <span class="rel-tag rel-add">新增</span> 配置教程改在浏览器中打开（链接可点击、文字可选中复制、支持 `Ctrl+F` 查找与缩放）
- <span class="rel-tag rel-opt">优化</span> 移除窗口内的分屏教程，配置窗口不再被教程挤占

## v1.2.0 <span class="rel-date">2026-09-20</span>

- <span class="rel-tag rel-fix">修复</span> 状态灯不再「失败一次就永久变橙」，服务恢复正常后自动回绿
- <span class="rel-tag rel-fix">修复</span> 手机端推送的正文含换行（多行 JSON）时不再显示乱码

## v1.1.1 <span class="rel-date">2026-09-19</span>

- <span class="rel-tag rel-fix">修复</span> 插件对外报的版本号此前写死为 `1.0.0`，导致更新检查永远认为「已是最新」；改为统一读程序集版本
- <span class="rel-tag rel-fix">修复</span> 版本比较改用数值序（`1.10.0 > 1.9.0`），并支持缺位补零（`1.1` 等价于 `1.1.0`）

## v1.0.0 <span class="rel-date">2026-09-14</span>

- <span class="rel-tag rel-add">新增</span> 首个版本：在本机监听 HTTP 端口，把手机端转发来的通知实时推送到灵动岛
- <span class="rel-tag rel-add">新增</span> 来源白名单（单 IP / 通配段 / CIDR 三种写法）、端口自定义与非法输入校验
- <span class="rel-tag rel-add">新增</span> 岛上状态灯（绿 = 正常 / 橙 = 最近一条未送达 / 灰 = 服务已停止），左键单击开关服务
- <span class="rel-tag rel-add">新增</span> 配置窗口：端口、白名单、图标映射编辑与转发日志区；配置写入注册表，下次启动自动沿用

---

::: tip 想了解当前版本怎么用
到 [配置教程](/guide/pushbridge) 看完整说明 —— 安装、防火墙放行、端口与白名单、图标映射、自检与常见问题都在那儿。
:::

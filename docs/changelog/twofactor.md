---
title: 双因素验证 更新日志
description: Nps2FA 的完整版本更新记录，从 1.0.0 到 1.3.0。
---

共 **4 个版本、18 项改动**。当前最新版本 **v1.3.0**（2026-10-17）。

## v1.3.0 <span class="rel-date">2026-10-17</span> <span class="rel-badge">最新</span>

- <span class="rel-tag rel-add">新增</span> **停用与重载时自动关窗**：配置窗口是插件自建的，宿主不知道它的存在 —— 停用或重载插件时它原本会留在屏幕上，现在随插件一同关闭
- <span class="rel-tag rel-add">新增</span> **卸载时清理临时产物**：清掉 `%TEMP%\Nps2FA` 里的教程副本；禁用、重载、退出宿主都不触发，只在真正卸载时执行一次
- <span class="rel-tag rel-chg">调整</span> 明确不清理的东西：密钥库、主密钥、导出备份、以及你主动复制到剪贴板的内容 —— 这些是用户资产，卸载后仍在
- <span class="rel-tag rel-chg">调整</span> 适配宿主 2.0.1 的卸载登记接口；旧宿主上自动降级为「不注册清理」，插件照常加载，不会因为缺这个接口而失败

## v1.2.0 <span class="rel-date">2026-10-05</span>

- <span class="rel-tag rel-add">新增</span> **悬浮才显示验证码**：平时是圆点，鼠标凑近才出现明文，防止旁人一眼看到
- <span class="rel-tag rel-add">新增</span> **收起态点码即复制**：直接点岛上的验证码数字就复制到剪贴板，不用先展开详情页
- <span class="rel-tag rel-add">新增</span> **配置菜单选「上岛」平台**：每条记录行尾一个指示灯，点亮即上岛；亮多条时岛上每 5 秒轮换一条
- <span class="rel-tag rel-opt">优化</span> 岛上的验证码随剩余时间变色（绿 → 琥珀 → 红），组件下缘细线就是剩余时间长度

## v1.1.0 <span class="rel-date">2026-09-30</span>

- <span class="rel-tag rel-add">新增</span> **扫码添加**：支持「截屏扫码」与「导入二维码图片」两种方式，识别后平台名、账号、算法、位数、周期一次带全
- <span class="rel-tag rel-add">新增</span> 自写二维码解码器（二值化 → 定位图形 → 网格精修 → RS 纠错），**未引入任何新的第三方依赖**
- <span class="rel-tag rel-opt">优化</span> 识别提示语不再回显密钥全文，只说明识别到了哪个平台 / 账号（状态行可能被截图或旁人看到）

## v1.0.0 <span class="rel-date">2026-09-26</span>

- <span class="rel-tag rel-add">新增</span> 首个版本：把 TOTP 验证码搬上灵动岛，支持多平台密钥管理与岛上显示
- <span class="rel-tag rel-add">新增</span> **加密密钥库**：AES-256-GCM 加密存储，本机解锁密钥由 Windows DPAPI 绑定当前用户账户，文件拷走也打不开
- <span class="rel-tag rel-add">新增</span> **带口令的加密备份**：导出 `.npsbk` 文件（PBKDF2-HMAC-SHA256 21 万次迭代 + AES-256-GCM），用于换设备与重装系统
- <span class="rel-tag rel-add">新增</span> 配置窗口：新增 / 删除 / 排序 / 搜索密钥，密钥框支持显示明文校验，粘贴 `otpauth://` 链接时自动解析全部参数
- <span class="rel-tag rel-add">新增</span> 详情页：多密钥列表（同屏最多 7 行 + 翻页）、点数字即复制、全局「隐藏验证码」用于演示屏幕
- <span class="rel-tag rel-sec">安全</span> 原子替换 + 滚动备份写盘：保存到一半断电不会得到半截文件，上一版始终留在 `.bak` 里
- <span class="rel-tag rel-add">新增</span> 本插件不联网、不上传任何数据，验证码全部在本机按 RFC 6238 计算

---

::: warning 换设备前务必导出备份
`2fa.key` 由 Windows DPAPI 绑定本机账户，**重装系统或换电脑之后就再也解不开了**。
升级不会影响密钥库，但迁移必须走 [配置教程](/guide/twofactor) 里「备份与换设备」那一节。
:::

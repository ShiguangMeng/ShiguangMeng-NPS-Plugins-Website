---
title: 媒体增强 更新日志
description: NpsMediaEnhancement 的完整版本更新记录，从 1.0.0 到 1.1.5。
---

共 **3 个版本、54 项改动**。当前最新版本 **v1.1.5**（2026-10-17）。

## v1.1.5 <span class="rel-date">2026-10-17</span> <span class="rel-badge">最新</span>

- <span class="rel-tag rel-add">新增</span> **封面缺失时用软件图标顶上**：取不到封面或封面还没到时，先画该歌曲所在软件的图标，按 62% 等比居中而不是拉伸填满（方形标志拉伸会明显发糊）；封面随后到达自动替换
- <span class="rel-tag rel-fix">修复</span> **听多首后封面失效、只能重启恢复**：系统的媒体会话管理器长时间运行后会失效且返回空列表，旧实现只在第一次取到后一直复用。现在发现「本来有会话、突然空了」时重建，并限频每 5 秒最多一次，避免真的没在播放时反复重建
- <span class="rel-tag rel-fix">修复</span> **系统卡顿时歌词串句**：歌词更新会被渲染线程、线程池与界面线程同时调用，而它内部共用着探测数组与匹配缓存，两个线程一起进来就互相踩。现在整个更新过程串行化
- <span class="rel-tag rel-fix">修复</span> **卡顿时进度往回退**：删掉了按播放状态冻结进度的机制（播放状态每 300ms 从系统读一次，卡顿时会抖动，反而让进度走走停停）；进度恢复为纯粹的「当前位置 − 本行起点」推导，进度回退改由三层防护拦住
- <span class="rel-tag rel-fix">修复</span> 三层防护的具体口径：读数层把回退抹平窗口从 800ms 放宽到 2500ms；定位层在播放中不轻易退回上一句（真的往回拖 3 秒以上才允许）；显示层同一句内进度只增不减
- <span class="rel-tag rel-opt">优化</span> **日志改为后台落盘**：原来每条日志都在调用线程上做三次文件系统操作并持有全局锁，而调用方可能是渲染或采集线程，等于直接掉帧。现在改为入队 + 单批次后台写（32KB 一批）
- <span class="rel-tag rel-opt">优化</span> **常驻开销下调**：会话刷新 600ms → 1.2s、换歌后封面强取 8 拍 → 4 拍、取词超时 8s → 5s，诊断日志只在显示进度与真实进度偏差超过 0.05 时才输出
- <span class="rel-tag rel-opt">优化</span> 歌词逐帧复用的探测数组不再每帧新建，减少内存回收压力
- <span class="rel-tag rel-add">新增</span> **关闭与卸载时完整收尾**：停掉轮询与两条 WebSocket、结束插件自己拉起的 PlayerCap（你自己手动运行的实例不动）、日志同步落盘；卸载时把数据目录交给宿主询问是否删除，禁用与重载不触发
- <span class="rel-tag rel-chg">调整</span> PlayerCap 客户端改为可重建的单例 —— 重载插件后拿到的不再是已停止的旧实例，歌词与频谱不用重启宿主就能重新接上

## v1.1.1 – v1.1.2 <span class="rel-date">2026-10-16</span>

- <span class="rel-tag rel-fix">修复</span> **所有平台都没有歌词**：出网客户端曾强制套用系统代理，宿主进程若拿到一个只服务某个会话的代理，取词会全部失败。现改为默认直连，只有你手填了代理才启用；PlayerCap 的 HTTP 与 WebSocket 对本地回环显式禁用代理
- <span class="rel-tag rel-fix">修复</span> **封面不显示**：封面缓存的键里包含歌手名，而存图与取图两侧取到的歌手名在顺序、分隔符上可能不同，导致永久失配。现在精确键不中时按「软件 + 标题」前缀回退
- <span class="rel-tag rel-fix">修复</span> **「插件更新」一直提示网络不可达**：真因不是网络，而是市场响应尾部还有别的赋值语句，旧代码把等号之后的整段交给 JSON 解析必然报错，错误又被一律归类成网络不可达（该功能自 1.1.0 上线起从未成功过）。现在按括号配对取出第一个完整 JSON 值
- <span class="rel-tag rel-opt">优化</span> 解析失败时把异常类型写进提示，不再一律报成网络错误
- <span class="rel-tag rel-opt">优化</span> 封面取不到、会话未就绪时每 12 秒各记一条限流日志，便于定位
- <span class="rel-tag rel-opt">优化</span> 更新检查不再阻塞 PlayerCap 启动：先启动、后台检查、预下载下次启动替换
- <span class="rel-tag rel-chg">调整</span> 出网策略按目标分工：歌词接口直连（国内），更新检查先直连再经代理各试一次，PlayerCap 下载走「镜像直连 → GitHub 代理 → GitHub 直连」

## v1.1.0 <span class="rel-date">2026-10-15</span>

- <span class="rel-tag rel-add">新增</span> **内置 PlayerCap**：插件自己把它装好并拉起 —— 先复用下载文件夹 / 桌面上已有的 exe，否则从内置镜像下载（`github.boki.moe` → `ghfast.top` → `gh-proxy.com`），校验文件大小与 PE 头后以无窗口方式启动，输出重定向到 `playercap.log`
- <span class="rel-tag rel-add">新增</span> **日志窗口**：从详情页页 2 打开，Tab 切换 PlayerCap 日志与插件日志；另有刷新、打开日志文件夹、**以管理员身份运行 PlayerCap**、检查更新；窗口尺寸与位置会被记住
- <span class="rel-tag rel-add">新增</span> **详情页新增页 3**：歌词切换动画与频谱样式的选择器，改为带示意图标的选项，即点即生效并自动记住（分页数 2 → 3）
- <span class="rel-tag rel-add">新增</span> **歌词切换动画 6 种**：无 / 淡入 / 上滑 / 下滑 / 缩放 / 聚焦
- <span class="rel-tag rel-add">新增</span> **插件自更新**：以插件市场为准检查新版本，后台静默预下载，下次启动前完成替换
- <span class="rel-tag rel-add">新增</span> **下载源与代理可手填**：日志窗口底部两个输入框，网络环境需要经代理访问 GitHub 时可直接填
- <span class="rel-tag rel-add">新增</span> **「重新匹配」升级为重新索取当前歌曲的全部内容**（元数据、封面、播放状态、整曲歌词、当前行与位置），完成后按钮短暂显示「✓ 已重取」
- <span class="rel-tag rel-opt">优化</span> **行切换延迟从约 400 ms 降到约 100 ms**：改用 PlayerCap 的实时事件推送，HTTP 轮询降级为「服务可用性判定 + 换歌 / 封面检测」的兜底
- <span class="rel-tag rel-opt">优化</span> **逐字匹配改为双通道**：文本精确匹配 → 去空白标点的宽松匹配 → 按行起点时间兜底，避免两源歌词文本差异导致整首退化成整行
- <span class="rel-tag rel-opt">优化</span> **扫光按本行真实长度校准**：保证扫光在本行结束前跑完，不再出现「没扫完就切句」；间奏等偏长的行不做加速，避免被拉成慢动作
- <span class="rel-tag rel-opt">优化</span> 频谱数据改为**增量解码**：PlayerCap 的推送是字节流，旧实现把「一条消息」当成「一帧」，导致新版本下频谱恒空
- <span class="rel-tag rel-fix">修复</span> **逐字效果消失、扫光在行首抽搐**：位置读数每次都重置外推基准造成周期性回退；改为只在读数变化时刷新基准，并抹平播放中的小幅回退
- <span class="rel-tag rel-fix">修复</span> **歌词不全、重新匹配后错乱**：PlayerCap 的歌词接口返回的是**滚动窗口**而非整首；改为整首歌词由插件自取链路提供，PlayerCap 只负责行边界与位置
- <span class="rel-tag rel-fix">修复</span> **换歌时旧歌词被贴回岛上**：新歌的行加入**位置自洽校验**与一个短暂的换歌过渡窗口，PlayerCap 在切换期间继续推上一首的行会被忽略
- <span class="rel-tag rel-fix">修复</span> **暂停后扫光退回行首**：暂停时**冻结**在当前行的当前进度，不再退回开头（暂停时拖动进度条或换歌则按新位置重新取行）
- <span class="rel-tag rel-fix">修复</span> **间奏时收起态反复闪歌名**：取不到歌词时**保持上一句**，不再清空文本导致与歌名交替闪烁
- <span class="rel-tag rel-fix">修复</span> **日志窗口中文整片乱码**：等宽字体不含中文字形，改用插件的 CJK 字体链
- <span class="rel-tag rel-fix">修复</span> **所有平台所有歌曲都没有歌词**：上一版把所有出网请求连同**本地回环链路**一起套上代理，PlayerCap 的 HTTP 与两条 WebSocket 因此静默断开；改回「默认直连，只有手填代理时才启用」
- <span class="rel-tag rel-fix">修复</span> **PlayerCap 迟迟起不来导致歌词一直不出现**：更新检查原本在启动前执行、网络不通时逐个候选超时（合计可达 30 秒）；改为先启动、再后台检查
- <span class="rel-tag rel-chg">调整</span> **歌词时间轴基准改为与 PlayerCap 同源**：行切换与行内偏移以 PlayerCap 为基，逐字数据从插件歌词按行挂载 —— 消除「每首歌延迟都不一样」的两源时间基偏差
- <span class="rel-tag rel-chg">调整</span> **移除动画「提前入场」**：提前入场要求上一句还没唱完就换文本，与「扫光必须完整」直接冲突；按保留扫光完整处理，动画时长 260 ms → 160 ms

## v1.0.0 <span class="rel-date">2026-10-12</span>

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

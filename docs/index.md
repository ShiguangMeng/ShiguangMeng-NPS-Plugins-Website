---
layout: home

hero:
  name: 拾光梦 · NPS 插件
  text: 灵动岛插件 · 配置教程与更新日志
  tagline: 六个为 NotchPeninsula 制作的插件。每一页都写清它做什么、怎么装、每个选项的含义，以及出问题先查哪一条。
  actions:
    - theme: brand
      text: 快速上手
      link: /guide/
    - theme: alt
      text: 查看更新日志
      link: /changelog/

features:
  - icon: 📡
    title: 局域网推送网桥
    details: 手机上的通知经局域网推进灵动岛。白名单、端口校验、图标映射、转发日志一应俱全，手机端配一次 SMSForwarder 规则即可。
  - icon: 🔐
    title: 双因素验证
    details: TOTP 验证码上岛，悬浮看码、点码即复制、多平台轮播。密钥库 AES-256-GCM 加密并由 Windows DPAPI 绑定本机账户。
  - icon: 📋
    title: 剪贴板历史
    details: 持续监听系统剪贴板，图钉固定、单击即重新复制、滚轮翻阅历史。记录落在注册表，重启宿主后依然保留。
  - icon: 🔊
    title: 音量控制
    details: 总音量搬上灵动岛，悬停显示百分比，滚轮直接调节。详情页内置完整音量合成器，可逐应用调音与静音。
  - icon: 🎵
    title: 媒体增强
    details: 自研歌词同步引擎，专治国内播放器拿不到进度、歌词卡第一行。内置 PlayerCap 免手动安装，封面 + 逐字歌词 + 频谱上岛，详情页三页可切换。
  - icon: 🎮
    title: NPS · Minecraft
    details: Fabric 模组采集、NPS 插件呈现：挖掘环形进度、方块放置余量、手持物品与耐久实时镜像到桌面。
  - icon: 🛡️
    title: 零改动宿主源码
    details: 全部插件只通过宿主公开的插件契约交互，宿主仓库逐字节未改动，交付物只有插件 dll 本身。
---

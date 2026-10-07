import { defineConfig } from 'vitepress'

const REPO = 'https://github.com/ShiguangMeng/ShiguangMeng-NPS-Plugins-Website'
const HOST_REPO = 'https://github.com/GEORGEWWWWU/NotchPeninsula'
const MARKET = 'https://nps.georgewu.top/market'

/** 每个插件独立一个分区：配置教程 + 更新日志 */
const PLUGINS = [
  { text: '局域网推送网桥', guide: '/guide/pushbridge', log: '/changelog/pushbridge' },
  { text: '双因素验证', guide: '/guide/twofactor', log: '/changelog/twofactor' },
  { text: '剪贴板历史', guide: '/guide/clipboard', log: '/changelog/clipboard' },
  { text: '音量控制', guide: '/guide/volume', log: '/changelog/volume' },
  { text: 'NPS · Minecraft', guide: '/guide/minecraft', log: '/changelog/minecraft' }
]

const sidebar = [
  {
    text: '开始',
    items: [{ text: '快速上手', link: '/guide/' }]
  },
  ...PLUGINS.map((p) => ({
    text: p.text,
    collapsed: false,
    items: [
      { text: '配置教程', link: p.guide },
      { text: '更新日志', link: p.log }
    ]
  })),
  {
    text: '相关链接',
    items: [
      { text: '全部版本一览', link: '/changelog/' },
      { text: '宿主源码', link: HOST_REPO },
      { text: '插件市场', link: MARKET },
      { text: '本站仓库', link: REPO }
    ]
  }
]

export default defineConfig({
  lang: 'zh-CN',
  title: '拾光梦 · NPS 插件',
  description: 'NotchPeninsula 灵动岛插件 —— 配置教程与更新日志',
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: false,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap'
      }
    ],
    ['meta', { name: 'theme-color', content: '#42b883' }],
    ['meta', { name: 'author', content: '拾光梦' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: '拾光梦 · NPS 插件' }]
  ],

  markdown: {
    lineNumbers: false,
    theme: { light: 'github-light', dark: 'github-dark' }
  },

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: '拾光梦 · NPS 插件',

    nav: [
      { text: '首页', link: '/' },
      { text: '配置教程', link: '/guide/', activeMatch: '^/guide/' },
      { text: '更新日志', link: '/changelog/', activeMatch: '^/changelog/' }
    ],

    sidebar,

    socialLinks: [
      { icon: 'github', link: REPO, ariaLabel: '本站仓库' }
    ],

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            displayDetails: '显示详情',
            resetButtonTitle: '清除查询条件',
            backButtonTitle: '返回',
            noResultsText: '没有找到相关结果',
            footer: {
              selectText: '选择',
              selectKeyAriaLabel: '回车',
              navigateText: '切换',
              navigateUpKeyAriaLabel: '上箭头',
              navigateDownKeyAriaLabel: '下箭头',
              closeText: '关闭',
              closeKeyAriaLabel: 'Esc'
            }
          }
        }
      }
    },

    outline: {
      level: [2, 3],
      label: '本页目录'
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '回到顶部',
    externalLinkIcon: true,

    lastUpdated: {
      text: '最后更新于',
      formatOptions: { dateStyle: 'short', timeStyle: 'short' }
    },

    editLink: {
      pattern: `${REPO}/edit/main/docs/:path`,
      text: '在 GitHub 上编辑此页'
    },

    footer: {
      message:
        '本站内容为作者自制的 NotchPeninsula 灵动岛插件文档。宿主为开源项目，插件均为零改动宿主源码。',
      copyright: 'Copyright © 2026 拾光梦'
    },

    notFound: {
      title: '页面不存在',
      quote: '这个页面可能已经被移动或删除了。',
      linkLabel: '回到首页',
      linkText: '回到首页'
    }
  }
})

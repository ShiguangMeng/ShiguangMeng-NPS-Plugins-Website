import type { EnhanceAppContext } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'

/**
 * 滚动进场动画：内容区里「体量较大」的块在进入视口时淡入上移。
 *
 * 只挑块级元素（标题 / 表格 / 代码块 / 自定义容器），不动正文段落 ——
 * 段落逐个淡入会在阅读时造成持续跳动，收益远小于干扰。
 */
const REVEAL_SELECTOR = [
  '.vp-doc > h2',
  '.vp-doc > h3',
  '.vp-doc > table',
  '.vp-doc > div[class*="language-"]',
  '.vp-doc > .custom-block',
  '.vp-doc > .plugin-meta',
  '.vp-doc > .vp-doc-tip'
].join(',')

function setupReveal(): void {
  if (typeof window === 'undefined') return

  const targets = Array.from(
    document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)
  ).filter((el) => !el.classList.contains('reveal'))

  if (!targets.length) return

  // 尊重「减少动态效果」偏好，也兜住不支持 IntersectionObserver 的环境
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('reveal', 'is-in'))
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-in')
        observer.unobserve(entry.target)
      })
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
  )

  targets.forEach((el) => {
    el.classList.add('reveal')
    observer.observe(el)
  })
}

export default {
  extends: DefaultTheme,

  enhanceApp({ router }: EnhanceAppContext) {
    if (typeof window === 'undefined') return

    // 首屏
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupReveal, { once: true })
    } else {
      window.requestAnimationFrame(setupReveal)
    }

    // 客户端路由切换后重新绑定（VitePress 的 SPA 跳转不会重新加载页面）
    const original = router.onAfterRouteChanged
    router.onAfterRouteChanged = (to: string) => {
      original?.(to)
      window.requestAnimationFrame(setupReveal)
    }
  }
}

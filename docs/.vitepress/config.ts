import { basename } from 'node:path'
import { defineConfig } from 'vitepress'
import MarkdownPreview from 'vite-plugin-markdown-preview'

import { head, nav, sidebar } from './configs'

const APP_BASE_PATH = basename(process.env.GITHUB_REPOSITORY || '')

export default defineConfig({
  outDir: '../dist',
  base: APP_BASE_PATH ? `/${APP_BASE_PATH}/` : '/',

  lang: 'zh-CN',
  title: '小云的云',
  description: '一片云是怎么飘向远方的，又怎么回到近处的',
  head,

  lastUpdated: true,
  cleanUrls: true,

  /* markdown 配置 */
  markdown: {
    lineNumbers: true,
  },

  /* 主题配置 */
  themeConfig: {
    i18nRouting: false,

    search: {
      provider: 'local'
    },

    logo: '/logo.png',

    nav,
    sidebar,

    /* 右侧大纲配置 */
    outline: {
      level: 'deep',
      label: '目录',
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/leiyun1993' }],

    footer: {
      message: '幸得识卿桃花面，自此阡陌多暖春！',
      copyright: 'Copyright © 2024-present leiyun <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">蜀ICP备2021001297号-1</a>',
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    /*** 自定义配置 ***/
    visitor: {
      badgeId: 'leiyun1993.bolg.qqsrx.top',
    },

    // comment: {
    //   repo: 'maomao1996/vitepress-nav-template',
    //   repoId: 'R_kgDOJC09Jg',
    //   category: 'Announcements',
    //   categoryId: 'DIC_kwDOJC09Js4Cekn0',
    // },
  },

  vite: {
    plugins: [MarkdownPreview()],
  },
})

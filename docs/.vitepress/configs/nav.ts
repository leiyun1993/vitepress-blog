import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '首页', link: '/' },
  { text: '前端导航', link: '/nav/' },
  { text: '前端笔记', items:[
    {text:"微信小程序", link: '/web/mplicenseplate'},
    {text:"Vue", link: '/web/vue2-license-plate'},
    {text:"React", link: '/web/React_demo'}
  ]},
  { text: 'App笔记', items:[
    {text:"Android", link: '/android/imitate_douyin'},
    {text:"Flutter笔记", link: '/android/flutter_note_1'}
  ]},
]

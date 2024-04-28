import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
	'/android/':[
		{
			text: 'Android',
			collapsed: false,
			items: [
				{ text: '仿抖音APP视频切换和点赞效果', link: '/android/imitate_douyin' },
				{ text: 'RecyclerView横向滑动指示器', link: '/android/HIndicator' },
				{ text: '玩安卓App', link: '/android/wanandroid' },
				{ text: 'ShortcutsDemo', link: '/android/ShortcutsDemo' },
				{ text: '指纹验证', link: '/android/Fingerprint' },
			]
		},
		{
			text: 'Flutter笔记',
			collapsed: false,
			items: [
				{ text: '笔记(一)：BottomNavigationBar常见问题', link: '/android/flutter_note_1' },
				{ text: '笔记(二)：Icon，ImageIcon,以及在Flutter中使用IconFont', link: '/android/flutter_note_2' },
				{ text: '笔记(三)：设置白色状态栏', link: '/android/flutter_note_3' },
				{ text: '笔记(四)：PageView-Flutter中的ViewPager', link: '/android/flutter_note_4' },
				{ text: '笔记(五)：TabBar、TabBarView', link: '/android/flutter_note_5' },
				{ text: '笔记(六)：StaggeredGridView瀑布流+下拉刷新和加载更多', link: '/android/flutter_note_6' },
				{ text: '笔记(七)：Dio网络请求、Json数据解析以及泛型问题', link: '/android/flutter_note_7' },
				{ text: '笔记(八)：route、路由管理', link: '/android/flutter_note_8' },
			]
		}
	],
	'/web/':[
		{
			text: '微信小程序',
			collapsed: false,
			items: [
				{ text: '小程序的车牌号输入控件', link: '/web/mplicenseplate' },
				{ text: 'Swiper做Tab切换，带动画', link: '/web/swiper_tab' },
			]
		},
		{
			text: 'Vue',
			collapsed: false,
			items: [
				{ text: '基于vue2的车牌号输入控件', link: '/web/vue2-license-plate' },
				{ text: '基于vue3的车牌号输入控件', link: '/web/vue3-license-plate' },
				{ text: '视差滚动（Parallax Scrolling）', link: '/web/ParallaxScrollingDemo' },
				{ text: 'VUE笔记：多组件透传之provide / inject', link: '/web/provide_inject' },
				{ text: '记一次由^引起的bug', link: '/web/bugs_1' },
				{ text: 'GankUniApp', link: '/web/gank_app' },
			]
		},
		{
			text: 'React',
			collapsed: false,
			items: [
				{ text: 'AntDesign和玩安卓Api', link: '/web/React_demo' },
			]
		},
	]
}

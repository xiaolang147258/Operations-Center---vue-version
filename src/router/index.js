import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },

  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
	
	
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [
  //     {
  //       path: 'dashboard',
  //       component: () => import('@/views/dashboard/index'),
  //       name: 'Dashboard',
  //       meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
  //     }
  //   ]
  // },
	
	{
	  path: '/',
	  component: Layout,
		redirect: '/Workbench001',
	  children: [
	    {
	      path: '/Workbench001',
	      component: () => import('@/vif_box/Workbench001/index'),
	      name:'Boxas',
	      meta: { title: '工作台', icon: 'tree', affix: true }
	    }
	  ]
	},
	{
	  path: '/Message_Center002',
	  component: Layout,
	  children: [
	    {
	      path: '/Message_Center002',
	      component: () => import('@/vif_box/Message_Center002/index'),
	      name:'Boxas',
	      meta: { title: '消息中心', icon: 'message', affix: true }
	    }
	  ]
	},
	{
	  path: '/Audit_center003',
	  component: Layout,
	  children: [
	    {
	      path: '/Audit_center003',
	      component: () => import('@/vif_box/Audit_center003/index'),
	      name:'Boxas',
	      meta: { title: '审核中心', icon: 'form', affix: true }
	    }
	  ]
	},
	
	{
	  path: '/Institutional_management_001',
	  component: Layout,
		meta: { title: '资料中心', icon: 'excel', affix: true },
	  children: [
	    {
	      path: '/Institutional_management_001',
	      component: () => import('@/vif_box/information_Center004/Institutional_management_001/index001'),
	      name:'Boxas',
	      meta: { title: '机构管理',affix: true }
	    },
			{
			  path: '/Course_management_002',
			  component: () => import('@/vif_box/information_Center004/Course_management_002/index002'),
			  name:'Boxas',
			  meta: { title: '课程管理',affix: true }
			},
			{
			  path: '/Teacher_management_003',
			  component: () => import('@/vif_box/information_Center004/Teacher_management_003/index003'),
			  name:'Boxas',
			  meta: { title: '教师管理',affix: true }
			},
	  ]
	},
	
	
	//审核详情
	{
		hidden: true,//当设置 true 的时候该路由不会再侧边栏出现
	  path: '/ji_audit_001',
	  component: Layout,
	  children: [
	    {
	      path: '/ji_audit_001',
	      component: () => import('@/vif_box/Audit_center003/ji_audit_001'),
	      name:'ji_audit_001',
	      meta: { title: '机构审核',affix: true }
	    }
	  ]
	},
	{
		hidden: true,//当设置 true 的时候该路由不会再侧边栏出现
	  path: '/ke_audit_002',
	  component: Layout,
	  children: [
	    {
	      path: '/ke_audit_002',
	      component: () => import('@/vif_box/Audit_center003/ke_audit_002'),
	      name:'ke_audit_002',
	      meta: { title: '课程审核',affix: true}
	    }
	  ]
	},
		{
		hidden: true,//当设置 true 的时候该路由不会再侧边栏出现
	  path: '/jiao_shi_audit_003',
	  component: Layout,
	  children: [
	    {
	      path: '/jiao_shi_audit_003',
	      component: () => import('@/vif_box/Audit_center003/jiao_shi_audit_003'),
	      name:'jiao_shi_audit_003',
	      meta: { title: '教师审核',affix:true}
	    }
	  ]
	},
	
	//课程添加||编辑页
	{
		hidden: true,//当设置 true 的时候该路由不会再侧边栏出现
	  path: '/add_course',
	  component: Layout,
	  children: [
	    {
	      path: '/add_course',
	      component: () => import('@/vif_box/information_Center004/Course_management_002/add_course'),
	      name:'add_course',
	      meta: { title: '课程添加/编辑',affix:true}
	    }
	  ]
	},
	//教师 添加||编辑页
	{
		hidden: true,//当设置 true 的时候该路由不会再侧边栏出现
	  path: '/003_add_teacher',
	  component: Layout,
	  children: [
	    {
	      path: '/003_add_teacher',
	      component: () => import('@/vif_box/information_Center004/Teacher_management_003/003_add_teacher'),
	      name:'003_add_teacher',
	      meta: { title: '教师添加/编辑',affix:true}
	    }
	  ]
	},
	
	
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  
  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

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
	      name:'Workbench001',
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
	      name:'Message_Center002',
	      meta: { title: '消息中心', icon: 'message', affix: false }
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
	      name:'Audit_center003',
	      meta: { title: '审核中心', icon: 'form', affix: false }
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
	      name:'Institutional_management_001',
	      meta: { title: '机构管理',affix: false }
	    },
			{
			  path: '/Course_management_002',
			  component: () => import('@/vif_box/information_Center004/Course_management_002/index002'),
			  name:'Course_management_002',
			  meta: { title: '课程管理',affix: false }
			},
			{
			  path: '/Teacher_management_003',
			  component: () => import('@/vif_box/information_Center004/Teacher_management_003/index003'),
			  name:'Teacher_management_003',
			  meta: { title: '教师管理',affix: false }
			},
			{
			  path: '/School_management',
			  component: () => import('@/vif_box/information_Center004/School_management_004/School_management'),
			  name:'School_management',
			  meta: { title: '学校管理',affix: false }
			},
			{
			  path: '/semester',
			  component: () => import('@/vif_box/information_Center004/semester_005/semester'),
			  name:'semester',
			  meta: { title: '学期管理',affix: false }
			},
			{
			  path: '/supplier_006',
			  component: () => import('@/vif_box/information_Center004/supplier_006/supplier_006'),
			  name:'supplier_006',
			  meta: { title: '供应商管理',affix: false }
			},
			{
			  path: '/Tag_library_007',
			  component: () => import('@/vif_box/information_Center004/Tag_library_007/Tag_library_007'),
			  name:'Tag_library_007',
			  meta: { title: '标签库管理',affix: false }
			},
	  ]
	},
	
	
	{
	  path: '/Class_center_005',
	  component: Layout,
		meta: { title: '课表中心', icon: 'table', affix: true },
	  children: [
	    {
	      path: '/curriculum_schedule_001',
	      component: () => import('@/vif_box/Class_center_005/curriculum_schedule_001/curriculum_schedule_001'),
	      name:'curriculum_schedule_001',
	      meta: { title: '课程列表',affix: false }
	    },
			{
			  path: '/Class_list_002',
			  component: () => import('@/vif_box/Class_center_005/Class_list_002/Class_list_002'),
			  name:'Class_list_002',
			  meta: { title: '班级名单',affix: false }
			},
			{
			  path: '/Platform_deployment_003',
			  component: () => import('@/vif_box/Class_center_005/Platform_deployment_003/Platform_deployment_003'),
			  name:'Platform_deployment_003',
			  meta: { title: '平台调配',affix: false }
			},
			{
			  path: '/One-click_scheduling_004',
			  component: () => import('@/vif_box/Class_center_005/One-click_scheduling_004/One-click_scheduling_004'),
			  name:'One-click_scheduling_004',
			  meta: { title: '一键排课',affix: false }
			},
	  ]
	},

//普惠中心	
	{
	  path: '/Pratt_&_Whitney_Center_006',
	  component: Layout,
	  meta: { title: '普惠中心', icon: 'tree-table', affix: true },
	  children: [
	    {
	      path: '/Pratt_&_Whitney_Management_001',
	      component: () => import('@/vif_box/Pratt_&_Whitney_Center_006/Pratt_&_Whitney_Management_001/Pratt_&_Whitney_Management_001'),
	      name:'Pratt_&_Whitney_Management_001',
	      meta: { title: '普惠管理',affix: false }
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
	      meta: { title: '机构审核',affix: false }
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
	      meta: { title: '课程审核',affix: false}
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
	      meta: { title: '教师审核',affix:false}
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
	      meta: { title: '课程添加/编辑',affix:false}
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
	      meta: { title: '教师添加/编辑',affix:false}
	    }
	  ]
	},
	//添加、编辑学校
	{
		hidden: true,//当设置 true 的时候该路由不会再侧边栏出现
	  path: '/add_School_management',
	  component: Layout,
	  children: [
	    {
	      path: '/add_School_management',
	      component: () => import('@/vif_box/information_Center004/School_management_004/add_School_management'),
	      name:'add_School_management',
	      meta: { title: '学校添加/编辑',affix:false}
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

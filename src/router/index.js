import Vue from 'vue'
import VueRouter from 'vue-router'
import {getToken} from '@/plugins/cookie'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {title: '登录'}
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('../views/layout.vue'),
    meta: {title: '布局结构'},
    children:[
      {
        path: '',
        redirect: 'interface/interface_list',
      },
      {
        path: 'interface',
        name: 'Interface',
        component:() => import('../views/interface/Interface.vue'),
        meta: {title: '接口管理'},
        children:[
          {
            path: 'interface_list',
            name: 'Interface_list',
            component: () => import('../views/interface/Interface_list.vue'),
            meta: {title: '接口列表'},
          },
          {
            path: 'add_interface',
            name: 'Add_interface',
            component: () => import('../views/interface/Add_interface.vue'),
            meta: {title: '创建新接口'},
          },
          {
            path: 'interface_detail',
            name: 'Interface_detail',
            component: () => import('../views/interface/Interface_detail.vue'),
            meta: {title: '接口详情'},
          },
          {
            path: 'edit_interface',
            name: 'Edit_interface',
            component: () => import('../views/interface/Edit_interface.vue'),
            meta: {title: '编辑接口'},
          },
          {
            path: 'interface_run',
            name: 'Interface_run',
            component: () => import('../views/interface/Interface_run.vue'),
            meta: {title: '按照域名进行接口测试'},
          },
          {
            path: 'interface_report_primary',
            name: 'Interface_report_primary',
            component: () => import('../views/interface/Interface_report_primary.vue'),
            meta: {title: '测试报告'},
          },
          {
            path: 'interface_report_second',
            name: 'Interface_report_second',
            component: () => import('../views/interface/Interface_report_second.vue'),
            meta: {title: '单条测试报告'},
          },
        ]
      },

      {
        path: 'bug',
        name: 'Bug',
        component: () => import('../views/bugs/Bug.vue'),
        meta: {title: '线上问题反馈'},
        children: [
          {
            path: 'bug_list',
            name: 'Bug_list',
            component: () => import('../views/bugs/Bug_list.vue'),
            meta: {title: 'bug列表'},
          },
          {
            path: 'add_bug',
            name: 'Add_bug',
            component: () => import('../views/bugs/Add_bug.vue'),
            meta: {title: 'bug列表'},
          },
          {
            path: 'bug_detail',
            name: 'Bug_detail',
            component: () => import('../views/bugs/Bug_detail.vue'),
            meta: {title: '单条bug详情'},
          },
          {
            path: 'edit_bug',
            name: 'Edit_bug',
            component: () => import('../views/bugs/Edit_bug.vue'),
            meta: {title: '单条bug详情'},
          },
        ],
      },

    ]
  },
  {
    path: '/*',
    name: 'About',
    component: () => import('../views/NotFound.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: "history"  // 作用是去掉浏览器url上的#
})

router.beforeEach((to, from, next) => {
  // 路由拦截：如果cookie里没有token,就拦截，让用户跳转到登录页面

  let token = getToken();

  // 如果已登录，则可以继续访问目标地址
  if (token) {
    next();
    return;
  }
  // 未登录，访问登录页面
  if (to.name === "Login") {
    next();
    return;
  }

  // 未登录，跳转登录页面
  // next(false); 保持当前所在页面，不跳转
  next({name: 'Login'});
})

export default router

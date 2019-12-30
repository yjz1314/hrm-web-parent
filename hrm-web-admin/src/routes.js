import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import echarts from './views/charts/echarts.vue'
import CourseType from './views/course/CourseType.vue'
import TenantRegister from './views/TenantRegister.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/tenant/register',
        component: TenantRegister,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-eercast',
        leaf: true,//只有一个节点
        children: [
            { path: '/main', component: echarts, name: '首页' }
        ]
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '系统管理',
        iconCls: 'fa fa-superpowers',//图标样式class
        children: [
            { path: '/systemdictionary', component: Table, name: '数据字典' },
            { path: '/role', component: Form, name: '角色管理' },
            { path: '/permission', component: user, name: '权限管理' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '课程管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/coursetype', component: CourseType, name: '课程类型' },
            { path: '/course', component: Page5, name: '课程管理' }
        ]
    },

    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;
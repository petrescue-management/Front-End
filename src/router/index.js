import Vue from 'vue'
import Router from 'vue-router'

import LoginStaff from '@/views/staff/LoginView'
import MainStaff from '@/views/staff/MainView'
import DashboardStaff from '@/components/staff/Dashboard'
import PetList from '@/components/staff/pet/PetList'
import PetDetail from '@/components/staff/pet/PetDetail'
import ReportRescue from '@/components/staff/report-rescue/ReportRescue'
import FormAdopt from '@/components/staff/form-adopt/ListFormAdopt'

import LoginAdmin from '@/views/admin/LoginView'
import MainAdmin from '@/views/admin/MainView'
import CenterList from '@/components/admin/center/CenterList'
import RegisterCenterFormList from '@/components/admin/register_center_form/RegisterFormList'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/login-staff',
            name: 'LoginStaff',
            component: LoginStaff
        },
        {
            path: '/main-staff',
            name: 'MainStaff',
            component: MainStaff,
            children: [{
                    path: "/main-staff/dashboard-staff",
                    name: "DashboardStaff",
                    component: DashboardStaff
                },
                {
                    path: "/main-staff/pet-list",
                    name: "PetList",
                    component: PetList
                },
                {
                    path: "/main-staff/pet-detail/:id",
                    name: "PetDetail",
                    component: PetDetail
                },
                {
                    path: "/main-staff/report-rescue",
                    name: "ReportRescue",
                    component: ReportRescue
                },
                {
                    path: "/main-staff/form-adopt",
                    name: "FormAdopt",
                    component: FormAdopt
                },
            ]
        },
        {
            path: '/login-admin',
            name: 'LoginAdmin',
            component: LoginAdmin
        },
        {
            path: '/main-admin',
            name: 'MainAdmin',
            component: MainAdmin,
            children: [{
                    path: "/main-admin/center-list",
                    name: "CenterList",
                    component: CenterList
                },
                {
                    path: "/main-admin/register-form-list",
                    name: "RegisterCenterFormList",
                    component: RegisterCenterFormList
                },
            ]
        },
    ]
})
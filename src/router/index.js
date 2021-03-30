import Vue from 'vue'
import Router from 'vue-router'

import LoginStaff from '@/views/staff/LoginView'
import RegisterCenter from '@/views/staff/RegisterView'
import MainStaff from '@/views/staff/MainView'
import DashboardStaff from '@/components/staff/Dashboard'
import PetList from '@/components/staff/pet/PetList'
import PetDetail from '@/components/staff/pet/PetDetail'
import ReportRescue from '@/components/staff/report-rescue/ReportRescue'
import PetAdopt from '@/components/staff/form-adopt/ListPetAdopt'
import ListFormAdopt from '@/components/staff/form-adopt/ListForm'
import Adoption from '@/components/staff/adoption/ListAdoption'
import Volunteer from '@/components/staff/volunteer/ListVolunteer'
import Profile from '@/components/staff/profile/Profile'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/login-staff',
            name: 'LoginStaff',
            component: LoginStaff
        },
        {
            path: '/register-center',
            name: 'RegisterCenter',
            component: RegisterCenter
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
                    path: "/main-staff/pet-adopt",
                    name: "PetAdopt",
                    component: PetAdopt
                },
                {
                    path: "/main-staff/list-form-adopt/:id",
                    name: "ListFormAdopt",
                    component: ListFormAdopt
                },
                {
                    path: "/main-staff/adoption",
                    name: "Adoption",
                    component: Adoption
                },
                {
                    path: "/main-staff/volunteer",
                    name: "Volunteer",
                    component: Volunteer
                },
                {
                    path: "/main-staff/profile",
                    name: "Profile",
                    component: Profile
                },
            ]
        },
    ]
})
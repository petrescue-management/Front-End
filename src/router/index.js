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
import ListAdoption from '@/components/staff/adopted/ListAdoption'
// import Volunteer from '@/components/staff/volunteer/ListVolunteer'
import Profile from '@/components/staff/profile/Profile'
// import VolunteerRegistration from '@/components/staff/volunteer/ListVolunteerRegistration'
import ListRescueReport from '@/components/staff/report-rescue/ListRescueReport'
import Adoption from '@/components/staff/adopted/AdoptionDetail'
import AdoptionManage from '@/components/staff/adopted/Adoption'
import WaittingDetail from '@/components/staff/waitting-get/WaittingDetail'
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
            redirect: '/main-staff/dashboard-staff',
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
                    path: "/main-staff/report-rescue-detail/:id",
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
                    name: "ListAdoption",
                    component: ListAdoption
                },
                {
                    path: "/main-staff/profile",
                    name: "Profile",
                    component: Profile
                },
                {
                    path: "/main-staff/report-rescue",
                    name: "ListRescueReport",
                    component: ListRescueReport
                },
                {
                    path: "/main-staff/adopted/:id",
                    name: "Adoption",
                    component: Adoption
                },
                {
                    path: "/main-staff/adoption-manage",
                    name: "AdoptionManage",
                    component: AdoptionManage
                },
                {
                    path: "/main-staff/waitting-detail/:id",
                    name: "WaittingDetail",
                    component: WaittingDetail
                }
            ]
        },
    ]
})
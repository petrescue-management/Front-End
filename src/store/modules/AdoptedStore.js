import Vue from "vue";
import Vuex from "vuex";
import { getListAdoptedPetApi, getAdoptedPetByIdApi, getReportTrackingByIdAPI } from "@/api/staff/adoptedApi";
Vue.use(Vuex);
export default {
    namespaced: true,
    state: {
        listAdoptedPet: [],
        totalPage: 0,
        adopted: {},
        reportTracking: {},
    },
    getters: {
        getListAdopted(state) {
            return state.listAdoptedPet;
        },
        getAdopted(state) {
            return state.adopted;
        },
        getTotalPage(state) {
            return state.totalPage
        },
        getReportTracking(state) {
            return state.reportTracking;
        },
    },
    mutations: {
        SET_LIST_ADOPTED_PET(state, data) {
            state.listAdoptedPet = data;
        },
        SET_ADOPTED_PET(state, data) {
            state.adopted = data;
        },
        SET_REPORT_TRACKING(state, data) {
            state.reportTracking = data
        },
        SET_TOTAL_PAGE(state, data) {
            state.totalPage = data
        }
    },
    actions: {
        async getListAdoptedPet({ commit }, data) {
            await getListAdoptedPetApi(data)
                .then(response => response.json())
                .then(data => {
                    commit("SET_LIST_ADOPTED_PET", data.result);
                    commit("SET_TOTAL_PAGE", data.totalPages);
                })
        },

        async getAdoptedPetById({ commit }, data) {
            await getAdoptedPetByIdApi(data)
                .then(response => response.json())
                .then(data => {
                    commit("SET_ADOPTED_PET", data);
                })
        },

        async getReportTrackingById({ commit }, data) {
            await getReportTrackingByIdAPI(data)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    commit("SET_REPORT_TRACKING", data);
                })
        },
    },


};
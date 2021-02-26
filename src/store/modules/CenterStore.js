import Vue from "vue";
import Vuex from "vuex";
import { getListCenterPagingAPI } from "@/api/admin/centerApi";
Vue.use(Vuex);
export default {
    namespaced: true,
    state: {
        listCenter: [],
        totalCenter: 0
    },
    getters: {
        getListCenter(state) {
            return state.listCenter;
        },

        getTotalCenter(state) {
            return state.totalCenter;
        },
    },
    mutations: {
        SET_LIST_CENTER(state, data) {
            state.listCenter = data;
        },
        SET_TOTAL_CENTER(state, data) {
            state.totalCenter = data;
        },
    },
    actions: {
        async getListCenterPaging({ commit }, data) {
            await getListCenterPagingAPI(data)
                .then(response => response.json())
                .then(data => {
                    commit("SET_LIST_CENTER", data.result);
                    commit("SET_TOTAL_CENTER", data.totalCount);
                })
        },
    }
};
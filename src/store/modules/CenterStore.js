import Vue from "vue";
import Vuex from "vuex";
import { getCenterOpeningAPI } from "@/api/staff/centerApi";
Vue.use(Vuex);
export default {
    namespaced: true,
    state: {
        listCenter: [],
    },
    getters: {
        getListCenter(state) {
            return state.listCenter;
        },
    },
    mutations: {
        SET_LIST_CENTER(state, data) {
            state.listCenter = data;
        },
    },
    actions: {
        async getCenterOpening({ commit }, status) {
            await getCenterOpeningAPI(status)
                .then(response => response.json())
                .then(data => {
                    commit("SET_LIST_CENTER", data.result);
                })
        },
    }
};
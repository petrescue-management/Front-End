import Vue from "vue";
import Vuex from "vuex";
import { getListVolunteerAPI, getVolunteerByIdAPI } from "@/api/staff/volunteerApi";
Vue.use(Vuex);
export default {
    namespaced: true,
    state: {
        listVoluteer: [],
        totalPage: 0,
        volunteer: {},
    },
    getters: {
        getListVolunteer(state) {
            return state.listVoluteer;
        },
        getVolunteer(state) {
            return state.volunteer
        }
    },
    mutations: {
        SET_LIST_VOLUNTEER(state, data) {
            state.listVoluteer = data;
        },
        SET_VOLUNTEER(state, data) {
            state.volunteer = data;
        },
    },
    actions: {
        async getListVolunteerOfCenter({ commit }, data) {
            await getListVolunteerAPI(data)
                .then(response => response.json())
                .then(data => {
                    commit("SET_LIST_VOLUNTEER", data);
                })
        },

        async getVolunteerOfCenter({ commit }, data) {
            await getVolunteerByIdAPI(data)
                .then(response => response.json())
                .then(data => {
                    commit("SET_VOLUNTEER", data);
                })
        },
    }
};
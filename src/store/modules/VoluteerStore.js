import Vue from "vue";
import Vuex from "vuex";
import { getListVolunteerAPI, getVolunteerByIdAPI, getListVolunteerRegistrationFormAPI } from "@/api/staff/volunteerApi";
Vue.use(Vuex);
export default {
    namespaced: true,
    state: {
        listVoluteer: [],
        listForm: [],
        countForm: 0,
        totalPage: 0,
        volunteer: {},
    },
    getters: {
        getListVolunteer(state) {
            return state.listVoluteer;
        },
        getVolunteer(state) {
            return state.volunteer
        },
        getListForm(state) {
            return state.listForm
        },
        getCountForm(state) {
            return state.countForm
        }
    },
    mutations: {
        SET_LIST_VOLUNTEER(state, data) {
            state.listVoluteer = data;
        },
        SET_VOLUNTEER(state, data) {
            state.volunteer = data;
        },
        SET_LIST_FORM(state, data) {
            state.listForm = data;
        },
        SET_COUNT_FORM(state, data) {
            state.countForm = data;
        }
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

        async getListVolunteerRegistrationForm({ commit }, data) {
            await getListVolunteerRegistrationFormAPI(data)
                .then(response => response.json())
                .then(data => {
                    commit("SET_LIST_FORM", data.list);
                    commit("SET_COUNT_FORM", data.count)
                })
        },
    }
};
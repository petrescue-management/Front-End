import Vue from "vue";
import Vuex from "vuex";
import {
    getListRegisterCenterFormPagingAPI,
    getRegisterCenterFormByIdAPI
} from "@/api/admin/registerCenterFormApi";
Vue.use(Vuex);
export default {
    namespaced: true,
    state: {
        listForm: [],
        totalForm: 0,
        form: {
            id: null,
            name: null,
            phone: null,
            address: null,
            email: null,
            description: null,
            status: null,
        },
    },
    getters: {
        getListForm(state) {
            return state.listForm;
        },

        getTotalForm(state) {
            return state.totalForm;
        },

        getFormDetail(state) {
            return state.form;
        }
    },
    mutations: {
        SET_LIST_FORM(state, data) {
            state.listForm = data;
        },
        SET_TOTAL_FORM(state, data) {
            state.totalForm = data;
        },
        SET_FORM_DETAIL(state, data) {
            state.form = data;
        }
    },
    actions: {
        async getListRegisterCenterFormPaging({ commit }, data) {
            await getListRegisterCenterFormPagingAPI(data)
                .then(response => response.json())
                .then(data => {
                    commit("SET_LIST_FORM", data.result);
                    commit("SET_TOTAL_FORM", data.totalCount);
                })
        },

        async getRegisterFormDetail({ commit }, data) {
            let form = {
                id: null,
                name: null,
                phone: null,
                address: null,
                email: null,
                description: null,
                status: null,
            };
            await getRegisterCenterFormByIdAPI(data)
                .then(response => response.json())
                .then(data => {
                    form = {
                        id: data.formId,
                        name: data.centerName,
                        phone: data.phone,
                        address: data.centerAddress,
                        email: data.email,
                        description: data.description,
                        status: data.centerRegisterStatus,
                    }

                    commit("SET_FORM_DETAIL", form);
                })
        }
    }
};
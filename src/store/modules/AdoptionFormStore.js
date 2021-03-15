import Vue from "vue";
import Vuex from "vuex";
import { getListAdoptionFormApi, getAdoptionFormByIdApi } from "@/api/staff/adoptionFormApi";
Vue.use(Vuex);
export default {
    namespaced: true,
    state: {
        listAdoptionForm: [],
        total: 0,
        adoptionForm: {
            id: null,
            username: null,
            phone: null,
            email: null,
            job: null,
            address: null,
            houseType: null,
            frequencyAtHome: null,
            haveChildren: null,
            childAge: null,
            beViolentTendencies: null,
            haveAgreement: null,
            havePet: null,
            adoptionRegisterStatus: null,
        }
    },
    getters: {
        getListAdoptionForm(state) {
            return state.listAdoptionForm;
        },

        getTotal(state) {
            return state.total;
        },

        getAdoptionForm(state) {
            return state.adoptionForm;
        }
    },
    mutations: {
        SET_LIST_ADOPTION_FORM(state, data) {
            state.listAdoptionForm = data;
        },
        SET_TOTAL(state, data) {
            state.total = data;
        },
        SET_ADOPTION_FORM(state, data) {
            state.adoptionForm = data;
        },
    },
    actions: {
        async getListAdoptionFormPaging({ commit }, data) {
            await getListAdoptionFormApi(data)
                .then(response => response.json())
                .then(data => {
                    commit("SET_LIST_ADOPTION_FORM", data.result);
                    commit("SET_TOTAL", data.totalCount);
                })
        },
        async getListAdoptionFormById({ commit }, data) {
            let adoptionForm = {
                id: null,
                username: null,
                phone: null,
                email: null,
                job: null,
                address: null,
                houseType: null,
                frequencyAtHome: null,
                haveChildren: null,
                childAge: null,
                beViolentTendencies: null,
                haveAgreement: null,
                havePet: null,
                adoptionRegisterStatus: null,
            }
            await getAdoptionFormByIdApi(data)
                .then(response => response.json())
                .then(data => {
                    adoptionForm = {
                        id: data.adoptionRegisterId,
                        username: data.userName,
                        phone: data.phone,
                        email: data.email,
                        job: data.job,
                        address: data.address,
                        houseType: data.houseType,
                        frequencyAtHome: data.frequencyAtHome,
                        haveChildren: data.haveChildren,
                        childAge: data.childAge,
                        beViolentTendencies: data.beViolentTendencies,
                        haveAgreement: data.haveAgreement,
                        havePet: data.havePet,
                        adoptionRegisterStatus: data.adoptionRegisterStatus,
                    }
                    commit("SET_ADOPTION_FORM", adoptionForm);
                })
        },
    }
};
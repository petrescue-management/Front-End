import Vue from "vue";
import Vuex from "vuex";
import { getListAdoptionFormByPetIdAPI, getAdoptionFormByIdAPI, getListPetToBeRegistedAPI } from "@/api/staff/adoptionFormApi";
Vue.use(Vuex);
export default {
    namespaced: true,
    state: {
        listAdoptionForm: [],
        listPetWaiting: [],
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
        },
        pet: {}
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
        },

        getListPetWaiting(state) {
            return state.listPetWaiting;
        },
        getPet(state) {
            return state.pet
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
        SET_LIST_PET_WAITING(state, data) {
            state.listPetWaiting = data;
        },
        SET_PET(state, data) {
            state.pet = data
        }
    },
    actions: {
        async getListAdoptionFormByPetId({ commit }, data) {
            await getListAdoptionFormByPetIdAPI(data.petId, data.token)
                .then(response => response.json())
                .then(data => {
                    let adoption = data.adoptionRegisterforms;
                    let pet = data.pet
                    commit("SET_LIST_ADOPTION_FORM", adoption);
                    commit("SET_PET", pet);
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
            await getAdoptionFormByIdAPI(data)
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

        async getListPetToBeRegisted({ commit }, data) {
            await getListPetToBeRegistedAPI(data)
                .then(response => response.json())
                .then(data => {
                    commit("SET_LIST_PET_WAITING", data);
                })
        },
    },


};
import Vue from "vue";
import Vuex from "vuex";
import { getListAdoptedPetApi, getAdoptedPetByIdApi } from "@/api/staff/adoptedApi";
Vue.use(Vuex);
export default {
    namespaced: true,
    state: {
        listAdoptedPet: [],
        total: 0,
        adopted: {}
    },
    getters: {
        getListAdopted(state) {
            return state.listAdoptedPet;
        },
        getAdopted(state) {
            return state.adopted;
        }
    },
    mutations: {
        SET_LIST_ADOPTED_PET(state, data) {
            state.listAdoptedPet = data;
        },
        SET_ADOPTED_PET(state, data) {
            state.adopted = data;
        }
    },
    actions: {
        async getListAdoptedPet({ commit }, data) {
            await getListAdoptedPetApi(data)
                .then(response => response.json())
                .then(data => {
                    commit("SET_LIST_ADOPTED_PET", data);
                })
        },

        async getAdoptedPetById({ commit }, data) {
            await getAdoptedPetByIdApi(data)
                .then(response => response.json())
                .then(data => {
                    commit("SET_ADOPTED_PET", data);
                })
        },
    },


};
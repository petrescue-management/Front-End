import Vue from "vue";
import Vuex from "vuex";
import { getListPetAPI, getPetByIdAPI } from "@/api/staff/petApi";
Vue.use(Vuex);
export default {
    namespaced: true,
    state: {
        listPet: [],
        totalPage: 0,
        pet: {
            petId: null,
            centerId: null,
            petStatus: null,
            petName: null,
            petTypeName: null,
            petGender: null,
            petAge: null,
            weight: null,
            isVaccinated: null,
            isSterilized: null,
            petBreedName: null,
            petFurColorName: null,
            imageUrl: null
        }
    },
    getters: {
        getListPetFromStore(state) {
            return state.listPet;
        },

        getTotalPage(state) {
            return state.totalPage;
        },
        getPetFromStore(state) {
            return state.pet;
        },
    },
    mutations: {
        SET_LIST_PET(state, data) {
            state.listPet = data;
        },
        SET_TOTAL_PAGE(state, data) {
            state.totalPage = data;
        },
        SET_PET(state, data) {
            state.pet = data;
        },
    },
    actions: {
        async getListPetPaging({ commit }, data) {
            await getListPetAPI(data)
                .then(response => response.json())
                .then(data => {
                    commit("SET_LIST_PET", data.result);
                    commit("SET_TOTAL_PAGE", data.totalPages);
                })
        },

        async getPetById({ commit }, data) {
            await getPetByIdAPI(data)
                .then(response => response.json())
                .then(data => {
                    let info = data.result
                    let petInfo = {
                        petId: info[0].petId,
                        centerId: info[0].centerId,
                        petStatus: info[0].petStatus,
                        petName: info[0].petName,
                        petTypeName: info[0].petTypeName,
                        petGender: info[0].petGender,
                        petAge: info[0].petAge,
                        weight: info[0].weight,
                        isVaccinated: info[0].isVaccinated,
                        isSterilized: info[0].isSterilized,
                        petBreedName: info[0].petBreedName,
                        petFurColorName: info[0].petFurColorName,
                        imageUrl: info[0].imageUrl
                    }
                    commit("SET_PET", petInfo);
                })
        },
    }
};
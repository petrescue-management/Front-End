import Vue from "vue";
import Vuex from "vuex";
import { getListPetAPI, getPetByIdAPI, getPetTrackingByIdAPI } from "@/api/staff/petApi";
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
            petBreedName: null,
            petFurColorName: null,
            petProfileDescription: null,
            imageUrl: null,
            petTracking: [],
            finderForm: null,
            pickerForm: null,
        },
        trackingDetail: {}
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
        getPetTracking(state) {
            return state.trackingDetail;
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
        SET_PET_TRACKING(state, data) {
            state.trackingDetail = data
        }
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
                    let petProfile = data.petProfile;
                    let petInfo = {
                        petProfileId: petProfile.petProfileId,
                        petDocumentId: petProfile.petDocumentId ? petProfile.petDocumentId : null,
                        centerId: petProfile.centerId,
                        petStatus: petProfile.petStatus,
                        petName: petProfile.petName,
                        petTypeName: petProfile.petTypeName,
                        petGender: petProfile.petGender,
                        petAge: petProfile.petAge,
                        petBreedName: petProfile.petBreedName,
                        petFurColorName: petProfile.petFurColorName,
                        petProfileDescription: petProfile.petProfileDescription,
                        imageUrl: petProfile.petImgUrl,
                        petTracking: data.listTracking,
                        finderForm: data.finderForm,
                        pickerForm: data.pickerForm,
                    }
                    commit("SET_PET", petInfo);
                })
        },

        async getPetTrackingById({ commit }, data) {
            await getPetTrackingByIdAPI(data)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    commit("SET_PET_TRACKING", data);
                })
        },
    }
};
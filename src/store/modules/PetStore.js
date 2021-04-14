import Vue from "vue";
import Vuex from "vuex";
import { getListPetAPI, getPetByIdAPI, getPetTrackingByIdAPI, getLocationAPI } from "@/api/staff/petApi";
Vue.use(Vuex);
export default {
    namespaced: true,
    state: {
        listPet: [],
        totalPage: 0,
        pet: {},
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
            let petInfo = {}
            await getPetByIdAPI(data)
                .then(response => response.json())
                .then(data => {
                    let petProfile = data.petProfile;
                    petInfo = {
                        petProfileId: petProfile.petProfileId,
                        petDocumentId: petProfile.petDocumentId ? petProfile.petDocumentId : null,
                        centerId: petProfile.centerId,
                        petStatus: petProfile.petStatus,
                        petName: petProfile.petName,
                        petTypeName: petProfile.petType.petTypeName,
                        petTypeId: petProfile.petType.petTypeId,
                        petGender: petProfile.petGender,
                        petAge: petProfile.petAge,
                        petBreedName: petProfile.petBreedName,
                        petBreedId: petProfile.petBreedId,
                        petFurColorName: petProfile.petFurColorName,
                        petFurColorId: petProfile.petFurColorId,
                        petProfileDescription: petProfile.petProfileDescription,
                        imageUrl: petProfile.petImgUrl,
                        petTracking: data.listTracking,
                        petAttribute: data.petAttribute,
                        finderForm: data.finderForm,
                        pickerForm: data.pickerForm,
                        lat: data.finderForm ? data.finderForm.lat : null,
                        lng: data.finderForm ? data.finderForm.lng : null,
                    }
                })
            if (petInfo.lat && petInfo.lng) {
                await getLocationAPI(petInfo.lat, petInfo.lng)
                    .then((response) => response.json())
                    .then((data) => {
                        petInfo.location = data.results[0].formatted_address
                    });
            } else {
                petInfo.location = null
            }
            commit("SET_PET", petInfo);
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
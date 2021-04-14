import Vue from "vue";
import Vuex from "vuex";
import { getListPetDocumentAPI, getPetDocumentByIdAPI, getListPetByPetDocumentIdAPI } from "@/api/staff/reportRescueApi";
import { getLocationAPI } from '@/api/staff/petApi'
Vue.use(Vuex);
export default {
    namespaced: true,
    state: {
        listDoc: [],
        total: 0,
        document: {},
        listPet: [],
    },
    getters: {
        getListDoc(state) {
            return state.listDoc;
        },
        getDoc(state) {
            return state.document
        },
        getPet(state) {
            return state.listPet
        }
    },
    mutations: {
        SET_LIST_DOC(state, data) {
            state.listDoc = data;
        },
        SET_DOC(state, data) {
            state.document = data;
        },
        SET_PET(state, data) {
            state.listPet = data;
        }
    },
    actions: {
        async getListPetDocument({ commit }, data) {
            await getListPetDocumentAPI(data)
                .then(response => response.json())
                .then(data => {
                    commit("SET_LIST_DOC", data);
                })
        },

        async getPetDocumentById({ commit }, data) {
            let doc = {}
            await getPetDocumentByIdAPI(data)
                .then(response => response.json())
                .then(data => {
                    doc = data
                })
            await getLocationAPI(doc.finderForm.lat, doc.finderForm.lng)
                .then((response) => response.json())
                .then((data) => {
                    doc.location = data.results[0].formatted_address
                });
            commit("SET_DOC", doc);
        },

        async getListPetByPetDocumentId({ commit }, data) {
            await getListPetByPetDocumentIdAPI(data)
                .then(response => response.json())
                .then(data => {
                    commit("SET_PET", data);
                })
        },
    },


};
import Vue from "vue";
import Vuex from "vuex";
import { getCenterInfoAPI } from '@/api/staff/centerApi'
Vue.use(Vuex);
export default {
    namespaced: true,
    state: {
        user: {
            jwtToken: null,
            address: null,
            centerId: null,
            dob: null,
            email: null,
            firstName: null,
            gender: true,
            id: null,
            lastName: null,
            phone: null,
            roles: [],
        }
    },
    getters: {
        user(state) {
            return state.user;
        }
    },
    mutations: {
        SET_USER(state, data) {
            state.user = data;
        },
    },
    actions: {
        async loginUser({ commit }, user) {
            if (user) {
                let current_user = {
                    address: user.address,
                    centerId: user.centerId,
                    dob: user.dob,
                    email: user.email,
                    firstName: user.firstName,
                    gender: user.gender,
                    id: user.id,
                    lastName: user.lastName,
                    phone: user.phone,
                    token: user.token,
                    roles: user.roles,
                    centerName: user.center.centerName
                }
                await getCenterInfoAPI(current_user.centerId)
                    .then(response => response.json())
                    .then(data => {
                        current_user.centerPhone = data.phone;
                        current_user.centerAddress = data.address;
                    });

                localStorage.setItem("user", JSON.stringify(current_user));
                commit("SET_USER", current_user);
            }
        },

        logout({ commit }) {
            let currentUser = {
                jwtToken: null,
                address: null,
                centerId: null,
                dob: null,
                email: null,
                firstName: null,
                gender: true,
                id: null,
                lastName: null,
                phone: null,
            };
            localStorage.removeItem("user");
            commit("SET_USER", currentUser);

        }
    }
};
import Vue from "vue";
import Vuex from "vuex";
import loginStore from "./modules/LoginStore";
import petStore from "./modules/PetStore"
import adoptionFormStore from './modules/AdoptionFormStore'
import volunteerStore from './modules/VoluteerStore'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user: loginStore,
        petInfo: petStore,
        adoptionForm: adoptionFormStore,
        volunteer: volunteerStore
    }
})
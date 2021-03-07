import Vue from "vue";
import Vuex from "vuex";
import loginStore from "./modules/LoginStore";
import centerStore from "./modules/CenterStore";
import registerCenterFormStore from "./modules/RegisterCenterFormStore";
import petStore from "./modules/PetStore"
import adoptionFormStore from './modules/AdoptionFormStore'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user: loginStore,
        centerInfo: centerStore,
        registerForm: registerCenterFormStore,
        petInfo: petStore,
        adoptionForm: adoptionFormStore
    }
})
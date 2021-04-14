import Vue from "vue";
import Vuex from "vuex";
import loginStore from "./modules/LoginStore";
import petStore from "./modules/PetStore"
import adoptionFormStore from './modules/AdoptionFormStore'
import volunteerStore from './modules/VoluteerStore'
import centerStore from './modules/CenterStore'
import AdoptedStore from "./modules/AdoptedStore";
import rescueReportStore from "./modules/RescueReportStore";
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user: loginStore,
        petInfo: petStore,
        adoptionForm: adoptionFormStore,
        volunteer: volunteerStore,
        center: centerStore,
        adoptedPet: AdoptedStore,
        rescueReport: rescueReportStore
    }
})
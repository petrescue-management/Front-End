import firebase from "../firebase";

const db = firebase.database().ref(`/manager`);

class CenterService {
    getListNoti(centerId) {
        return db.child(`${centerId}/Notification/`).orderByChild('date');
    }

    updateNoti(centerId, notiId, value) {
        return db.child(`${centerId}/Notification/${notiId}`).update(value);
    }

    getListPetProfile(centerId, petDocumentId) {
        return db.child(`${centerId}/PetDocument/${petDocumentId}`);
    }

    createdPetProfile(centerId, petDocumentId, pet) {
        return db.child(`${centerId}/PetDocument/${petDocumentId}`).push(pet);
    }

    deletePetProfile(centerId, petDocumentId, key) {
        return db.child(`${centerId}/PetDocument/${petDocumentId}/${key}`).remove();
    }
    deleteListPetProfile(centerId, petDocumentId) {
        return db.child(`${centerId}/PetDocument/${petDocumentId}`).remove();
    }
}

export default new CenterService();
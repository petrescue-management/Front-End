import firebase from "../firebase";

const db = firebase.database().ref(`/manager`);

class CenterService {
    getListNoti(centerId) {
        return db.child(`${centerId}/Notification/`).orderByChild('date');
    }

    updateNoti(centerId, notiId, value) {
        return db.child(`${centerId}/Notification/${notiId}`).update(value);
    }
    delete(key) {
        return db.child(key).remove();
    }

    deleteAll() {
        return db.remove();
    }
}

export default new CenterService();
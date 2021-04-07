import firebase from "../firebase";

const db = firebase.database().ref(`/authUser`);

class UserAuthService {
    getListNoti(centerId) {
        return db.child(`${centerId}/Notification/`).orderByChild('date');
    }

    createNoti(userId, notiId, notification) {
        return db.child(`${userId}/Notification/${notiId}`).set(notification);
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

export default new UserAuthService();
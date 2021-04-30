import firebase from "../firebase";

const db = firebase.database().ref(`/sys_admin`);

class SystemService {
    createNoti(notiId, notification) {
        return db.child(`Notification/${notiId}`).set(notification);
    }
}
export default new SystemService();
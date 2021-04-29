// import axios from 'axios'
// import authHeader from './auth-header'
// import firebase from 'firebase'
// import moment from 'moment'
// import momentTimezone from 'moment-timezone'
// import FileSaver from 'file-saver'
// import router from '../router/router'
// import store from '../store/store'
// const API_URL = 'https://saccxmx.azurewebsites.net'
//     // const API_URL = 'https://localhost:44301'
//     // const API_URL = 'http://localhost:50885'
// const user = JSON.parse(localStorage.getItem('UserInfo'))
// const transformRequestOptions = params => {
//     let options = ''
//     for (const key in params) {
//         if (typeof params[key] !== 'object' && params[key]) {
//             options += `${key}=${params[key]}&`
//         } else if (typeof params[key] === 'object' && params[key] && params[key].length) {
//             params[key].forEach(el => {
//                 options += `${key}=${el}&`
//             })
//         }
//     }
//     return options ? options.slice(0, -1) : options
// }
// class APIHelper {
//     get(url, obj) {
//         return axios
//             .get(API_URL + url, {
//                 params: obj,
//                 paramsSerializer: params => transformRequestOptions(params),
//                 headers: authHeader()
//             })
//             .then(response => {
//                 return response
//             }).catch(error => {
//                 if (user && error.response) {
//                     this.loggingError({ username: user.username, apiUrl: url, error: error.response, params: obj })
//                 }
//                 throw error
//             })
//     }

//     post(url, obj) {
//         return axios
//             .post(API_URL + url, obj, { headers: authHeader() })
//             .then(response => {
//                 return response
//             }).catch(error => {
//                 if (user && error.response) {
//                     this.loggingError({ username: user.username, apiUrl: url, error: error.response, params: obj })
//                 }
//                 throw error
//             })
//     }

//     put(url, obj) {
//         return axios
//             .put(API_URL + url, obj, { headers: authHeader() })
//             .then(response => {
//                 return response
//             }).catch(error => {
//                 if (user && error.response) {
//                     this.loggingError({ username: user.username, apiUrl: url, error: error.response, params: obj })
//                 }
//                 throw error
//             })
//     }

//     delete(url, obj) {
//         return axios
//             .delete(API_URL + url, {
//                 params: obj,
//                 paramsSerializer: params => transformRequestOptions(params),
//                 headers: authHeader()
//             })
//             .then(response => {
//                 return response
//             }).catch(error => {
//                 if (user && error.response) {
//                     this.loggingError({ username: user.username, apiUrl: url, error: error.response, params: obj })
//                 }
//                 throw error
//             })
//     }

//     download(url, obj) {
//         return axios
//             .post(API_URL + url, obj, { headers: authHeader(), responseType: 'blob' })
//             .then(response => {
//                 // response.data is a blob type
//                 FileSaver.saveAs(response.data, obj.fileName)
//                 return response
//             }).catch(error => {
//                 if (user && error.response) {
//                     this.loggingError({ username: user.username, apiUrl: url, error: error.response, params: obj })
//                 }
//                 throw error
//             })
//     }

//     getBlob(url, obj) {
//         return axios.get(url, { responseType: 'blob' })
//             .then(response => {
//                 const blob = new Blob([response.data], { type: 'application/*' })
//                 const link = document.createElement('a')
//                 link.href = URL.createObjectURL(blob)
//                 link.click()
//                 URL.revokeObjectURL(link.href)
//             }).catch(console.error)
//     }

//     loggingError({ username, apiUrl, error, params }) {
//         if (username) {
//             const ref = firebase.database().ref(`sac-client/logging/error/${momentTimezone().tz('Asia/Ho_Chi_Minh').format('YYYYMMDD')}/${apiUrl}`).push()
//             ref.set({
//                 username: username,
//                 errorMsg: error.data.data || '',
//                 params: params || {},
//                 datetime: moment().format()
//             })
//             console.log('error logged')
//         }
//         if (error.status === 401 || error.status === 403) {
//             store.dispatch('authentication/_logout', {
//                 isNew: true
//             })
//             router.push('/')
//         }
//     }

//     postFile(url, obj) {
//         const header = authHeader()
//         header['Content-Type'] = 'multipart/form-data'

//         console.log('header : ', header)

//         return axios
//             .post(API_URL + url, obj, { headers: header })
//             .then(response => {
//                 return response
//             }).catch(error => {
//                 console.log(error)
//                 throw error
//             })
//     }
// }

// export default new APIHelper()
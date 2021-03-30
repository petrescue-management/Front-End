import { baseURL } from "../../enum/consts";

export function loginAPI(params) {
    return fetch(baseURL + `/jwt?Token=${params.token}&DeviceToken=${params.deviceToken}&ApplicationName=${'Petrescue.app.managercenter'}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
        }
    });
}


export function getDetailUser(token) {
    return fetch(baseURL + `api/users`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + token
        }
    });
}

export function loginVolunteerAPI(params) {
    return fetch(baseURL + `/jwt?Token=${params.token}&DeviceToken=${params.deviceToken}&ApplicationName=${'Petrescue.app.volunteer'}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
        }
    });
}
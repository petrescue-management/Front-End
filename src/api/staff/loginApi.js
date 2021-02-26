import { baseURL } from "../../enum/consts";

export function loginApi(token) {
    return fetch(baseURL + `/jwt?token=${token}`, {
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
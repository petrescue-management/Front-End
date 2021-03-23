import { baseURL } from "../../enum/consts";

export function getListVolunteerAPI(token) {
    return fetch(baseURL + `api/users/get-list-volunteer-profile-of-center`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + token
        }
    });
}

export function getVolunteerByIdAPI(id) {
    return fetch(baseURL + `/api/users/get-profile-by-userid?userId=${id}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
        }
    });
}

export function addVolunteerToCenterAPI(email, token) {
    return fetch(baseURL + `/api/users/create-role-volunteer-for-user?email=${email}`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + token
        }
    });
}

export function removeVolunteerToCenterAPI(id, token) {
    return fetch(baseURL + `/api/users/remove-role-volunteer-for-user?userId=${id}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + token
        }
    });
}
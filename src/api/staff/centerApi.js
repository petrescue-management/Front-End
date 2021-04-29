import { baseURL } from "../../enum/consts";

export function createCenterForm(data) {
    return fetch(baseURL + `api/create-center-registration-form`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
        },
        body: JSON.stringify(data),
    });
}

export function getCenterOpeningAPI(status) {
    return fetch(baseURL + `api/search-center?Status=${status}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
        },
    });
}

export function getCenterInfoAPI(data) {
    return fetch(baseURL + `api/get-center-by-id/${data.id}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + data.token
        },
    });
}

export function getCountForCenter(token) {
    return fetch(baseURL + `/api/get-count-for-center-home-page`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + token
        },
    });
}
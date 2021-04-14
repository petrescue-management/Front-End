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

export function getCenterInfoAPI(id) {
    return fetch(baseURL + `api/get-center-by-id/${id}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
        },
    });
}
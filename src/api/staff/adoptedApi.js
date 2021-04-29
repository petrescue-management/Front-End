import { baseURL } from "../../enum/consts";

export function getListAdoptedPetApi(data) {
    return fetch(baseURL + `api/get-adoption-by-centerid?page=${data.page}&limit=8`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + data.token
        }
    });
}

export function getAdoptedPetByIdApi(id) {
    return fetch(baseURL + `api/get-adoption-by-adoptionid?id=${id}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
        }
    });
}

export function changeStatusAdoptionAPI(data, token) {
    return fetch(baseURL + `api/update-adoption-status`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + token
        },
        body: JSON.stringify(data)
    });
}

export function createAdoptionAPI(data, token) {
    return fetch(baseURL + `api/create-adoption`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + token
        },
        body: JSON.stringify(data)
    });
}

export function rejectAdoptionFormAPI(data, token) {
    return fetch(baseURL + `api/reject-adoption-form-after-accepted`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + token
        },
        body: JSON.stringify(data)
    });
}


export function getReportTrackingByIdAPI(data) {
    return fetch(baseURL + `/api/get-by-adoption-report-tracking-id?adoptionReportTrackingId=${data.adoptionReportTrackingId}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + data.token
        },
    });
}
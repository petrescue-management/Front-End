import { baseURL } from "../../enum/consts";

export function getListAdoptedPetApi(token) {
    return fetch(baseURL + `api/get-adoption-by-centerid`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + token
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
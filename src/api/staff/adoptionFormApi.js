import { baseURL } from "../../enum/consts";

export function getListAdoptionFormAPI(params) {
    return fetch(baseURL + `api/search-adoption-register-form?Keyword=${params.keyword}&PageIndex=${params.pageIndex}&PageSize=10`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + params.token
        }
    });
}

export function getAdoptionFormByIdAPI(data) {
    return fetch(baseURL + `api/get-adoption-registration-form-by-id/${data.id}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
        }
    });
}

export function changeStatusAdoptionFormAPI(data, token) {
    return fetch(baseURL + `api/update-adoption-registration-form-status`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + token
        },
        body: JSON.stringify(data)
    });
}

export function getListPetToBeRegistedAPI(token) {
    return fetch(baseURL + `api/get-list-pet-to-be-registered-for-adoption`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + token
        }
    });
}

export function getListAdoptionFormByPetIdAPI(petId, token) {
    return fetch(baseURL + `api/get-list-adoption-register-form-by-petid?petId=${petId}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + token
        }
    });
}
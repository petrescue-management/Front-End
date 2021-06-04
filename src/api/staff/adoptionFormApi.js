import { baseURL } from "../../enum/consts";

export function getListAdoptionFormAPI(params) {
    return fetch(baseURL + `api/adoption-registration-forms/search-adoption-registration-form?Keyword=${params.keyword}&PageIndex=${params.pageIndex}&PageSize=10`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + params.token
        }
    });
}

export function getAdoptionFormByIdAPI(data) {
    return fetch(baseURL + `api/adoption-registration-forms/get-adoption-registration-form-by-id/${data.id}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
        }
    });
}

export function changeStatusAdoptionFormAPI(data, token) {
    return fetch(baseURL + `api/adoption-registration-forms/update-adoption-registration-form-status`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + token
        },
        body: JSON.stringify(data)
    });
}

export function getListPetToBeRegistedAPI(data) {
    return fetch(baseURL + `api/pet-profiles/get-list-pet-to-be-registered-for-adoption?PetStatus=${data.status}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + data.token
        }
    });
}

export function getListAdoptionFormByPetIdAPI(petId, token) {
    return fetch(baseURL + `api/pet-profiles/get-list-adoption-register-form-by-petid?petId=${petId}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + token
        }
    });
}
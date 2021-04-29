import { baseURL } from "../../enum/consts";

export function getListPetDocumentAPI(data) {
    return fetch(baseURL + `api/get-list-pet-document?page=${data.page}&limit=10`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + data.token
        }
    });
}

export function getPetDocumentByIdAPI(data) {
    return fetch(baseURL + `api/get-pet-document-by-id?petDocumentId=${data.petDocumentId}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + data.token
        }
    });
}

export function updatePetDocumentAPI(data, token) {
    let requestBody = {
        petDocumentId: data.petDocumentId,
        petDocumentStatus: data.petDocumentStatus,
        pets: data.pets
    };
    return fetch(baseURL + `api/update-pet-document`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + token
        },
        body: JSON.stringify(requestBody)
    });
}

export function getListPetByPetDocumentIdAPI(petDocumentId) {
    return fetch(baseURL + `api/get-list-petprofile-by-petdocumentid?petDocumentId=${petDocumentId}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
        }
    });
}
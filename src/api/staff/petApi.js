import { baseURL } from "../../enum/consts";

export function getListPetAPI(params) {
    return fetch(baseURL + `api/get-pet?CenterId=${params.centerId}&PetStatus=${params.status}&PetTypeName=${params.type}&PetBreedName=${params.breed}&PetFurColorName=${params.color}&fields=detail&limit=10`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
        }
    });
}

export function getPetByIdAPI(params) {
    return fetch(baseURL + `api/get-pet?PetId=${params.petId}&fields=detail&limit=-1`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
        }
    });
}

export function createNewPetAPI(data, token) {
    let requestBody = {
        petStatus: data.petStatus,
        centerId: data.centerId,
        petName: data.petName,
        petGender: data.petGender,
        petAge: data.petAge,
        weight: data.weight,
        description: data.description,
        petBreedId: data.petBreedId,
        petFurColorId: data.petFurColorId,
        isVaccinated: data.isVaccinated,
        isSterilized: data.isSterilized,
        imageUrl: data.imageUrl
    }
    return fetch(baseURL + `api/create-new-pet`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + token
        },
        body: JSON.stringify(requestBody),
    });
}

export function getAllPetColorsAPI() {
    return fetch(baseURL + `api/get-all-pet-fur_colors`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
        }
    });
}

export function getPetBreedByTypeIdsAPI(typeId) {
    return fetch(baseURL + `api/get-pet-breeds-by-type-id?id=${typeId}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
        }
    });
}

export function getAllPetTypeAPI() {
    return fetch(baseURL + `api/get-all-pet-types`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
        }
    });
}
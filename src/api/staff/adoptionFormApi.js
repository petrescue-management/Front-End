import { baseURL } from "../../enum/consts";

export function getListAdoptionFormApi(params) {
    return fetch(baseURL + `api/search-adoption-register-form?Keyword=${params.keyword}&PageIndex=${params.pageIndex}&PageSize=10`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
        }
    });
}

export function getListAdoptionFormByIdApi(data) {
    return fetch(baseURL + `api/get-adoption-register-form-by-id/${data.id}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
        }
    });
}
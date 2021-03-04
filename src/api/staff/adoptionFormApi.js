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
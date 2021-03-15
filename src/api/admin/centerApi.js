import { baseURL } from "../../enum/consts";

export function getListCenterPagingAPI() {
    let data = {
        keyword: "",
        pageIndex: 1
    }
    return fetch(baseURL + `api/search-center?Keyword=${data.keyword}&PageIndex=${data.pageIndex}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            // Authorization: "Bearer " + IdToken
        }
    });
}

export function getCenterById(idCenter) {
    return fetch(baseURL + `api/get-center-by-id/${idCenter}`, {
        method: "POST",
        headers: {
            "content-type": "application/json; charset=utf-8 ",
            Accept: "*/*",
            // Authorization: "Bearer " + IdToken
        },
    });
}

export function deleteCenter(idCenter) {
    return fetch(baseURL + `api/DeleteCenter?id=${idCenter}`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            // Authorization: "Bearer " + IdToken
        },
        // body: JSON.stringify(data),
    });
}
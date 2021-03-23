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
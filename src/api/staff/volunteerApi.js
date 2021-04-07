import { baseURL } from "../../enum/consts";

export function getListVolunteerAPI(token) {
    return fetch(baseURL + `api/users/get-list-volunteer-profile-of-center`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + token
        }
    });
}

export function getVolunteerByIdAPI(id) {
    return fetch(baseURL + `/api/users/get-profile-by-userid?userId=${id}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
        }
    });
}

export function createVolunteerRegisterFormAPI(data) {
    let requestBody = {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        dob: data.dob,
        gender: data.gender,
        email: data.email,
        centerId: data.centerId
    }
    console.log(requestBody);
    return fetch(baseURL + `/api/create-volunteer-registration-form`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
        },
        body: JSON.stringify(requestBody),
    });
}

export function removeVolunteerToCenterAPI(id, token) {
    return fetch(baseURL + `/api/users/remove-role-volunteer-for-user?userId=${id}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + token
        }
    });
}

export function getListVolunteerRegistrationFormAPI(token) {
    return fetch(baseURL + `api/get-list-volunteer_registration_form`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + token
        }
    });
}

export function changeStatusVolunteerRegistrationFormAPI(data, token) {
    return fetch(baseURL + `api/progressing-volunteer-registration-form`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + token
        },
        body: JSON.stringify(data)
    });
}
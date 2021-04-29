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

export function createRoleVolunteerForuser(data, token) {
    let requestBody = {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        dob: data.dob,
        gender: data.gender,
        email: data.email
    }
    console.log(requestBody);
    return fetch(baseURL + `/api/users/create-role-volunteer-for-user`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            Accept: "*/*",
            Authorization: "Bearer " + token
        },
        body: JSON.stringify(requestBody),
    });
}

export function removeVolunteerToCenterAPI(id, reason, token) {
    return fetch(baseURL + `/api/users/remove-role-volunteer-for-user?userId=${id}&Description=${reason}`, {
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
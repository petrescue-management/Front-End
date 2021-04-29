//export const baseURL = "https://localhost:44305/"
export const baseURL = "https://petrescueapi.azurewebsites.net/";
export const emptyGuId = "00000000-0000-0000-0000-000000000000"

export const adoptionFormStatus = new Map([
    [1, { name: "Chờ xử lý", color: "warning" }],
    [2, { name: "Chấp thuận", color: "success" }],
    [3, { name: "Từ chối", color: "danger" }],
]);

export const centerStatus = new Map([
    [1, { name: "Mở cửa", color: "success" }],
    [2, { name: "Quá tải", color: "warning" }],
    [3, { name: "Đóng cửa", color: "danger" }],
]);

export const petGender = new Map([
    [1, "Đực"],
    [2, "Cái"],
    [3, "Chưa rõ"],
]);

export const Notification = new Map([
    [1, {
        message: "Bạn có đơn đăng ký nhận nuôi chó/mèo",
        logo: "https://firebasestorage.googleapis.com/v0/b/pet-rescue-fb.appspot.com/o/pet-img%2FLogo_notitle_circle.png?alt=media&token=359eb314-a538-46f5-baf3-ae9183260b2c"
    }],
    [2, {
        message: "Tình nguyện viên đã cứu hộ thành công chó/mèo",
        logo: "https://firebasestorage.googleapis.com/v0/b/pet-rescue-fb.appspot.com/o/pet-img%2FLogo_notitle_circle.png?alt=media&token=359eb314-a538-46f5-baf3-ae9183260b2c"
    }],
    [3, {
        message: "Bạn có đơn đăng ký làm tình nguyện viên",
        logo: "https://firebasestorage.googleapis.com/v0/b/pet-rescue-fb.appspot.com/o/pet-img%2FLogo_notitle_circle.png?alt=media&token=359eb314-a538-46f5-baf3-ae9183260b2c"
    }],
    [4, {
        message: "Cám ơn bạn đã tham gia vào hệ thống chúng tôi",
        logo: "https://firebasestorage.googleapis.com/v0/b/pet-rescue-fb.appspot.com/o/pet-img%2FLogo_notitle_circle.png?alt=media&token=359eb314-a538-46f5-baf3-ae9183260b2c"
    }],
]);

export const petStatus = new Map([
    [0, { name: "Tất cả" }],
    [1, { name: "Đang điều trị", color: "warning" }],
    [2, { name: "Chưa nhận nuôi", color: "info" }],
    [3, { name: "Chờ đến lấy", color: "primary" }],
    [4, { name: "Đã nhận nuôi", color: "success" }],
    [5, { name: "Đã chết", color: "danger" }]
]);

export const manGender = new Map([
    [1, "Nữ"],
    [2, "Nam"],
    [3, "Khác"],
]);

export const volunteerRegistrationFormStatus = new Map([
    [1, { name: "Chờ xử lý", color: "warning" }],
    [2, { name: "Chấp thuận", color: "success" }],
    [3, { name: "Từ chối", color: "danger" }],
]);

export const typePet = {
    dog: "Chó",
    cat: "Mèo"
}

export const petAge = new Map([
    [0, "Trẻ"],
    [1, "Trẻ"],
    [2, "Trưởng thành"],
    [3, "Già"],
    [4, "Chưa rõ"]
]);

export const adoptionStatus = new Map([
    [0, { name: "Tất cả" }],
    [1, { name: "Đã nhận nuôi", color: "success" }],
    [2, { name: "Trả về", color: "danger" }],
]);

export const petDocStatus = new Map([
    [1, { name: "Chờ cập nhật", color: "info" }],
    [2, { name: "Hoàn thành", color: "success" }]
]);

export const petAttributeStatus = new Map([
    [1, 'Bé đi lạc'],
    [2, 'Bé bị bỏ rơi'],
    [3, 'Bé bị thương/ bị bạo hành'],
    [4, 'Bé cần cho đi'],
    [5, 'Bé đi lạc'],
])
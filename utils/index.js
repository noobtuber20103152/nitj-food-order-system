export function getUserNameFromEmail(email) {
    return email.split("@")[0];
}
export function isEmail(email) {
    return email.match("@gmail.com")
}
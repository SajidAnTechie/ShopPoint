export function getAccessToken() {
  return localStorage.getItem("userInfo")?.token || "";
}

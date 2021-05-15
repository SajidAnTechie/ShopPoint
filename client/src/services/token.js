/**
 *
 * @returns {Stirng}
 */
export function getAccessToken() {
  return JSON.parse(localStorage.getItem('userInfo'))?.token || '';
}

/**
 * Remove token from local storage
 */
export function removeToken() {
  localStorage.removeItem('userInfo');
}

/**
 * Set token in local storage
 */
export function setToken(userInfo) {
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
}

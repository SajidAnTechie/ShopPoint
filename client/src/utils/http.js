import axios from 'axios';
import config from '../config';
import * as tokenService from '../services/token';

const instance = axios.create({
  baseURL: config.baseURI,
  headers: {
    'Content-type': 'application/json',
  },
});

/**
 *
 * @param {String} url The url fro the api request (without the base)
 * @param {Object} [config]
 * @param {Object} [config.params] An object of queries that will be added to
 * @param {Boolean} [config.accessToken] Whether or not to include
 * access-token header
 * @returns {Promise}
 */
function get(url, { params = {}, accessToken = false, responseType = 'json', headers = {} } = {}) {
  const authHeaders = {};

  if (accessToken) {
    authHeaders['Authorization'] = `Bearer ${tokenService.getAccessToken()}`;
  }

  return instance({
    url,
    params,
    responseType,
    method: 'get',
    headers: { ...authHeaders, ...headers },
  }).then((response) => response);
}

/**
 *
 * @param {String} url The url fro the api request (without the base)
 * @param {Object} [config]
 * @param {Object} [config.params] An object of queries that will be added to
 * @param {Object} [config.body] An object that will be sent in the request
 * @param {Boolean} [config.accessToken] Whether or not to include
 * access-token header
 * @returns {Promise}
 */
function post(url, { params = {}, body = {}, accessToken = false, headers = {} } = {}) {
  const authHeaders = {};

  if (accessToken) {
    authHeaders['Authorization'] = `Bearer ${tokenService.getAccessToken()}`;
  }

  return instance({
    url,
    params,
    data: body,
    method: 'post',
    headers: { ...authHeaders, ...headers },
  }).then((response) => response);
}

/**
 *
 * @param {String} url The url fro the api request (without the base)
 * @param {Object} [config]
 * @param {Object} [config.params] An object of queries that will be added to
 * @param {Object} [config.body] An object that will be sent in the request
 * @param {Boolean} [config.accessToken] Whether or not to include
 * access-token header
 * @returns {Promise}
 */
function put(url, { params = {}, body = {}, accessToken = false, headers = {} } = {}) {
  const authHeaders = {};

  if (accessToken) {
    authHeaders['Authorization'] = `Bearer ${tokenService.getAccessToken()}`;
  }

  return instance({
    url,
    params,
    data: body,
    method: 'put',
    headers: { ...authHeaders, ...headers },
  }).then((response) => response);
}

/**
 *
 * @param {String} url The url fro the api request (without the base)
 * @param {Object} [config]
 * @param {Object} [config.params] An object of queries that will be added to
 * @param {Boolean} [config.accessToken] Whether or not to include
 * access-token header
 * @returns {Promise}
 */
function remove(url, { params = {}, accessToken = false, headers = {} } = {}) {
  const authHeaders = {};

  if (accessToken) {
    authHeaders['Authorization'] = `Bearer ${tokenService.getAccessToken()}`;
  }

  return instance({
    url,
    params,
    method: 'delete',
    headers: { ...authHeaders, ...headers },
  }).then((response) => response);
}

const http = {
  ...instance,
  get,
  post,
  put,
  remove,
};

export default http;

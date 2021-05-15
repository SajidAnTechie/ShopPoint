import config from '../config';
import http from '../utils/http';
import { interpolate } from '../utils/string';

/**
 *
 * @param {Object} filters
 * @returns {Array} data
 */
export const fetchProducts = async (filters) => {
  const { data } = await http.get(config.apiEndPoint.product.fetchProducts, {
    params: {
      ...filters,
    },
  });
  return data.data;
};

/**
 *
 * @param {Integer} id
 * @returns {Object} data
 */
export const fetchProduct = async (id) => {
  const url = interpolate(config.apiEndPoint.product.fetchProduct, { id: id });

  const { data } = await http.get(url);

  return data.data;
};

/**
 *
 * @param {Integer} id
 * @returns {Object} data
 */

export const fetchProductReviews = async (id) => {
  const url = interpolate(config.apiEndPoint.product.fetchProductReviews, {
    id: id,
  });
  const { data } = await http.get(url);

  return data;
};

/**
 *
 * @param {Integer} id
 * @returns {Object} data
 */
export const createReview = async (id, body) => {
  const url = interpolate(config.apiEndPoint.product.createReview, {
    id: id,
  });
  const { data } = await http.post(url, {
    body,
    accessToken: true,
  });

  return data;
};

/**
 *
 * @param {Integer} id
 * @returns {Object} data
 */
export const deleteProduct = async (id) => {
  const url = interpolate(config.apiEndPoint.product.deleteProduct, {
    id: id,
  });
  const { data } = await http.remove(url, {
    accessToken: true,
  });

  return data;
};

/**
 *
 * @param {Object} body
 * @returns {Object} data
 */
export const createProduct = async (body) => {
  const { data } = await http.post(config.apiEndPoint.product.createProduct, {
    body,
    accessToken: true,
  });

  return data;
};

/**
 *
 * @param {Integer} id
 * @returns {Object} data
 */
export const updateProduct = async (id, body) => {
  const url = interpolate(config.apiEndPoint.product.updateProduct, {
    id: id,
  });
  const { data } = await http.put(url, {
    body,
    accessToken: true,
  });

  return data;
};

/**
 *
 * @param {Object} filters
 */
export const filterParams = (filters) => {
  Object.keys(filters).forEach((key) => {
    if (filters.hasOwnProperty(key)) {
      if (filters[key] === '') {
        delete filters[key];
      }
    }
  });
};

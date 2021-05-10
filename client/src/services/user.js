import {
  mainHeader,
  bodyForUsers,
  tableStyles,
} from "../components/table/tableLayout";
import config from "../config";
import http from "../utils/http";
import { interpolate } from "../utils/string";

/**
 *
 * @returns {Object} data
 */
export const fetchUsers = async () => {
  const { data } = await http.get(config.apiEndPoint.user.fetchUsers, {
    accessToken: true,
  });
  return data.data;
};

/**
 *
 * @param {Integer} id
 * @returns {Object} data
 */
export const fetchUser = async (id) => {
  const url = interpolate(config.apiEndPoint.user.fetchUser, { id: id });

  const { data } = await http.get(url, {
    accessToken: true,
  });

  return data.data;
};

/**
 *
 * @param {String} body
 * @returns {Object} data
 */

export const forgotPassword = async (body) => {
  const { data } = await http.post(config.apiEndPoint.user.forgotPassword, {
    body,
  });

  return data;
};

/**
 *
 * @param {String} body
 * @returns {Object} data
 */

export const resetPassword = async (body) => {
  const { data } = await http.post(config.apiEndPoint.user.resetPassword, {
    body,
  });

  return data;
};

/**
 *
 * @param {Object} body
 * @returns {Object} data
 */
export const login = async (body) => {
  const { data } = await http.post(config.apiEndPoint.user.login, {
    body,
  });

  return data;
};

/**
 *
 * @param {Object} body
 * @returns {Object} data
 */
export const registerUser = async (body) => {
  const { data } = await http.post(config.apiEndPoint.user.create, {
    body,
  });

  return data;
};

/**
 *
 * @param {String} body
 * @returns {Object} data
 */
export const verifyEmail = async (body) => {
  const { data } = await http.post(config.apiEndPoint.user.verifyEmail, {
    body,
  });

  return data;
};

/**
 *
 * @param {Integer} id
 * @returns {Object} data
 */
export const deleteUser = async (id) => {
  const url = interpolate(config.apiEndPoint.user.deleteUser, {
    id: id,
  });
  const { data } = await http.remove(url, {
    accessToken: true,
  });

  return data;
};

/**
 *
 * @param {Integer} id
 * @param {Object} body
 * @returns {Object} data
 */
export const updateUser = async (id, body) => {
  const url = interpolate(config.apiEndPoint.user.updateUser, {
    id: id,
  });
  const { data } = await http.put(url, {
    body,
    accessToken: true,
  });

  return data;
};

/**
 * Create PDF UI
 * @param {Object} userInfo
 * @param {Array} users
 * @returns {Object}
 */
export const createPdfData = (userInfo, users) => {
  return {
    content: [
      //Header
      {
        ...mainHeader(userInfo),
      },

      {
        style: "header",
        table: {
          widths: "*",
          body: [
            [
              {
                border: ["#5bc0de", false, false, false],
                text: "Users List",
              },
            ],
          ],
        },
      },

      users.length > 0
        ? {
            layout: {
              hLineWidth: function () {
                return 0;
              },
              vLineWidth: function () {
                return 0;
              },
              paddingBottom: function () {
                return 5;
              },
            },
            table: {
              ...bodyForUsers(users),
            },

            fontSize: 8,
            alignment: "center",
          }
        : null,
    ],
    styles: {
      ...tableStyles(),
    },
  };
};

import {
  mainHeader,
  bodyForOrders,
  tableStyles,
} from "../components/table/tableLayout";
import config from "../config";
import http from "../utils/http";
import { interpolate } from "../utils/string";

/**
 *
 * @param {Object} body
 * @returns {Object} data
 */
export const createOrder = async (body) => {
  const { data } = await http.post(config.apiEndPoint.order.createOrder, {
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
export const order = async (id) => {
  const url = interpolate(config.apiEndPoint.order.order, {
    id: id,
  });
  const { data } = await http.get(url, {
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
export const pay = async (id, body) => {
  const url = interpolate(config.apiEndPoint.order.pay, {
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
export const deliverOrder = async (id) => {
  const url = interpolate(config.apiEndPoint.order.deliverOrder, {
    id: id,
  });
  const { data } = await http.post(url, {
    accessToken: true,
  });

  return data;
};

/**
 *
 * @returns {Array} data
 */
export const userOrder = async () => {
  const { data } = await http.get(config.apiEndPoint.order.userOrder, {
    accessToken: true,
  });

  return data;
};

/**
 *
 * @returns {Array}
 */
export const orders = async () => {
  const { data } = await http.get(config.apiEndPoint.order.orders, {
    accessToken: true,
  });

  return data;
};

/**
 * Create PDF UI
 * @param {Object} userInfo
 * @param {Array} orders
 * @returns {Object}
 */
export const createPdfData = (userInfo, orders) => {
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
                text: "Orders List",
              },
            ],
          ],
        },
      },

      orders.length > 0
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
              ...bodyForOrders(orders),
            },

            fontSize: 9,
            alignment: "center",
          }
        : null,
    ],
    styles: {
      ...tableStyles(),
    },
  };
};

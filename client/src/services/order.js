import {
  mainHeader,
  bodyForOrders,
  tableStyles,
} from "../components/table/tableLayout";
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

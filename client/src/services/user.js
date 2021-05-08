import {
  mainHeader,
  bodyForUsers,
  tableStyles,
} from "../components/table/tableLayout";

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

export const mainHeader = (userInfo) => {
  return {
    table: {
      widths: ['auto', '*'],

      body: [
        [
          {
            text: 'SHOPPOINT',
            style: 'mainheader',
            bold: true,
            marginTop: 10,
          },

          {
            width: '*',
            style: 'info',
            marginBottom: 30,
            stack: [
              {
                style: 'h2',
                text: `Name: ${userInfo.name}`,
              },
              {
                style: 'h2',
                text: `Email: ${userInfo.email}`,
              },
            ],
          },
        ],
      ],
    },
    layout: {
      hLineWidth: function (line) {
        return line === 1;
      },
      vLineWidth: function () {
        return 0;
      },
      paddingBottom: function () {
        return 5;
      },
    },
  };
};

export const bodyForOrders = (orders) => {
  return {
    headerRows: 1,
    body: [
      [
        {
          text: 'S.No',
          bold: true,
          fillColor: '#2B2B52',
          color: 'white',
        },
        {
          text: 'ID',
          bold: true,
          fillColor: '#2B2B52',
          color: 'white',
        },
        {
          text: 'USER',
          bold: true,
          fillColor: '#2B2B52',
          color: 'white',
        },
        {
          text: 'DATE',
          bold: true,
          fillColor: '#2B2B52',
          color: 'white',
        },
        {
          text: 'TOTAL PRICE',
          bold: true,
          fillColor: '#2B2B52',
          color: 'white',
        },
        {
          text: 'PAID',
          bold: true,
          fillColor: '#2B2B52',
          color: 'white',
        },
        {
          text: 'DELIVERED',
          bold: true,
          fillColor: '#2B2B52',
          color: 'white',
        },
      ],

      ...orders.map((o, i) => [
        i + 1,
        o._id,
        o.userId && o.userId.name,
        o.createdAt.substring(0, 10),
        o.totalPrice,
        o.isPaid ? o.paidAt.substring(0, 10) : 'Not paid',
        o.isDelivered ? o.deliveredAt.substring(0, 10) : 'Not paid',
      ]),
    ],
  };
};

export const bodyForUsers = (users) => {
  return {
    headerRows: 1,
    body: [
      [
        {
          text: 'S.No',
          bold: true,
          fillColor: '#2B2B52',
          color: 'white',
        },
        {
          text: 'ID',
          bold: true,
          fillColor: '#2B2B52',
          color: 'white',
        },
        {
          text: 'NAME',
          bold: true,
          fillColor: '#2B2B52',
          color: 'white',
        },
        {
          text: 'EMAIL',
          bold: true,
          fillColor: '#2B2B52',
          color: 'white',
        },
        {
          text: 'VERIFIED',
          bold: true,
          fillColor: '#2B2B52',
          color: 'white',
        },
        {
          text: 'ROLE',
          bold: true,
          fillColor: '#2B2B52',
          color: 'white',
        },
        {
          text: 'DATE',
          bold: true,
          fillColor: '#2B2B52',
          color: 'white',
        },
      ],

      ...users.map((u, i) => [
        i + 1,
        u._id,
        u.name,
        u.email,
        u.verify ? 'Verified' : 'Not paid',
        u.role,
        u.createdAt.substring(0, 10),
      ]),
    ],
  };
};

export const tableStyles = () => {
  return {
    header: {
      fontSize: 12,
      marginBottom: 20,
      marginTop: 20,
      bold: true,
    },
    mainheader: {
      fontSize: 15,
    },

    info: {
      marginLeft: 315,
    },

    h2: {
      marginTop: 5,
      fontSize: 7,
    },
  };
};

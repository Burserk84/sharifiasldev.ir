"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/orders/me",
      handler: "order.findMe",
      config: {
        auth: {}, // Requires authentication
      },
    },
  ],
};

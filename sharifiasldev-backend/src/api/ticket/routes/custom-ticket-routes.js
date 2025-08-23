"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/tickets/me",
      handler: "ticket.findMe",
      config: {
        auth: {},
      },
    },
    {
      method: "POST",
      path: "/tickets/me",
      handler: "ticket.createMe",
      config: {
        auth: {},
      },
    },
    {
      method: "GET",
      path: "/tickets/me/:ticketId",
      handler: "ticket.findOneMe",
      config: {
        auth: {},
      },
    },
    {
      method: "POST",
      path: "/tickets/me/:ticketId/reply",
      handler: "ticket.reply",
      config: { auth: {} },
    },
  ],
};

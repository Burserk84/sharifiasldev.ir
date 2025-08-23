// src/api/order/controllers/order.js
"use strict";
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  /**
   * Fetches orders for the currently authenticated user.
   */
  async findMe(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized("You must be logged in.");
    }

    const orders = await strapi.entityService.findMany("api::order.order", {
      filters: { user: { id: user.id } },
      populate: {
        products: {
          populate: {
            productImage: true,
            downloadableFile: true, 
          },
        },
      },
      sort: { createdAt: "desc" },
    });

    const sanitized = await this.sanitizeOutput(orders, ctx);
    return this.transformResponse(sanitized);
  },
}));

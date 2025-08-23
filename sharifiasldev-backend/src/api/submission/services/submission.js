'use strict';

/**
 * submission service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::submission.submission');

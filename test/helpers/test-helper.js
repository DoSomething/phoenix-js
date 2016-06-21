'use strict';

/**
 * Imports.
 */
const PhoenixClient = require('../../lib/phoenix-client');

/**
 * Helpers.
 */
module.exports = {
  /**
   * Helper: get default client.
   */
  getUnauthorizedClient() {
    return new PhoenixClient({
      baseURI: process.env.PHOENIX_REST_API_BASEURI,
    });
  },

};

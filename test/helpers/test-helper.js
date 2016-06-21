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
   * Helper: get anonymous client.
   */
  getUnauthorizedClient() {
    return new PhoenixClient({
      baseURI: process.env.PHOENIX_REST_API_BASEURI,
    });
  },

  /**
   * Helper: get authorized client.
   */
  getAuthrorizedClient() {
    return new PhoenixClient({
      baseURI: process.env.PHOENIX_REST_API_BASEURI,
      login: process.env.process.env.PHOENIX_REST_API_LOGIN,
      password: process.env.process.env.PHOENIX_REST_API_PASSWORD,
    });
  },

};

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
      username: process.env.PHOENIX_REST_API_USERNAME,
      password: process.env.PHOENIX_REST_API_PASSWORD,
    });
  },

  validSessionToken(token) {
    token.should.be.ok().and.match(/^[a-zA-Z0-9\-\_]{43}$/);
  },

};
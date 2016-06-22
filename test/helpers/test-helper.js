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
  getAuthorizedClient() {
    return new PhoenixClient({
      baseURI: process.env.PHOENIX_REST_API_BASEURI,
      username: process.env.PHOENIX_REST_API_USERNAME,
      password: process.env.PHOENIX_REST_API_PASSWORD,
    });
  },

  validSessionData(data) {
    data.should.have.keys('sessionName', 'sessionId', 'csrfToken', 'userId');
    const keyRegexp = /^[a-zA-Z0-9\-\_]{43}$/;
    data.sessionId.should.be.ok().and.match(keyRegexp);
    data.csrfToken.should.be.ok().and.match(keyRegexp);
    data.sessionName.should.be.ok().and.match(/^SSESS[a-f0-9]{32}$/);
    data.userId.should.be.ok().and.a.Number();
  },

};

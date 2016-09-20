'use strict';

/**
 * Imports.
 */
const PhoenixEndpoint = require('./phoenix-endpoint');


/**
 * PhoenixEndpointCampaigns.
 */

class PhoenixEndpointCampaigns extends PhoenixEndpoint {

  constructor(client) {
    super(client);
    this.endpoint = 'campaigns';
  }

  /**
   * Post Signup for given Campaign id and data.
   */
  signup(id, data) {
    return this
      .callAction('signup', id, data)
      .then((response) => {
        const body = this.parseStringResponse(response);
        return Number(body);
      });
  }

  /**
   * Post Reportback for given Campaign id and data.
   */
  reportback(id, data) {
    return this
      .callAction('reportback', id, data)
      .then((response) => {
        const body = this.parseStringResponse(response);
        return Number(body);
      });
  }
}

module.exports = PhoenixEndpointCampaigns;

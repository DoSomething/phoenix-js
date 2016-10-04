'use strict';

/**
 * Imports.
 */
const PhoenixEndpoint = require('./phoenix-endpoint');
const PhoenixCampaign = require('./phoenix-campaign');

/**
 * PhoenixEndpointCampaigns.
 */

class PhoenixEndpointCampaigns extends PhoenixEndpoint {

  constructor(client) {
    super(client);
    this.endpoint = 'campaigns';
  }

  /**
   * Get single campaign by id.
   */
  get(id) {
    // TODO: check type to be in allowed data.
    return this
      .executeGet(`${this.endpoint}/${id}`)
      .then(response => this.parseGet(response));
  }

  /**
   * Helper function to parse response body to a PhoenixCampaign.
   */
  parseGet(response) {
    if (!response.body.data) {
      throw new Error('Cannot parse API get response as a PhoenixCampaign.');
    }

    return new PhoenixCampaign(response.body.data);
  }

  /**
   * Post Reportback for given Campaign id and data.
   */
  reportback(id, data) {
    return this
      .callAction('reportback', id, data)
      .then(response => this.parseNumberResponse(response));
  }

  /**
   * Post Signup for given Campaign id and data.
   */
  signup(id, data) {
    return this
      .callAction('signup', id, data)
      .then(response => this.parseNumberResponse(response));
  }

}

module.exports = PhoenixEndpointCampaigns;

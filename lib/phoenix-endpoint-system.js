'use strict';

/**
 * Imports.
 */
const PhoenixEndpoint = require('./phoenix-endpoint');


/**
 * PhoenixEndpointSystem.
 */

class PhoenixEndpointSystem extends PhoenixEndpoint {

  constructor(client) {
    super(client);
    this.endpoint = 'system';
  }

  /**
   * Get member count.
   */
  getConnectionUserId() {
    return this
      .callAction('connect')
      .then((response) => {
        const body = this.parseResponse(response);
        return Number(body.user.uid);
      });
  }

}

module.exports = PhoenixEndpointSystem;

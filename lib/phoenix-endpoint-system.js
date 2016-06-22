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
  getConnectionStatus() {
    // TODO: return MemberData object with formating features?
    return this
      .callAction('connect')
      .then(response => this.parseResponse(response));
  }

}

module.exports = PhoenixEndpointSystem;

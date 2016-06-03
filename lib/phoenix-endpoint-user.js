'use strict';

/**
 * Imports.
 */
const PhoenixEndpoint = require('./phoenix-endpoint');


/**
 * PhoenixEndpointUser.
 */

class PhoenixEndpointUser extends PhoenixEndpoint {

  constructor(client) {
    super(client);
    this.endpoint = 'users';
  }

  /**
   * Get member count.
   */
  getCount() {
    // TODO: return MemberData object with formating features?
    return this
      .callAction('get_member_count')
      .then(response => this.parseResponse(response));
  }

}

module.exports = PhoenixEndpointUser;

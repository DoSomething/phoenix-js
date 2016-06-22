'use strict';

/**
 * Imports.
 */
const PhoenixEndpoint = require('./phoenix-endpoint');


/**
 * PhoenixEndpointUser.
 */

class PhoenixEndpointAuth extends PhoenixEndpoint {

  constructor(client) {
    super(client);
    this.endpoint = 'auth';
  }

  login(username, password) {
    return this
      .callAction('login', false, { username, password })
      .then(response => this.parseResponse(response));
  }

}

module.exports = PhoenixEndpointAuth;

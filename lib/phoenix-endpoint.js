'use strict';

const request = require('superagent');

/**
 * PhoenixEndpointUser.
 */

class PhoenixEndpoint {

  constructor(client) {
    this.client = client;
  }

  /**
   * Helper function to execute method.
   */
  callAction(name) {
    return this.executePost(`${this.endpoint}/${name}`);
  }

  /**
   * Helper function to execute simple post.
   */
  executePost(endpoint) {
    const agent = request
      .post(`${this.client.baseURI}/${endpoint}`)
      .accept('json');
    return agent;
  }

  /**
   * Helper function to parse response body to a NorthstarUser.
   */
  parseResponse(response) {
    if (!response.body) {
      throw new Error('Cannot parse API response.');
    }
    return response.body;
  }

}

module.exports = PhoenixEndpoint;

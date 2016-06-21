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
   * Execute action call.
   */
  callAction(name, id, data) {
    let endpoint;
    if (id) {
      endpoint = `${this.endpoint}/${id}/${name}`;
    } else {
      endpoint = `${this.endpoint}/${name}`;
    }
    return this.executePost(endpoint, data || {});
  }

  /**
   * Helper function to execute simple post.
   */
  executePost(endpoint, data) {
    return request
      .post(`${this.client.baseURI}/${endpoint}`)
      .send(data)
      .accept('json');
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

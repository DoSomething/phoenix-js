'use strict';

/**
 * Imports.
 */
const PhoenixEndpoint = require('./phoenix-endpoint');
const PhoenixSignup = require('./phoenix-signup');

/**
 * NorthstarEndpointSignups.
 */

class PhoenixEndpointSignups extends PhoenixEndpoint {

  constructor(client) {
    super(client);
    this.endpoint = 'signups';
  }

  /**
   * Get single signup by id.
   */
  get(id) {
    // TODO: check type to be in allowed data.
    return this
      .executeGet(`${this.endpoint}/${id}`)
      .then(response => this.parseGet(response));
  }

  /**
   * Get signups index.
   */
  index(query) {
    return this
      .executeGet(`${this.endpoint}`, query)
      .then(response => this.parseIndex(response));
  }

  /**
   * Helper function to parse response body to a NorthstarSignup.
   */
  parseGet(response) {
    if (!response.body.data) {
      throw new Error('Cannot parse API get response as a PhoenixSignup.');
    }

    return new PhoenixSignup(response.body.data);
  }

  /**
   * Helper function to parse response body to an array of NorthstarSignups.
   */
  parseIndex(response) {
    if (!response.body.data) {
      throw new Error('Cannot parse API index response.');
    }

    return response.body.data.map(row => new PhoenixSignup(row));
  }
}

module.exports = PhoenixEndpointSignups;

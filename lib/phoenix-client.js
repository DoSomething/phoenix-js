'use strict';

const request = require('superagent');

/**
 * PhoenixClient
 */

// Package version
const VERSION = require('../package.json').version;

class PhoenixClient {

  constructor(options) {
    const opts = options || {};

    // Ensure API base URI is provided.
    if (!opts.baseURI) {
      throw new TypeError('Option baseURI is required.');
    }

    // Parse options.
    this.baseURI = opts.baseURI;
    // this.apiKey = opts.apiKey || null;
    // this.authorized = !!this.apiKey;

    // Defaults.
    this.VERSION = VERSION;
  }

  /**
   * Get member count.
   */
  getMemberCount() {
    // TODO: user namespace to subclass.
    // TODO: return MemberData object with formating features.
    return this
      .executePost('users/get_member_count')
      .then(response => this.parseResponse(response));
  }

  /**
   * Helper function to execute simple get.
   */
  executePost(endpoint) {
    const agent = request
      .post(`${this.baseURI}/${endpoint}`)
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

module.exports = PhoenixClient;

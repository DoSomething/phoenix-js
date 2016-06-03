'use strict';

/**
 * Imports.
 */
const PhoenixEndpointUser = require('./phoenix-endpoint-user');
const VERSION = require('../package.json').version;

/**
 * PhoenixClient
 */

// Package version

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

    // UserEndpoint
    this.User = new PhoenixEndpointUser(this);
  }

}

module.exports = PhoenixClient;

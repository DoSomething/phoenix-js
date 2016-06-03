'use strict';

// const request = require('superagent');

/**
 * NorthstarClient
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

}

module.exports = PhoenixClient;

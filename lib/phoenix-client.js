'use strict';

/**
 * Imports.
 */
const PhoenixEndpointUser = require('./phoenix-endpoint-user');
const PhoenixEndpointAuth = require('./phoenix-endpoint-auth');
const PhoenixEndpointSystem = require('./phoenix-endpoint-system');
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

    // Endpoints.
    this.User = new PhoenixEndpointUser(this);
    this.Auth = new PhoenixEndpointAuth(this);
    this.System = new PhoenixEndpointSystem(this);

    // Authorization.
    this.session = this.getSession(opts);
  }

  getSession(opts) {
    const session = new Promise((resolve, reject) => {
      if (opts.username && opts.password) {
        this.Auth.login(opts.username, opts.password)
          .then((data) => {
            const result = {
              sessionName: data.session_name,
              sessionId: data.sessid,
              csrfToken: data.token,
              userId: Number(data.user.uid),
            };
            return resolve(result);
          })
          .catch(error => reject(error));
      } else {
        resolve(false);
      }
    });
    return session;
  }

}

module.exports = PhoenixClient;

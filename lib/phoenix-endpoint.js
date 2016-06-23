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
    return new Promise((resolve, reject) => {
      this.client.session
        .then((session) => {
          const agent = request
            .post(`${this.client.baseURI}/${endpoint}`)
            .send(data)
            .accept('json');
          if (session) {
            agent
              .set('X-CSRF-Token', session.csrfToken)
              .set('Cookie', `${session.sessionName}=${session.sessionId}`);
          }
          resolve(agent);
        })
        .catch(error => reject(error));
    });
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

  /**
   * Helper function to parse response body to a NorthstarUser.
   */
  parseStringResponse(response) {
    if (!response.body) {
      throw new Error('Cannot parse API response.');
    }
    // When a string is returned instead of a JSON, it is formatted
    // as a single-element array containing this string.
    const arrayResponse = response.body;
    return String(arrayResponse[0]);
  }

}

module.exports = PhoenixEndpoint;

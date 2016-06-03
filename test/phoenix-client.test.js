'use strict';

/**
 * Imports.
 */
require('dotenv').config({ silent: true });
const PhoenixClient = require('../lib/phoenix-client');
const PhoenixEndpointUser = require('../lib/phoenix-endpoint-user');

/**
 * PhoenixClient.test
 */

/**
 * Test Phoenix Nodejs client.
 */
describe('PhoenixClient', () => {
  /**
   * Helper: get default client.
   */
  function getUnauthorizedClient() {
    return new PhoenixClient({
      baseURI: process.env.PHOENIX_REST_API_BASEURI,
    });
  }

  // Constructor.
  describe('constructor', () => {
    // Test new instance.
    it('without options should throw a TypeError', () => {
      (() => new PhoenixClient()).should.throw(TypeError);
    });

    // Check API base URL.
    it('base URL option should be set', () => {
      process.env.PHOENIX_REST_API_BASEURI.should.be.not.empty();
    });

    // Test new instance.
    it('should create new instance configured correctly', () => {
      const client = getUnauthorizedClient();
      client.should.be.an.instanceof(PhoenixClient);
      client.should.have.property('baseURI')
        .which.is.not.empty()
        .and.equal(process.env.PHOENIX_REST_API_BASEURI);
      // TODO: check if authentication token isn't set.
      // client.should.have.property('apiKey').which.is.empty();
    });
  });


  describe('User', () => {
    // Check getUser method.
    it('should be exposed', () => {
      getUnauthorizedClient()
        .should.have.property('User')
        .which.is.instanceof(PhoenixEndpointUser);
    });

    // Get member count.
    it('getCount() should return correct member count', () => {
      const client = getUnauthorizedClient();
      const response = client.User.getCount();
      return response.should.eventually.match((data) => {
        // Ensure result to be an instance of Response?
        data.should.be.an.instanceof(Object);

        // Ensure properties and test values.
        data.should.have.properties(['formatted', 'readable']);
      });
    });
  });
});

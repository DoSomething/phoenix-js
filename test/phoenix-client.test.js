'use strict';

/**
 * NorthstarClient.test
 */
require('dotenv').config({ silent: true });
const PhoenixClient = require('../lib/phoenix-client');

/**
 * Test Northstar Nodejs client.
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
      client.should.have.property('baseURI').which.is.not.empty();
      // TODO: check if authentication token isn't set.
      // client.should.have.property('apiKey').which.is.empty();
    });
  });


  describe.skip('getMemberCount()', () => {
    /**
     * Helper: validate unauthorized user object.
     */
    function memberCountResponse(data) {
      // Ensure result to be an instance of Response?
      data.should.be.an.instanceof(Object);

      // Ensure properties and test values.
      data.should.have.properties(['formatted', 'readable']);
    }

    // Check getUser method.
    it('getMemberCount() should be exposed', () => {
      // property('getMemberCount').that.is.a.Function?
      getUnauthorizedClient().getMemberCount.should.be.a.Function();
    });

    // By id.
    it('should return correct member count', () => {
      const client = getUnauthorizedClient();
      const response = client.getMemberCount();
      return response.should.eventually.match(memberCountResponse);
    });
  });
});

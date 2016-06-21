'use strict';

/**
 * Imports.
 */
const helper = require('../helpers/test-helper');
const PhoenixClient = require('../../lib/phoenix-client');

/**
 * Test Phoenix constructor.
 */
describe('PhoenixClient constructor', () => {
  // Test new instance.
  it('without options should throw a TypeError', () => {
    (() => new PhoenixClient()).should.throw(TypeError);
  });

  // Check API base URL.
  it('base URL option should be set', () => {
    process.env.PHOENIX_REST_API_BASEURI.should.be.not.empty();
  });

  // Test new instance.
  it('should create correct unauthorized client', () => {
    const client = helper.getUnauthorizedClient();
    client.should.be.an.instanceof(PhoenixClient);
    client.should.have.property('baseURI')
      .which.is.not.empty()
      .and.equal(process.env.PHOENIX_REST_API_BASEURI);
    // TODO: check if authentication token isn't set.
    // client.should.have.property('apiKey').which.is.empty();
  });
});

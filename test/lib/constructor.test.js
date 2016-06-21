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

  // Test new anonymous instance.
  it('should create correct unauthorized client', () => {
    const client = helper.getUnauthorizedClient();
    client.should.be.an.instanceof(PhoenixClient);
    client.should.have.property('baseURI')
      .which.is.not.empty()
      .and.is.equal(process.env.PHOENIX_REST_API_BASEURI);
    return client.session.should.eventually.be.false();
  });

  // Test authorized instance.
  it('should create correct authorized client', () => {
    const client = helper.getAuthrorizedClient();
    client.should.be.an.instanceof(PhoenixClient);
    client.should.have.property('session');
    return client.session.should.eventually.match(helper.validSessionToken);
  });

  // Test authorized instance sustains connection.
  it.skip('should sustain authorized connection', () => {
    const client = helper.getAuthrorizedClient();
    client.should.be.an.instanceof(PhoenixClient);
    client.should.have.property('getConnectionStatus').which.is.a.Function();

    // Check that created client can perform authorized calls.
    const status = client.getConnectionStatus();
    return status.should.eventually.match((response) => {
      // Check that authorized user is not anonymous.
      response
        .should.have.property('user')
        .which.has.property('uid')
        .which.is.notEqual('0');
    });
  });
});

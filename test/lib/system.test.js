'use strict';

/**
 * Imports.
 */
const helper = require('../helpers/test-helper');
const PhoenixEndpointSystem = require('../../lib/phoenix-endpoint-system');

/**
 * Test PhoenixClient system calls.
 */

/**
 * Test authorized instance sustains connection.
 */
describe('PhoenixClient.System', () => {
  // Check System module.
  it('should be exposed', () => {
    helper.getAuthorizedClient()
      .should.have.property('System')
      .which.is.instanceof(PhoenixEndpointSystem);
  });

  // Check that created client can perform unauthorized calls.
  it('getConnectionUserId() support unauthorized', () => {
    const client = helper.getUnauthorizedClient();
    const response = client.System.getConnectionUserId();
    return response.should.eventually.match((userId) => {
      // Check that authorized user is anonymous.
      userId.should.be.a.Number().and.equal(0);
    });
  });

  // Check that created client can perform authorized calls.
  it('getConnectionUserId() should return connection status', () => {
    const client = helper.getAuthorizedClient();
    const response = client.System.getConnectionUserId();
    return response.should.eventually.match((userId) => {
      userId.should.be.a.Number().and.not.equal(0);
    });
  });
});

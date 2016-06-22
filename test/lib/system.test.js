'use strict';

/**
 * Imports.
 */
const should = require('should');
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
    helper.getAuthrorizedClient()
      .should.have.property('System')
      .which.is.instanceof(PhoenixEndpointSystem);
  });

  // Check that created client can perform unauthorized calls.
  it('getConnectionStatus() support unauthorized', () => {
    const client = helper.getUnauthorizedClient();
    const response = client.System.getConnectionStatus();
    return response.should.eventually.match((status) => {
      status.should.have.property('user');
      status.user.should.have.property('uid');
      // Check that authorized user is anonymous.
      should(status.user.uid).be.a.Number().and.be.equal(0);
    });
  });

  // Check that created client can perform authorized calls.
  it.skip('getConnectionStatus() should return connection status', () => {
    const client = helper.getAuthrorizedClient();
    const response = client.System.getConnectionStatus();
    return response.should.eventually.match((status) => {
      status.should.have.property('user');
      status.user.should.have.property('uid');
      // Check that authorized user is not anonymous.
      should(status.user.uid).be.a.Number().and.be.not.equal(0);
    });
  });
});

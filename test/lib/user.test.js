'use strict';

/**
 * Imports.
 */
const helper = require('../helpers/test-helper');
const PhoenixEndpointUser = require('../../lib/phoenix-endpoint-user');

/**
 * PhoenixClient.test
 */

/**
 * Test Phoenix Nodejs client.
 */
describe('PhoenixClient.User', () => {
  // Check getUser method.
  it('should be exposed', () => {
    helper.getUnauthorizedClient()
      .should.have.property('User')
      .which.is.instanceof(PhoenixEndpointUser);
  });

  // Get member count.
  it('getCount() should return correct member count', () => {
    const client = helper.getUnauthorizedClient();
    const response = client.User.getCount();
    return response.should.eventually.match((data) => {
      // Ensure result to be an instance of Response?
      data.should.be.an.instanceof(Object);

      // Ensure properties and test values.
      data.should.have.properties(['formatted', 'readable']);
    });
  });

  // Get reset password url.
  it('getPasswordResetURL() should return password reset url', () => {
    const client = helper.getAuthorizedClient();
    // Request reset password for a test user.
    return client.User
      .getPasswordResetURL(helper.getTestUserId())
      .should.eventually.match(helper.validResetPasswordUrl);
  });
});

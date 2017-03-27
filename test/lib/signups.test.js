'use strict';

/**
 * Imports.
 */
const helper = require('../helpers/test-helper');
const PhoenixSignup = require('../../lib/phoenix-signup');
const PhoenixEndpointSignups = require('../../lib/phoenix-endpoint-signups');

const client = helper.getAuthorizedClient();
const testSignupId = helper.getTestSignupId();

/**
 * Test PhoenixClient Signups calls with an authorized client.
 */

describe('PhoenixClient.Signups', () => {
  /**
   * Helper: validate signup object.
   */
  function testSignup(signup) {
    signup.should.be.an.instanceof(PhoenixSignup);
    signup.should.have.properties(['id', 'campaign', 'campaignRun', 'reportback', 'user']);
  }
  /**
   * Helper: validate array of campaign objects.
   */
  function testSignups(signups) {
    signups.should.be.an.instanceof(Array);
    const signup = signups[0];
    signup.should.match(testSignup);
  }

  it('should be exposed', () => {
    helper.getAuthorizedClient()
      .should.have.property('Signups')
      .which.is.instanceof(PhoenixEndpointSignups);
  });

  it('Signups.get() returns a Signup', () => {
    const response = client.Signups.get(testSignupId);
    response.should.be.a.Promise();
    return response.should.eventually.match(testSignup);
  });

  it('Signups.index() returns array of Signups', () => {
    const response = client.Signups.index();
    response.should.be.a.Promise();
    return response.should.eventually.match(testSignups);
  });
});

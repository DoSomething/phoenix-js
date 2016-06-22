'use strict';

/**
 * Imports.
 */
const should = require('should');

/**
 * Ensures test environment has been set correctly.
 */
describe('PhoenixClient test environment', () => {
  // Check API base URL.
  it('should contain base URL setting', () => {
    should(process.env.PHOENIX_REST_API_BASEURI).be.not.empty();
  });

  // Check API key
  it('should contain authorization credentials', () => {
    should(process.env.PHOENIX_REST_API_USERNAME).be.not.empty();
    should(process.env.PHOENIX_REST_API_PASSWORD).be.not.empty();
  });
});

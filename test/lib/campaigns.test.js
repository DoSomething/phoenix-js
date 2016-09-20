'use strict';

/**
 * Imports.
 */
const helper = require('../helpers/test-helper');
const PhoenixEndpointCampaigns = require('../../lib/phoenix-endpoint-campaigns');

const testCampaignId = 1672;
const testSource = 'phoenix-js-test';

/**
 * Test PhoenixClient campaign calls.
 */

describe('PhoenixClient.Campaigns', () => {
  it('should be exposed', () => {
    helper.getAuthorizedClient()
      .should.have.property('Campaigns')
      .which.is.instanceof(PhoenixEndpointCampaigns);
  });

  it('signup() returns a number', () => {
    const client = helper.getAuthorizedClient();
    const data = {
      uid: helper.getTestUserId(),
      source: testSource,
    };
    const response = client.Campaigns.signup(testCampaignId, data);
    return response.should.eventually.match((signupId) => {
      signupId.should.be.a.Number().and.not.equal(0);
    });
  });

  it('reportback() returns a number', () => {
    const client = helper.getAuthorizedClient();
    const data = {
      uid: helper.getTestUserId(),
      quantity: 42,
      caption: 'Test caption',
      why_participated: 'Test why_participated',
      file_url: 'https://yt3.ggpht.com/-tG6go-Bifk0/AAAAAAAAAAI/AAAAAAAAAAA/2oa2dv3cVqM/s900-c-k-no-mo-rj-c0xffffff/photo.jpg',
      source: testSource,
    };
    const response = client.Campaigns.reportback(testCampaignId, data);
    return response.should.eventually.match((reportbackId) => {
      reportbackId.should.be.a.Number().and.not.equal(0);
    });
  });
});

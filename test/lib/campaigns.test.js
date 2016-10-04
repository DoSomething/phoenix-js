'use strict';

/**
 * Imports.
 */
const helper = require('../helpers/test-helper');
const PhoenixEndpointCampaigns = require('../../lib/phoenix-endpoint-campaigns');

const client = helper.getAuthorizedClient();
const testCampaignId = helper.getTestCampaignId();
const testSource = helper.getTestPostSource();

/**
 * Test PhoenixClient campaign calls with an authorized client.
 */

describe('PhoenixClient.Campaigns', () => {
  it('should be exposed', () => {
    helper.getAuthorizedClient()
      .should.have.property('Campaigns')
      .which.is.instanceof(PhoenixEndpointCampaigns);
  });

  it('get() returns a Campaign', () => {
    const response = client.Campaigns.get(testCampaignId);
    return response.should.eventually.match((campaign) => {
      campaign.id.should.be.a.Number().and.not.equal(0);
    });
  });

  it('signup() returns a number', () => {
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

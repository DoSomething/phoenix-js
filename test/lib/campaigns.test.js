'use strict';

/**
 * Imports.
 */
const helper = require('../helpers/test-helper');
const PhoenixCampaign = require('../../lib/phoenix-campaign');
const PhoenixEndpointCampaigns = require('../../lib/phoenix-endpoint-campaigns');

const client = helper.getAuthorizedClient();
const testCampaignId = helper.getTestCampaignId();
const testSource = helper.getTestPostSource();

/**
 * Test PhoenixClient campaign calls with an authorized client.
 */

describe('PhoenixClient.Campaigns', () => {
  /**
   * Helper: validate campaign object.
   */
  function testCampaign(campaign) {
    campaign.should.be.an.instanceof(PhoenixCampaign);
    campaign.should.have.properties(['id', 'title', 'tagline', 'status']);
  }
  /**
   * Helper: validate array of campaign objects.
   */
  function testCampaigns(campaigns) {
    campaigns.should.be.an.instanceof(Array);
    const campaign = campaigns[0];
    campaign.should.match(testCampaign);
  }

  it('should be exposed', () => {
    helper.getAuthorizedClient()
      .should.have.property('Campaigns')
      .which.is.instanceof(PhoenixEndpointCampaigns);
  });

  it('Campaigns.get() returns a Campaign', () => {
    const response = client.Campaigns.get(testCampaignId);
    response.should.be.a.Promise();
    return response.should.eventually.match(testCampaign);
  });

  it('Campaigns.index() returns array of Campaigns', () => {
    const response = client.Campaigns.index();
    response.should.be.a.Promise();
    return response.should.eventually.match(testCampaigns);
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

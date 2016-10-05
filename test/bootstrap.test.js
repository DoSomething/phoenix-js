'use strict';

/**
 * Imports.
 */
const helper = require('./helpers/test-helper');
const nock = require('nock');

/**
 * Setup.
 */
require('dotenv').config({ silent: true });

const campaignId = helper.getTestCampaignId();
const userId = helper.getTestUserId();
const sessionId = '2f5DO-U9tIACES3vZimgtUaN2ontgBxoyn4-Ds-Zcmg';
const sessionName = 'SSESS2e2a742ee2c3bda949b2c6b2b81d9941';
const token = '-XmDawHfJ3MRBFGgBvPaF4_RlHq0Dp_xfffGimzr6mM';

const phoenixApi = nock(process.env.PHOENIX_REST_API_BASEURI);
const phoenixSession = {
  sessid: sessionId,
  session_name: sessionName,
  token,
  user: {
    uid: userId,
  },
};
const phoenixCampaign = {
  id: campaignId,
  title: 'Fur Your Information',
  tagline: 'Next question',
  status: 'active',
  reportback_info: {
    copy: 'I wanna know what love is',
    confirmation_message: 'I want you to show me',
    noun: 'interviews',
    verb: 'conducted',
  },
};

phoenixApi
  .post('/auth/login')
  .reply(200, phoenixSession);

phoenixApi
  .post('/system/connect')
  .reply(200, {
    user: { uid: 0 },
    sessid: sessionId,
    session_name: sessionName,
  });

phoenixApi
  .post('/auth/login')
  .reply(200, phoenixSession)
  .post('/system/connect')
  .reply(200, {
    user: { uid: userId },
    sessid: sessionId,
    session_name: sessionName,
  });

phoenixApi
  .post('/auth/login')
  .reply(200, phoenixSession)
  .post('/users/get_member_count')
  .reply(200, {
    formatted: '9,596,441,002',
    readable: '9.5 billion',
  });

phoenixApi
  .post('/auth/login')
  .reply(200, phoenixSession)
  .post(`/users/${userId}/password_reset_url`)
  .reply(200, ['https://slothbot.ds.org/user/reset/5/14744/-02tH-1R8/login']);

phoenixApi
  .post('/auth/login')
  .reply(200, phoenixSession)
  .post(`/campaigns/${campaignId}/signup`)
  // Return a random number for Signup id.
  .reply(200, [347333233]);

phoenixApi
  .post('/auth/login')
  .reply(200, phoenixSession)
  .post(`/campaigns/${campaignId}/reportback`)
  // Return a random number for Reportback id.
  .reply(200, [234200]);

phoenixApi
  .get('/campaigns')
  .reply(200, { data: [phoenixCampaign] });

phoenixApi
  .get(`/campaigns/${campaignId}`)
  .reply(200, { data: phoenixCampaign });


/**
 * Run tests.
 */
require('./lib/environment.test');
require('./lib/constructor.test');
require('./lib/system.test');
require('./lib/user.test');
require('./lib/campaigns.test');

'use strict';

/**
 * PhoenixCampaign.
 */
class PhoenixCampaign {

  // Construct from JSON.
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.tagline = data.tagline;
    this.status = data.status;
  }

}

module.exports = PhoenixCampaign;

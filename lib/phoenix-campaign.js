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
    this.uri = data.uri;
    this.type = data.type;
    this.currentRun = {
      en: data.campaign_runs.current.en.id,
    };
    this.reportbackInfo = {
      confirmationMessage: data.reportback_info.confirmation_message,
      copy: data.reportback_info.copy,
      noun: data.reportback_info.noun,
      verb: data.reportback_info.verb,
    };
    this.facts = {
      problem: data.facts.problem,
    };
  }

}

module.exports = PhoenixCampaign;

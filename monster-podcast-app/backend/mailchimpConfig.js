// mailchimpConfig.js
const mailchimp = require('@mailchimp/mailchimp_marketing');

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,  // Use environment variables
  server: process.env.MAILCHIMP_SERVER_PREFIX,  // Use environment variables
});

module.exports = mailchimp;

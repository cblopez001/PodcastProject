const mailchimp = require('@mailchimp/mailchimp_marketing');

// Configure Mailchimp client
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX, // e.g., 'us19'
});

exports.subscribe = async (req, res) => {
  try {
    const { email, firstName, lastName } = req.body; // Assume these fields are sent in the request body

    // Example subscription logic for Mailchimp
    const response = await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
      email_address: email,
      status: 'subscribed', // Use 'pending' if you want to send a confirmation email
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    });

    res.status(200).json({
      message: 'Subscription successful',
      contactId: response.id
    });
  } catch (error) {
    console.error('Error subscribing:', error);
    res.status(500).json({ message: 'Error subscribing. Please try again.' });
  }
};

// Function to test the connection to Mailchimp
async function testConnection() {
  try {
    const response = await mailchimp.ping.get();
    console.log('Mailchimp API connection test:', response);
  } catch (error) {
    console.error('Error testing Mailchimp connection:', error);
  }
}

// Run connection test on startup
testConnection();

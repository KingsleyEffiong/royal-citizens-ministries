const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');

admin.initializeApp();
sgMail.setApiKey(functions.config().sendgrid.key);

exports.sendDailyEmails = functions.pubsub.schedule('every 24 hours').onRun(async (context) => {
  try {
    const usersSnapshot = await admin.firestore().collection('users').get();
    const emails = [];
    usersSnapshot.forEach(doc => {
      emails.push(doc.data().email);
    });

    // Define the email content
    const msg = {
      to: emails,
      from: 'your-email@example.com', // Your verified SendGrid sender email
      subject: 'Daily Newsletter',
      text: 'This is the plain text content of the newsletter.',
      html: '<strong>This is the HTML content of the newsletter.</strong>',
    };

    // Send the emails using SendGrid
    await sgMail.sendMultiple(msg);
    console.log('Daily emails sent successfully');
  } catch (error) {
    console.error('Error sending daily emails:', error);
  }
});

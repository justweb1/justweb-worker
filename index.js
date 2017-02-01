const firebase = require('firebase');
const Queue = require('firebase-queue');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

let FIREBASE_ADMIN_CERT = {
    // This information can be found in the Firebase project settings under Service Accounts. 
    // Select Node.js option and Generate New Key which will download a .json file. Use an existing
    // file if you already have one. You can paste the contents of that .json file below or use the
    // information in the host as an Environment Variable.
    "type": "service_account", //default
    "project_id": "",
    "private_key_id": "",
    "private_key": "",
    "client_email": "",
    "client_id": "",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth", //default
    "token_uri": "https://accounts.google.com/o/oauth2/token", //default
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs", //default
    "client_x509_cert_url": ""
};

let FIREBASE_DB_URL = "";

//Initialize the application
admin.initializeApp({
  credential: admin.credential.cert(FIREBASE_ADMIN_CERT),
  databaseURL: 'FIREBASE_DB_URL'
});

// QUEUES

let sendContact = new Queue(
    admin.database().ref('contact-form/submissions'), 
    function(data, progress, resolve, reject) {
  // Read and process task data
  console.log(data);

  // Do some work
  progress(50);

  // Finish the task asynchronously
  setTimeout(function() {
    resolve();
  }, 1000);
});
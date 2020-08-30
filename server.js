const express = require('express')
const bodyParser = require('body-parser');
var fcm = require('fcm-notification');
var admin = require('firebase-admin');
var FCM = require('./serviceAccountKey.json');
const cors = require('cors');

const app = express();
const port = 3000;

// Where we will keep books
let books = [];

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  var message = {
    notification:{
        title : 'Title of notification',
        body : 'Hello'
    },
    token: null
    };
    admin.initializeApp({
        credential: admin.credential.cert(FCM),
        databaseURL: "https://sample-7fafc.firebaseio.com"
    });
  app.post('/create', (req, res) => {
    console.log('Got body:', req.body.Token.toString());
    message.token = req.body.Token.toString();
    var registrationToken = 'bk3RNwTe3H0:CI2k_HHwgIpoDKCIZvvDMExUdFQ3P1...';

// See the "Defining the message payload" section above for details
// on how to define a message payload.
var payload = {
  notification: {
    title: 'Urgent action needed!',
    body: 'Urgent action is needed to prevent your account from being disabled!'
  }
};

// Set the message as high priority and have it expire after 24 hours.
var options = {
  priority: 'high',
  timeToLive: 60 * 60 * 24
};

// Send a message to the device corresponding to the provided
// registration token with the provided options.
admin.messaging().sendToDevice(message.token, payload, options)
  .then(function(response) {
    console.log('Successfully sent message:', response);
  })
  .catch(function(error) {
    console.log('Error sending message:', error);
  });
    // FCM.send(message, function(err, response) {
    //     if(err){
    //         console.log('error found', err);
    //     }else {
    //         console.log('response here', response);
    //     }
    // })

   // res.sendStatus(200);
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));

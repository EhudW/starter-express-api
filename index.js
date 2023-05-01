
var admin = require('firebase-admin');
var serviceAccount = require('./google-services.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
function test(q){
	admin
  .messaging().send(
  {
	  topic:q["topic"],
      data: {
      msgGroupType:q["mgt"],
        title: q["title"],
        body: q["body"],
		link:q["link"]
      },
    }   
  )
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });
}
const express = require('express')
const app = express()
app.all('/', (req, res) => {
    test(req.query)
    res.send('Yo!')
})
app.listen(process.env.PORT || 3000)

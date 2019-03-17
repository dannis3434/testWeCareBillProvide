/**
 * FulfillmentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
  index: async function (req, res) {
    return res.fulfillment();
  },

  index2: async function (req, res) {
    var admin = require('firebase-admin');
    var serviceAccount = require(sails.config.appPath + '/wecarebill-92132-firebase-adminsdk-7usxj-6240df0e36.json');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://wecarebill-92132.firebaseio.com'
  
    });
  
  var db = admin.firestore();
    var lowerBaselinePrice
    var upperBaselinePrice
    var surgery = await db.collection('surgery').doc('58').get().then(doc => {lowerBaselinePrice= doc.data().lowerBaselinePrice;});
    var surgery = await db.collection('surgery').doc('58').get().then(doc => {upperBaselinePrice= doc.data().upperBaselinePrice;});

    console.log(lowerBaselinePrice);
    console.log(upperBaselinePrice);
    
    return res.ok();
  },
};


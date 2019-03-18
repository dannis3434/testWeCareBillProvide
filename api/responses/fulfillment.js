module.exports = function () {

  var req = this.req;
  var res = this.res;

  const { WebhookClient } = require('dialogflow-fulfillment');
  // const {Card, Suggestion} = require('dialogflow-fulfillment');

  const agent = new WebhookClient({ request: req, response: res });

  async function welcome(agent) {

    agent.add(`你好~ 我是病不孤單人工客服，免費幫您按預算找專科手術醫生，以及提供數據讓你更了解你的手術收費。請問你想查詢什麼手術？`);
  }

  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

// get the price via the general option id and specific option id
 async function checkingBaseRange(agent){
    
  var surgery = await db.collection('surgery').doc('58').get(baseline_price)
  agent.add(surgery);
  }

  async function checking(agent){
    var lowerBaselinePrice
    var upperBaselinePrice
    var surgery = await db.collection('surgery').doc('58').get().then(doc => {lowerBaselinePrice= doc.data().lowerBaselinePrice;});
    var surgery1 = await db.collection('surgery').doc('58');
    var surgery = await db.collection('surgery').doc('58').get().then(doc => {upperBaselinePrice= doc.data().upperBaselinePrice;});
  
    
    console.log(lowerBaselinePrice);
    console.log(upperBaselinePrice);
    
    agent.add(lowerBaselinePrice);
    }

  // function yourFunctionHandler(agent) {
  //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
  //   agent.add(new Card({
  //       title: `Title: this is a card title`,
  //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
  //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
  //       buttonText: 'This is a button',
  //       buttonUrl: 'https://assistant.google.com/'
  //     })
  //   );
  //   agent.add(new Suggestion(`Quick Reply`));
  //   agent.add(new Suggestion(`Suggestion`));
  //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  // }

  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('User inputs surgery', checking);
  intentMap.set('User does not provide doctor name', checkingBaseRange);
  // intentMap.set('<INTENT_NAME_HERE>', yourFunctionHandler);
  // intentMap.set('<INTENT_NAME_HERE>', googleAssistantHandler);
  agent.handleRequest(intentMap)
  
}

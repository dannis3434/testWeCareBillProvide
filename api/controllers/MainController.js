/**
 * MainController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    fulfill: async function (req, res) {
        return res.fulfillment();
    },
    index2: async function (req, res) {
        // var outputContexts = agent.context.get('outputcontexts');
        var db = sails.firebaseAdmin.firestore();
        var contextOption = 'A';
        var contextSurgery = '58';
   
        async function getOptions() {

            var output = await '更改選項，你的個案不是';
            
            //Get all collections of "Specific" document
            var optionsRef = await db.collection('surgery').doc(contextSurgery).collection('option').doc('specific').collection(contextOption).get();
            // var generalOptionsRef = await db.collection('general').doc('option').getCollections();
            // console.log(JSON.stringify(optionsRef));
            // Use for each to loop all collections > element = a collection
            await optionsRef.forEach(doc => {
                    // console.log(doc.id);
                    // console.log(doc.data().price);
                    if (doc.data().price == 0){
                        output += doc.data().content+"。請選擇： ";
                    }else{
                    output += doc.id+". "+ doc.data().content +" ";
                    }
                    // output += doc.data()['content'];
                });
                return output
            }

        // var outputMessage =await getOptions()+"如你的個案付合以上條件，請回覆[ok].否則請按A-F更改選項,或按[X]告訴我們你個案與一般手術不同的地方。";
        // agent.add(outputMessage);
        var outputMessage =await getOptions();
        console.log(outputMessage)
        return res.ok();

    }
    
}
// }

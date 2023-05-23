'use strict';
import { createLogger } from './logger.js';

// const serverless = require('serverless-http');
// const express = require('express');

// const app = express();

let callActions;
let responseAction;
module.exports.calls = async (event, context, callback) => {
  const logger = createLogger('calls-handler');
  console.log(JSON.stringify(event.body, null, 2));
  logger.info(JSON.stringify(event.body, null, 2));
    const clientDialedNumber = event.body.callerNumber;
    if (clientDialedNumber){
    	// assumes a browser tried to make a call
    	callActions = `<Dial phoneNumbers="${clientDialedNumber}"/>`;
      logger.info(callActions);
    }
    else {
    	// assumes virtual number was called so tries to route call to the last browser session
        callActions = `<Dial phoneNumbers="agent1.LandshopVoice@ng.sip.africastalking.com,agent2.LandshopVoice@ng.sip.africastalking.com,agent3.LandshopVoice@ng.sip.africastalking.com"/>`;  
        logger.info
    }
    responseAction = '<?xml version="1.0" encoding="UTF-8"?><Response>' + `${callActions}` + '</Response>';
    const response = {
      statusCode: 200,
      body: responseAction,
    };
   
    callback(null, response);
    return;
    // return (responseAction);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

// app.post('/calls', (req, res) => {
//   console.log(JSON.stringify(req.body, null, 2));
//     const clientDialedNumber = req.body.clientDialedNumber;
//     if (req.body.clientDialedNumber){
//     	// assumes a browser tried to make a call
//     	callActions = `<Dial phoneNumbers="${clientDialedNumber}"/>`;
//     }
//     else {
//     	// assumes virtual number was called so tries to route call to the last browser session
//         callActions = `<Dial phoneNumbers="agent1.LandshopVoice@ng.sip.africastalking.com,agent2.LandshopVoice@ng.sip.africastalking.com,agent3.LandshopVoice@ng.sip.africastalking.com"/>`;   
//     }
//     responseAction = '<?xml version="1.0" encoding="UTF-8"?><Response>' + `${callActions}` + '</Response>';
//     res.send(responseAction);
// });


// module.exports.hello = async (event) => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify(
//       {
//         message: 'Go Serverless v1.0! Your function executed successfully!',
//         input: event,
//       },
//       null,
//       2
//     ),
//   };

//   // Use this code if you don't use the http event with the LAMBDA-PROXY integration
//   // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
// };

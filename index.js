const logger = require('./logger');
const parser = require("body-parser-for-serverless");


module.exports.handler = async (event, context, callback) => {
  if (event.source === 'serverless-plugin-warmup') {
    console.log('WarmUP - Lambda is warm!')
    return callback(null, 'Lambda is warm!')
  }

  logger.info(event.body);
	const data = await parser(event);
	logger.info(data);
	const direction = data.direction;
	const number = data.callerNumber;
	const isActive = data.isActive;

	logger.info(data);
	logger.info(direction);
	logger.info(number);
	
	let callActions;
  let responseAction;

  if (isActive === "0") {
    return "";
  }

	try {
    if (direction === "Outbound") {
    	// assumes a browser tried to make a call
    	callActions = `<Dial phoneNumbers="${number}" callerId="+2347080672040"/>`;
    }
    else {
    	// assumes virtual number was called so tries to route call to the last browser session
        callActions = '<Dial phoneNumbers="agent1.LandshopVoice@ng.sip.africastalking.com,agent2.LandshopVoice@ng.sip.africastalking.com,agent3.LandshopVoice@ng.sip.africastalking.com"/>';   
    }
    responseAction = '<?xml version="1.0" encoding="UTF-8"?><Response>' + `${callActions}` + '</Response>';
    return {
      statusCode: 200,
      headers: {
        ContentType: 'application/xml',
      },
      body: responseAction,
    };
	}
	catch (error) {
    error = context.error.message;
		logger.error(error);
	}
};

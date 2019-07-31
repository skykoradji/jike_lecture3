const { SessionsClient } = require('dialogflow');
const { getFulfillmentText, getRichResponses } = require('./utils');
const dialogflowClient = new SessionsClient({
  keyFilename: '/Users/alex/.ssh/dialogflow/react.ai.json'
});

function getPayload(queryResult) {
  const contents = getFulfillmentText(queryResult);
  const payload = { contents };
  const richResponses = getRichResponses(queryResult);
  if (richResponses.length) {
    payload.richResponses = richResponses;
  }
  return payload;
}
async function sendMessage(message) {
  if(!message) return;
  const [ { queryResult }] = await dialogflowClient.detectIntent({
    // Use the customer ID as Dialogflow's session ID
    session: dialogflowClient.sessionPath('job-interview-777e5', 'test'),
    queryInput: {
      text: {
        text: message,
        languageCode: 'en'
      }
    }
  });


  return getPayload(queryResult);
}

async function sendEvent(event) {
  if(!event) return;
  const [ { queryResult }] = await dialogflowClient.detectIntent({
    // Use the customer ID as Dialogflow's session ID
    session: dialogflowClient.sessionPath('job-interview-777e5', 'test'),
    queryInput: {
      event: {
        name: event,
        languageCode: 'en'
      }
    }
  });
  return getPayload(queryResult);
}

module.exports = {
  sendMessage,
  sendEvent
};

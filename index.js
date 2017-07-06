'use strict';

const Alexa = require('alexa-sdk');

//lets define some constants for some defined states.
let states = {
    START:'_START'
}

//we can define some handlers here
//this is a basic handler - it contains the initial launch request.
let mainHandler = {
    'LaunchRequest': function(){

    },
    'ConnectIntent': function(){
        this.handler.state = states.START;
        this.emitWithState('Connect');
    },
    'AMAZON.HelpIntent': function(){
        this.emit(':ask','How can I help you get information from Salesforce?','I can obtain information from Salesforce. What would you like to know?');
    }
};
//this is a handler that is associated with a certain State.
//if a request contains a certain state, that matches the state
//assigned to this handler, then the Intents in this state will
//be used.
let connectionHandler = Alexa.CreateStateHandler(states.START,{
    'Connect': function(){
        
    }
});


//this is the wireup magic. What is exported here is a function 
//that when called takes an event, context and callback parameters
//the handler method is called on the Alexa object and the 
//event and context objects are passed in. Also, the handler objects 
//are registered and the alexa application is executed
exports.handler = function(event, context, callback){
    let alexa = Alexa.handler(event,context);
    alexa.registerHandlers(mainHandlers);
    alexa.execute();
    callback();
}
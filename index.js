'use strict';

const Alexa = require('alexa-sdk');
const _ = require('lodash');

//lets set up some application constants
const APP_ID = 'amzn1.ask.skill.0731cd33-555a-4fd5-849b-d638c6e0da82';
//lets define some constants for some defined states.
let states = {
    START:'_START'
}

//some customized functions
let salesforceAuthenticated = function(userObj){
    if(_.has(userObj,'accessToken')){
        return true;
    }
    return false;
}

//we can define some handlers here
//this is a basic handler - it contains the initial launch request.
let mainHandler = {
    'LaunchRequest': function(){
        this.handler.state = states.START;
        this.emit(':ask','Welcome. What would you like to do today?');
    },
    'ConnectIntent': function(){
        this.handler.state = states.START;
        this.emitWithState('Connect');
    },
    'WhoAmIIntent': function(){
        this.handler.state = states.START;
        this.emitWithState('WhoAmI');
    },
    'AMAZON.HelpIntent': function(){
        this.emit(':ask','How can I help you get information from Salesforce?','I can obtain information from Salesforce. What would you like to know?');
    },
    'AMAZON.CancelIntent': function(){
        this.handler.state = states.START;
        this.emit(':ask','Ok, let us start over. What would you like to do?');
    },
    'AMAZON.StopIntent': function(){
        this.emit(':say','Thank you. Goodbye.');
    }
};
//this is a handler that is associated with a certain State.
//if a request contains a certain state, that matches the state
//assigned to this handler, then the Intents in this state will
//be used.
let connectionHandler = Alexa.CreateStateHandler(states.START,{
    'Connect': function(){
        //first we need to determine if we already have an access_token for Salesforce
        if(salesforceAuthenticated(event.session.user)){
            this.emit(':tell','You have already been associated with a Salesforce User.');
            return;
        }
        this.emit(':tellWithLinkAccountCard','You need to tie your Amazon Account to Salesforce.');
    },
    'WhoAmI': function(){
        this.emit(':tell','I don\'t know who you are yet. Lets start over.');
    }
});


//this is the wireup magic. What is exported here is a function 
//that when called takes an event, context and callback parameters
//the handler method is called on the Alexa object and the 
//event and context objects are passed in. Also, the handler objects 
//are registered and the alexa application is executed
exports.handler = function(event, context, callback){
    let alexa = Alexa.handler(event,context);
    alexa.registerHandlers(mainHandler,connectionHandler);
    alexa.execute();
    //callback();
}
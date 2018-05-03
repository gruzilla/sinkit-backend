/**
 * Created by ma on 5/3/18.
 */
/* global $ */

var webSocket = WS.connect("ws://sinkit.abendstille.at/socket/");
var publishDataStructure;
var subscriber;
var ourBelovedDataStructure = {
  counter: 0
};

function redraw() {
  $('#belovedCounter');
}

function receiveMessage(uri, payload) {
  console.log("Received message", payload.msg);
  ourBelovedDataStructure = JSON.parse(payload.msg);
  redraw();
}

webSocket.on("socket/connect", function(session) {
  // session is an Autobahn JS WAMP session.

  // the callback function in "subscribe" is called everytime an event is published in that channel.
  subscriber = function() {
    session.subscribe("sinkit.channel", receiveMessage);
  }

  publishDataStructure = function() {
    session.publish("sinkit.channel", JSON.stringify(ourBelovedDataStructure));
  }

  console.log("Successfully Connected!");
  console.debug(session.sessionid());
  console.log("session");
});


webSocket.on("socket/disconnect", function(error) {
  // error provides us with some insight into the disconnection: error.reason and error.code

  console.log("Disconnected for " + error.reason + " with code " + error.code);
});


function increment() {
  ourBelovedDataStructure.counter++;
  publishDataStructure();
}

function decrement() {
  ourBelovedDataStructure.counter--;
  publishDataStructure();
}



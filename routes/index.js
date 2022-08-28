var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  res.render("index", {title: "IoT Lecture"});
});

var mqtt = require("mqtt");

var client = mqtt.connect({
  host: "localhost",
  port: 1883
});

client.on("connect", function() {
  console.log("subscriber.connected.");
});

var topic_test = "topic_test01";
client.subscribe(topic_test);

client.on("message", function(topic,message) {
  console.log("subscriber.on.message", "topic:", topic, "message:", message.toString());
});

module.exports = router;

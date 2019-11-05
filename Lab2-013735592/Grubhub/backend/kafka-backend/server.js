var connection = new require('./kafka/Connection');
//topics files
// client topics files
var ClientLogin = require('./services/clientLogin');
var ClientSignup = require('./services/clientSignup');
var UserUpdate = require('./services/userUpdate');
var UserUpdateName = require('./services/userUpdateName');
var UserUpdateEmail = require('./services/userUpdateEmail');
var UserUpdatePassword = require('./services/userUpdatePassword');

// owner topic files
var OwnerLogin = require('./services/ownerLogin');
var OwnerSignup = require('./services/ownerSignup');
var OwnerUpdate = require('./services/ownerUpdate');

var mongoose = require("mongoose");

function handleTopicRequest(topic_name, fname) {
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name + " ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);

        fname.handle_request(data.data, function (err, res) {
            console.log('after handle', res);
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                console.log(data);
            });
            return;
        });

    });
}
// Add your TOPICs here

// client topics
handleTopicRequest("client_login", ClientLogin)
handleTopicRequest("client_signup", ClientSignup)
handleTopicRequest("user_update", UserUpdate)
handleTopicRequest("user_update_name", UserUpdateName)
handleTopicRequest("user_update_email", UserUpdateEmail)
handleTopicRequest("user_update_password", UserUpdatePassword)


// owner topics
handleTopicRequest("owner_login", OwnerLogin)
handleTopicRequest("owner_signup", OwnerSignup)
handleTopicRequest("owner_update", OwnerUpdate)
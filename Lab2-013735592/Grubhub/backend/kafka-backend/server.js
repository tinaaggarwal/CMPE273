var connection = new require('./kafka/Connection');
//topics files
// client topics files
var ClientLogin = require('./services/clientLogin');
var ClientSignup = require('./services/clientSignup');
var UserUpdate = require('./services/userUpdate');
var UserUpdateName = require('./services/userUpdateName');
var UserUpdateEmail = require('./services/userUpdateEmail');
var UserUpdatePassword = require('./services/userUpdatePassword');
var AddressUpdate = require('./services/addressUpdate');
var UserAddAddress = require('./services/userAddAddress');
var UserUpdateAddress = require('./services/userUpdateAddress');
var UserUpdateProfileImage = require('./services/userUpdateProfileImage');
var RestaurantList = require('./services/restaurantList');
var MenuItems = require('./services/menuItems');
var UpcomingOrdersForClient = require('./services/upcomingOrdersForClient');
var PastOrdersForClient = require('./services/pastOrdersForClient');

// owner topic files
var OwnerLogin = require('./services/ownerLogin');
var OwnerSignup = require('./services/ownerSignup');
var OwnerUpdate = require('./services/ownerUpdate');
var OwnerUpdateProfile = require('./services/ownerUpdateProfile');
var OwnerUpdateProfileImage = require('./services/ownerUpdateProfileImage');
var OwnerUpdateRestImage = require('./services/ownerUpdateRestImage');
var OwnerSections = require('./services/ownerSections');

var OwnerItemsList = require('./services/ownerItemsList');
var UpcomingOrdersForOwner = require('./services/upcomingOrdersForOwner');
var PastOrdersForOwner = require('./services/pastOrdersForOwner');

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
handleTopicRequest("address_update", AddressUpdate)
handleTopicRequest("user_add_address", UserAddAddress)
handleTopicRequest("user_update_address", UserUpdateAddress)
handleTopicRequest("user_update_profile_image", UserUpdateProfileImage)
handleTopicRequest("restaurant_list", RestaurantList)
handleTopicRequest("menu_items", MenuItems)
handleTopicRequest("upcoming_orders_for_client", UpcomingOrdersForClient)
handleTopicRequest("past_orders_for_client", PastOrdersForClient)

// owner topics
handleTopicRequest("owner_login", OwnerLogin)
handleTopicRequest("owner_signup", OwnerSignup)
handleTopicRequest("owner_update", OwnerUpdate)
handleTopicRequest("owner_update_profile", OwnerUpdateProfile)
handleTopicRequest("owner_update_profile_image", OwnerUpdateProfileImage)
handleTopicRequest("owner_update_rest_image", OwnerUpdateRestImage)
handleTopicRequest("owner_sections", OwnerSections)

handleTopicRequest("owner_items_list", OwnerItemsList)
handleTopicRequest("upcoming_orders_for_owner", UpcomingOrdersForOwner)
handleTopicRequest("past_orders_for_owner", PastOrdersForOwner)

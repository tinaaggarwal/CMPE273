const mongoose = require("mongoose");
// const options = {
//  poolSize: 100
// };
mongoose.Promise = global.Promise;
//"mongodb://localhost:27017/HomeAway",
// "mongodb://sojanmathew:sojanm28@ds133920.mlab.com:33920/homeaway",
const uri = 'mongodb+srv://root:root.1234@grubhub-u2eiw.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const connection  = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection established successfully');
})
module.exports = {mongoose};
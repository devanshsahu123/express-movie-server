const mongoose = require('mongoose');

// MongoDB container details
const containerName = 'my-mongo';
const username = 'root';
const password = 'mysecretpassword';
const host = 'localhost'; // Assuming you are running locally
const port = '27018';
const databaseName = 'movieDB'; // Replace with your actual database name

// Connection URL format for MongoDB
const mongoURL = `mongodb://${username}:${password}@${host}:${port}`;

module.exports = mongoose.connect(mongoURL, {
    dbName: databaseName
}).then(() => {
    console.log('mongo is connected');
}).catch((error) => {
    console.log(error);
});

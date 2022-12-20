require('dotenv').config();

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

async function connect() {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@netflix-clone.rzhg9cp.mongodb.net/netflix-clone?retryWrites=true&w=majority`
        );
        console.log('Connect successfully');
    } catch (error) {
        console.log(error);
    }
}

module.exports = { connect };

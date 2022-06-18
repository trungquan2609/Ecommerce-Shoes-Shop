const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connect Successfully!!!');
    } catch (error) {
        console.log('Connect Failure!!!')
    }
}

module.exports = { connect };

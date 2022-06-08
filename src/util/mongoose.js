module.exports = {
    mutipleMongooseToObject: function (mongooses) {
        return mongooses.map(mongooses => mongooses.toObject());
    },
    mongoosesToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    }
};

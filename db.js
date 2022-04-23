const mongoose = require ( 'mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
        longurl: {
            type : String,
            required : true
        },
        shorturl: {
            type :String,
            required : true
        }
});

module.exports = mongoose.model('db',schema);
const mongoose = require('mongoose');
const words = new mongoose.Schema({
    word:{
        type: String,
        required: true,
    }
});

module.exports = {
    words   :   mongoose.model('Words', words),
};
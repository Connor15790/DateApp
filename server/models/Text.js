const mongoose = require('mongoose');

const TextSchema = new mongoose.Schema({
    question: {
        type: String,
        require: true
    },
    answer: {
        type: String,
        require: true
    }
});

const Text = mongoose.model('Text', TextSchema);

module.exports = Text;
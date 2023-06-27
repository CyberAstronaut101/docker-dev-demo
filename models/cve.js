const mongoose = require('mongoose');

const cveSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    references: {
        type: [String],
        required: true
    },
    cvss_score: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Cve', cveSchema);

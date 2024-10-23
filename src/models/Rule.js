const mongoose = require('mongoose');

const ruleSchema = new mongoose.Schema({
    ruleString: { type: String, required: true }, // The original rule string for reference
    ast: { type: Object, required: true }, // The AST representation of the rule
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Rule', ruleSchema);

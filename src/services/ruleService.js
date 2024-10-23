const { tokenize } = require('../utils/tokeniser');
const { parseTokens } = require('../utils/parser');
const Rule = require('../models/Rule');


exports.createARule = async (req, res) => {
    const ruleString = req.body;
    console.log(ruleString);
    console.log(typeof ruleString);
    try {
        const tokens = tokenize(ruleString);
        const ast = parseTokens(tokens);

        const newRule = new Rule({ ruleString, ast });
        const savedRule = await newRule.save();
        return res.json({ success: true, ruleId: savedRule._id, ast: ast });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: 'Invalid rule string', message: error.message });
    }
}
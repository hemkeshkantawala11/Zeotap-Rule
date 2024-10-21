const { tokenize } = require('../utils/tokeniser');
const { parseTokens } = require('../utils/parser');


exports.createARule = (req, res) => {
    const  ruleString = req.body;
    console.log(ruleString);
    console.log(typeof ruleString);
    try {
        const tokens = tokenize(ruleString);
        const ast = parseTokens(tokens);

        return res.status(200).json({ success: true, ast });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: error.message });
    }
}
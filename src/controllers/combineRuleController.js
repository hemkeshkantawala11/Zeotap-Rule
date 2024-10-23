const { tokenize } = require('../utils/tokeniser');
const { parseTokens } = require('../utils/parser');
const ASTNode = require('../models/ASTNodes');
const Rule = require('../models/Rule');

exports.combineRules = async (req, res) => {
    const ruleStrings = req.body.rules;
    console.log(ruleStrings);
    try {
        const combinedAST = combine_rules(ruleStrings);

        // Save the combined rule to the database
        const combinedRuleString = ruleStrings.join(' AND ');
        const newRule = new Rule({ ruleString: combinedRuleString, ast: combinedAST });
        const savedRule = await newRule.save();

        res.json({ success: true, ruleId: savedRule._id, ast: combinedAST });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

function combine_rules(ruleStrings) {
    const asts = ruleStrings.map(rule => {
        const tokens = tokenize(rule);
        return parseTokens(tokens);
    });

    // Combine the ASTs using AND operators
    return combineASTs(asts);
}

function combineASTs(asts) {
    if (asts.length === 0) return null;
    if (asts.length === 1) return asts[0];

    const root = new ASTNode('operator', 'AND');
    root.left = asts[0];
    root.right = combineASTs(asts.slice(1));
    return root;
}
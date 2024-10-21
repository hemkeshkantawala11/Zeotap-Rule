const { tokenize } = require('../utils/tokeniser');
const { parseTokens } = require('../utils/parser');
const ASTNode = require('../models/ASTNodes');

// exports.createRule = (req, res) => {
//     const ruleString = req.body.ruleString;
//     console.log(ruleString);
//
//     try {
//         const tokens = tokenize(ruleString);
//         const ast = parseTokens(tokens);
//         res.json({ success: true, ast });
//     } catch (error) {
//         res.status(400).json({ success: false, message: error.message });
//     }
// };

exports.combineRules = (req, res) => {
    const ruleStrings = req.body.rules;
    console.log(ruleStrings);
    try {
        const combinedAST = combine_rules(ruleStrings);
        res.json({ success: true, ast: combinedAST });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

function combine_rules(ruleStrings) {
    const asts = ruleStrings.map(rule => {
        const tokens = tokenize(rule);
        return parseTokens(tokens);
    });

    // Combine the ASTs (assuming they are binary trees)
    // This example uses a simple strategy: combine them with OR operators
    return combineASTs(asts);
}

// Function to combine ASTs (this is a simplified example)
function combineASTs(asts) {
    if (asts.length === 0) return null;
    if (asts.length === 1) return asts[0];

    const root = new ASTNode('operator', 'AND');
    root.left = asts[0];
    root.right = combineASTs(asts.slice(1));
    return root;
}

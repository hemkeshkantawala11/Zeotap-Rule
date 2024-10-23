
const express = require('express');
const ruleController = require('../controllers/ruleController');
const rulesController = require('../controllers/combineRuleController');
const evaluateAST = require('../utils/evaluator');
const Rule = require('../models/Rule');
const router = express.Router();

router.post('/create-rule', ruleController.createRule);

router.post('/combine_rules', rulesController.combineRules);

// POST /evaluate-rule
router.post('/evaluate-rule', async (req, res) => {
    const { ruleId, data } = req.body;
    console.log("Data: " + JSON.stringify(data));

    try {
        console.log("Rule Id: " + ruleId);

        const rule = await Rule.findById(ruleId);
        console.log("rule" +  rule);

        if (!rule) {
            return res.status(404).json({ error: 'Rule not found' });
        }

        const result = evaluateAST.evaluateNode(rule.ast, data);
        res.json({ result });
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

router.get('/get-all-rules', async (req, res) => {
    try {
        const rules = await Rule.find();
        res.json(rules);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;

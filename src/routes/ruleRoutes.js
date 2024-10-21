
const express = require('express');
const ruleController = require('../controllers/ruleController');
const rulesController = require('../controllers/combineRuleController');

const router = express.Router();

// Route to create a rule and return the AST
router.post('/create-rule', ruleController.createRule);

router.post('/combine_rules', rulesController.combineRules); // Add this line


module.exports = router;

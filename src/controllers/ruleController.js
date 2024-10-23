const ruleService = require('../services/ruleService');

exports.createRule = (req, res) => {
    ruleService.createARule(req, res).then(r => {
        res.json(r);
    });
};
function tokenize(ruleString) {
    return ruleString.match(/(?:[^\s()]+|'[^']*')+|[()]/g);
}

module.exports = { tokenize };
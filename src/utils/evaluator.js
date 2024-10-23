function evaluateNode(node, data) {
    console.log(`Evaluating node: ${JSON.stringify(node, null, 2)}`); // Log the node being processed

    if (node.type === 'operator') {
        console.log(`Operator detected: ${node.value}`);

        if (node.value === 'AND') {
            return evaluateNode(node.left, data) && evaluateNode(node.right, data);
        } else if (node.value === 'OR') {
            return evaluateNode(node.left, data) || evaluateNode(node.right, data);
        }
    } else if (node.type === 'operand') {
        const { attribute, operator, value } = node.value;
        const userValue = data[attribute];

        console.log(`Operand: ${attribute} ${operator} ${value}, User Value: ${userValue}`);


        if (userValue === undefined) {
            console.log(`Attribute ${attribute} is missing in data`);

            return false; // If the attribute is missing from data, return false
        }

        // Handle different types of operators
        switch (operator) {
            case '>':
                return userValue > value;
            case '<':
                return userValue < value;
            case '>=':
                return userValue >= value;
            case '<=':
                return userValue <= value;
            case '=':
            case '==':
                return userValue === value; // Strict equality for string comparison
            case '!=':
                return userValue !== value;
            default:
                throw new Error(`Unknown operator: ${operator}`);
        }
    }

    throw new Error(`Unknown node type: ${node.type}`);
}

module.exports = { evaluateNode };

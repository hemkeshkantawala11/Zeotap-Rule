const ASTNode = require('../models/astNodes');

function createOperandNode(tokens) {
    const [attribute, operator, value] = tokens;
    return new ASTNode('operand', { attribute, operator, value });
}

// Function to parse the tokens into an AST
function parseTokens(tokens) {
    const stack = [];

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        if (token === "(") {
            stack.push(token); // Handle open parenthesis
        } else if (token === ")") {
            const expr = [];
            while (stack.length > 0 && stack[stack.length - 1] !== "(") {
                expr.unshift(stack.pop());
            }
            stack.pop(); // Remove the "("
            const node = buildASTFromExpr(expr);
            if (node.error) {
                return { error: node.error };
            }
            stack.push(node);
        } else {
            if (!isValidToken(token)) {
                return { error: `Invalid token: ${token}` };
            }
            stack.push(token); // Push regular tokens
        }
    }

    const ast = buildASTFromExpr(stack);
    if (ast.error) {
        return { error: ast.error };
    }
    return ast;
}

// Function to build AST from an expression
function buildASTFromExpr(expr) {
    if (expr.length === 1 && expr[0] instanceof ASTNode) {
        return expr[0];  // If it's already an ASTNode, return it
    }

    for (let i = 0; i < expr.length; i++) {
        if (expr[i] === "AND" || expr[i] === "OR") {
            const operator = expr[i];
            const leftExpr = expr.slice(0, i);
            const rightExpr = expr.slice(i + 1);

            const node = new ASTNode('operator', operator);
            node.left = buildASTFromExpr(leftExpr);
            node.right = buildASTFromExpr(rightExpr);
            if (node.left.error || node.right.error) {
                return { error: node.left.error || node.right.error };
            }
            return node;
        } else if (expr[i] !== "AND" && expr[i] !== "OR" && isOperator(expr[i])) {
            return { error: `Invalid operator: ${expr[i]}` };
        }
    }

    if (expr.length === 3) {
        return createOperandNode(expr);
    }

    return { error: "Invalid expression" };
}

function isValidToken(token) {
    // Add logic to validate tokens
    const validOperators = ["AND", "OR", ">", "<", ">=", "<=", "=", "==", "!="];
    return validOperators.includes(token) || /^[a-zA-Z0-9_]+$/.test(token);
}

function isOperator(token) {
    const validOperators = ["AND", "OR"];
    return validOperators.includes(token);
}

module.exports = { parseTokens };
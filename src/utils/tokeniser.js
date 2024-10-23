// src/utils/tokenizer.js

function tokenize(ruleString) {
    const tokens = [];
    let currentToken = '';

    for (let i = 0; i < ruleString.length; i++) {
        const char = ruleString[i];

        if (char === ' ' || char === '(' || char === ')') {
            if (currentToken.length > 0) {
                tokens.push(getCorrectType(currentToken)); // Use the helper function to process tokens
                currentToken = '';
            }
            if (char !== ' ') {
                tokens.push(char); // Add parentheses as separate tokens
            }
        } else {
            currentToken += char;
        }
    }

    if (currentToken.length > 0) {
        tokens.push(getCorrectType(currentToken)); // Process any remaining token
    }

    return tokens;
}

// Helper function to detect if a token is a number or string
function getCorrectType(token) {
    // Try to convert the token to a number
    const parsedNumber = Number(token);

    // If it's a valid number, return it as a number type
    if (!isNaN(parsedNumber)) {
        return parsedNumber;
    }

    // Otherwise, return the token as a string
    return token;
}

module.exports = { tokenize };

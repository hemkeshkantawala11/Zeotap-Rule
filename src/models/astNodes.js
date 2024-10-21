class ASTNode {
    constructor(type, value = null) {
        this.type = type;  // "operator" for AND/OR, "operand" for conditions
        this.value = value;  // Holds the condition or operator
        this.left = null;    // Left child node
        this.right = null;   // Right child node
    }

    print(indent = 0) {
        console.log(`${' '.repeat(indent)}Node(${this.type}, ${this.value})`);
        if (this.left) this.left.print(indent + 2);
        if (this.right) this.right.print(indent + 2);
    }
}

module.exports = ASTNode;

# Rule Evaluation System

## Description
The Rule Evaluation System is a Node.js application that allows users to create, combine, and evaluate rules based on Abstract Syntax Trees (AST). The system supports logical operators like AND, OR, and comparison operators such as >, <, >=, <=, =, ==, and !=.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)

## Installation

### Prerequisites
- Node.js (>=14.x)
- npm (>=6.x)

### Steps
1. Clone the repository:
    ```sh
    git clone https://github.com/hemkeshkantawala11/rule-evaluation-system.git
    cd rule-evaluation-system
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add the necessary environment variables.

4. Start the server:
    ```sh
    npm start
    ```

## Usage

### Creating a Rule
To create a rule, send a POST request to `/create-rule` with the rule string in the body.

Example:
```sh
curl -X POST http://localhost:3000/create-rule -d '{"ruleString": "(age > 18) AND (income > 50000)"}' -H "Content-Type: application/json"
```

### Combining Rules
To combine rules, send a POST request to /combine_rules with the rule IDs and the logical operator.  

Example:
```sh
curl -X POST http://localhost:3000/combine_rules -d '{"ruleIds": ["ruleId1", "ruleId2"], "operator": "AND"}' -H "Content-Type: application/json"
```

### Evaluating A Rule

To evaluate a rule, send a POST request to /evaluate-rule with the rule ID and the data.  

Example:
```sh
curl -X POST http://localhost:3000/evaluate-rule -d '{"ruleId": "ruleId1", "data": {"age": 25, "income": 60000}}' -H "Content-Type: application/json"
```

## API Endpoints

### POST /create-rule

- **Description:** Creates a new rule.
- **Request Body:** ```sh { "ruleString": "<rule_string>" } ```
- **Response:**  ```sh{ "success": true, "ruleId": "<rule_id>", "ast": <ast_object> }    ```

### POST /combine-rules

- **Description:** Combines multiple rules using a logical operator.
- **Request Body:** ```sh { "rules": ["rule string 1","rule string 2", ...]} ```
- **Response:**  ```sh{ "success": true, "combinedRuleId": "<combined_rule_id>" } ```

### POST /evaluate-rule

- **Description:** Evaluates a rule with the provided data.
- **Request Body:** ```sh { "ruleId": "<rule_id>", "data": { <attribute>: <value>, ... } }```
- **Response:**  ```sh { "result": <evaluation_result> } ```

### GET /get-all-rules

- **Description:** Retrieves all rules.
- **Response:**  ```sh [ { "ruleId": "<rule_id>", "ruleString": "<rule_string>", "ast": <ast_object> }, ... ] ```

### DELETE /delete-rule/:id

- **Description:** Deletes a rule by ID.
- **Response:**  ```sh{ "success": true }```

## Error Handling

Errors are handled gracefully and returned as JSON responses with appropriate HTTP status codes.  

Example:
```sh
{
    "error": "Invalid rule string",
    "message": "Invalid token: ANDW"
}
```

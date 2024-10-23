const express = require('express');
const app = express();
const port = 3000;
const Node = require('./src/models/astNodes');
const mongoose = require('mongoose');

const rulesRoutes = require('./src/routes/ruleRoutes');

app.use(express.json());
app.use(express.text());

mongoose.connect('mongodb+srv://hemkesh123kantawala:mongodbpw@test.o1jxyno.mongodb.net/?retryWrites=true&w=majority&appName=test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Failed to connect to MongoDB', err);
    });



app.get('/', (req, res) => {
    res.send('Rule Engine with AST is running!');
});

app.get('/test-ast', (req, res) => {

    const root = new Node('operator', 'AND');
    root.left = new Node('operand', 'age > 30');
    root.right = new Node('operand', "department = 'Sales'");

    root.print();

    res.json({ message: 'AST created, check your console!' });
});

app.use('/api/rules', rulesRoutes);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

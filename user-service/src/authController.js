const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let users = []; // In-memory user store for simplicity

const register = (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    users.push({ username, password: hashedPassword });
    res.status(201).send({ message: 'User registered successfully' });
};

const login = (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ username: user.username }, 'secret', { expiresIn: '1h' });
        res.send({ message: 'Login successful', token });
    } else {
        res.status(401).send({ message: 'Invalid credentials' });
    }
};

module.exports = { register, login };

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// function for user registration

const userSignUp = (req, res) => {
    const { name, email, password } = req.body;
    const newUser = new User({
        name,
        email,
        password: bcrypt.hashSync(password, 10)
    });
    newUser.save()
        .then((data) => {
            res.json({ message: 'user registeration successful' })
        })
        .catch((error) => {
            return res.status(500).json({ error: 'error ocuuring on user registration' })
        })
}


// function for user login

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    const findedUser = await User.findOne({ email });
    if (findedUser) {
        //check is the password match
        const passwordTrue = bcrypt.compareSync(password, findedUser.password);
        if (passwordTrue) {
            //creating jwt token
            jwt.sign({ id: findedUser._id, email: findedUser.email, name: findedUser.name }, JWT_SECRET_KEY, {}, (err, token) => {
                if (err) {
                    throw err
                } else {
                    res.cookie('token', token, { sameSite: 'None', secure: true }).json(findedUser)
                }
            })
        } else {
            res.status(422).json({ error: 'incorrect password' })
        }
    } else {
        res.status(404).json({ error: 'user not found' })
    }
}


// function for user profile authentication

const userAuthentication = (req, res) => {
    const { token } = req.cookies;
    if (token) {
        //jwt token verification
        jwt.verify(token, JWT_SECRET_KEY, async (err, decodedData) => {
            if (err) {
                res.status(400).json({ error: err })
            }
            const { _id, email, name } = await User.findOne({ email: decodedData.email })
            res.json({ _id, email, name })
        })
    } else {
        res.json(null)
    }
}


// function for user logout

const userLogout = (req, res) => {
    res.cookie('token', '').json(true);
};


module.exports = {
    userSignUp,
    userLogin,
    userAuthentication,
    userLogout
}
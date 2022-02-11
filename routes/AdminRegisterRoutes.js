const express = require('express');
const router = express.Router();
const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt_decode = require('jwt-decode');

router.use(cors());

process.env.SECRET_KEY = 'secret';

router.post('/register', async (req,res) => {
    const userData = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    await db.dope.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if(!user) {
            bcrypt.hash(req.body.password, 10, (err,hash) => {
                userData.password = hash;
                db.dope.create(userData).then(response => {
                    res.send(response.email + 'Registered');
                }).catch(err => {
                    res.send(err.message);
                })
            })
        } else {
            res.send('User already exists');
        }
    }).catch(err => {
        res.send(err.message);
    })
})

router.post('/login', async (req,res) => {
    await db.dope.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if(user) {
            if(bcrypt.compareSync(req.body.password,user.password)) {
                let token = jwt.sign(user.username,process.env.SECRET_KEY);
                let email = user.email;
                res.send({token,email});
            } else {
                res.send('Password mismatch');
            }
        } else {
            res.send('User not exists');
        }
    }).catch(err => {
        res.send(err.message);
    })
})

const valid = (req,res,next) => {
    const token = req.header("authentication");
    req.token = token;
    next();
}

router.post("/getall",valid,async (req,res) => {
    jwt.verify(req.token,"secret",async (err,data) => {
        if(err) {
            res.sendStatus(403);
        }
        else{
            const token = req.headers.authentication;
            const decoded  =  jwt.decode(token);
            const user = await db.dope.findOne({
                where: {
                    username: decoded
                }
            });
            res.send(user);
        }
    })
})

router.delete("/delete/:id",valid,async (req,res) => {
    jwt.verify(req.token,"secret",async (err,data) => {
        if(err) {
            res.sendStatus(403);
        }
        else{
            const user = await db.dope.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.send("deleted");
        }
    })
})

module.exports = router;
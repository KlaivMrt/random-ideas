const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

router.post("/signup", async (req, res) => {
    try {
        const username = req.body.username;
        const pass = req.body.password;
        const email = req.body.email;

        const check = await User.findOne({email: email});
        if(check) {
            res.status(409).json({success: false, error: "This email has already been used"});
            return;
        }

        const password = await bcrypt.hash(pass, 12);

        const newUser = new User({username, password, email});
        await newUser.save();

        const token = jwt.sign({
            userId: newUser._id,
            email: newUser.email,
        },
        process.env.SECRET,
        {expiresIn: "1h"});

        res.json({
            success: true,
            token,
            data: {id: newUser._id, username: newUser.username, email: newUser.email}
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, error: "something went wrong"});
    }
});

router.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const pass = req.body.password;

        const response = await User.findOne({email: email});

        if(!response) {
            res.status(404).json({
                sucess: false,
                error: "user not found"
            });
            return;
        }

        const check = await bcrypt.compare(pass, response.password);

        if(!check) {
            res.status(404).json({
                success: false,
                error: "wrong password"
            });
            return;
        }
        
        const token = jwt.sign({
            email: response.email,
            userId: response._id,
        },
        process.env.SECRET,
        {expiresIn: "1h"});

        res.json({
            success: true,
            token,
            data: {id: response._id, username: response.username, email: response.email},
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, error: "something went wrong"});
    }
});

module.exports = router;

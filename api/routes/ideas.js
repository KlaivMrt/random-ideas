const express = require("express");
const router = express.Router();
const Idea = require("../models/Idea");
const isAuth = require("../middleware/auth");

// get all ideas
router.get("/", isAuth, async (req, res) => {
    try {
        const ideas = await Idea.find({creator: req.userId});

        res.json({
            sucess: true,
            data: ideas,
        });
    
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, error: "something went wrong"});
    }
});

// get single idea
router.get("/:id", isAuth, async (req, res) => {

    try {
        const idea = await Idea.findById(req.params.id);
        if(!idea) {
            res.status(404).json({success: false, error: "resource not found"});
        } else {
            res.json({success: true, data: idea})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, error: "something went wrong"});
    }
});

// add idea
router.post("/", isAuth, async (req, res) => {
    const idea = new Idea({
        text: req.body.text,
        tag: req.body.tag,
        username: req.body.username,
        creator: req.userId
    })
    
    try {
        const saved = await idea.save();

        res.json({
            success: true,
            data: saved
        });    

    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, error: "something went wrong"});
    }
})

// update idea
router.put("/:id", isAuth, async (req, res) => {
    // const spaces = /^[ ]+$/;

    try {
        const updated = await Idea.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    text: req.body.text,
                    tag: req.body.tag
                }
            }
        );
        res.json({success: true, data: updated})
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, error: "something went wrong"});
    }
});

// delete idea
router.delete("/:id", isAuth, async (req, res) => {
    try {
        await Idea.findByIdAndDelete(req.params.id);
        res.json({success: true});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, error: "something went wrong"});

    }
});


module.exports = router;

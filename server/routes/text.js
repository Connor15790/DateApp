const express = require('express');
const router = express.Router();
const Text = require('../models/Text');
const { body, validationResult } = require('express-validator');

router.get('/gettext', async (req, res) => {
    try {
        const text = await Text.find();
        res.json(text);
    } catch (error) {
        console.error('Error fetching text:', error);
        res.status(500).send('Server error');
    }
});

router.post('/gettextbyid/:id', async (req, res) => {
    try {
        const text = await Text.findById(req.params.id);

        if(!text) {
            return res.status(404).json({message: "Text not found"});
        }

        res.json(text);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching book', error });
    }
})

router.post('/createtext', [
    body("question", "Enter a valid question").isLength({ min: 5 }),
    body("answer", "Enter a valid answer").isLength({ min: 5 })
], async (req, res) => {
    try {
        const {question, answer} = req.body;

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const text = new Text({
            question, answer
        })

        const saveText = await text.save();

        res.json(saveText);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;
const express = require('express')
const router = express.Router()
const Practitioner = require('../models/practitioner.js');

// Show all practitoners route
router.get('/', async (req, res) => {
    try{
        const practitioner = await Practitioner.find({})
        res.status(200).json(practitioner)
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
}); 
// --- Create a practitoner route
router.post('/', async (req, res) => {
    console.log(req.body)
    try{
        const practitoner = await Practitioner.create(req.body);
        res.status(201).json(practitoner);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})
// --- Show a single practitoner route
router.get('/:id', async (req, res) => {
    try {
      const practitoner = await Practitioner.findById(req.params.id);
      res.status(200).json(practitoner); 
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
// --- Edit a practitoner route
router.put('/:id', async (req, res) => {
    try {
        const updatedpractitoner = await Practitioner.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if(updatedpractitoner) {
            res.status(200).json(updatedpractitoner);
        } else {
            res.status(404).json({ message: "Practitoner not found" });
        }
    } catch(error){
        res.status(500).json(error);
    }
});
// --- Delete a practitoner route
router.delete('/:id', async (req, res) => {
    try {
        const practitoner = await Practitioner.findByIdAndDelete(req.params.id);
        res.json(practitoner)
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });

module.exports = router;
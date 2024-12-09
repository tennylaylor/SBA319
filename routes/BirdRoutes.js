const express = require("express");
const Bird = require("../models/Bird"); // Import the Bird model

const router = express.Router();

// GET all birds
router.get("/", async (req, res) => {
  try {
    const birds = await Bird.find();
    res.status(200).json(birds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new bird
router.post("/", async (req, res) => {
  try {
    const bird = new Bird(req.body);
    await bird.save();
    res.status(201).json(bird);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET a bird by ID
router.get("/:id", async (req, res) => {
  try {
    const bird = await Bird.findById(req.params.id);
    if (!bird) return res.status(404).json({ message: "Bird not found" });
    res.status(200).json(bird);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT (update) a bird by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedBird = await Bird.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBird)
      return res.status(404).json({ message: "Bird not found" });
    res.status(200).json(updatedBird);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a bird by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedBird = await Bird.findByIdAndDelete(req.params.id);
    if (!deletedBird)
      return res.status(404).json({ message: "Bird not found" });
    res.status(200).json({ message: "Bird deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

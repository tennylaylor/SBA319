const express = require("express");
const Fish = require("../models/Fish"); // Import the Fish model

const router = express.Router();

// GET all fish
router.get("/", async (req, res) => {
  try {
    const fish = await Fish.find();
    res.status(200).json(fish);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new fish
router.post("/", async (req, res) => {
  try {
    const fish = new Fish(req.body);
    await fish.save();
    res.status(201).json(fish);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET a fish by ID
router.get("/:id", async (req, res) => {
  try {
    const fish = await Fish.findById(req.params.id);
    if (!fish) return res.status(404).json({ message: "Fish not found" });
    res.status(200).json(fish);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT (update) a fish by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedFish = await Fish.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedFish)
      return res.status(404).json({ message: "Fish not found" });
    res.status(200).json(updatedFish);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a fish by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedFish = await Fish.findByIdAndDelete(req.params.id);
    if (!deletedFish)
      return res.status(404).json({ message: "Fish not found" });
    res.status(200).json({ message: "Fish deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a bird in POST
router.post("/delete", async (req, res) => {
  try {
    const { id } = req.body; // Get ID from form data
    const deletedFish = await Fish.findByIdAndDelete(id);
    if (!deletedFish) return res.status(404).send("Fish not found");
    res.send("Fish deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;

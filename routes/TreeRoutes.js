const express = require("express");
const Tree = require("../models/Tree"); // Import the Tree model

const router = express.Router();

// GET all trees
router.get("/", async (req, res) => {
  try {
    const trees = await Tree.find();
    res.status(200).json(trees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new tree
router.post("/", async (req, res) => {
  try {
    const tree = new Tree(req.body);
    await tree.save();
    res.status(201).json(tree);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET a tree by ID
router.get("/:id", async (req, res) => {
  try {
    const tree = await Tree.findById(req.params.id);
    if (!tree) return res.status(404).json({ message: "Tree not found" });
    res.status(200).json(tree);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT (update) a tree by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedTree = await Tree.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedTree)
      return res.status(404).json({ message: "Tree not found" });
    res.status(200).json(updatedTree);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a tree by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedTree = await Tree.findByIdAndDelete(req.params.id);
    if (!deletedTree)
      return res.status(404).json({ message: "Tree not found" });
    res.status(200).json({ message: "Tree deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a bird via POST (for form submissions)
router.post("/delete", async (req, res) => {
  try {
    const { id } = req.body; // Get ID from form data
    const deletedTree = await Tree.findByIdAndDelete(id);
    if (!deletedTree) return res.status(404).send("Tree not found");
    res.send("Tree deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;

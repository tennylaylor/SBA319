const mongoose = require("mongoose");

const treeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    height: {
      type: Number,
      required: true,
      min: 1, // Minimum height in feet
    },
    age: {
      type: Number,
      default: 0, // Default age is 0 if not specified
    },
  },
  { timestamps: true }
);

//============================================================================

//============================================================================

treeSchema.index({ height: -1 }); // Index for sorting trees by height in descending order

module.exports = mongoose.model("Tree", treeSchema);

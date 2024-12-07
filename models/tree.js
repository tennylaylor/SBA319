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
      min: 1, // feet
    },
    age: {
      type: Number,
      default: 0, //  age is 0
    },
  },
  { timestamps: true }
);

treeSchema.index({ height: -1 }); // Index for sorting trees by height in descending order

module.exports = mongoose.model("tree", treeSchema);

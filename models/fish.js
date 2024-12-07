const mongoose = require("mongoose");

const fishSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    waterType: {
      type: String,
      required: true,
      enum: ["freshwater", "saltwater"],
    },
    size: {
      type: Number,
      min: 1,
      max: 500,
    },
  },
  { timestamps: true }
);

fishSchema.index({ waterType: 1 });

module.exports = mongoose.model("fish", fishSchema);

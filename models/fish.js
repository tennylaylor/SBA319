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
      enum: ["Freshwater", "Saltwater"], // Ensures consistency
    },
    size: {
      type: Number,
      min: 1, // Minimum size in inches
      max: 500, // Maximum size (e.g., whale shark)
    },
  },
  { timestamps: true }
);

fishSchema.index({ waterType: 1 }); // Index for frequent queries by water type

module.exports = mongoose.model("Fish", fishSchema);

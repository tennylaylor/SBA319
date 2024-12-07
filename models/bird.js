const mongoose = require("mongoose");

const birdSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Ensures bird names are unique
      trim: true,
    },
    habitat: {
      type: String,
      required: true,
    },
    diet: {
      type: String,
      enum: ["Herbivore", "Carnivore", "Omnivore"], // Limits allowed values
    },
  },
  { timestamps: true }
); // Adds createdAt and updatedAt timestamps

// Create an index on the name field for quick lookups
birdSchema.index({ name: 1 });

module.exports = mongoose.model("Bird", birdSchema);

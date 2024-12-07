const mongoose = require("mongoose");

const birdSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    habitat: {
      type: String,
      required: true,
    },
    diet: {
      type: String,
      enum: ["herbivore", "carnivore", "omnivore"],
    },
  },
  { timestamps: true }
);

birdSchema.index({ name: 1 });
module.exports = mongoose.model("bird", birdSchema);

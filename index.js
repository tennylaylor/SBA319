require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)

  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Sample route
app.get("/", (req, res) => res.send("API is working"));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

////====================================================================

const birds = require("./models/bird");
const fishs = require("./models/fish");
const trees = require("./models/tree");

// Sample data insertion (optional for testing)
async function insertSampleData() {
  try {
    await birds.create([
      { name: "Sparrow", habitat: "Urban", diet: "omnivore" },
    ]);
    await fishs.create([
      { name: "Clownfish", waterType: "saltwater", size: 4 },
    ]);
    await trees.create([{ name: "oak", height: 50, age: 100 }]);
    console.log("Sample data inserted successfully");
  } catch (error) {
    console.error("Error inserting sample data:", error.message);
  }
}

mongoose.connection.once("open", insertSampleData);

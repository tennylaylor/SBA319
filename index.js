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
  //    useNewUrlParser: true,
  //    useUnifiedTopology: true,  //no longer needed
  //  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Sample route
app.get("/", (req, res) => res.send("API is working"));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

////====================================================================

const Bird = require("./models/Bird");
const Fish = require("./models/Fish");
const Tree = require("./models/Tree");

// Sample data insertion (optional for testing)
async function insertSampleData() {
  try {
    await Bird.create([
      { name: "Sparrow", habitat: "Urban", diet: "Omnivore" },
    ]);
    await Fish.create([{ name: "Clownfish", waterType: "Saltwater", size: 4 }]);
    await Tree.create([{ name: "Oak", height: 50, age: 100 }]);
    console.log("Sample data inserted successfully");
  } catch (error) {
    console.error("Error inserting sample data:", error.message);
  }
}

async function insertSampleData() {
  try {
    // Clear the birds collection (optional for testing)
    await Bird.deleteMany({});
    // Insert new data
    await Bird.create([
      { name: "Sparrow", habitat: "Urban", diet: "Omnivore" },
    ]);
    console.log("Sample data inserted successfully");
  } catch (error) {
    console.error("Error inserting sample data:", error.message);
  }
}

mongoose.connection.once("open", insertSampleData);

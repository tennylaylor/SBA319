require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const BirdRoutes = require("./routes/BirdRoutes");

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

// CRUD routes2================================================================
app.use("/birds", BirdRoutes); //all bird route

//CRUD routes============test====================================================

// Import models
async function insertSampleData() {
  try {
    const Bird = require("./models/Bird");
    const Fish = require("./models/Fish");
    const Tree = require("./models/Tree");

    //Ceare Data
    await Bird.deleteMany({});
    await Fish.deleteMany({});
    await Tree.deleteMany({});

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

mongoose.connection.once("open", insertSampleData);
// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Get all birds
/*app.get("/bird", async (req, res) => {
  try {
    const birds = await bird.find(); // Use 'birds' for response
    res.status(200).json(birds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});*/

// Add a new bird
/*app.post("/bird", async (req, res) => {
  try {
    const bird = new Bird(req.body);
    await bird.save();
    res.status(201).json(bird);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});*/

//===================================================================

// Delete birds
/*app.delete("/bird/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBird = await bird.findByIdAndDelete(id);
    if (!deletedBird)
      return res.status(404).json({ message: "Bird not found" });
    res.status(200).json({ message: "Bird deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});*/

// Update a bird by ID

/*app.put("/bird/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBird = await bird.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBird)
      return res.status(404).json({ message: "Bird not found" });
    res.status(200).json(updatedBird);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

////====================================================================

// Sample data insertion (optional for testing)
async function insertSampleData() {
  try {
   

  //async function insertSampleData() {
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
}*/

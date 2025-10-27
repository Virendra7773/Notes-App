const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
.connect("mongodb+srv://virendrasinghchattarpura09:Viren_903@cluster0.rcjziiz.mongodb.net/?appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
const notesRoutes = require("./routes/notes");
app.use("/api/notes", notesRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Notes App Backend Running ✅");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

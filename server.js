const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

// MongoDB connection string
const mongoURI = "mongodb://localhost:27017/login_db"; 

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Define a simple User schema with password hashing
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: { type: String, unique: true },
  password: String,
  role: String,
});

// Middleware to hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);

// POST route for Signup
app.post("/signup", async (req, res) => {
  const { firstName, lastName, username, password, role } = req.body;

  try {
    const newUser = new User({ firstName, lastName, username, password, role });
    await newUser.save();
    res.status(201).send("User created successfully!");
  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).send("Error creating user: " + err.message);
  }
});

// POST route for Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log("Login request body:", req.body);

    const user = await User.findOne({ username });
    console.log("User found:", user);

    if (!user) {
      return res.status(400).send("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, "your-secret-key", {
      expiresIn: "1h",
    });

    // Send success message and token
    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).send("Error during login: " + err.message);
  }
});

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(403).send("Access denied");
  }

  jwt.verify(token, "your-secret-key", (err, user) => {
    if (err) {
      console.error("JWT verification error:", err.message);
      return res.status(403).send("Access denied");
    }

    req.user = user;
    next();
  });
};

// Protect routes with JWT middleware
app.get("/profile", authenticateJWT, (req, res) => {
  res.send("This is your profile page");
});

// GET route to fetch all users
app.get("/users", async (req, res) => {
    try {
      const users = await User.find({}, "-password"); // Excludes the 'password' field
      res.json(users);
    } catch (err) {
      res.status(500).send("Error fetching users: " + err.message);
    }
  });
  

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

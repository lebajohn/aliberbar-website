const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const SECRET = "mysecretkey";

// FAKE DATABASE (for now)
let bookings = [];

// ================= LOGIN =================
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    const token = jwt.sign({ role: "admin" }, SECRET);
    return res.json({ token });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

// ================= ADD BOOKING =================
app.post("/book", (req, res) => {
  const { name, date } = req.body;

  bookings.push({ name, date });

  res.json({ message: "Booking saved" });
});

// ================= GET BOOKINGS (PROTECTED) =================
app.get("/bookings", (req, res) => {
  const token = req.headers.authorization;

  if (!token) return res.status(403).json({ message: "No token" });

  try {
    jwt.verify(token, SECRET);
    res.json(bookings);
  } catch {
    res.status(403).json({ message: "Invalid token" });
  }
});

// ================= DELETE =================
app.delete("/bookings/:index", (req, res) => {
  const token = req.headers.authorization;

  try {
    jwt.verify(token, SECRET);
    bookings.splice(req.params.index, 1);
    res.json({ message: "Deleted" });
  } catch {
    res.status(403).json({ message: "Unauthorized" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
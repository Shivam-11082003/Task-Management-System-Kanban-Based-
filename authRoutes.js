const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

router.post("/register", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

router.put("/profile", auth, async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
  res.json(user);
});

router.delete("/profile", auth, async (req, res) => {
  await User.findByIdAndDelete(req.user.id);
  res.json({ message: "Profile deleted" });
});

module.exports = router;

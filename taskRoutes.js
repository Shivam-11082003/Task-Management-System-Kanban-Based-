const router = require("express").Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

router.use(auth);

router.post("/", async (req, res) => {
  const task = await Task.create({ ...req.body, userId: req.user.id });
  res.json(task);
});

router.get("/", async (req, res) => {
  const filter = { userId: req.user.id };
  if (req.query.status) filter.status = req.query.status;
  const tasks = await Task.find(filter);
  res.json(tasks);
});

router.put("/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;

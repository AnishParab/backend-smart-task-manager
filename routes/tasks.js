const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");

const router = express.Router();

// Create Task
router.post("/", auth, async (req, res) => {
	try {
		const { name, deadline, subtasks, priority } = req.body;
		const newTask = new Task({ user: req.user.userId, name, deadline, priority, subtasks });
		await newTask.save();
		res.status(201).json({ message: "Task added successfully!", task: newTask });
	} catch (error) {
		res.status(500).json({ error: "Error creating task" });
	}
});

// Get All Tasks for a User
router.get("/", auth, async (req, res) => {
	try {
		const tasks = await Task.find({ user: req.user.userId });
		res.json(tasks);
	} catch (error) {
		res.status(500).json({ error: "Error fetching tasks" });
	}
});

// Get Calendar Tasks (Sorted by Date)
router.get("/calendar", auth, async (req, res) => {
	try {
		const tasks = await Task.find({ user: req.user.userId }).sort({ deadline: 1 });
		res.json(tasks);
	} catch (error) {
		res.status(500).json({ error: "Error fetching calendar tasks" });
	}
});

module.exports = router;


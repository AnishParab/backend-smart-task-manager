const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

// Get task progress
router.get("/:taskId", async (req, res) => {
	try {
		const task = await Task.findById(req.params.taskId);
		if (!task) return res.status(404).json({ error: "Task not found" });

		const completedSubtasks = task.subtasks.filter(sub => sub.completed).length;
		const totalSubtasks = task.subtasks.length;
		const completionPercentage = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

		res.json({
			name: task.name,
			deadline: task.deadline,
			completed: task.completed,
			completionPercentage,
			subtasks: task.subtasks
		});
	} catch (error) {
		res.status(500).json({ error: "Error fetching task progress" });
	}
});

module.exports = router;


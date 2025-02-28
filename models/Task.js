const mongoose = require("mongoose");

const SubtaskSchema = new mongoose.Schema({
	name: { type: String, required: true },
	deadline: { type: Date, required: true },
	completed: { type: Boolean, default: false }
});

const TaskSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	name: { type: String, required: true },
	deadline: { type: Date, required: true },
	priority: { type: String, enum: ["Low", "Medium", "High", "Critical"], default: "Medium" },
	completed: { type: Boolean, default: false },
	subtasks: [SubtaskSchema]
}, { timestamps: true });

module.exports = mongoose.model("Task", TaskSchema);

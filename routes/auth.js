const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// ✅ Register User
router.post("/register", async (req, res) => {
	try {
		const { username, email, password } = req.body;
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({ username, email, password: hashedPassword });
		await newUser.save();
		res.status(201).json({ message: "User registered successfully!" });
	} catch (error) {
		res.status(500).json({ error: "Error registering user" });
	}
});

// ✅ Login User
router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(401).json({ error: "Invalid credentials" });
		}

		// ✅ Generate JWT Token
		const token = jwt.sign({ userId: user._id, isPremium: user.isPremium }, process.env.JWT_SECRET, { expiresIn: "7d" });

		res.json({ token, isPremium: user.isPremium });
	} catch (error) {
		res.status(500).json({ error: "Login error" });
	}
});

// ✅ Get User Info (Protected Route)
router.get("/user", authMiddleware, async (req, res) => {
	try {
		const user = await User.findById(req.user.userId);
		if (!user) return res.status(404).json({ error: "User not found" });

		res.json({
			name: user.username,
			xp: 350, // Dummy data for now
			streak: 37,
			progress: 35,
			activityData: [
				{ month: "Jan", tasks: 20 },
				{ month: "Feb", tasks: 30 },
				{ month: "Mar", tasks: 15 },
				{ month: "Apr", tasks: 40 },
				{ month: "May", tasks: 25 },
				{ month: "Jun", tasks: 35 },
			],
			aiInsights: ["Your most productive hours are 10 AM–1 PM."]
		});
	} catch (error) {
		res.status(500).json({ error: "Error fetching user data" });
	}
});

module.exports = router;

// WARN:

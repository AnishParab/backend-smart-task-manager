const express = require("express");
const axios = require("axios");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/generate-insight", auth, async (req, res) => {
	try {
		const payload = {
			"model": "mistralai/Mistral-7B-Instruct-v0.3",
			"messages": [
				{ "role": "user", "content": "Give me productivity insights" }
			],
			"max_tokens": 500
		};

		const headers = { "Authorization": `Bearer ${process.env.HF_API_KEY}` };
		const response = await axios.post("https://api-inference.huggingface.co/chat/completions", payload, { headers });

		res.json(response.data);
	} catch (error) {
		res.status(500).json({ error: "AI service error" });
	}
});

module.exports = router;


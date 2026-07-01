require("dotenv").config();
const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const AIModel = async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({
                success: false,
                message: "Prompt is required."
            });
        }

        if (typeof prompt !== "string") {
            return res.status(400).json({
                success: false,
                message: "Prompt must be a string."
            });
        }

        const cleanedPrompt = prompt.trim();

        if (cleanedPrompt.length < 15) {
            return res.status(400).json({
                success: false,
                message: "Prompt must be at least 15 characters long."
            });
        }

        if (cleanedPrompt.length > 1000) {
            return res.status(400).json({
                success: false,
                message: "Prompt cannot exceed 1000 characters."
            });
        }

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            max_tokens: 1200,
            messages: [
                {
                    role: "system",
                    content: `You are a professional AI fitness coach, nutritionist, and health advisor.

Your job is to help users become healthier, stronger, leaner, or gain muscle naturally.

Always provide:

1. Goal Analysis
2. Current Situation
3. Best Workout Plan
4. Cardio Recommendations
5. Strength Exercises
6. Stretching Routine
7. Weekly Workout Schedule
8. Diet Plan
9. Protein, Carbs, and Healthy Fats recommendations
10. Water Intake
11. Sleep Recommendation
12. Recovery Tips
13. Foods to Eat
14. Foods to Avoid
15. Daily Healthy Habits
16. Estimated Time to Reach Goal
17. Motivation

Keep answers professional, structured, and easy to understand.

Never recommend steroids, dangerous drugs, or unsafe practices.`
                },
                {
                    role: "user",
                    content: cleanedPrompt
                }
            ]
        });

        return res.status(200).json({
            success: true,
            message: "Response generated successfully.",
            response: completion.choices[0].message.content
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to generate response.",
            error: error.message
        });
    }
};

module.exports = { AIModel };
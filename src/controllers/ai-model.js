require("dotenv").config();

const Groq = require("groq-sdk");
const Profile = require("../models/profile");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const AIModel = async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!req.user || !req.user._id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        if (!prompt) {
            return res.status(400).json({
                success: false,
                message: "Prompt is required"
            });
        }

        if (typeof prompt !== "string") {
            return res.status(400).json({
                success: false,
                message: "Prompt must be a string"
            });
        }

        const cleanedPrompt = prompt.trim();

        if (cleanedPrompt.length < 15) {
            return res.status(400).json({
                success: false,
                message: "Prompt must contain at least 15 characters"
            });
        }

        if (cleanedPrompt.length > 1000) {
            return res.status(400).json({
                success: false,
                message: "Prompt cannot exceed 1000 characters"
            });
        }

        const profile = await Profile.findOne({
            userId: req.user._id
        });

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found"
            });
        }

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            max_tokens: 1500,
            messages: [
                {
                    role: "system",
                    content: `You are an expert AI fitness coach, certified nutritionist, personal trainer, strength coach, fat loss specialist and health advisor.

Always analyze the user's profile before answering.

The user's profile contains:
- Age
- Weight
- Height
- Sports Activity
- Sleep Duration

Based on the profile and the user's question, create a fully personalized plan.

Always answer using these sections:

1. Body Analysis
2. Current Fitness Assessment
3. Goal Analysis
4. BMI Estimate
5. Daily Calories Recommendation
6. Protein Recommendation
7. Carbohydrate Recommendation
8. Healthy Fat Recommendation
9. Water Intake
10. Personalized Workout Plan
11. Exercises with Sets and Repetitions
12. Cardio Plan
13. Warm-up Routine
14. Stretching Routine
15. Weekly Workout Schedule
16. Personalized Diet Plan
17. Foods to Eat
18. Foods to Avoid
19. Recovery Tips
20. Sleep Recommendation
21. Daily Healthy Habits
22. Estimated Time to Achieve the Goal
23. Motivation

Only recommend natural, healthy and scientifically supported advice.

Never recommend steroids, dangerous supplements or unsafe practices.`
                },
                {
                    role: "user",
                    content: `
User Profile

Age: ${profile.age}
Weight: ${profile.weight} kg
Height: ${profile.height}
Sports Activity: ${profile.sports}
Average Sleep: ${profile.sleep} hours

Analyze the user's current body and health based on this information.

User Request:

${cleanedPrompt}
`
                }
            ]
        });

        return res.status(200).json({
            success: true,
            message: "Response generated successfully",
            response: completion.choices[0].message.content
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to generate response",
            error: error.message
        });
    }
};

module.exports = {
    AIModel
};
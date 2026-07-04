import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Gemini AI setup
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// Test route
app.get("/", (req, res) => {
    res.send("🚀 SkillBridge AI Backend Running...");
});

// Test AI route
app.get("/test-ai", async (req, res) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Say hello to SkillBridge AI."
        });

        res.json({
            success: true,
            message: response.text
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// MAIN ROADMAP GENERATION ROUTE
app.post("/generate-roadmap", async (req, res) => {

    try {

        console.log("✅ Request received");

        const { name, education, skills, goal, hours, duration } = req.body;

        console.log("📥 User Data:", req.body);

        const prompt = `
You are an expert AI Career Mentor.

Create a personalized roadmap for:

Name: ${name}
Education: ${education}
Skills: ${skills}
Career Goal: ${goal}
Study Hours: ${hours} hours/day
Duration: ${duration}

Rules:
- Use simple English.
- Keep the response within 350 words.
- Use emojis.
- Separate each section clearly.
- You must NOT skip any section. All sections are required.

Format exactly like this:

🚀 CAREER GOAL
(Explain in 2-3 lines)

━━━━━━━━━━━━━━━━━━

🗓️ LEARNING ROADMAP

📅 Month 1
• Topic 1
• Topic 2
✅ Mini Project

📅 Month 2
• Topic 1
• Topic 2
✅ Mini Project

📅 Month 3
• Topic 1
• Topic 2
✅ Mini Project

━━━━━━━━━━━━━━━━━━

📚 FREE RESOURCES
🌐 Resource 1
📺 YouTube Channel
📖 Documentation

━━━━━━━━━━━━━━━━━━
💻 PROJECT IDEAS
🔥 Project 1
🔥 Project 2
🔥 Project 3

━━━━━━━━━━━━━━━━━━
📌 SKILLS REQUIRED (MANDATORY SECTION - DO NOT SKIP)

You MUST include this section.

List 4–6 important skills needed for this career goal.

Format:

📌 SKILLS REQUIRED
- Skill 1
- Skill 2
- Skill 3
- Skill 4

━━━━━━━━━━━━━━━━━━
📈 FUTURE JOBS & INDUSTRY OUTLOOK

- Role: Full Stack Developer
  Salary: ₹4 LPA - ₹12 LPA (India)
  Companies: TCS, Infosys, Accenture, Google

- Role: Frontend Developer
  Salary: ₹3 LPA - ₹10 LPA
  Companies: Flipkart, Amazon, Zoho

- Role: Backend Developer
  Salary: ₹5 LPA - ₹15 LPA
  Companies: Microsoft, Amazon, startups

- Demand: HIGH ⭐⭐⭐⭐⭐

━━━━━━━━━━━━━━━━━━

💡 SUCCESS TIPS
⭐ Tip 1
⭐ Tip 2
⭐ Tip 3

End with one motivational quote.
`;

        console.log("🤖 Sending request to Gemini...");

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });

        console.log("✅ Gemini responded successfully!");

        res.json({
            success: true,
            roadmap: response.text
        });

    } catch (error) {
        console.error("❌ Error:", error);

        res.status(500).json({
            success: false,
            error: error.message
        });
    }

});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
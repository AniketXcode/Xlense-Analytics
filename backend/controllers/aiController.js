// backend/controllers/aiController.js
const File = require("../models/FileModel");
const XLSX = require("xlsx");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// ✅ Load Gemini API key
const GEMINI_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_KEY) {
  console.error("❌ GEMINI_API_KEY missing in .env");
}

const genAI = new GoogleGenerativeAI(GEMINI_KEY);

// ========== generateInsights ==========
const generateInsights = async (req, res) => {
  try {
    const { fileId } = req.params;
    const { xAxis, yAxis, zAxis, chartType, userQuery } = req.body || {};

    const file = await File.findById(fileId);
    if (!file) return res.status(404).json({ message: "File not found" });

    const filePath = path.join(__dirname, "../uploads", file.filename);
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    const insights = analyzeData(jsonData, file.originalName, {
      xAxis,
      yAxis,
      zAxis,
      chartType,
    });

    let aiResponse = null;
    if (userQuery && GEMINI_KEY) {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `
      You are a helpful data analysis assistant for Xlense Analytics.
      Dataset summary:
      ${insights.summary}

      Insights:
      ${insights.insights.join("\n")}

      Recommendations:
      ${insights.recommendations.join("\n")}

      User question: "${userQuery}"
      Answer simply and clearly.
      `;

      const result = await model.generateContent(prompt);
      aiResponse = result.response.text() || "No AI response.";
    }

    res.set("Cache-Control", "no-store");
    res.json({
      success: true,
      fileName: file.originalName,
      insights,
      aiResponse: aiResponse || "No AI query provided.",
    });
  } catch (err) {
    console.error("❌ Error generating insights:", err?.message || err);
    res.status(500).json({ message: "Failed to generate insights. Please try again." });
  }
};

// ========== chatWithAI (Gemini-based) ==========
const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;
    console.log("📨 chatWithAI request message:", message);

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message is required" });
    }
    if (!GEMINI_KEY) {
      return res.status(500).json({ error: "Gemini API key not configured on server." });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `
    You are Xlense Analytics AI Assistant.
    Be concise, friendly, and helpful about charts, data visualization, and insights.
    User: ${message}
    `;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    if (!reply) {
      return res.status(500).json({ error: "AI did not return a response." });
    }

    res.status(200).json({ reply });
  } catch (err) {
    console.error("❌ Error in chatWithAI:", err?.response?.data || err.message || err);
    res.status(500).json({ error: "Error contacting Gemini AI. Please try again later." });
  }
};

// ========== helper analyzeData ==========
const analyzeData = (data, fileName, context = {}) => {
  if (!data || data.length === 0) {
    return {
      summary: "No data available for analysis",
      insights: [],
      recommendations: [],
    };
  }

  const columns = Object.keys(data[0]);
  const numericColumns = columns.filter((col) =>
    data.some((row) => typeof row[col] === "number" && !isNaN(row[col]))
  );

  const insights = [];
  const recommendations = [];

  const rowCount = data.length;
  const columnCount = columns.length;

  insights.push(`📊 Dataset contains ${rowCount} rows and ${columnCount} columns`);

  if (numericColumns.length > 0) {
    insights.push(`🔢 Found ${numericColumns.length} numeric columns: ${numericColumns.join(", ")}`);
    numericColumns.forEach((col) => {
      const values = data
        .map((row) => row[col])
        .filter((val) => typeof val === "number" && !isNaN(val));
      if (values.length > 0) {
        const sum = values.reduce((a, b) => a + b, 0);
        const avg = sum / values.length;
        const max = Math.max(...values);
        const min = Math.min(...values);
        insights.push(`📈 ${col}: Average ${avg.toFixed(2)}, Range ${min} - ${max}`);
      }
    });
  }

  return {
    summary: `Analysis of ${fileName}: ${rowCount} records with ${numericColumns.length} numeric fields.`,
    insights,
    recommendations,
    stats: { totalRows: rowCount, totalColumns: columnCount },
  };
};

module.exports = { generateInsights, chatWithAI };

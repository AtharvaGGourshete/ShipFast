// server.js
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import { OpenAI } from "openai";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  try {
      const { message } = req.body;
      const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: message }],
      });

      res.json({ reply: response.choices[0].message.content });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// File: /pages/api/chat.js (for Next.js)
// or similar endpoint in your backend framework

import { Configuration, OpenAIApi } from "openai";

// Load API key from environment variables
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;

    // Rate limiting - implement as needed
    // This is a simple example, you might want to use Redis or a similar service for production
    
    // Make the API call
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0.7,
      max_tokens: 1000,
    });

    // Return the response
    return res.status(200).json({
      content: response.data.choices[0].message.content,
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    
    // Check for specific OpenAI errors
    if (error.response) {
      const status = error.response.status;
      
      if (status === 429) {
        return res.status(429).json({ 
          message: "Rate limit exceeded. Please try again later." 
        });
      }
      
      return res.status(status).json({ 
        message: error.response.data.error.message || "An error occurred with the AI service" 
      });
    }
    
    return res.status(500).json({ 
      message: "Failed to connect to AI service. Please try again later." 
    });
  }
}
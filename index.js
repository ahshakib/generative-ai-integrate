import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import express from "express";
dotenv.config()

const { PORT, GOOGLE_API_KEY } = process.env
const app = express()

app.use(express.json());

app.get('/', (req, res) => {
    console.log("Hello world");
})

app.post('/text-generation', async (req, res) => {
    try {
        const { serviceName } = req.body
        const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
        });
        const prompt = `Write a detailed and professional description for a service called ${serviceName}`
        const result = await model.generateContent({
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: prompt,
                  }
                ],
              }
            ],
            generationConfig: {
              maxOutputTokens: 1000,
              temperature: 2.0,
            },
          });
          res.json(result.response.text());
          console.log(result.response.text())
    } catch (error) {
        res.json({message: error.message})   
    }
})



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

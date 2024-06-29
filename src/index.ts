import { config } from "../package.json"
import { GoogleGenerativeAI } from '@google/generative-ai'

const response = await fetch(config.template)
const template = await response.text()

const resumeData = await Bun.file("resume.md").text()

const googleGenerativeAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!!)
const model = googleGenerativeAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

const prompt = [
  "generate a flawless resume using the following template: ",
  resumeData,
  "The output should be perfect and ready for submission.",
  template,
]

const result = await model.generateContent(prompt);
console.log(result.response.text());

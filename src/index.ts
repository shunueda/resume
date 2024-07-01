import * as core from '@actions/core'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { config } from 'package.json'

const generativeModel = new GoogleGenerativeAI(
  process.env.GOOGLE_API_KEY
).getGenerativeModel({
  model: config.model
})

const prompt = ['Hello, how are you?']

const result = await generativeModel.generateContent(prompt)
const output = result.response.text()

core.info(output)

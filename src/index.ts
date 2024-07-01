import { DefaultArtifactClient } from '@actions/artifact'
import * as core from '@actions/core'

// const generativeModel = new GoogleGenerativeAI(
//   process.env.GOOGLE_API_KEY
// ).getGenerativeModel({
//   model: config.model
// })
//
// const prompt = ['Hello, how are you?']

// const result = await generativeModel.generateContent(prompt)
// const output = result.response.text()

const artifact = new DefaultArtifactClient()
await artifact.uploadArtifact('test-artifact', ['tsconfig.json'], '.')

core.info('Hello, world!')

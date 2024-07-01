import { DefaultArtifactClient } from '@actions/artifact'
import { exec } from '@actions/exec'
import { GoogleGenerativeAI } from '@google/generative-ai'
import 'dotenv/config'
import { readFileSync } from 'fs'
import { writeFileSync } from 'node:fs'
import { config } from 'package.json'

const generativeModel = new GoogleGenerativeAI(
  process.env.GOOGLE_API_KEY
).getGenerativeModel({
  model: config.model
})

const prompt = `
Your task is to convert a resume from markdown format into a LaTeX document using a provided LaTeX template.

Follow these steps:

Step 1: Read the resume information provided in markdown format.
Step 2: Read the provided LaTeX template.
Step 3: Convert the markdown resume into a LaTeX document using the template.
Step 4: Ensure all special characters are properly escaped.
Step 5: Use the resume information accurately, but correct any errors or confusing sentences.
Step 6: Make improvements to the resume where possible to enhance clarity and presentation.

The markdown resume and LaTeX template are provided below, surrounded by triple quotes.

Resume in markdown:
"""
${readFileSync(config.input)}
"""

LaTeX template:
"""
${readFileSync(config.template)}
"""

Important:
- Do not output any instructions or notes; only output the LaTeX code.
- Ensure the final output is a clean, formatted LaTeX document.

Please begin the conversion now.
`

const result = await generativeModel.generateContent(prompt)

const latexFile = `${config.filename}.tex`

writeFileSync(latexFile, result.response.text())

await exec(`latexmk -pdf ${config.filename}.pdf`)

const artifact = new DefaultArtifactClient()
;['tex', 'pdf'].forEach(async it => {
  await artifact.uploadArtifact(
    `${config.filename}.${it}`,
    [`${config.filename}.${it}`],
    '.'
  )
})

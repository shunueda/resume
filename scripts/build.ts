import 'dotenv/config'

import { exec } from '@actions/exec'
import { readFileSync } from 'fs'
import { writeFileSync } from 'node:fs'
import { config } from 'package.json'
import generateLatexResume from 'src/generateLatexResume'

const latexFile = `${config.filename}.tex`
const content = await generateLatexResume(
  readFileSync(config.input).toString(),
  readFileSync(config.template).toString(),
  readFileSync(config.description).toString()
)

writeFileSync(latexFile, content)

await exec(`pdflatex ${latexFile}`)

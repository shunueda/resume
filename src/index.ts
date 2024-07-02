import 'dotenv/config'

import { exec } from '@actions/exec'
import { writeFileSync } from 'node:fs'
import { config } from 'package.json'
import generateLatexResume from './generateLatexResume'
import uploadArtifact from './uploadArtifact'

const latexFile = `${config.filename}.tex`
const content = await generateLatexResume(config.input, config.template)

writeFileSync(latexFile, content)

await exec(`latexmk -pdf ${latexFile}`)
;['tex', 'pdf'].forEach(async it => {
  await uploadArtifact(`${config.filename}.${it}`)
})

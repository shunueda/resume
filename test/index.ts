import 'dotenv/config'

import { writeFileSync } from 'node:fs'
import { config } from 'package.json'
import generateLatexResume from 'src/generateLatexResume'

const content = await generateLatexResume(config.input, config.template, '')
writeFileSync('assets/test.tex', content)

import { DefaultArtifactClient } from '@actions/artifact'
import * as core from '@actions/core'

const artifact = new DefaultArtifactClient()
await artifact.uploadArtifact('test-artifact', ['tsconfig.json'], '.')

core.info('Hello, world!')

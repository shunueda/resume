import { DefaultArtifactClient } from '@actions/artifact'

const artifact = new DefaultArtifactClient()

export default async function uploadArtifact(file: string) {
  await artifact.uploadArtifact(file, [file], '.')
}

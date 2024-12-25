import { pipeline } from "@xenova/transformers"

import { transcriptionExample } from "./utils/transcription.js"

export async function transcribe(audio) {
  try {
    console.log("realizando transcrição")
    const transcribe = await pipeline(
      "automatic-speech-recognition",
      "Xenova/whisper-small"
    )

    const trascription = await transcribe(audio, {
      chunk_length_s: 30,
      stride_length_s: 5,
      language: "portuguese",
      task: "transcribe",
    })

    console.log("transcrição realizada com sucesso")
    return trascription?.text.replace("[Música]", "")
  } catch (error) {
    throw new Error(error)
  }
}

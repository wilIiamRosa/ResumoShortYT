import ytdl from "ytdl-core"
import fs from "fs"
import { error, info } from "console"

export const download = (videoId) =>
  new Promise((resolve, reject) => {
    const videoURL = "http://www.youtube.com/shorts/" + videoId
    console.log("Realizando o download do video", videoId)

    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
      .on("info", (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000

        if (seconds > 60) {
          throw new Error("A duraçao desse video é maior que 60 segundos.")
        }
        console.log(seconds)
      })
      .on("end", () => {
        console.log("Download do video finalizado.")
        resolve()
      })
      .on("Error", (Error) => {
        console.log(
          "Não foi possivel fazer o download do video. Detalhes do erro:",
          error
        )
        reject(error)
      })
      .pipe(fs.createWriteStream("./tmp/audio.mp4"))
  })

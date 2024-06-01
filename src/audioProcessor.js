const ffmpeg = require("fluent-ffmpeg");
const { PassThrough } = require("stream");
const transcriber = require("./assemblyai");
const fs = require("fs");

function getFormattedDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${year}${month}${day}_${hours}${minutes}${seconds}`;
}

function processAudioStream(streamPath) {
  const inputPath = `rtmp://localhost:1935${streamPath}`;
  const audioStream = new PassThrough();
  const outputPath = `./recordings/meeting_${getFormattedDateTime()}.mp3`;
  const fileStream = fs.createWriteStream(outputPath);

  ffmpeg(inputPath)
    .audioCodec("pcm_s16le") // Set codec to PCM 16-bit little-endian
    .audioChannels(1) // Downmix audio to mono
    .format("s16le") // Set format to signed 16-bit little-endian
    .on("start", (commandLine) => {
      console.log(`Spawned FFmpeg with command: ${commandLine}`);
    })
    .on("codecData", (data) => {
      console.log(`Input is ${data.audio} audio with ${data.audio_details}`);
    })
    .on("end", () => {
      console.log("Processing finished");
      fileStream.end();
    })
    .on("error", (err) => {
      console.error(`Error processing stream: ${err.message}`);
      fileStream.end();
    })
    .pipe(audioStream, { end: true }); // Pipe the processed audio to audioStream

  audioStream.pipe(fileStream);
}

module.exports = processAudioStream;

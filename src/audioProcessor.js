const ffmpeg = require("fluent-ffmpeg");
const { getFormattedDateTime } = require("./utils");

function processAudioStream(streamPath) {
  const inputPath = `rtmp://localhost:1935${streamPath}`;
  const outputPath = `./src/recordings/meeting_${getFormattedDateTime()}.mp3`;

  ffmpeg(inputPath)
    .outputOptions("-q:a 0") // Set the audio quality
    .outputOptions("-map a") // Map only the audio streams
    .on("start", (commandLine) => {
      console.log("Spawned FFmpeg with command: " + commandLine);
    })
    .on("progress", (progress) => {
      console.log("Processing: " + progress.percent + "% done");
    })
    .on("error", (err, stdout, stderr) => {
      console.log("An error occurred: " + err.message);
      console.log("FFmpeg stderr: " + stderr);
    })
    .on("end", () => {
      console.log("Processing finished!");
    })
    .save(outputPath);
}

module.exports = processAudioStream;

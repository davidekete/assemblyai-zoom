const client = require("./assemblyai");

const summarizeAudioWithLeMUR = async (filePath) => {
  const transcript = await client.transcripts.transcribe({ audio: filePath });

  const { response } = await client.lemur.summary({
    transcript_ids: [transcript.id],
    context: "A talk on the paradox of poverty",
    answer_format: "bullet points",
  });

  console.log(response);

  return response;
};

summarizeAudioWithLeMUR("src/recordings/meeting_20240603_1717405934474.mp3");

const analyzeAudioWithLemurTask = async (filePath, prompt) => {
  const transcript = await client.transcripts.transcribe({ audio: filePath });

  const { response } = await client.lemur.task({
    transcript_ids: [transcript.id],
    prompt,
  });

  console.log(response);

  return response;
};

analyzeAudioWithLemurTask(
  "src/recordings/meeting_20240603_1717405934474.mp3",
  "What is the main idea of the talk?"
);



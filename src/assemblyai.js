const { AssemblyAI } = require("assemblyai");
require("dotenv").config();

// Create a new AssemblyAI client
const client = new AssemblyAI({
  apiKey: `${process.env.ASSEMBLY_AI_API_KEY}`,
});

const analyzeAudioWithLeMUR = async (filePath, prompt) => {
  const transcript = await client.transcripts.transcribe({ audio: filePath });

  const { response } = await client.lemur.task({
    transcript_ids: [transcript.id],
    prompt,
  });

  console.log(response);

  return response;
};

analyzeAudioWithLeMUR(
"./src/recordings/meeting_20240601_230721.mp3",
  "What are the main points of the meeting?"
);

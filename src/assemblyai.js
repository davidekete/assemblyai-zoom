const { AssemblyAI } = require("assemblyai");

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

  return response;
};

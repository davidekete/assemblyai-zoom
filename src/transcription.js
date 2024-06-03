const client = require("./assemblyai");

const transcribeAudio = async (filePath) => {
  const transcript = await client.transcripts.transcribe({ audio: filePath });

  console.log(transcript.text);

  return transcript;
};

transcribeAudio("src/recordings/meeting_20240603_1717405934474.mp3");

const transcribeAudioWithPIIRedaction = async (filePath) => {
  const transcript = await client.transcripts.transcribe({
    audio: filePath,
    redact_pii: true,
    redact_pii_policies: [
      "banking_information",
      "phone_number",
      "email_address",
    ],
    redact_pii_sub: "hash",
  });

  console.log(transcript.text);

  return transcript;
};

transcribeAudioWithPIIRedaction(
  "src/recordings/meeting_20240603_1717405934474.mp3"
);

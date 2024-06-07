require("dotenv").config();
const { AssemblyAI } = require("assemblyai");

// Create a new AssemblyAI client
const client = new AssemblyAI({
  apiKey: `${process.env.ASSEMBLYAI_API_KEY}`,
});

module.exports = client;

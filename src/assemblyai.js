require("dotenv").config();
const { AssemblyAI } = require("assemblyai");

// Create a new AssemblyAI client
const client = new AssemblyAI({
  apiKey: `${process.env.ASSEMBLY_AI_API_KEY}`,
});

module.exports = client;

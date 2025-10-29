export async function callLLM(prompt: string): Promise<string> {
  console.warn("LLM integration not yet configured. Prompt received:", prompt);
  return Promise.resolve("LLM integration placeholder");
}

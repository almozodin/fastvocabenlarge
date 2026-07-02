type AiJobInput = {
  type: "WORD_CARD" | "ETYMOLOGY" | "EXAMPLE_SENTENCE" | "MEMORY_HOOK";
  payload: Record<string, unknown>;
};

export async function enqueueAiGeneration(input: AiJobInput) {
  return {
    provider: "openai",
    status: "QUEUED",
    input,
  };
}

export function assertAiServerConfig() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured");
  }
}

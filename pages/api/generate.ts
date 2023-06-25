import { OpenAIChat } from "langchain/llms/openai";
import { BufferMemory } from "langchain/memory";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";

import { NextApiRequest, NextApiResponse } from "next";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

const run = async (messageText: string) => {
  const memory = new BufferMemory({ memoryKey: "chat_history" });
  const model = new OpenAIChat({ temperature: 0.9 });
  const template = `Human: {input}
  AI:`;

  const prompt = PromptTemplate.fromTemplate(template);
  const chain = new LLMChain({ llm: model, prompt, memory });

  const result = await chain.call({ input: messageText });
  return result;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await run(req.body);
  res.status(200).json(result.text);
};

export default handler;

import { exec } from "child_process";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { MemorySaver } from "@langchain/langgraph";
import { ChatGroq } from "@langchain/groq";
import { z } from "zod";
import { tool } from "@langchain/core/tools";
import { config } from "dotenv";

config();

async function executeCommand({
  command,
}: {
  command: string;
}): Promise<string> {
  return new Promise((resolve, _reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`error: ${error.message}`);
        
        resolve(`error: ${error.message}`);
      }
      if (stderr) {
        console.log("stderr", stderr);

        resolve(`stderr: ${stderr}`);
      }

      console.log(`stdout: ${stdout}`);

      resolve(`stdout: ${stdout}`);
    });
  });
}

const commandSchema = z.object({
  command: z.string(),
});

const executeTool = tool(executeCommand, {
  name: "execute",
  schema: commandSchema,
  description: "Executes a shell command in the terminal and returns output",
});

const tools = [executeTool];

const model = new ChatGroq({
  model: "llama3-8b-8192",
  temperature: 0,
});

const checkpointer = new MemorySaver();

const app = createReactAgent({
  llm: model,
  tools,
  checkpointSaver: checkpointer,
});

const run = async (query: string) => {

  const result = await app.invoke(
    {
      messages: [
        {
            role: "system",
            content: "You are a smart agent. You can execute shell commands. You are provided with execute tool. Always check for directory which you are in before executing any command."
        },
        {
          role: "user",
          content: query
        },
      ],
    },
    { configurable: { thread_id: 42 } }
  );

  return result.messages[result.messages.length - 1].content;
};

const query = process.argv.slice(2).join(" ");

run(query).catch(console.error).then(console.log);

from langgraph.prebuilt import create_react_agent
from langgraph.checkpoint.memory import MemorySaver
from langchain_groq import ChatGroq
from langchain_core.tools import tool
from langchain_core.messages import HumanMessage, SystemMessage
import os
from dotenv import load_dotenv
import subprocess

load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

LLM = ChatGroq(model = "llama3-70b-8192", temperature = 0, api_key = GROQ_API_KEY)
checkpointer = MemorySaver()

@tool
def execute_command(command):
    """
    Execute a Linux command and return the result.
    Supports commands with pipes, redirections, and file modifications.
    """

    print(f"Executing: {command}")

    # Using shell = True to handle complex commands with pipes/redirections
    result = subprocess.run(command, capture_output=True, text=True, shell=True)

    if result.returncode != 0:
        return f"Error: {result.stderr}"
    
    return result.stdout.strip()  # Strip extra newlines


tools = [execute_command]
app = create_react_agent(LLM, tools, checkpointer = checkpointer)

SYSTEM_PROMPT = """
You are an AI assistant that can execute linux commands.
You are provided with required tools. Understand the user's input and execute the command.
"""

messages = [SystemMessage(SYSTEM_PROMPT)]

def run():
    command = input("> ")

    if command in ["quit", "exit"]:
        print("Goodbye!")
        exit()

    messages.append(HumanMessage(command))
    response = app.invoke({
        "messages" : messages,
    },
    config={"configurable": {"thread_id": 42}}
    )

    print(response["messages"][-1].content)

while True:
    run()
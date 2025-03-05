# Auto Pilot: AI-Powered Terminal Assistant

Auto Pilot is an AI-powered terminal assistant designed to eliminate the need for memorizing complex Linux commands. Whether you're stuck on a command, unsure about syntax, or need an optimized solution, Auto Pilot will assist you effortlessly.

## Features

- **AI-Powered Assistance:** Auto Pilot understands natural language queries and translates them into Linux commands.
- **Built with LangChain & LangGraph:** Efficiently utilizes LangChain and LangGraph to process and execute commands.
- **Reason + Act Agent:** An intelligent agent that reasons through user queries and takes appropriate actions to provide accurate and relevant responses.
- **Powered by LLaMA 8B via Groq:** Uses the LLaMA 8B model, available through the Groq platform, for AI-driven responses.
- **Dynamic Tool Calling:** The assistant utilizes an `execute_command` tool to run user-requested commands dynamically.
- **Cross-Platform Adaptability:** Auto Pilot intelligently adjusts commands based on the operating system it is running on.

## Tech Stack

- **Programming Language:** Python
- **AI Frameworks:** LangChain, LangGraph
- **Large Language Model:** LLaMA 8B (via Groq)
- **Cross-Platform Compatibility:** Windows, macOS, Linux

## How It Works

1. **User Input:** The user provides a natural language command or query.
2. **AI Processing:** The model interprets the input and selects the appropriate command.
3. **Tool Execution:** The `execute_command` tool runs the command when needed.
4. **Dynamic Adaptation:** The system modifies commands based on the OS environment.

## Installation

### Setting Up Auto Pilot

1. Create a virtual environment:
   ```bash
   virtualenv env
   ```
2. Activate the virtual environment:
   - On Windows:
     ```bash
     env\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source env/bin/activate
     ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the application:
   ```bash
   python app.py
   ```

### Embedding Auto Pilot into Your System

1. Modify the `run-app.sh` file and add the correct directory paths.
2. Create an alias for easier access:
   ```bash
   alias runai='path-to-sh-file'
   ```

## Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.


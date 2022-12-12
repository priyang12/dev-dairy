const fs = require("fs");
const readline = require("readline");
const child_process = require("child_process");
const path = require("path");

const _dirname = path.resolve();

// Read the contents of the script folder
const scriptFolder = "/Queues";
const files = fs.readdirSync(_dirname + scriptFolder);

// Create a list of available scripts
const scripts = files.filter((file) => file.endsWith(".js"));

// Create a prompt to allow the user to select a script
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Available scripts:");
scripts.forEach((script, i) => console.log(`${i + 1}. ${script}`));

rl.question("Select a script to run: ", (answer) => {
  // Validate the user's input
  const scriptIndex = parseInt(answer);
  if (isNaN(scriptIndex) || scriptIndex < 1 || scriptIndex > scripts.length) {
    console.error("Invalid input. Please try again.");
    rl.close();
    return;
  }

  // Run the selected script
  const script = scripts[scriptIndex - 1];
  const scriptPath = `${scriptFolder}/${script}`;
  const proc = child_process.spawn("node", [scriptPath]);

  // Display the output of the script
  proc.stdout.on("data", (data) => console.log(data.toString()));
  proc.stderr.on("data", (data) => console.error(data.toString()));
  proc.on("close", () => {
    console.log("Script completed.");
    rl.close();
  });
});

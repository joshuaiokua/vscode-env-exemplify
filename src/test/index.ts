import * as path from "path";
import { runTests } from "@vscode/test-electron";

async function main() {
  try {
    // Pointing to the extension root folder
    const extensionDevelopmentPath = path.resolve(__dirname, "../../");

    // Pointing to the test runner script
    const extensionTestsPath = path.resolve(__dirname, "./suite/index");

    console.log("*--- PATHS SET ---*");
    console.log(
      `Extension development path: ${extensionDevelopmentPath}\nExtension tests path: ${extensionTestsPath}`,
    );

    await runTests({ extensionDevelopmentPath, extensionTestsPath });
  } catch (err) {
    console.error("Failed to run tests", err);
    process.exit(1);
  }
}

main();

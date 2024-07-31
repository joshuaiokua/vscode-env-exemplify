import * as vscode from "vscode";
import * as fs from "fs/promises";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "env-exemplify" is now active!');

  // Helper function to get the .env.example file path
  const getEnvExamplePath = (filePath: string): string => {
    const dir = path.dirname(filePath);
    console.log("Directory:", dir);
    return path.join(dir, ".env.example");
  };

  // Update Functionality
  const updateEnvExample = async (filePath: string) => {
    const envExamplePath = getEnvExamplePath(filePath);
    console.log(`Updating env.example file: ${envExamplePath}`);

    try {
      const data = await fs.readFile(filePath, "utf8");
      const envVars = data
        .split("\n")
        .filter((line) => line && !line.startsWith("#"))
        .map((line) => line.split("=")[0])
        .join("\n");

      await fs.writeFile(envExamplePath, envVars, "utf8");
      vscode.window.showInformationMessage(
        "env.example file updated successfully",
      );
    } catch (err) {
      console.error("Error reading or writing env.example file:", err);
      vscode.window.showErrorMessage("Failed to update env.example file");
    }
  };

  // Delete Functionality
  const deleteEnvExample = async (filePath: string) => {
    const envExamplePath = getEnvExamplePath(filePath);

    try {
      await fs.unlink(envExamplePath);
      vscode.window.showInformationMessage(
        "env.example file deleted successfully",
      );
    } catch (err) {
      console.error("Error deleting env.example file:", err);
      vscode.window.showErrorMessage("Failed to delete env.example file");
    }
  };

  // Watch for changes in the .env file
  const watcher = vscode.workspace.createFileSystemWatcher("**/.env");

  watcher.onDidChange(async (uri) => {
    console.log("File changed:", uri.fsPath);
    await updateEnvExample(uri.fsPath);
  });

  watcher.onDidCreate(async (uri) => {
    console.log("File created:", uri.fsPath);
    await updateEnvExample(uri.fsPath);
  });

  watcher.onDidDelete(async (uri) => {
    console.log("File deleted:", uri.fsPath);
    await deleteEnvExample(uri.fsPath);
  });

  context.subscriptions.push(watcher);
}

export function deactivate() {}

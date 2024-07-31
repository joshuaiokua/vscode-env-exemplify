import * as vscode from "vscode";
import * as fs from "fs/promises";
import * as path from "path";

// Helper function to get the .env.example file path
const getEnvExamplePath = (filePath: string): string => {
  const dir = path.dirname(filePath);
  console.log("Directory:", dir);
  return path.join(dir, ".env.example");
};

// Update Functionality
export const updateEnvExample = async (filePath: string) => {
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
export const deleteEnvExample = async (filePath: string) => {
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

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "env-exemplify" is now active!');

  // Watch for changes in the .env file
  const watcher = vscode.workspace.createFileSystemWatcher("**/.env");

  watcher.onDidChange(async (uri) => {
    console.log("File changed:", uri.fsPath);
    try {
      await updateEnvExample(uri.fsPath);
    } catch (err) {
      console.error("Error updating env.example file:", err);
    }
  });

  watcher.onDidCreate(async (uri) => {
    console.log("File created:", uri.fsPath);
    try {
      await updateEnvExample(uri.fsPath);
    } catch (err) {
      console.error("Error updating env.example file:", err);
    }
  });

  watcher.onDidDelete(async (uri) => {
    console.log("File deleted:", uri.fsPath);
    try {
      await deleteEnvExample(uri.fsPath);
    } catch (err) {
      console.error("Error deleting env.example file:", err);
    }
  });

  context.subscriptions.push(watcher);
}

export function deactivate() {}

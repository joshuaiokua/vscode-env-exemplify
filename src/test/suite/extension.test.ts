import * as assert from "assert";
import * as vscode from "vscode";
import * as fs from "fs/promises";
import * as path from "path";

describe("Extension Tests", () => {
  const envFilePath = path.resolve(__dirname, "..", "..", ".env");
  const exampleFilePath = path.resolve(__dirname, "..", "..", ".env.example");
  const workspacePath = path.resolve(__dirname, "..", "..");

  const envFileContent = "KEY=VALUE\nKEY2=VALUE2";
  const updatedEnvFileContent = "KEY=VALUE\nKEY2=VALUE2\nKEY3=VALUE3";

  beforeEach(async () => {
    // Create the workspace
    const workspaceUri = vscode.Uri.file(workspacePath);
    await vscode.workspace.updateWorkspaceFolders(0, 0, { uri: workspaceUri });

    // Activate the extension
    const extension = vscode.extensions.getExtension("yell-zero.env-exemplify");
    if (extension) {
      await extension.activate();
    } else {
      throw new Error("Failed to activate the extension");
    }

    // Wait for the workspace to be fully loaded
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  afterEach(async () => {
    // Cleanup after tests
    await cleanupFile(envFilePath);
    await cleanupFile(exampleFilePath);
  });

  it("Should create .env.example file when .env file is created", async function () {
    this.timeout(10000);
    // Write the .env file
    await fs.writeFile(envFilePath, envFileContent);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const exists = await fileExists(exampleFilePath);
    assert.strictEqual(exists, true);

    const exampleFileContent = await fs.readFile(exampleFilePath, "utf8");
    assert.strictEqual(exampleFileContent, "KEY\nKEY2");
  });

  it("Should update .env.example file when .env file is updated", async function () {
    this.timeout(10000);
    // Write the .env file
    await fs.writeFile(envFilePath, envFileContent);

    // Update the .env file
    await fs.writeFile(envFilePath, updatedEnvFileContent);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const exampleFileContent = await fs.readFile(exampleFilePath, "utf8");
    assert.strictEqual(exampleFileContent, "KEY\nKEY2\nKEY3");
  });

  it("Should delete .env.example file when .env file is deleted", async function () {
    this.timeout(10000);
    // Write the .env file
    await fs.writeFile(envFilePath, envFileContent);

    // Delete the .env file
    await fs.unlink(envFilePath);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const exists = await fileExists(exampleFilePath);
    assert.strictEqual(exists, false);
  });
});

async function fileExists(path: string): Promise<boolean> {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

// Utility function to clean up files
async function cleanupFile(filePath: string): Promise<void> {
  try {
    if (await fileExists(filePath)) {
      await fs.unlink(filePath);
    }
  } catch (err) {
    console.error(`Failed to clean up file: ${filePath}`, err);
  }
}

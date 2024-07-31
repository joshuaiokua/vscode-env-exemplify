import * as assert from "assert";
import * as vscode from "vscode";
import * as fs from "fs/promises";
import * as path from "path";

describe("Extension Tests", () => {
  const envFilePath = path.join(__dirname, "..", "..", ".env");
  const exampleFilePath = path.join(__dirname, "..", "..", ".env.example");

  const envFileContent = "KEY=VALUE\nKEY2=VALUE2";
  const updatedEnvFileContent = "KEY=VALUE\nKEY2=VALUE2\nKEY3=VALUE3";

  beforeEach(async () => {
    // Cleanup before tests as needed
  });

  afterEach(async () => {
    // Cleanup after tests
    await cleanupFile(envFilePath);
    await cleanupFile(exampleFilePath);
  });

  it("Should create .env.example file when .env file is created", async () => {
    console.log("envFilePath", envFilePath);
    console.log("exampleFilePath", exampleFilePath);
    // Write the .env file
    await fs.writeFile(envFilePath, envFileContent);
    console.log("envFileContent", envFileContent);

    // Wait for the file to be created
    await vscode.workspace.fs.writeFile(
      vscode.Uri.file(envFilePath),
      Buffer.from(envFileContent),
    );

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const exists = await fileExists(exampleFilePath);
    assert.strictEqual(exists, true);
  });

  it("Should update .env.example file when .env file is updated", async () => {
    // Write the .env file
    await fs.writeFile(envFilePath, envFileContent);
    await vscode.workspace.fs.writeFile(
      vscode.Uri.file(envFilePath),
      Buffer.from(envFileContent),
    );

    // Update the .env file
    await fs.writeFile(envFilePath, updatedEnvFileContent);
    await vscode.workspace.fs.writeFile(
      vscode.Uri.file(envFilePath),
      Buffer.from(updatedEnvFileContent),
    );

    const exampleFileContent = await fs.readFile(exampleFilePath, "utf8");
    assert.strictEqual(exampleFileContent, "KEY\nKEY2\nKEY3");
  });

  it("Should delete .env.example file when .env file is deleted", async () => {
    // Write the .env file
    await fs.writeFile(envFilePath, envFileContent);
    await vscode.workspace.fs.writeFile(
      vscode.Uri.file(envFilePath),
      Buffer.from(envFileContent),
    );

    // Delete the .env file
    await fs.unlink(envFilePath);
    await vscode.workspace.fs.delete(vscode.Uri.file(envFilePath));

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

async function cleanupFile(filePath: string): Promise<void> {
  if (await fileExists(filePath)) {
    await fs.unlink(filePath);
  }
}

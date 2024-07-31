/**
 * This module is the entry point for the test suite and is responsible for: configuring the Mocha testing framework with the necessary settings; discovering and loading all require test files; and initializing the test runner and handling the test results.
 */

import * as path from "path";
import Mocha from "mocha";
import { glob } from "glob";

export async function run(): Promise<void> {
  const testsRoot = path.resolve(__dirname, "..");

  // Initializer and configure Mocha
  const mocha = new Mocha({
    ui: "bdd", // Specifies test structure style to Behavior Driven Development
    color: true,
  });

  try {
    // Discover and load test files
    const files = glob.sync("**/**.test.js", { cwd: testsRoot });

    files.forEach((file) => mocha.addFile(path.resolve(testsRoot, file)));

    // Run the Mocha test
    return new Promise((resolve, reject) => {
      try {
        mocha.run((failures) => {
          if (failures > 0) {
            reject(new Error(`${failures} tests failed.`));
          } else {
            resolve();
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  } catch (err) {
    return Promise.reject(err);
  }
}

# VS Code Environment Exemplify Extension

This extension automatically creates a copy of an `.env` file as an `.env.example` file and updates it whenever changes are saved to the reference env. file.. This is particularly useful for keeping a sample environment configuration file up-to-date in projects where environment variables are used.

## Features

- Monitors `.env` files for changes.
- Automatically creates or updates a copy of the `.env` file with the name `.env.example` in the same directory whenever changes are saved to the `.env` file.
- The `.env.example` file is created with all the keys from the `.env` file and empty values.
- The `.env.example` file is updated with the keys from the `.env` file whenever changes are saved to the `.env` file.
- The `.env.example` file is created only if the `.env` file is explicitly saved.

## Privacy Policy

### Data Handling

- This extension processes `.env` files to create or update `.env.example` files within the same directory.
- The content of `.env` files is not sent or shared with any external services.
- No sensitive information from `.env` files is logged or stored outside the user's local environment.

### User Control

- Users have full control over the files processed by the extension.
- The extension only operates on `.env` files present in the user's workspace.

### Security

- The extension follows best practices to ensure that sensitive information is handled securely.
- Users are encouraged to review the source code and raise any security concerns.

<br>

---

<br>

# TODO: FILL IN THE FOLLOWING BELOW

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: Enable/disable this extension.
* `myExtension.thing`: Set to `blah` to do something.

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
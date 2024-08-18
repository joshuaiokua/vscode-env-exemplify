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

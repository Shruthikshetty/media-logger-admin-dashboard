# E2E Test Authentication Setup

This document outlines how to set up the necessary credentials for running the Playwright end-to-end (E2E) test suite.

## Overview

The test suite requires a user account with specific permissions to log in to the application and validate its features. To keep these credentials secure and separate from the main codebase, they are stored in a local `secrets.ts` file that is **not** committed to version control.

## Setup Instructions

1.  **Create the Secrets File**: In the `e2e/test-data/` directory, create a new file named `secrets.ts`.

2.  **Add Credentials**: Open the newly created `secrets.ts` file and add the following code structure. You will need to replace the placeholder values with the actual credentials for the test account.

    ```typescript
    export const SECRETS = {
      adminUser: {
        email: 'example@gmail.com',
        password: 'examplePass',
      },
      // You can add other user roles here as needed
      //
      // memberUser: {
      //   email: "member@example.com",
      //   password: "anotherPassword"
      // }
    };
    ```

3.  **Verify `.gitignore`**: Ensure that the `secrets.ts` file path is included in your root `.gitignore` file to prevent it from ever being pushed to the repository. The entry should look like this:

    ```gitignore
    /e2e/test-data/secrets.ts
    ```

## Important Notes

- **Security**: This file contains sensitive credentials. **Do not** commit it to GitHub or share it publicly.
- **Purpose**: The `adminUser` object contains the required credentials for logging into the application as an administrator, which is necessary for the majority of the E2E tests.

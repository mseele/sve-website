# Website SV Eutingen 1947 e.V.

This is the source code for the frontend of the website of [SV Eutingen](https://www.sv-eutingen.de/).

## Environment Variables

This project requires the following environment variables to be set:

- `SUBDOMAIN`: The subdomain for the application (e.g., `www`).
- `BACKEND_API`: The url of the backend api (e.g., `https://api.sv-eutingen.de`).
- `PREVIEW`: Whether the application is running in preview mode (e.g., `true`).
- `ROLLBAR_POST_SERVER_ITEM_TOKEN`: Build-only (Netlify). `post_server_item` access token used by `scripts/upload-sourcemaps.ts` to upload source maps so Rollbar can resolve production stack traces back to the original TypeScript.

Ensure these variables are set in your `.env` file before running the application.

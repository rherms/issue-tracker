# issue-tracker

This codebase is home to both the backend and frontend of Ryan's Issue Tracker,
a web application for tracking issues.

## Development Guide

### Setup

1. Clone the repository
2. Ensure you are running Node 18+ ([NVM](https://github.com/nvm-sh/nvm) can help here)
3. `cd` into the top level `server` directory and run `npm install` to install backend dependencies
4. `cd` into the top level `client` directory and run `npm install` to install frontend dependencies

### Developing

For backend development, run `node index.js` in the top level `server` directory. After making changes
to the code, you will need to `ctrl + c` to quit the server and re-run it. The backend is hosted on `localhost:8080`.

For frontend development, run `npm start` in the top level `client` directory. Code changes will automatically
take effect as you save files. The frontend is hosted on `localhost:3000`.

## User Guide

Create a new issue using the "New Issue" button in the top right of the application.

View issues on the home page dashboard.

Click the eye icon to view more details about each issue.

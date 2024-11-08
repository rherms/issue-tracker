const express = require('express');
const app = express();
const cors = require('cors');
const crypto = require('crypto');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(8080, () => {
  console.log('server listening on port 8080');
});

/**
 * TODO: use typescript, share types with the frontend
 *
 * Issues have the following fields:
 * id: string
 * title: string
 * description: string
 * status: "Open" | "In Progress" | "Resolved"
 * priority: "Low" | "Medium" | "High"
 * createTimestampMs: number
 * lastUpdatedTimestampMs: number
 */

// All issues by id. This would normally have a persistence layer like a database.
const ALL_ISSUES_BY_ID = {};

/**
 * Request shape:
 * just title, description, and priority of issue
 * Response is the created issue
 */
app.post('/create', (req, res) => {
  // TODO: validate shape of json
  const issue = req.body;
  issue.id = crypto.randomUUID();
  issue.createTimestampMs = Date.now();
  issue.lastUpdatedTimestampMs = Date.now();
  issue.status = 'Open';
  ALL_ISSUES_BY_ID[issue.id] = issue;
  res.send(issue);
});

/**
 * Returns a list of all existing issue ids
 */
app.get('/issues', (_req, res) => {
  // Returning just all ids is more representative of what a real BE would do, so don't just return values here
  res.send(Object.keys(ALL_ISSUES_BY_ID));
});

app.get('/issue/:id', (req, res) => {
  const issue = ALL_ISSUES_BY_ID[req.params.id];
  if (!issue) {
    // Issue not found
    res.sendStatus(404);
  }
  res.send(issue);
});

/**
 * Request shape:
 * { id: string, newStatus: Status }
 * Response is the updated issue
 */
app.post('/update-status', (req, res) => {
  // TODO: validate shape of json
  const { id, newStatus } = req.body;
  if (!ALL_ISSUES_BY_ID[id]) {
    // Issue not found
    res.sendStatus(404);
  }
  ALL_ISSUES_BY_ID[id].status = newStatus;
  ALL_ISSUES_BY_ID[id].lastUpdatedTimestampMs = Date.now();
  res.send(ALL_ISSUES_BY_ID[id]);
});

app.get('/delete/:id', (req, res) => {
  const id = req.params.id;
  const issue = ALL_ISSUES_BY_ID[id];
  if (!issue) {
    // Issue not found
    res.sendStatus(404);
  }
  delete ALL_ISSUES_BY_ID[id];
  res.sendStatus(200);
});

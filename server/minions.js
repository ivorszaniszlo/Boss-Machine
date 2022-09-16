/*Required

/api/minions

GET /api/minions to get an array of all minions.
POST /api/minions to create a new minion and save it to the database.
GET /api/minions/:minionId to get a single minion by id.
PUT /api/minions/:minionId to update a single minion by id.
DELETE /api/minions/:minionId to delete a single minion by id.*/

const minionsRouter = require('express').Router();

module.exports = minionsRouter;

const { 
    getAllFromDatabase,
    getFromDatabaseById
} = require('./db');

minionsRouter.param('minionId', (req, res, next, id) => {
  const minion = getFromDatabaseById('minions', id);
  if (minion) {
    req.minion = minion;
    next();
  } 
  else {
    res.status(404).send();
  }
});

minionsRouter.get('/', (req, res) => {
    const minions = getAllFromDatabase('minions');
    res.send(minions);
});
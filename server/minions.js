/*Required

/api/minions

GET /api/minions to get an array of all minions. - OK
POST /api/minions to create a new minion and save it to the database. OK
GET /api/minions/:minionId to get a single minion by id. - OK
PUT /api/minions/:minionId to update a single minion by id. - OK
DELETE /api/minions/:minionId to delete a single minion by id.- OK 

/api/minions/work

GET /api/minions/:minionId/work to get an array of all work for the specified minon. - OK
POST /api/minions/:minionId/work to create a new work object and save it to the database. - OK
PUT /api/minions/:minionId/work/:workId to update a single work by id. - OK
DELETE /api/minions/:minionId/work/:workId to delete a single work by id. - Ok

*/
const minionsRouter = require('express').Router();

module.exports = minionsRouter;

const { 
    addToDatabase,
    deleteFromDatabasebyId,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase
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
    res.send(getAllFromDatabase('minions'));
});

minionsRouter.post('/', (req, res) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

minionsRouter.get('/:minionId', (req, res) => {
    res.send(req.minion);
});

minionsRouter.put('/:minionId', (req, res) => {
    let updatedMinion = updateInstanceInDatabase('minions', req.body);
    res.status(201).send(updatedMinion);
});

minionsRouter.delete('/:minionId', (req, res) => {
    const deletedMinion = deleteFromDatabasebyId('minions', req.params.minionId);
    if(deletedMinion){
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
});

minionsRouter.get('/:minionId/work', (req, res) => {
    const work = getAllFromDatabase('work').filter((singleWork) => {
        return singleWork.minionId === req.params.minionId;
    });
    res.send(work);
});

minionsRouter.post('/:minionId/work', (req, res) => {
    const newWork = req.body;
    newWork.minionId = req.params.minionId; 
    const createdWork = addToDatabase('work', newWork);
    res.status(201).send(createdWork);
});

minionsRouter.put('/:minionId/work/:workId', (req, res) => {
    if (req.params.minionId !== req.body.minionId) {
        res.status(400).send();
    } else {
        let updatedWork = updateInstanceInDatabase('work', req.body);
        res.status(201).send(updatedWork);
    }
});

minionsRouter.delete('/:minionId/work/:workId', (req, res) => {
    const deleted = deleteFromDatabasebyId('work', req.params.workId);
    if (deleted) {
      res.status(204);
    } else {
      res.status(500);
    }
    res.send();
}); 

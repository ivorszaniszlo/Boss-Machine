/*Required

/api/ideas

GET /api/ideas to get an array of all ideas. OK
POST /api/ideas to create a new idea and save it to the database. OK
GET /api/ideas/:ideaId to get a single idea by id. OK
PUT /api/ideas/:ideaId to update a single idea by id. OK
DELETE /api/ideas/:ideaId to delete a single idea by id. OK*/

const ideasRouter = require('express').Router();

module.exports = ideasRouter;

const { 
    addToDatabase,
    deleteFromDatabasebyId,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase
} = require('./db');

ideasRouter.param('ideaId', (req, res, next, id) => {
  const idea = getFromDatabaseById('ideas', id);
  if (idea) {
    req.idea = idea;
    next();
  } 
  else {
    res.status(404).send();
  }
});

ideasRouter.get('/', (req, res) => {
    res.send(getAllFromDatabase('ideas'));
});

ideasRouter.post('/', (req, res) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

ideasRouter.get('/:ideaId', (req, res) => {
    res.send(req.idea);
});

ideasRouter.put('/:ideaId', (req, res) => {
    let updatedIdea = updateInstanceInDatabase('ideas', req.body);
    res.status(201).send(updatedIdea);
});

ideasRouter.delete('/:ideaId', (req, res) => {
    const deletedIdea= deleteFromDatabasebyId('ideas', req.params.ideaId);
    if(deletedIdea){
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
});
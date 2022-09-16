/*Required

/api/meetings

GET /api/meetings to get an array of all meetings. OK
POST /api/meetings to create a new meeting and save it to the database. OK
DELETE /api/meetings to delete all meetings from the database. OK */

const meetingsRouter = require('express').Router();

module.exports = meetingsRouter;

const { 
    addToDatabase,
    createMeeting,
    deleteAllFromDatabase,
    getAllFromDatabase,
} = require('./db');


meetingsRouter.get('/', (req, res) => {
    res.send(getAllFromDatabase('meetings'));
});

meetingsRouter.post('/', (req, res) => {
    let newMeeting = addToDatabase('meetings', createMeeting());
    res.status(201).send(newMeeting);
});

meetingsRouter.delete('/', (req, res) => {
    deleteAllFromDatabase('meetings');
  res.status(204).send();
});
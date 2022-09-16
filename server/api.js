const express = require('express');
const apiRouter = express.Router();
const ideasRouter = require('./ideas');
const minionsRouter = require('./minions');
const meetingsRouter = require('./meetings');

apiRouter.use('/ideas', ideasRouter);
apiRouter.use('/minions', minionsRouter);
apiRouter.use('/meetings', meetingsRouter);

module.exports = apiRouter;

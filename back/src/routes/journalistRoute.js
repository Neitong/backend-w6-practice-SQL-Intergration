import express from 'express';
import * as journalistController from '../controllers/journalistController.js';

export const journalistRouter = express.Router();

journalistRouter.get('/journalist/:id/articles', journalistController.getJournalistArticles);
journalistRouter.get('/journalists', journalistController.getJournalists);


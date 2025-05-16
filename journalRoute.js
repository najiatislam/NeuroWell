import express from 'express';
import { journalList, articleList, studyList, getJournalDetail } from '../controllers/journalController.js';

const journalRouter = express.Router();

// endpoints
journalRouter.get('/list', journalList);
journalRouter.get('/articles', articleList);
journalRouter.get('/studies', studyList);
journalRouter.get('/detail/:id', getJournalDetail);

export default journalRouter;

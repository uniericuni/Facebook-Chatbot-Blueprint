import {Router} from 'express';

const router = Router();


// --- Index Page --- //
router.get('/', (req, res) => {
  res.sendStatus(200);
});

export default router;

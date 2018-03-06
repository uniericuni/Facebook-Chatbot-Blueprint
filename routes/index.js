import {Router} from 'express';

const router = Router();


// --- Index Page --- //
// Required for chatbot verification process.
router.get('/', (req, res) => {
  res.sendStatus(200);
});

export default router;

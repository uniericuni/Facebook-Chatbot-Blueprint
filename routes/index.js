import express          from 'express';

const router = express.Router();


// --- Index Page --- //
router.get('/', (req, res) => {
  res.sendStatus(200);
});

export default router;

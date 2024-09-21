import express from 'express';

const router = express.Router();

router.get('login/', (req, res) => {
    res.json("Hello")
});

export default router;
 const express = require('express');
const router = express.Router();
const Review = require('../models/review');
const authMiddleware = require('../middleware/authmiddleware');

// PUBLIC ENDPOINTS
router.get('/approved', async (req, res) => {
  try {
    const reviews = await Review.find({ isApproved: true }).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, email, location, rating, comment } = req.body;
    const newReview = new Review({ name, email, location, rating, comment });
    await newReview.save();
    res.status(201).json({ message: 'Review submitted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit review', error });
  }
});

// PROTECTED ADMIN ENDPOINTS (authMiddleware added here)
router.get('/pending', authMiddleware, async (req, res) => {
  try {
    const reviews = await Review.find({ isApproved: false }).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pending reviews', error });
  }
});

router.patch('/:id/approve', authMiddleware, async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
    res.status(200).json({ message: 'Review approved', review });
  } catch (error) {
    res.status(500).json({ message: 'Error approving review', error });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review', error });
  }
});

module.exports = router;
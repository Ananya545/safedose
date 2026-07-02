const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Medicine = require('../models/Medicine');
const User = require('../models/User');

router.get('/', protect, async (req, res) => {
  try {
    const medicines = await Medicine.find({ userId: req.user.id });
    res.json({ success: true, data: medicines });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const { name, dosage, quantity, unit, expiryDate, manufacturer } = req.body;

    const now = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));

    let status = 'Safe';
    if (daysUntilExpiry < 0) {
      status = 'Expired';
    } else if (daysUntilExpiry <= 7) {
      status = 'Expiring Soon';
    }

    const medicine = new Medicine({
      userId: req.user.id,
      name,
      dosage,
      quantity,
      unit,
      expiryDate,
      manufacturer,
      status,
      daysUntilExpiry
    });

    await medicine.save();
    res.json({ success: true, data: medicine, message: 'Medicine added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await Medicine.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Medicine deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const { name, dosage, quantity, unit, expiryDate, manufacturer } = req.body;

    const now = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));

    let status = 'Safe';
    if (daysUntilExpiry < 0) {
      status = 'Expired';
    } else if (daysUntilExpiry <= 7) {
      status = 'Expiring Soon';
    }

    const medicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      { name, dosage, quantity, unit, expiryDate, manufacturer, status, daysUntilExpiry },
      { new: true }
    );

    res.json({ success: true, data: medicine, message: 'Medicine updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/api/push-subscription', protect, async (req, res) => {
  try {
    const { subscription } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.pushSubscription = subscription;
    await user.save();

    res.json({ success: true, message: 'Push subscription saved' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
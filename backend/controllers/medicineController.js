const Medicine = require('../models/Medicine');

exports.getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find({ userId: req.user.id });
    res.json({ success: true, data: medicines });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createMedicine = async (req, res) => {
  try {
    const { name, dosage, quantity, unit, expiryDate, manufacturer } = req.body;

    if (!name || !dosage || !quantity || !expiryDate) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    const medicine = await Medicine.create({
      ...req.body,
      userId: req.user.id
    });
    
    res.json({ success: true, data: medicine });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteMedicine = async (req, res) => {
  try {
    await Medicine.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Medicine deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    res.json({ success: true, data: medicine });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
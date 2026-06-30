const express = require('express');
const router = express.Router();
const { 
  getAllMedicines, 
  createMedicine, 
  deleteMedicine, 
  updateMedicine 
} = require('../controllers/medicineController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getAllMedicines);
router.post('/', protect, createMedicine);
router.delete('/:id', protect, deleteMedicine);
router.put('/:id', protect, updateMedicine);

module.exports = router;
const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  dosage: { 
    type: String, 
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true 
  },
  unit: { 
    type: String, 
    default: 'tablet' 
  },
  expiryDate: { 
    type: Date, 
    required: true 
  },
  manufacturer: String,
  status: { 
    type: String, 
    default: 'Safe' 
  },
  daysUntilExpiry: Number,
}, { timestamps: true });

medicineSchema.pre('save', function() {
  const today = new Date();
  const days = Math.ceil((new Date(this.expiryDate) - today) / (1000 * 3600 * 24));
  this.daysUntilExpiry = days;
  
  if (days < 0) this.status = 'Expired';
  else if (days <= 7) this.status = 'Expiring Soon';
  else this.status = 'Safe';
});

module.exports = mongoose.model('Medicine', medicineSchema);
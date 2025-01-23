import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  productCode: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  gstRate: {
    type: Number,
    required: true,
    enum: [0, 5, 12, 18, 28],
  },
  stockQuantity: {
    type: Number,
    required: true,
    min: 0,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Product', productSchema);
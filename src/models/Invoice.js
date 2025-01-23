import mongoose from 'mongoose';

const shopDetailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  gstin: {
    type: String,
    required: true,
  },
});

const invoiceItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  gstAmount: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  shopDetails: shopDetailsSchema,
  items: [invoiceItemSchema],
  subtotal: {
    type: Number,
    required: true,
  },
  totalGST: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
    default: 0,
  },
  grandTotal: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['cash', 'card', 'upi'],
  },
  status: {
    type: String,
    required: true,
    enum: ['paid', 'pending', 'cancelled'],
    default: 'paid',
  },
}, {
  timestamps: true,
});

export default mongoose.model('Invoice', invoiceSchema);
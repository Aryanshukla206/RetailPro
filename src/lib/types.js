// Product structure
const Product = {
  id: '',
  productCode: '',
  name: '',
  category: '',
  price: 0,
  gstRate: 0,
  stockQuantity: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// CartItem structure
const CartItem = {
  productId: '',
  product: { ...Product },
  quantity: 0,
  price: 0,
  gstAmount: 0,
  totalPrice: 0,
};

// Cart structure
const Cart = {
  id: '',
  items: [CartItem],
  subtotal: 0,
  totalGST: 0,
  discount: 0,
  grandTotal: 0,
  status: 'active', // or 'held' or 'completed'
};

// ShopDetails structure
const ShopDetails = {
  name: '',
  address: '',
  gstin: '',
};

// Invoice structure
const Invoice = {
  id: '',
  invoiceNumber: '',
  date: new Date(),
  shopDetails: { ...ShopDetails },
  items: [CartItem],
  subtotal: 0,
  totalGST: 0,
  discount: 0,
  grandTotal: 0,
  paymentMethod: 'cash', // or 'card' or 'upi'
  status: 'paid', // or 'pending' or 'cancelled'
};

export { Product, CartItem, Cart, ShopDetails, Invoice };

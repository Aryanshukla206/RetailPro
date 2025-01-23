import { connectDB, disconnectDB } from '../src/lib/db.js';
import Product from '../src/models/Product.js';
import Cart from '../src/models/Cart.js';
import Invoice from '../src/models/Invoice.js';

const products = [
  {
    productCode: 'ELEC001',
    name: 'iPhone 13 Pro',
    category: 'Electronics',
    price: 89999,
    gstRate: 18,
    stockQuantity: 50,
  },
  {
    productCode: 'ELEC002',
    name: 'Samsung 4K Smart TV',
    category: 'Electronics',
    price: 45999,
    gstRate: 28,
    stockQuantity: 30,
  },
  {
    productCode: 'CLOTH001',
    name: 'Nike Sports Shoes',
    category: 'Clothing',
    price: 4999,
    gstRate: 12,
    stockQuantity: 100,
  },
  {
    productCode: 'GROC001',
    name: 'Organic Coffee Beans',
    category: 'Grocery',
    price: 499,
    gstRate: 5,
    stockQuantity: 200,
  },
  {
    productCode: 'GROC002',
    name: 'Premium Tea',
    category: 'Grocery',
    price: 299,
    gstRate: 5,
    stockQuantity: 150,
  },
  {
    productCode: 'ELEC003',
    name: 'Sony Wireless Headphones',
    category: 'Electronics',
    price: 14999,
    gstRate: 18,
    stockQuantity: 75,
  },
  {
    productCode: 'CLOTH002',
    name: 'Levi\'s Jeans',
    category: 'Clothing',
    price: 2999,
    gstRate: 12,
    stockQuantity: 120,
  },
  {
    productCode: 'GROC003',
    name: 'Olive Oil',
    category: 'Grocery',
    price: 699,
    gstRate: 5,
    stockQuantity: 180,
  },
];

const shopDetails = {
  name: 'RetailPro Store',
  address: '123 Main Street, City, State - 123456',
  gstin: '29ABCDE1234F1Z5',
};

async function seedDatabase() {
  try {
    await connectDB();

    // Clear existing data
    await Promise.all([
      Product.deleteMany({}),
      Cart.deleteMany({}),
      Invoice.deleteMany({}),
    ]);

    // Insert products
    const insertedProducts = await Product.insertMany(products);
    console.log('Products seeded successfully');

    // Create sample invoice
    const sampleInvoice = {
      invoiceNumber: 'INV001',
      date: new Date(),
      shopDetails,
      items: [
        {
          product: insertedProducts[0]._id,
          quantity: 1,
          price: insertedProducts[0].price,
          gstAmount: (insertedProducts[0].price * insertedProducts[0].gstRate) / 100,
          totalPrice: insertedProducts[0].price + (insertedProducts[0].price * insertedProducts[0].gstRate) / 100,
        },
        {
          product: insertedProducts[2]._id,
          quantity: 2,
          price: insertedProducts[2].price,
          gstAmount: (insertedProducts[2].price * insertedProducts[2].gstRate) / 100,
          totalPrice: 2 * (insertedProducts[2].price + (insertedProducts[2].price * insertedProducts[2].gstRate) / 100),
        },
      ],
      subtotal: insertedProducts[0].price + (2 * insertedProducts[2].price),
      totalGST:
        (insertedProducts[0].price * insertedProducts[0].gstRate) / 100 +
        (2 * insertedProducts[2].price * insertedProducts[2].gstRate) / 100,
      discount: 1000,
      grandTotal:
        insertedProducts[0].price +
        (insertedProducts[0].price * insertedProducts[0].gstRate) / 100 +
        2 * (insertedProducts[2].price + (insertedProducts[2].price * insertedProducts[2].gstRate) / 100) -
        1000,
      paymentMethod: 'card',
      status: 'paid',
    };

    await Invoice.create(sampleInvoice);
    console.log('Sample invoice created successfully');

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await disconnectDB();
  }
}

seedDatabase();
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from '../lib/db.js';
import productRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';
import invoiceRoutes from './routes/invoices.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors()); // Enable CORS
// app.use(cors({
//   origin: 'http://localhost:5173', // Allow only your frontend
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow only specific HTTP methods
//   allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
// }));
app.use(express.json());

// Routes
app.use( productRoutes);
app.use( cartRoutes);
app.use(invoiceRoutes);

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
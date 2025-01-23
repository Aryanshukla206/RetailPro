import axios from 'axios';

// Base API URL
const API_URL = 'http://localhost:5173/api';

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Define and export API methods
export const getProducts = () => api.get('/products');

export const createProduct = (product) => api.post('/products', product);

export const updateProduct = (id, product) =>
  api.put(`/products/${id}`, product);

export const deleteProduct = (id) => api.delete(`/products/${id}`);

export const getCart = (id) => api.get(`/cart/${id}`);

export const createCart = (cart) => api.post('/cart', cart);

export const updateCartStatus = (id, status) =>
  api.patch(`/cart/${id}/status`, { status });

export const getInvoices = () => api.get('/invoices');

export const getInvoice = (id) => api.get(`/invoices/${id}`);

export const createInvoice = (invoice) => api.post('/invoices', invoice);

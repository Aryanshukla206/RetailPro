import React, { useEffect, useState } from 'react';
// import { useStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import axios from 'axios';

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    productCode: "",
    name: "",
    category: "",
    price: "",
    gstRate: "",
    stockQuantity: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('http://localhost:8000/');
      const data = await response.json();
      console.log(data);
      setProducts(data);
    }
    fetchProducts();
  }, []);


  const handleAddProduct = async () => {
    try {
      const response = await axios.post("http://localhost:8000/", newProduct);
      console.log(response.data);
      setProducts([...products, response.data]); // Update state with the new product
      setNewProduct({
        productCode: "",
        name: "",
        category: "",
        price: "",
        gstRate: "",
        stockQuantity: "",
      });
      // setShowAddForm(false);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  
  const handleEditClick = (product) => {
    setEditingProduct(product);
    setNewProduct({
      productCode: product.productCode,
      name: product.name,
      category: product.category,
      price: product.price,
      gstRate: product.gstRate,
      stockQuantity: product.stockQuantity,
    });
  };
  const editProduct = async (id, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:8000/${id}`, updatedData);
      const updatedProduct = response.data;
      setProducts(
        products.map((product) => (product._id === id ? updatedProduct : product))
      );
      setEditingProduct(null);
    } catch (err) {
      console.error('Error updating product:', err);
    }
    console.log(id)
  };


  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
    }
    console.log(id);
  };

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Inventory Management</h1>
        <button onClick={() => setShowAddForm(!showAddForm)} className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
          Add Product
        </button>
      </div>
      {showAddForm && (
              <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "20px", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>

                <div style={{ marginBottom: "10px" }}>
                  <label>Product Code:</label>
                  <input
                    type="text"
                    placeholder="Enter Product Code"
                    value={newProduct.productCode}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, productCode: e.target.value })
                    }
                    style={{
                      marginLeft: "10px",
                      padding: "5px",
                      width: "calc(100% - 30px)",
                    }}
                  />
                </div>

                <div style={{ marginBottom: "10px" }}>
                  <label>Name:</label>
                  <input
                    type="text"
                    placeholder="Enter Product Name"
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, name: e.target.value })
                    }
                    style={{
                      marginLeft: "10px",
                      padding: "5px",
                      width: "calc(100% - 30px)",
                    }}
                  />
                </div>

                <div style={{ marginBottom: "10px" }}>
                  <label>Category:</label>
                  <input
                    type="text"
                    placeholder="Enter Category"
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, category: e.target.value })
                    }
                    style={{
                      marginLeft: "10px",
                      padding: "5px",
                      width: "calc(100% - 30px)",
                    }}
                  />
                </div>

                <div style={{ marginBottom: "10px" }}>
                  <label>Price:</label>
                  <input
                    type="number"
                    placeholder="Enter Price"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, price: e.target.value })
                    }
                    style={{
                      marginLeft: "10px",
                      padding: "5px",
                      width: "calc(100% - 30px)",
                    }}
                  />
                </div>

                <div style={{ marginBottom: "10px" }}>
                  <label>GST Rate (%):</label>
                  <input
                    type="number"
                    placeholder="Enter GST Rate"
                    value={newProduct.gstRate}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, gstRate: e.target.value })
                    }
                    style={{
                      marginLeft: "10px",
                      padding: "5px",
                      width: "calc(100% - 30px)",
                    }}
                  />
                </div>

                <div style={{ marginBottom: "10px" }}>
                  <label>Stock Quantity:</label>
                  <input
                    type="number"
                    placeholder="Enter Stock Quantity"
                    value={newProduct.stockQuantity}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, stockQuantity: e.target.value })
                    }
                    style={{
                      marginLeft: "10px",
                      padding: "5px",
                      width: "calc(100% - 30px)",
                    }}
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <button
                    onClick={handleAddProduct}
                    style={{
                      backgroundColor: "#4CAF50",
                      color: "white",
                      border: "none",
                      padding: "10px 15px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Save Product
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    style={{
                      backgroundColor: "#f44336",
                      color: "white",
                      border: "none",
                      padding: "10px 15px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}


      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                GST Rate
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.productCode}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatPrice(product.price)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.gstRate}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.stockQuantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => handleEditClick(product._id)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                    Edit
                  </button>
                  <button onClick={() => deleteProduct(product._id)} className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {editingProduct && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div className="bg-white p-6 rounded shadow-md">
                  <h2 className="text-lg font-bold mb-4">Edit Product</h2>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      editProduct(editingProduct._id, {
                        productCode: e.target.productCode.value,
                        name: e.target.name.value,
                        category: e.target.category.value,
                        price: e.target.price.value,
                        gstRate: e.target.gstRate.value,
                        stockQuantity: e.target.stockQuantity.value,
                      });
                    }}
                  >
                    <div className="mb-2">
                      <label className="block text-sm font-bold">Product Code:</label>
                      <input
                        type="text"
                        name="productCode"
                        defaultValue={editingProduct.productCode}
                        className="w-full border rounded px-2 py-1"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-bold">Name:</label>
                      <input
                        type="text"
                        name="name"
                        defaultValue={editingProduct.name}
                        className="w-full border rounded px-2 py-1"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-bold">Category:</label>
                      <input
                        type="text"
                        name="category"
                        defaultValue={editingProduct.category}
                        className="w-full border rounded px-2 py-1"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-bold">Price:</label>
                      <input
                        type="number"
                        name="price"
                        defaultValue={editingProduct.price}
                        className="w-full border rounded px-2 py-1"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-bold">GST Rate:</label>
                      <input
                        type="number"
                        name="gstRate"
                        defaultValue={editingProduct.gstRate}
                        className="w-full border rounded px-2 py-1"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-bold">Stock Quantity:</label>
                      <input
                        type="number"
                        name="stockQuantity"
                        defaultValue={editingProduct.stockQuantity}
                        className="w-full border rounded px-2 py-1"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        className="px-4 py-2 bg-gray-300 rounded"
                        onClick={() => setEditingProduct(null)}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => editProduct(editingProduct._id, editingProduct)}
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
      </div>
    </div>
  );
}
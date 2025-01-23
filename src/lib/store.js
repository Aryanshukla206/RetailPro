import { create } from "zustand";

export const useStore = create((set) => ({
  products: [],
  cart: null,
  setProducts: (products) => set({ products }),
  setCart: (cart) => set({ cart }),
  addToCart: (product, quantity) =>
    set((state) => {
      if (!state.cart) {
        const newCart = {
          id: crypto.randomUUID(),
          items: [
            {
              productId: product.id,
              product,
              quantity,
              price: product.price,
              gstAmount: (product.price * product.gstRate) / 100,
              totalPrice: product.price * quantity,
            },
          ],
          subtotal: product.price * quantity,
          totalGST: (product.price * product.gstRate * quantity) / 100,
          discount: 0,
          grandTotal:
            product.price * quantity +
            (product.price * product.gstRate * quantity) / 100,
          status: "active",
        };
        return { cart: newCart };
      }

      const existingItem = state.cart.items.find(
        (item) => item.productId === product.id
      );

      if (existingItem) {
        const updatedItems = state.cart.items.map((item) =>
          item.productId === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                totalPrice: (item.quantity + quantity) * item.price,
              }
            : item
        );

        const subtotal = updatedItems.reduce(
          (acc, item) => acc + item.totalPrice,
          0
        );
        const totalGST = updatedItems.reduce(
          (acc, item) => acc + item.gstAmount * item.quantity,
          0
        );

        return {
          cart: {
            ...state.cart,
            items: updatedItems,
            subtotal,
            totalGST,
            grandTotal: subtotal + totalGST - state.cart.discount,
          },
        };
      }

      const newItem = {
        productId: product.id,
        product,
        quantity,
        price: product.price,
        gstAmount: (product.price * product.gstRate) / 100,
        totalPrice: product.price * quantity,
      };

      const updatedItems = [...state.cart.items, newItem];
      const subtotal = updatedItems.reduce(
        (acc, item) => acc + item.totalPrice,
        0
      );
      const totalGST = updatedItems.reduce(
        (acc, item) => acc + item.gstAmount * item.quantity,
        0
      );

      return {
        cart: {
          ...state.cart,
          items: updatedItems,
          subtotal,
          totalGST,
          grandTotal: subtotal + totalGST - state.cart.discount,
        },
      };
    }),
  removeFromCart: (productId) =>
    set((state) => {
      if (!state.cart) return state;

      const updatedItems = state.cart.items.filter(
        (item) => item.productId !== productId
      );
      const subtotal = updatedItems.reduce(
        (acc, item) => acc + item.totalPrice,
        0
      );
      const totalGST = updatedItems.reduce(
        (acc, item) => acc + item.gstAmount * item.quantity,
        0
      );

      return {
        cart: {
          ...state.cart,
          items: updatedItems,
          subtotal,
          totalGST,
          grandTotal: subtotal + totalGST - state.cart.discount,
        },
      };
    }),
  updateCartItemQuantity: (productId, quantity) =>
    set((state) => {
      if (!state.cart) return state;

      const updatedItems = state.cart.items.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity,
              totalPrice: quantity * item.price,
            }
          : item
      );

      const subtotal = updatedItems.reduce(
        (acc, item) => acc + item.totalPrice,
        0
      );
      const totalGST = updatedItems.reduce(
        (acc, item) => acc + item.gstAmount * item.quantity,
        0
      );

      return {
        cart: {
          ...state.cart,
          items: updatedItems,
          subtotal,
          totalGST,
          grandTotal: subtotal + totalGST - state.cart.discount,
        },
      };
    }),
  clearCart: () => set({ cart: null }),
}));

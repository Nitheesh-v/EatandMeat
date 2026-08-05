import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

   const [cartItems, setCartItems] = useState(() => {
  const savedCart = localStorage.getItem("cartItems");
  return savedCart ? JSON.parse(savedCart) : [];
});

useEffect(() => {
  localStorage.setItem(
    "cartItems",
    JSON.stringify(cartItems)
  );
}, [cartItems]);

    const addToCart = (product) => {

        const existingItem = cartItems.find(
            (item) => item.id === product.id
        );

        if (existingItem) {

            setCartItems(
                cartItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );

        } else {

            setCartItems([
                ...cartItems,
                {
                    ...product,
                    quantity: 1
                }
            ]);

        }

    };

    const removeFromCart = (id) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
    };

    const increaseQuantity = (id) => {

        setCartItems(
            cartItems.map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );

    };

    const decreaseQuantity = (id) => {

        setCartItems(
            cartItems
                .map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );

    };
    const clearCart = () => {
  setCartItems([]);
  localStorage.removeItem("cartItems");
};

    const totalItems = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                totalItems,
                totalPrice,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
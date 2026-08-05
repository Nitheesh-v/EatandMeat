import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  return (
    <OrderContext.Provider
      value={{
        orders,
        setOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
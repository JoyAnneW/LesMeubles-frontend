import React, { createContext, useContext, useState } from "react";

const ShopContext = createContext();
export const ShopContextProvider = ({ children }) => {
	// add state data
	const [qty, setQty] = useState(1);
	return (
		<ShopContext.Provider value={{ qty, setQty }}>
			{children}
		</ShopContext.Provider>
	);
};

// creating a custom hook to use this context in other components
export const useShopContext = () => useContext(ShopContext);

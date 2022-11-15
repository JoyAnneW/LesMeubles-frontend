import React, { createContext, useContext, useState } from "react";

const ShopContext = createContext();
export const ShopContextProvider = ({ children }) => {
	// add state data
	const [qty, setQty] = useState(1);
	const [showCart, setShowCart] = useState(false);
	const [cartItems, setCartItems] = useState([]);

	const addToCart = (prod, quantity) => {
		const productIsInCart = cartItems.find((item) => item.slug === prod.slug);
		// if it's in the cart update the quantity
		if (productIsInCart) {
			// Chakra element enters value as a string
			const updatedCartItems = cartItems.map((item) =>
				item.slug === productIsInCart.slug
					? {
							...productIsInCart,
							quantity: Number(productIsInCart.quantity) + Number(quantity),
					  }
					: item
			);
			setCartItems(updatedCartItems);
			// console.log({ updatedCartItems });
		}
		setCartItems((cartItems) => [...cartItems, { ...prod, quantity }]);
	};
	return (
		<ShopContext.Provider
			value={{ qty, setQty, showCart, setShowCart, cartItems, addToCart }}
		>
			{children}
		</ShopContext.Provider>
	);
};

// creating a custom hook to use this context in other components
export const useShopContext = () => useContext(ShopContext);

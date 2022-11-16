import React, { createContext, useContext, useState } from "react";

const ShopContext = createContext();
export const ShopContextProvider = ({ children }) => {
	// add state data
	const [qty, setQty] = useState(1);
	const [cartItems, setCartItems] = useState([]);

	const increaseQuantityOfCartItem = (prod) => {
		return cartItems.map((item) =>
			item.slug === prod.slug
				? {
						...prod,
						quantity: Number(prod.quantity) + 1,
				  }
				: item
		);
	};

	const decreaseQuantityOfCartItem = (prod) => {
		return cartItems.map((item) =>
			item.slug === prod.slug
				? {
						...prod,
						quantity: Number(prod.quantity) - 1,
				  }
				: item
		);
	};

	const addToCart = (prod, quantity) => {
		const productInCart = cartItems.find((item) => item.slug === prod.slug);
		console.log({ productInCart });
		// if it's in the cart update the quantity
		if (productInCart) {
			// Chakra element enters value as a string
			const updatedCartItems = increaseQuantityOfCartItem(
				productInCart,
				quantity
			);
			setCartItems(updatedCartItems);
			console.log({ updatedCartItems });
		} else {
			setCartItems((cartItems) => [...cartItems, { ...prod, quantity }]);
		}
	};
	return (
		<ShopContext.Provider
			value={{
				qty,
				setQty,
				cartItems,
				setCartItems,
				addToCart,
				increaseQuantityOfCartItem,
				decreaseQuantityOfCartItem,
			}}
		>
			{children}
		</ShopContext.Provider>
	);
};

// creating a custom hook to use this context in other components
export const useShopContext = () => useContext(ShopContext);

import React, { createContext, useContext, useState } from "react";

const ShopContext = createContext();
export const ShopContextProvider = ({ children }) => {
	// add state data
	const [qty, setQty] = useState(1);
	const [cartItems, setCartItems] = useState([]);

	const increaseQuantityOfCartItem = (prod, quantity = 1) => {
		return cartItems.map((item) =>
			item.slug === prod.slug
				? // Chakra element enters value as a string
				  {
						...prod,
						quantity: Number(prod.quantity) + Number(quantity),
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

		// if it's in the cart update the quantity
		if (productInCart) {
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

	// pressing the minus button will either remove item from cart or decrease quantity by 1
	const handleDecrement = (prod) => {
		let updatedCartItems;
		console.log({ prod });

		if (prod.quantity === 1) {
			// remove from cart
			updatedCartItems = cartItems.filter((item) => item.slug !== prod.slug);
			console.log({ updatedCartItems });
		} else {
			updatedCartItems = decreaseQuantityOfCartItem(prod);
		}
		console.log({ updatedCartItems });

		setCartItems(updatedCartItems);
	};

	return (
		<ShopContext.Provider
			value={{
				qty,
				setQty,
				cartItems,
				setCartItems,
				addToCart,
				handleDecrement,
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

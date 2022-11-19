import React, { createContext, useContext, useState } from "react";

const ShopContext = createContext();
export const ShopContextProvider = ({ children }) => {
	// add state data
	const [qty, setQty] = useState(1);
	const [cartItems, setCartItems] = useState([]);

	const increaseQuantityOfCartItem = (prod, quantity = 1) => {
		console.log({ cartItems });
		return cartItems.map((item) => {
			return item.attributes.slug === prod.attributes.slug
				? // Chakra element enters value as a string
				  {
						...prod,
						quantity: Number(prod.quantity) + Number(quantity),
				  }
				: item;
		});
	};

	const decreaseQuantityOfCartItem = (prod) => {
		return cartItems.map((item) =>
			item.attributes.slug === prod.attributes.slug
				? {
						...prod,
						quantity: Number(prod.quantity) - 1,
				  }
				: item
		);
	};

	const addToCart = (prod, quantity = 1) => {
		console.log({ prod });
		const productInCart = cartItems.find((item) => {
			return item.attributes.slug === prod.attributes.slug;
		});

		// if it's in the cart update the quantity
		if (productInCart) {
			const updatedCartItems = increaseQuantityOfCartItem(
				productInCart,
				quantity
			);
			setCartItems(updatedCartItems);
		} else {
			setCartItems((cartItems) => [...cartItems, { ...prod, quantity }]);
		}
	};

	// pressing the minus button will either remove item from cart or decrease quantity by 1
	const handleDecrement = (prod) => {
		let updatedCartItems;

		if (prod.quantity === 1) {
			// remove from cart
			updatedCartItems = cartItems.filter(
				(item) => item.attributes.slug !== prod.attributes.slug
			);
		} else {
			updatedCartItems = decreaseQuantityOfCartItem(prod);
		}
		setCartItems(updatedCartItems);
	};

	const totalQuantitiesInCart = cartItems.reduce(
		(acc, item) => acc + Number(item.quantity),
		0
	);

	const subTotal = cartItems.reduce((acc, item) => {
		return acc + item.quantity * item.attributes.price;
	}, 0);
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
				totalQuantitiesInCart,
				subTotal,
			}}
		>
			{children}
		</ShopContext.Provider>
	);
};

// creating a custom hook to use this context in other components
export const useShopContext = () => useContext(ShopContext);

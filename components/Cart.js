import { useShopContext } from "../lib/context";

export default function Cart() {
	const { cartItems, showCart } = useShopContext();
	return (
		<div>
			{cartItems.map((item) => (
				<div>{item.name}</div>
			))}
		</div>
	);
}

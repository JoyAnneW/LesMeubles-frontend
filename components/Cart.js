import {
	Box,
	Button,
	Flex,
	HStack,
	Icon,
	Image,
	Input,
	Text,
	VStack,
	useNumberInput,
} from "@chakra-ui/react";
import { useShopContext } from "../lib/context";
import { FiShoppingCart } from "react-icons/fi";

export default function Cart() {
	const {
		cartItems,
		setCartItems,
		increaseQuantityOfCartItem,
		decreaseQuantityOfCartItem,
	} = useShopContext();
	const { qty, setQty } = useShopContext();
	const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
		useNumberInput({
			step: 1,
			min: 0,
		});
	const inc = getIncrementButtonProps();
	const dec = getDecrementButtonProps();

	const input = getInputProps();

	const incrementQuantity = (prod) => {
		console.log({ prod });
		const updatedCartItems = increaseQuantityOfCartItem(prod);
		console.log({ updatedCartItems });
		setCartItems(updatedCartItems);
	};

	const decrementQuantity = (prod) => {
		console.log({ prod });
		const updatedCartItems = decreaseQuantityOfCartItem(prod);
		console.log({ updatedCartItems });
		setCartItems(updatedCartItems);
	};

	return (
		<Box h="75vh">
			{cartItems.length ? (
				<Flex direction="column" gap={6}>
					{cartItems.map((item) => {
						const thumbnail = item.image.data.attributes.formats.thumbnail.url;

						return (
							<Flex gap={4} key={item.slug}>
								<Image src={thumbnail} borderRadius="lg" />

								<Box>
									<Text fontSize="xl" fontWeight="bold">
										{item.name}
									</Text>
									<Text fontSize="xl">€{item.price}</Text>{" "}
									<Text fontSize="xl" mt="5">
										Quantity: {item.quantity}
									</Text>
									<HStack maxW="320px" mt={16}>
										<Button {...inc} onClick={() => incrementQuantity(item)}>
											+
										</Button>
										<Input {...input} value={item.quantity} />
										<Button {...dec} onClick={() => decrementQuantity(item)}>
											-
										</Button>
									</HStack>
								</Box>
							</Flex>
						);
					})}
				</Flex>
			) : (
				<Flex alignItems="center" justify="center" h="full">
					<VStack spacing={2}>
						<Icon as={FiShoppingCart} fontSize="8xl" color="orange.500" />
						<Text fontSize="2xl">Let's get to shopping!</Text>
					</VStack>
				</Flex>
			)}
		</Box>
	);
}

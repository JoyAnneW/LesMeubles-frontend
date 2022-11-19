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
		handleDecrement,
	} = useShopContext();
	const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
		useNumberInput({
			step: 1,
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

	return (
		<Box h="75vh">
			{cartItems.length ? (
				<Flex direction="column" gap={6}>
					{cartItems.map((item) => {
						const { image, name, price, slug } = item.attributes;
						const thumbnail = image.data.attributes.formats.thumbnail.url;

						return (
							<Flex gap={4} key={slug}>
								<Image src={thumbnail} borderRadius="lg" />

								<Box>
									<Text fontSize="xl" fontWeight="bold">
										{name}
									</Text>
									<Text fontSize="xl">€{price}</Text>{" "}
									<HStack maxW="320px" mt={16}>
										<Button {...inc} onClick={() => incrementQuantity(item)}>
											+
										</Button>
										<Input {...input} value={item.quantity} />
										<Button {...dec} onClick={() => handleDecrement(item)}>
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

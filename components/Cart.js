import {
	Box,
	Center,
	Flex,
	Heading,
	HStack,
	Icon,
	Image,
	Text,
	VStack,
} from "@chakra-ui/react";
import { useShopContext } from "../lib/context";
import { FiShoppingCart } from "react-icons/fi";

export default function Cart() {
	const { cartItems, showCart } = useShopContext();

	return (
		<Box h="75vh">
			{cartItems.length ? (
				<Flex direction="column" gap={6}>
					{cartItems.map((item) => {
						const thumbnail = item.image.data.attributes.formats.thumbnail.url;

						return (
							<Flex gap={4}>
								<Image src={thumbnail} borderRadius="lg" />

								<Box>
									<Text fontSize="xl" fontWeight="bold">
										{item.name}
									</Text>
									<Text fontSize="xl">€{item.price}</Text>{" "}
									<Text fontSize="xl" mt="5">
										Quantity: {item.quantity}
									</Text>
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

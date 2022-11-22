import {
	Box,
	Button,
	chakra,
	Flex,
	HStack,
	Icon,
	Image,
	Input,
	shouldForwardProp,
	Text,
	VStack,
	useNumberInput,
} from "@chakra-ui/react";
import { useShopContext } from "../lib/context";
import { FiShoppingCart } from "react-icons/fi";
import { motion, isValidMotionProp } from "framer-motion";

const ChakraBox = chakra(motion.div, {
	/**
	 * Allow motion props and non-Chakra props to be forwarded.
	 */
	shouldForwardProp: (prop) =>
		isValidMotionProp(prop) || shouldForwardProp(prop),
});

//animation config for parent
const cards = {
	hidden: { opacity: 0, scale: 0.8 },
	show: {
		opacity: 1,
		scale: 1,
		transition: {
			delayChildren: 0.3,
			staggerChildren: 0.1,
		},
	},
};

const card = {
	hidden: { opacity: 0, scale: 0.8 },
	show: { opacity: 1, scale: 1 },
};

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
				<Flex
					direction="column"
					gap={3}
					as={motion.div}
					variants={cards}
					initial="hidden"
					animate="show"
					layout
				>
					{cartItems.map((item) => {
						const { image, name, price, slug } = item.attributes;
						const thumbnail = image.data.attributes.formats.thumbnail.url;

						return (
							<Flex
								gap={4}
								boxShadow="xs"
								rounded="lg"
								p={6}
								key={slug}
								as={motion.div}
								variants={card}
								layout
							>
								<Image src={thumbnail} rounded="lg" />

								<Flex direction="column">
									<Text fontSize="lg" fontWeight="bold">
										{name}
									</Text>
									<Text fontSize="lg">€{price}</Text>{" "}
									<HStack maxW="320px" mt="auto">
										<Button
											size="sm"
											{...inc}
											onClick={() => incrementQuantity(item)}
										>
											+
										</Button>
										<Input size="sm" {...input} value={item.quantity} />
										<Button
											size="sm"
											{...dec}
											onClick={() => handleDecrement(item)}
										>
											-
										</Button>
									</HStack>
								</Flex>
							</Flex>
						);
					})}
				</Flex>
			) : (
				<ChakraBox
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ type: "spring", stiffness: 40 }}
					display="flex"
					justifyContent="center"
					alignItems="center"
					h="full"
				>
					<VStack spacing={2}>
						<Icon as={FiShoppingCart} fontSize="8xl" color="orange.500" />
						<Text fontSize="2xl">Let's get to shopping!</Text>
					</VStack>
				</ChakraBox>
			)}
		</Box>
	);
}

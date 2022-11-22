import { useRef } from "react";

import {
	Box,
	Button,
	chakra,
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Flex,
	Heading,
	HStack,
	Icon,
	Image,
	Input,
	shouldForwardProp,
	Text,
	useDisclosure,
	VStack,
	useNumberInput,
} from "@chakra-ui/react";
import { useShopContext } from "../lib/context";
import { FiShoppingCart } from "react-icons/fi";
import { motion, isValidMotionProp } from "framer-motion";
import getStripe from "../lib/getStripe";

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

export default function Cart({ isOpen, onClose }) {
	const {
		cartItems,
		setCartItems,
		increaseQuantityOfCartItem,
		handleDecrement,
		subTotal,
	} = useShopContext();

	const btnRef = useRef();
	const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
		useNumberInput({
			step: 1,
		});
	const inc = getIncrementButtonProps();
	const dec = getDecrementButtonProps();
	const input = getInputProps();

	const incrementQuantity = (prod) => {
		// console.log({ prod });
		const updatedCartItems = increaseQuantityOfCartItem(prod);
		console.log({ updatedCartItems });
		setCartItems(updatedCartItems);
	};

	const handleCheckout = async () => {
		const stripePromise = await getStripe();
		// can make api requests from next.js in api folder.
		const response = await fetch(`/api/create-stripe-session`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(cartItems),
		});

		const data = await response.json();
		console.log({ data });
		await stripePromise.redirectToCheckout({ sessionId: data.id });
	};
	return (
		<Drawer
			isOpen={isOpen}
			placement="right"
			onClose={onClose}
			finalFocusRef={btnRef}
			size="md"
		>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader textAlign="center" color="orange.900">
					Your Shopping Cart
				</DrawerHeader>
				<DrawerBody>
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
				</DrawerBody>
				<DrawerFooter justifyContent="center" p={6}>
					{cartItems.length > 0 && (
						<Flex direction="column" gap={2} w="full" mb={4}>
							<Flex gap={4}>
								<Text fontSize="2xl">Subtotal: </Text>
								<Heading fontWeight="semibold">€{subTotal}</Heading>
							</Flex>
							<Button
								variant="solid"
								colorScheme="orange"
								w="full"
								onClick={handleCheckout}
							>
								Checkout
							</Button>
						</Flex>
					)}
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

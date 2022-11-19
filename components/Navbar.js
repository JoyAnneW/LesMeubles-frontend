import { useRef } from "react";
import {
	Button,
	ButtonGroup,
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Flex,
	Heading,
	Icon,
	useDisclosure,
	Box,
	Center,
	Text,
} from "@chakra-ui/react";

import { FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import Cart from "./Cart";
import { useShopContext } from "../lib/context";

export default function Navbar() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();
	const { cartItems, totalQuantitiesInCart, subTotal } = useShopContext();

	return (
		<Flex
			position="fixed"
			zIndex={200}
			top="0"
			left="0"
			width="100%"
			backgroundColor="rgba(255, 250, 240, 0.8)"
			backdropFilter="saturate(180%) blur(5px)"
			justify="space-between"
			p={6}
		>
			<Link href={"/"}>
				<Heading as="em" color="yellow.900">
					Les Meubles
				</Heading>
			</Link>

			<ButtonGroup spacing="2">
				<Button variant="solid" colorScheme="orange">
					Login
				</Button>
				<Button
					variant="ghost"
					colorScheme="orange"
					ref={btnRef}
					onClick={onOpen}
				>
					<Flex direction="column" position="relative">
						{cartItems.length > 0 && (
							<Center
								fontWeight="semibold"
								position="absolute"
								top={-4}
								left={2}
								height={5}
								width={5}
								backgroundColor="orange.500"
								borderRadius="full"
								color="orange.50"
								fontSize="sm"
							>
								{totalQuantitiesInCart}
							</Center>
						)}
						<Icon as={FiShoppingCart} fontSize="3xl" />
					</Flex>
				</Button>
			</ButtonGroup>
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
						<Cart />
					</DrawerBody>
					<DrawerFooter>
						{cartItems.length > 0 && (
							<Flex gap={4}>
								<Text fontSize="2xl">Subtotal: </Text>
								<Heading fontWeight="semibold">€{subTotal}</Heading>
							</Flex>
						)}
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</Flex>
	);
}

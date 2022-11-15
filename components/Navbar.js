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
} from "@chakra-ui/react";

import { FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import Cart from "./Cart";

export default function Navbar() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();

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
					<Icon as={FiShoppingCart} fontSize="3xl" />
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
				</DrawerContent>
			</Drawer>
		</Flex>
	);
}

import { useRef } from "react";
import {
	Button,
	ButtonGroup,
	Flex,
	Heading,
	Icon,
	useDisclosure,
	Center,
	Slide,
} from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import Cart from "./Cart";
import { useShopContext } from "../lib/context";
import { motion } from "framer-motion";

export default function Navbar() {
	const { isOpen, onToggle, onClose } = useDisclosure();
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
					onClick={onToggle}
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
								as={motion.div}
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
							>
								{totalQuantitiesInCart}
							</Center>
						)}
						<Icon as={FiShoppingCart} fontSize="3xl" />
					</Flex>
				</Button>
			</ButtonGroup>

			<Slide in={isOpen}>
				<Cart isOpen={isOpen} onClose={onClose} />
			</Slide>
		</Flex>
	);
}

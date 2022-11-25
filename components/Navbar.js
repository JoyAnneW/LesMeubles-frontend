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
import User from "./User";
import { useUser } from "@auth0/nextjs-auth0";

export default function Navbar() {
	const { isOpen, onToggle, onClose } = useDisclosure();
	const btnRef = useRef();
	const { cartItems, totalQuantitiesInCart, subTotal } = useShopContext();
	const { user, error, loading } = useUser();
	console.log({ user });
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

			<ButtonGroup>
				{user ? (
					<Button
						variant="ghost"
						colorScheme="orange"
						margin={0}
						p={0}
						alignItems="flex-end"
						justifyContent="flex-end"
					>
						<User />
					</Button>
				) : (
					<Button variant="solid" colorScheme="orange">
						<a href="/api/auth/login">Login</a>
					</Button>
				)}
				<Button
					variant="ghost"
					colorScheme="orange"
					ref={btnRef}
					onClick={onToggle}
					margin={0}
					p={0}
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

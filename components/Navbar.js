import { Button, ButtonGroup, Flex, Heading, Icon } from "@chakra-ui/react";
import { FiShoppingBag } from "react-icons/fi";
import Link from "next/link";

export default function Navbar() {
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
				<Button variant="ghost" colorScheme="orange">
					<Icon as={FiShoppingBag} fontSize="3xl" />
				</Button>
			</ButtonGroup>
		</Flex>
	);
}

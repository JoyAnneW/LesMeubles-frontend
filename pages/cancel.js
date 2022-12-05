import {
	Center,
	Box,
	Button,
	Heading,
	Text,
	Link,
	VStack,
} from "@chakra-ui/react";
import React from "react";

export default function cancel() {
	return (
		<Center h="100vh">
			<VStack gap={6} alignItems="center">
				<Box textAlign="center">
					<Heading>Payment Failed.</Heading>
					<Text fontWeight="bold">
						Go to your shopping cart to submit your order again.
					</Text>
				</Box>
				<Box>
					<Button variant="solid" colorScheme="orange">
						<Link href="/" style={{ textDecoration: "none" }}>
							Continue Shopping
						</Link>
					</Button>
				</Box>
			</VStack>
		</Center>
	);
}

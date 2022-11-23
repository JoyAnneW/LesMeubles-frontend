import {
	Box,
	Button,
	Center,
	Divider,
	Flex,
	Heading,
	HStack,
	Icon,
	Image,
	Link,
	Text,
	VStack,
} from "@chakra-ui/react";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
export async function getServerSideProps(params) {
	console.log({ params });
	// get the session id from the url and retrieve that session from stripe to get customer's info
	const { session_id } = params.query;
	const session = await stripe.checkout.sessions.retrieve(session_id, {
		expand: ["line_items"],
	});
	console.log({ session });

	return {
		props: { session },
	};
}
export default function success({ session }) {
	const { email, address } = session.customer_details;
	const productsPurchased = session.line_items?.data;
	console.log({ productsPurchased });
	return (
		<Center h="100vh">
			<Flex gap={6} h="50%">
				<VStack gap={6} alignItems="center">
					<Box textAlign="center">
						<Heading>Thank you for your order!</Heading>
						<Text fontWeight="bold">
							A confirmation email has been sent to {email}.
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
				<Divider orientation="vertical" />
				<VStack>
					<Heading>Order Details</Heading>
					<Heading as="h4" size="md">
						Shipping address
					</Heading>
					<Text>{address.line1}</Text>
					{address.line2 ? <Text>{address.line2}</Text> : ""}
					<Text>
						{address.city}, {address.postal_code}
					</Text>
					<Text>{address.country}</Text>
					<Flex direction="column">
						<Heading as="h4" size="md">
							Your Order
						</Heading>
						<Flex direction="column" gap={3}>
							{productsPurchased.map((item) => {
								return (
									<Flex direction="column" py={3} key={item.id}>
										<Text>{item.description}</Text>
										<Text>Quantity: {item.quantity}</Text>
										<Text>Total: €{item.amount_total / 100}</Text>{" "}
										<Divider mt={3} />
									</Flex>
								);
							})}
						</Flex>
					</Flex>
				</VStack>
			</Flex>
		</Center>
	);
}

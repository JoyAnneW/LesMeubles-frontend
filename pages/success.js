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
	console.log({ session });
	return (
		<Center h="100vh">
			<Flex gap={6} h="50%">
				<VStack>
					<Heading>Thank you for your order!</Heading>
					<Text>
						A confirmation email has been sent to "{"your email"}"
					</Text>{" "}
					<Box>
						<Button variant="solid" colorScheme="orange">
							<Link href="/" style={{ textDecoration: "none" }}>
								Continue Shopping{" "}
							</Link>
						</Button>
					</Box>
				</VStack>
				<Divider orientation="vertical" />
				<VStack>
					<Heading>Order Details</Heading>
					<Text>Shipping address</Text>
					<Box>List of products ordered</Box>
				</VStack>
			</Flex>
		</Center>
	);
}

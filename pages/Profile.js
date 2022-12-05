import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// lets us secure the route so that only authorized users can access
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Box, Button, Center, Flex, Heading, Text } from "@chakra-ui/react";

export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps(ctx) {
		// ctx gives acess to the user
		const authSession = getSession(ctx.req, ctx.res);
		const stripeId = authSession.user.stripe_customer_id;
		// fetch payment
		const paymentIntents = await stripe.paymentIntents.list({
			customer: stripeId,
		});
		return {
			props: { orders: paymentIntents.data },
		};
	},
});

// by default withPageAuthRequired passes the user as well
export default function Profile({ user, orders }) {
	// console.log({ user, orders });
	return user ? (
		<Center my="28" mx="6">
			<Flex gap={10} p={10}>
				<Box p={6}>
					<Heading>{user.name}</Heading>
					<Text fontWeight="bold">{user.email}</Text>
					<Button variant="ghost" colorScheme="orange" w="full" mt={6}>
						<a href="/api/auth/logout">Logout</a>
					</Button>
				</Box>
				<Flex direction="column" p={6} gap={6}>
					<Heading>Orders</Heading>
					{orders.map((order) => (
						<Flex gap={24}>
							<Text fontWeight="bold">Order Number: {order.id}</Text>
							<Text fontWeight="bold">Total: €{order.amount / 100}</Text>
						</Flex>
					))}
				</Flex>
			</Flex>
		</Center>
	) : (
		<Center>
			<Text>You haven't made any orders yet.</Text>
		</Center>
	);
}

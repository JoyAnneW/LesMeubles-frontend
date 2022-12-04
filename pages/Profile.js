import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// lets us secure the route so that only authorized users can access
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Button, Center, Flex, Text } from "@chakra-ui/react";

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
	console.log({ user, orders });
	return user ? (
		<Center my="28" mx="6">
			<Flex>
				<h2>{user.name}</h2>
				<p>{user.email}</p>
				<div>
					{orders.map((order) => (
						<div>
							<h1>Order Number: {order.id}</h1>
							<h2>{order.amount / 100}</h2>
						</div>
					))}
				</div>
			</Flex>
			<Button variant="solid" colorScheme="orange" w="full">
				<a href="/api/auth/logout">Logout</a>
			</Button>
		</Center>
	) : (
		<Center>
			<Text>You haven't made any orders yet.</Text>
		</Center>
	);
}

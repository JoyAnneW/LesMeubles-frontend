const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// lets us secure the route so that only authorized users can access
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";

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
export default function Profile({ orders }) {
	console.log({ orders });
	return <div>Profile</div>;
}

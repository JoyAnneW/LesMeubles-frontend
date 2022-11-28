// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import { getSession } from "@auth0/nextjs-auth0";
// this api will communicate with stripe and back to our app
export default async function handler(req, res) {
	// rule set up in auth0 that automatically creates a stripe customer when a user registers on the app
	const authSession = getSession(req, res);
	const user = authSession?.user;
	console.log({ user });
	if (req.method === "POST") {
		const lineItems = req.body.map((item) => {
			const { name, image, price } = item.attributes;

			return {
				price_data: {
					currency: "eur",
					product_data: {
						name,
						images: [image.data.attributes.formats.thumbnail.url],
					},
					unit_amount: price * 100,
				},
				adjustable_quantity: {
					enabled: true,
					minimum: 1,
				},
				quantity: item.quantity,
			};
		});

		try {
			// create checkout session
			const session = await stripe.checkout.sessions.create({
				submit_type: "pay",
				mode: "payment",
				// attach stripe cus id to this purchase
				customer: user.stripe_customer_id,
				payment_method_types: ["card"],
				shipping_address_collection: {
					allowed_countries: ["NL", "US", "GB", "CA", "GR"],
				},
				allow_promotion_codes: true,
				shipping_options: [
					{
						shipping_rate_data: {
							type: "fixed_amount",
							fixed_amount: { amount: 5 * 100, currency: "eur" },
							display_name: "Express shipping",
							delivery_estimate: {
								minimum: { unit: "business_day", value: 3 },
								maximum: { unit: "business_day", value: 5 },
							},
						},
					},
					{
						shipping_rate_data: {
							type: "fixed_amount",
							fixed_amount: { amount: 0, currency: "eur" },
							display_name: "Regular shipping",
							delivery_estimate: {
								minimum: { unit: "business_day", value: 7 },
								maximum: { unit: "business_day", value: 10 },
							},
						},
					},
				],
				line_items: lineItems,
				// pages for after successful or failed payment. origin is base url. checkout session id is passed to success page in url
				success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
				cancel_url: `${req.headers.origin}/cancel`,
			});
			// console.log({ session });
			res.status(200).json({ session });
		} catch (error) {
			res.status(error.statusCode || 500).json(error.message);
		}
	}
}

// export const config = {
// 	api: {
// 		bodyParser: false, // Defaults to true. Setting this to false disables body parsing and allows you to consume the request body as stream or raw-body.
// 		responseLimit: false, // Determines how much data should be sent from the response body. It is automatically enabled and defaults to 4mb.
// 		externalResolver: true, // Disables warnings for unresolved requests if the route is being handled by an external resolver like Express.js or Connect. Defaults to false.
// 	},
// };

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// this api will communicate with stripe and back to our app
export default async function handler(req, res) {
	if (req.method === "POST") {
		console.log(req.body);
		const lineItems = req.body.map((item) => {
			const { name, image, price } = item.attributes;
			return {
				price_data: {
					currency: "eur",
					product_data: {
						name: name,
						images: [image.data.attributes.formats.thumbnail.url],
					},
					unit_amount: price * 100,
				},
			};
		});

		try {
			// create checkout session
			const session = await stripe.checkout.sessions.create({
				submit_type: "pay",
				mode: "payment",
				payment_method_types: ["card"],
				shipping_address_collection: {
					allowed_countries: ["NL", "US", "GB", "CA", "GR"],
					line_items: lineItems,
				},
			});
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

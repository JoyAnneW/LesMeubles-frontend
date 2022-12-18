# Les Meubles

Les Meubles is an ecommerce application with a frontend powered by Next.js and styled with Chakra UI. Auth0 is used to manage authentication.

Inventory is managed with Strapi CMS and queried using the GraphQL API. Images uploaded to Strapi are automatically optimized in Cloudinary.
The backend repo can be found [here](https://github.com/JoyAnneW/LesMeubles-backend).

Users can:

- add items to their cart, increase or decrease quantity of cart items and remove items from the cart.
- create an account and sign in to see their purchases. Auth0 is used to manange authentication
- complete a purchase with or without an account

## Working on

- adding functionality to search through products
- adding the specific details of the products purchased to the Previous Orders page rather than just the order id from Stripe.

## Getting Started

This project uses node v14.19.1.

To install dependencies

```bash
yarn install
```

To run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

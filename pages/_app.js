import "../styles/globals.css";
import { Provider, createClient } from "urql";

// this is the address to the backend. Provider below gives access to the backend to our app
const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API });
function MyApp({ Component, pageProps }) {
	return (
		<Provider value={client}>
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
			},
		],
	},
	// to redirect to homepage instead of cancel page
	// async redirects() {
	// 	return [{ source: "/cancel", destination: "/", permanent: true }];
	// },
};

module.exports = nextConfig;

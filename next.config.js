const plugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

// The NextJS config defined separately
// Gets passed to next-offline
const nextConfig = {
	webpack(config, { isServer }) {
		// Allow importing of shader files (e.g. `.glsl` -- filenames below)
		// @see: https://github.com/glslify/glslify-loader
		config.module.rules.push({
			test: /\.(glsl|vs|fs|vert|frag|ps)$/,
			exclude: /node_modules/,
			use: ['raw-loader', 'glslify-loader'],
		});

		return config;
	},
};

module.exports = plugins(
	[
		// Setup Offline Support
		// This requires the `public` folder with a `manifest.json`
		withBundleAnalyzer,
	],
	nextConfig
);

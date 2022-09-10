/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial-welcome':
					'radial-gradient(circle at center, rgba(123, 97, 255, 0.6), rgba(123, 97, 255, 0.0) 70%)',
				'gradient-radial-won':
					'radial-gradient(circle at center, rgba(74, 221, 212, 0.6), rgba(120, 114, 191, 0.17) 70%)',
				'gradient-radial-lost':
					'radial-gradient(circle at center, rgba(64, 32, 227, 0.6), rgba(123, 97, 255, 0) 70%)',
			},
			dropShadow: {
				glow: '0 2px 4px rgba(26, 226, 239, 0.95)',
			},
		},
	},
	plugins: [],
};

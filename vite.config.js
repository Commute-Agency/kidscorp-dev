import { defineConfig } from "vite";

// vite.config.js
export default defineConfig(({ mode }) => {
	return {
		server: {
			host: "localhost",
			port: 3000,
			cors: "*",
			hmr: {
				host: "localhost",
				port: 3000,
				protocol: "ws",
			},
		},
		build: {
			minify: true,
			manifest: true,
			rollupOptions: {
				input: "./src/main.js",
				output: {
					format: "umd",
					entryFileNames: "main.js",
					esModule: false,
					compact: true,
					globals: {
						jquery: "$",
					},
				},
				external: ["jquery"],
			},
		},
	};
});
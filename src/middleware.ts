// Protect against common attacks e.g. SQL injection, XSS, CSRF
import arcjet, { createMiddleware, shield, detectBot } from "@arcjet/next";

export const config = {
	// matcher tells Next.js which routes to run the middleware on.
	// This runs the middleware on all routes except for static assets.
	matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

const arcjetKey = process.env.ARCJET_KEY;

if (!arcjetKey) {
	throw new Error("ARCJET_KEY environment variable is not set");
}

const aj = arcjet({
	key: arcjetKey,
	rules: [
		// Block common attacks e.g. SQL injection, XSS, CSRF
		shield({
			// Will block requests. Use "DRY_RUN" to log only
			mode: "LIVE",
		}),
		detectBot({
			// Will block requests. Use "DRY_RUN" to log only
			mode: "LIVE",
			// Blocks all automated clients
			block: ["AUTOMATED"],
		}),
	],
});

// Pass existing middleware with optional existingMiddleware prop
export default createMiddleware(aj);

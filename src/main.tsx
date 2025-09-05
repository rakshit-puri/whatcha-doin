import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Lazy-ish route chooser: keep things simple and synchronous.
// If location starts with /v2 we render the V2 page; otherwise render the existing App.
// This is intentionally simple so Vercel previews and direct URL visits work out of the box.

const rootEl = document.getElementById("root")!;

function renderApp() {
	const pathname = window.location.pathname || "/";
	// treat /v2 and any subpaths (e.g. /v2/whatever) as v2
	if (pathname.startsWith("/v2")) {
		// dynamic import the V2 page so the main bundle stays focused
		// (Note: dynamic import returns a Promise; we render a minimal fallback then hydrate)
		// We'll render a small placeholder while the module loads.
		const container = rootEl;
		container.innerHTML = `<div id="v2-loading" class="min-h-screen flex items-center justify-center">Loading v2…</div>`;

		// import then render
		import("./pages/indexV2")
			.then((mod) => {
				const V2 = mod.default;
				createRoot(container).render(<V2 />);
			})
			.catch((err) => {
				console.error("Failed to load /v2 bundle", err);
				// fallback to v1 if import fails
				createRoot(container).render(<App />);
			});
	} else {
		// default to v1
		createRoot(rootEl).render(<App />);
	}
}

renderApp();

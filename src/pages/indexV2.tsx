import React from "react";
import { BackyardScene } from "@/components/BackyardScene";

const IndexV2 = () => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-6">
			<header className="max-w-2xl w-full text-center mb-8">
				<h1 className="text-4xl font-bold">Whatcha Doin? 2.0</h1>
				<p className="mt-2 text-sm text-muted-foreground">
					Welcome to the v2 playground. This route isolates the next version so we can iterate safely without
					affecting the live homepage. Use this space to test auth, device recovery, image-ttl, and RLS
					policies.
				</p>
				<div className="mt-4 flex justify-center gap-3">
					<a href="/" className="inline-block px-4 py-2 rounded-lg border border-border hover:shadow-sm">
						Back to v1 (root)
					</a>
					<a
						href="/v2"
						className="inline-block px-4 py-2 rounded-lg bg-primary text-primary-foreground"
						aria-current="page"
					>
						You are on v2
					</a>
				</div>
			</header>

			<main className="w-full max-w-4xl">
				{/* For now reuse the BackyardScene so behavior is comparable.
            Later we will replace this with the v2-only UI (auth, edit flow, TTL images etc). */}
				<BackyardScenePreview />
			</main>

			<footer className="mt-12 text-xs text-muted-foreground">
				v2 is experimental. Migrate users only after tests pass.
			</footer>
		</div>
	);
};

const BackyardScenePreview = () => {
	// Keep same BackyardScene so QA can compare v1 and v2 behavior.
	// If you want to diverge, replace this component in future increments.
	return (
		<div>
			<BackyardScene />
		</div>
	);
};

export default IndexV2;

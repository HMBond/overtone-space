/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	interface Locals {
		userid: string;
	}
}

interface Navigator {
	mediaDevices: {
		getUserMedia(
			options: { video?: bool; audio?: bool },
			success: (stream: MediaStream) => void,
			error?: (error: string) => void
		): void;
	};
}

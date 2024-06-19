<script context="module">
	import { dev } from '$app/env';
	import { onMount } from 'svelte';
	import * as three from 'three';
	import {
		appendFragmentShaderScript,
		appendRenderer,
		appendStats,
		appendVertexScript,
		generateStars
	} from './space.helpers';

	// we'll load it in dev so that we get hot module replacement...
	export const hydrate = dev;
</script>

<script lang="ts">
	let container: HTMLElement;
	const VELOCITY = 10;
	const Z_DEPTH = 1000;

	onMount(() => {
		appendVertexScript();
		appendFragmentShaderScript();
		const scene = new three.Scene();
		const camera = new three.PerspectiveCamera(
			40,
			window.innerWidth / window.innerHeight,
			1,
			10000
		);
		const renderer = appendRenderer(container);
		const fps = import.meta.env.DEV && appendStats();

		const frame = animate(scene, camera, renderer, fps);
		return () => {
			cancelAnimationFrame(frame);
		};
	});

	function animate(
		scene: THREE.Scene,
		camera: THREE.PerspectiveCamera,
		renderer: THREE.WebGLRenderer,
		fps: any | false
	): number {
		const newStars = generateStars(10, Z_DEPTH);
		scene.add(newStars);

		// move all stars towards camera and remove when passed
		for (const child of scene.children) {
			if (child.position.z > Z_DEPTH) {
				scene.remove(child);
			} else {
				child.position.z += VELOCITY;
			}
		}

		renderer.render(scene, camera);
		fps && fps.update();
		return requestAnimationFrame(() => animate(scene, camera, renderer, fps));
	}
</script>

<div class="backdrop" bind:this={container} />

<style>
	.backdrop {
		position: fixed;
		z-index: -1;
	}
</style>

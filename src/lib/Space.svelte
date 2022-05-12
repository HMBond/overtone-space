<script type="module">
    export const dev
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import * as three from 'three';

	onMount(initSpace);

	function initSpace() {
		const scene = new three.Scene();
		const camera = getCamera();
		const renderer = getRenderer();
		const stars = getStars();
		scene.add(stars);
		animate(scene, camera, renderer);

		function getCamera(): THREE.PerspectiveCamera {
			const camera = new three.PerspectiveCamera(
				60,
				window.innerWidth / window.innerHeight,
				1,
				1000
			);
			camera.position.z = 1;
			camera.rotation.x = Math.PI / 2;
			return camera;
		}

		function getRenderer() {
			const renderer = new three.WebGLRenderer();
			renderer.setPixelRatio(window.devicePixelRatio);
			renderer.setSize(window.innerWidth, window.innerHeight);
			document.body.appendChild(renderer.domElement);
			return renderer;
		}

		function getStars(): THREE.Points {
			const geometry = new three.BufferGeometry();
			const particles = 6000;
			const radius = 200;
			const positions = [];
			const colors = [];
			const color = new three.Color();
			const sizes = [];
			for (let i = 0; i < particles; i++) {
				positions.push((Math.random() * 2 - 1) * radius);
				positions.push((Math.random() * 2 - 1) * radius);
				positions.push((Math.random() * 2 - 1) * radius);

				color.setHSL(0, 1, 1);

				colors.push(1, 1, 1);

				sizes.push(300);
			}

			geometry.setAttribute('position', new three.Float32BufferAttribute(positions, 3));
			geometry.setAttribute('color', new three.Float32BufferAttribute(colors, 3));
			const sizeAttribute = new three.Float32BufferAttribute(sizes, 1);
			sizeAttribute.setUsage(three.DynamicDrawUsage);
			geometry.setAttribute('size', sizeAttribute);

			const shaderMaterial = new three.ShaderMaterial({
				uniforms: {
					pointTexture: { value: new three.TextureLoader().load('sprites/favicon.png') }
				},
				blending: three.AdditiveBlending,
				depthTest: false,
				transparent: true,
				vertexColors: true
			});

			return new three.Points(geometry, shaderMaterial);
		}

		function animate(
			scene: THREE.Scene,
			camera: THREE.PerspectiveCamera,
			renderer: THREE.WebGLRenderer
		): FrameRequestCallback {
			renderer.render(scene, camera);
			// const id = requestAnimationFrame(animate(scene, camera, renderer));
			return () => {
				cancelAnimationFrame(0);
			};
		}
	}
</s>

import { base } from '$app/paths';
import * as three from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';

export function appendVertexScript() {
	const vertexScript = document.createElement('script');
	vertexScript.setAttribute('type', 'x-shader/x-vertex');
	vertexScript.setAttribute('id', 'vertexshader');
	vertexScript.innerHTML =
		'attribute float size;varying vec3 vColor;void main() {vColor = color;vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );gl_PointSize = size * ( 300.0 / -mvPosition.z );gl_Position = projectionMatrix * mvPosition;}';
	document.body.appendChild(vertexScript);
}

export function appendFragmentShaderScript() {
	const fragmentshaderScript = document.createElement('script');
	fragmentshaderScript.setAttribute('type', 'x-shader/x-fragment');
	fragmentshaderScript.setAttribute('id', 'fragmentshader');
	fragmentshaderScript.innerHTML =
		'uniform sampler2D pointTexture;varying vec3 vColor;void main() {gl_FragColor = vec4( vColor, 1.0 );gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );}';
	document.body.appendChild(fragmentshaderScript);
}

export function appendStats() {
	const stats = new Stats();
	document.body.appendChild(stats.dom);
	return stats;
}

export function appendRenderer(container: HTMLElement) {
	const renderer = new three.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	container.appendChild(renderer.domElement);
	return renderer;
}

export function generateStars(amount: number, depth: number): three.Points {
	const geometry = new three.BufferGeometry();
	const radius = 1000;
	const positions = [];
	const colors = [];
	const color = new three.Color();
	const sizes = [];
	for (let i = 0; i < amount; i++) {
		positions.push((Math.random() * 2 - 1) * radius);
		positions.push((Math.random() * 2 - 1) * radius);
		positions.push(-depth);

		// color.setRGB(1, 1, 1);
		color.setHSL(i / amount, 1.0, 0.5);

		colors.push(color.r, color.g, color.b);

		sizes.push(20);
	}

	geometry.setAttribute('position', new three.Float32BufferAttribute(positions, 3));
	geometry.setAttribute('color', new three.Float32BufferAttribute(colors, 3));
	const sizeAttribute = new three.Float32BufferAttribute(sizes, 1);
	sizeAttribute.setUsage(three.DynamicDrawUsage);
	geometry.setAttribute('size', sizeAttribute);

	const spritePath = base + '/sprites/favicon.png';

	const shaderMaterial = new three.ShaderMaterial({
		uniforms: {
			pointTexture: { value: new three.TextureLoader().load(spritePath) }
		},
		vertexShader: document.getElementById('vertexshader')!.textContent as string,
		fragmentShader: document.getElementById('fragmentshader')!.textContent as string,
		blending: three.AdditiveBlending,
		depthTest: false,
		transparent: true,
		vertexColors: true
	});

	return new three.Points(geometry, shaderMaterial);
}

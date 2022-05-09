<script lang="ts">
	let ctx: AudioContext;

	function onEngage() {
		ctx = ctx ? ctx : new AudioContext();
		navigator.getUserMedia(
			{ video: false, audio: true },
			(stream: MediaStream) => {
				var mic = ctx.createMediaStreamSource(stream);
				const convolver = ctx.createConvolver();
				convolver.buffer = reverbImpulseResponse(10, 10, false);
				mic.connect(convolver).connect(ctx.destination);
			},
			console.log
		);
	}

	function reverbImpulseResponse(duration: number, decay: number, reverse: boolean) {
		const sampleRate = ctx.sampleRate;
		const length = sampleRate * duration;
		const impulse = ctx.createBuffer(2, length, sampleRate);
		const impulseL = impulse.getChannelData(0);
		const impulseR = impulse.getChannelData(1);

		for (let i = 0; i < length; i++) {
			const n = reverse ? length - i : i;
			impulseL[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
			impulseR[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
		}
		return impulse;
	}
</script>

<svelte:head>
	<title>Overtone Space</title>
	<meta
		name="description"
		content="A reverberating space for overtones (and space cats, space invaders, floating lollypops...)"
	/>
</svelte:head>

<h1>Overtone Space</h1>
<button on:click={() => onEngage()}>Engage 🚀</button>

<script lang="ts">
	let ctx: AudioContext;
	let isLiveAudioRunning: boolean;

	async function onStartReverb() {
		ctx = ctx ? ctx : new AudioContext();
		const mic = await getLiveAudio(ctx);
		const convolver = ctx.createConvolver();
		convolver.buffer = reverbImpulseResponse(10, 10, false);
		mic.connect(convolver).connect(ctx.destination);
		if (mic.context.state === 'running') {
			isLiveAudioRunning = true;
		}
	}

	async function getLiveAudio(audioCtx: AudioContext) {
		return navigator.mediaDevices
			.getUserMedia({
				audio: true
			})
			.then((stream) => audioCtx.createMediaStreamSource(stream));
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

{#if !isLiveAudioRunning}
	<button on:click={() => onStartReverb()}>Engage Spaceverb 🚀</button>
{/if}

<script lang="ts">
	import '../app.css';
</script>

<main>
	<slot />
</main>

<footer>
	<p>This <a href="https://github.com/HMBond/overtone-space">space</a> was created by Mike Bond</p>
</footer>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		height: 100%;
		width: 100%;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 20px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>

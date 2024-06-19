<script lang="ts">
	import GithubLogo from '$lib/assets/GithubLogo.svelte';
	import '../app.css';
</script>

<main>
	<slot />
</main>

<footer>
	<GithubLogo />
	<a href="https://github.com/HMBond/overtone-space">github repository</a>
</footer>

<style>
	main {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
		width: 100%;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
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

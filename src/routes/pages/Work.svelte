<script>
	import Marquee from '../components/Marquee.svelte';
</script>

<section id="page-3" class="page">
	<div class="container">
		<Marquee />
		<img
			class="scribble"
			src="/lib/images/scribbles/work-scribble.png"
			alt="These are the companies that I've worked at before! (all as a web dev)"
		/>
	</div>
</section>

<style lang="scss">
	@use '/src/global.scss' as *;

	#page-3 {
		padding-bottom: max(50vh, 25vw);
		background: inherit;
	}

	.container {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 1vw;
	}

	.scribble {
		position: absolute;
		right: 10vw;
		bottom: calc(min(-20vw, -10rem) + min(-2vw, -1rem));

		height: max(20vw, 10rem);
	}
</style>

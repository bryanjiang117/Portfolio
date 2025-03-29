<script>
	import Marquee from './Marquee.svelte';

</script>

<section id="page-3" class="page">
	<div class="container">
		<Marquee />
		<Marquee />
		<Marquee />
		<Marquee />
		<Marquee />
	</div>
</section>

<style lang="scss">
	@import '/src/global.scss';

	#page-3 {
		height: 130vh;
		width: 100%;
		position: absolute;
		z-index: 2;
		background-color: $color-bg-2;
	}

	.container {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>

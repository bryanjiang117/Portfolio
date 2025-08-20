<script>
</script>

<section id="page-5" class="page">
	<div class="parallax-container">
		<video autoplay muted loop playsinline>
			<source src="/lib/videos/leaves-background.mp4" type="video/mp4" />
			<track kind="captions" />
		</video>
		<a href="https://www.example.com/" target="_blank"> VIEW PHOTOGRAPHY </a>
	</div>
</section>

<style lang="scss">
	@use '/src/global.scss' as *;

	#page-5 {
		width: 100vw;
		height: 110vh;
	}

	.parallax-container {
	position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: start;
		background-color: $color-bg-3;
	}

	video {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	a {
		position: absolute;
		right: 20%;
		bottom: calc(10vh + 20%);
		font-size: large;
		text-decoration: none;
		color: $color-text-2;
		mix-blend-mode: difference;

		&::after {
			content: '';
			position: absolute;
			left: 0;
			bottom: -2px;
			width: 0;
			height: 1px;
			background: $color-text-2;
			transition: width 0.5s ease;
		}

		&:hover::after {
			width: 100%;
		}
	}
</style>

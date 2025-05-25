<script>
</script>

<section id="page-5" class="page">
	<div class="container">
		<!-- <span id="gallery-text">GALLERY</span>
		<img src="/lib/images/photos/sakura.png" alt="sakura" id="sakura-photo" class="photo" />
			<img src="/lib/images/photos/pigeons.png" alt="pigeons" id="pigeons-photo" class="photo" />
			<img src="/lib/images/photos/trees.JPG" alt="winter trees" id="trees-photo" class="photo" /> -->
	</div>
</section>

<style lang="scss">
	@use '/src/global.scss' as *;

	#page-5 {
		height: 200vh;
		background-color: $color-bg-3;

		@media (max-width: 600px) {
			padding-top: 0px;
		}
	}

	.container {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.photo {
		object-fit: cover;
	}

	#sakura-photo {
		align-self: flex-end;
		width: 452px;
		height: 700px;
		// top: -400px;
		// right: 0px;

		@media (max-width: 600px) {
			width: 175px;
			height: 275px;
			top: auto;
			right: 0px;
			bottom: 650px;
		}
	}

	#pigeons-photo {
		align-self: flex-end;
		transform: translateX(-15vw);
		width: 752px;
		height: 502px;
		// left: 200px;
		// top: 74px;

		@media (max-width: 600px) {
			width: 300px;
			height: 200px;
			left: 0px;
			top: auto;
			bottom: 370px;
		}
	}

	#trees-photo {
		align-self: flex-end;
		transform: translateX(-10vw);
		width: 689px;
		height: 350px;
		// right: 100px;
		// bottom: -150px;

		@media (max-width: 600px) {
			width: 300px;
			height: 180px;
			bottom: -30px;
			left: 35px;
		}
	}

	#gallery-text {
		position: absolute;
		width: 213px;
		top: 452px;
		left: 103px;
		font-size: 300px;
		font-style: normal;
		font-weight: bold;
		letter-spacing: -15px;
		z-index: 3;

		@media (max-width: 600px) {
			top: auto;
			right: 0px;
			bottom: 190px;
			left: auto;
			width: 350px;
			padding-right: 0.2ch;
			text-align: right;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
			word-break: break-word;
			line-height: 125px;
			font-size: 150px;
		}
	}
</style>

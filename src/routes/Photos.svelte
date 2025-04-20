<script>

</script>

<section id="page-4" class="page">
	<div class="container">
		<span id="gallery-text">GALLERY</span>
		<img src="/lib/images/photos/sakura.png" alt="sakura" id="sakura-photo" class="photo" />
		<img src="/lib/images/photos/pigeons.png" alt="pigeons" id="pigeons-photo" class="photo" />
		<img src="/lib/images/photos/trees.JPG" alt="winter trees" id="trees-photo" class="photo" />
	</div>
</section>

<style lang="scss">
	@import '/src/global.scss';

	#page-4 {
		position: absolute;
		height: 130vh;
		z-index: 2;
		background-color: $color-bg-2;
	}

	.container {
    position: relative;
		width: 100%;
		height: 100%;
	}

	.photo {
		position: absolute;
		object-fit: cover;
	}

	#sakura-photo {
		width: 382px;
		height: 700px;
		top: -400px;
		right: 77px;
	}

	#pigeons-photo {
		width: 752px;
		height: 502px;
		left: 213px;
		top: 74px;
	}

	#trees-photo {
		width: 689px;
		height: 350px;
		left: 850px;
		bottom: -150px;
	}

	#gallery-text {
		position: absolute;
		width: 213px;
		top: 372px;
		left: 213px;
		font-size: 430px;
		font-style: normal;
		font-weight: bold;
		letter-spacing: -67.5px;	
		z-index: 3;
	}

</style>

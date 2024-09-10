<script lang="js">
	import { onMount } from 'svelte';
	import Page1 from './Page1.svelte';
	import Page2 from './Page2.svelte';
	import Page3 from './Page3.svelte';
	import Page4 from './Page4.svelte';
	import HorizontalLoop from './HorizontalLoop.svelte';

	// meta data
	const title = 'Bryan Jiang';
	const description = "Bryan's Personal Web Portfolio";

	let nameElement;
	let isNameVisible = true;
	let observer;
	
	onMount(async () => {
		if (!nameElement) return;

		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					isNameVisible = entry.isIntersecting;
				});
			},
			{ threshold: 0.2 }
		);

		// Go to top of page when reloading
		window.onbeforeunload = function () {
			window.scrollTo(0, 0);
		};

		// smooth and parallax scrolling
		const LocomotiveScroll = (await import('locomotive-scroll')).default;
		const scroll = new LocomotiveScroll({
			el: document.querySelector('[data-scroll-container]'),
			smooth: true
		});

		return () => {
			observer.disconnect();
		};
	});

	// $ makes a reactive expression
	$: if (observer && nameElement) {
		observer.observe(nameElement);
	}

</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
</svelte:head>

<div data-scroll-container class="main-container {isNameVisible ? 'page-1' : 'page-2'}">
	<Page1 bind:nameElement />

	<div class="page-divider" />

	<Page2 />

	<div class="page-divider-lg" />

	<HorizontalLoop />

	<Page3 />

	<!-- <div class="page-divider" /> -->
</div>

<style lang="scss">
	@import '/src/global.scss';

	.page-2 {
		background-color: $color-bg-2;
		color: $color-text-2;
	}

	.page-1 {
		background-color: $color-bg-1;
		color: $color-text-1;
	}

	.page-divider {
		height: 30vh;
	}

	.page-divider-lg {
		height: 40vh;
	}
</style>

<script lang="js">
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { onMount } from 'svelte';
	import Landing from './pages/Landing.svelte';
	import AboutMe from './pages/AboutMe.svelte';
	import Work from './pages/Work.svelte';
	import Photography from './pages/Photography.svelte';
	import Projects from './pages/Projects.svelte';
	import ContactMe from './pages/ContactMe.svelte';
	import Travel from './pages/Travel.svelte';

	// meta data
	const title = 'Bryan Jiang';
	const description = "Bryan's Personal Web Portfolio";

	gsap.registerPlugin(ScrollTrigger);

	let nameElement;
	let contactElement;
	let initialBackground = true;
	let observer;

	onMount(async () => {
		if (!nameElement) return;

		observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						initialBackground = true;
						break;
					}
					initialBackground = false;
				}
			},
			{ threshold: 0.2 }
		);

		// Go to top of page when reloading
		window.onbeforeunload = function () {
			window.scrollTo(0, 0);
		};

		// parallax
		const page4 = document.querySelector('#page-4');
		const parallaxContainer = document.querySelector('#page-5');
		const page6 = document.querySelector('#page-6');
		ScrollTrigger.create({
			trigger: page4,
			endTrigger: page6,
			start: 'top top', // Start when the top of page 3 hits the top of the viewport
			end: 'top+=145% top', // End when the top of page 4 hits the top of the viewport
			pin: parallaxContainer, // Pin projectheader in place while page 3 scrolls up
			pinSpacing: true, // Prevent extra space after the pinning
			scrub: true,
			immediateRender: false
		});

		return () => {
			observer.disconnect();
		};
	});

	// $ makes a reactive expression
	$: if (observer && nameElement && contactElement) {
		observer.observe(nameElement);
		observer.observe(contactElement);
	}
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
</svelte:head>

<div class="main-container {initialBackground ? 'background-1' : 'background-2'}">
	<Landing bind:nameElement />

	<div class="page-divider"></div>

	<AboutMe />

	<div class="page-divider-lg"></div>

	<Work />

	<div class="page-divider"></div>

	<Projects />

	<Photography />

	<!-- <div class="page-divider background-3"></div> -->

	<Travel />

	<ContactMe bind:contactElement />
</div>

<style lang="scss">
	@use '/src/global.scss' as *;

	html,
	body {
		min-width: 400px;
		overflow-x: hidden;
	}

	.background-1 {
		background: $color-bg-1;
		color: $color-text-1;
	}

	.background-2 {
		background: $color-bg-2;
		color: $color-text-2;
	}

	.background-3 {
		background: $color-bg-3;
		color: $color-text-2;
	}

	.page-divider {
		height: 30vh;
	}

	.page-divider-lg {
		height: 50vh;
	}

	.page-divider-xl {
		height: 100vh;
	}

	.main-container {
		transition: background-color 0.5s ease;
		overflow-x: hidden;
	}
</style>

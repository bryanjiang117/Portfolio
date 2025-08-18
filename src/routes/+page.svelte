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
		const projectsPage = document.querySelector('#page-4');
		const photographyPage = document.querySelector('#page-5');
		const travelPage = document.querySelector('#page-6');
		ScrollTrigger.create({
			trigger: projectsPage,
			endTrigger: travelPage,
			start: 'top top',
			end: 'bottom top',
			pin: photographyPage,
			pinSpacing: false,
			immediateRender: false
		});

		ScrollTrigger.create({
			trigger: travelPage,
			start: 'top bottom',
			end: 'bottom+=50% top',
			pinSpacing: true,
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

	<div class="pin-spacer background-2"></div>

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

	:global(.page) {
		position: relative;
		transition: transform 0.3s ease;
		scroll-snap-align: start;
		overflow: hidden;
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

	.pin-spacer {
		height: 150vh;
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
		scroll-snap-type: y mandatory;
	}
</style>

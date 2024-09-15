<script lang="js">
	import { gsap } from "gsap";
	import { ScrollTrigger } from "gsap/ScrollTrigger";
	import { onMount } from 'svelte';
	import Page1 from './Page1.svelte';
	import Page2 from './Page2.svelte';
	import Page3 from './Page3.svelte';
	import Page4 from './Page4.svelte';
	import Page5 from "./Page5.svelte";
	import HorizontalLoop from "./HorizontalLoop.svelte";
	import ProjectHeader from "./ProjectHeader.svelte";

	// meta data
	const title = 'Bryan Jiang';
	const description = "Bryan's Personal Web Portfolio";

	gsap.registerPlugin(ScrollTrigger);

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

		// parallax
		const page3 = document.querySelector('#page-3');
		const projectHeader = document.querySelector('.project-header-container');
		const page4 = document.querySelector('#page-4');
		ScrollTrigger.create({
			trigger: page3,
			endTrigger: page4,
			start: "top top", // Start when the top of page 3 hits the top of the viewport
			end: "top top", // End when the top of page 4 hits the top of the viewport
			pin: projectHeader, // Pin projectheader in place while page 3 scrolls up
			pinSpacing: true,// Prevent extra space after the pinning
			scrub: true,
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

<div class="main-container {isNameVisible ? 'page-1' : 'page-2'}">
	<Page1 bind:nameElement />

	<div class="page-divider" />

	<Page2 />

	<div class="page-divider-lg" />

	<HorizontalLoop />
	<div class='parallax-container'>
		<Page3 />
		<div class='project-header-container'>
			<ProjectHeader />
		</div>
	</div>

	<Page4 />

	<div class="page-divider-lg" />

	<Page5 />
</div>

<style lang="scss">
	@import '/src/global.scss';

	.project-header-container {
		width: 100%;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: $color-bg-3;
	}

	.parallax-container {
		position: relative;
	}

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
		height: 60vh;
	}

	.main-container {
		transition: background-color 0.5s ease;
	}
</style>

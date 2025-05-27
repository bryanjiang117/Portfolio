<script>
	import { onMount } from 'svelte';
	import SplitType from 'split-type';
	import debounce from 'lodash.debounce';
	import gsap from 'gsap';
	import { getNameMetrics } from '../../utils/util.js';

	let bio =
		"I'm passionate about building visually captivating and usable websites. I'm driven by a commitment to the user experience, an obsession over details, and the endless possibilities of creating. There's nothing more satisfying than bringing an idea to life. Outside of work, I'm interested in languages, photography, illustration. In the near future, I'd like to explore the world a little ...and be inspired by it's beauty. <br> Feel free to explore.";
	let bioContainer;
	let splitText;
	let previousContainerWidth;
	let observer;

	// An event handler that will be called when the container element is resized.
	function handleResizeText(entry) {
		let width;
		// The new width of the container element
		const [{ contentRect }] = entry;
		width = Math.floor(contentRect.width);
		// only proceed if:
		// 1. previousContainerWidth has been set. This avoids calling the split
		//    method when the resizeObserver is triggered on the initial render
		// 2. the width of the container element has changed.
		if (previousContainerWidth && previousContainerWidth !== width) {
			// Call the split method to re-split the text. This will will reposition
			// the text based on the new container size.
			splitText.split();
		}
		previousContainerWidth = width;
	}

	function handleResizeWindow() {
		const { left } = getNameMetrics();

		const page2 = document.querySelector('#page-2');
		page2.style.paddingLeft = `${left}px`;
	}

	onMount(() => {
		handleResizeWindow();

		// split bio text into lines
		splitText = new SplitType('#bio-text', { types: 'lines' });
		const lines = splitText.lines;

		lines.forEach((line) => {
			// set styles for line because doing it in stylesheet doesnt apply
			line.style.overflow = 'hidden';

			// add a span inside each line
			const span = document.createElement('span');
			span.style.display = 'inline-block';
			span.style.position = 'static';
			span.innerHTML = line.innerHTML; // Transfer the content
			line.innerHTML = ''; // Clear the content
			line.appendChild(span); // Append the span with content inside each line
		});

		// resize observer
		const resizeObserver = new ResizeObserver(debounce(handleResizeText, 100));
		resizeObserver.observe(bioContainer);

		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						gsap.to(entry.target.querySelector('span'), {
							y: 0,
							opacity: 1,
							duration: 1
						});
					}
				});
			},
			{ threshold: 0.5 }
		);

		// window observer
		window.addEventListener('resize', handleResizeWindow);

		return () => {
			resizeObserver.disconnect();
			observer.disconnect();
			window.removeEventListener('resize', handleResizeWindow);
		};
	});

	$: if (observer) {
		const lines = gsap.utils.toArray('.line');
		lines.forEach((line) => {
			gsap.set(line.querySelector('span'), { y: '100%', opacity: 1 });
			observer.observe(line);
		});
	}
</script>

<div id="page-2" class="page">
	<div class="bio-container">
		<h2>About Me</h2>
		<div class="bio" bind:this={bioContainer}>
			<p id="bio-text">{@html bio}</p>
		</div>
	</div>
	<video autoplay muted loop playsinline>
		<source src="lib/videos/clouds-background.mp4" type="video/mp4" />
		<track kind="captions" />
	</video>
</div>

<style lang="scss">
	@use '/src/global.scss' as *;

	#page-2 {
		position: relative;
		display: flex;
		min-height: 0;
		box-sizing: border-box;
	}

	.bio-container {
		position: relative;
		z-index: 10;
	}

	h2 {
		font-size: calc(4vw + 2rem);
		font-weight: normal;
		letter-spacing: -0.2vw;
		margin-bottom: 2.5vm;
	}

	.bio {
		max-width: max(35vw, 25rem);
		font-size: calc(2vw + 1rem);
		line-height: 125%;
		letter-spacing: -0.1vw;
		transition: color 0.5s ease;

		@media (max-width: 600px) {
			max-width: 65vw;
		}
	}

	video {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 85vw;
		height: 80vh;
	}

	:global(::-moz-selection) {
		/* Code for Firefox */
		color: $color-bg-2;
		background: $color-text-2;
	}

	:global(::selection) {
		color: $color-bg-2;
		background: $color-text-2;
	}
</style>

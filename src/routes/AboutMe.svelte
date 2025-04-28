<script>
	import { onMount } from 'svelte';
	import SplitType from 'split-type';
	import debounce from 'lodash.debounce';
	import gsap from 'gsap';
	import { getNameMetrics } from '../utils/util.js';

	let bio =
		"I'm a software developer and artist. I'm passionate about building visually captivating yet highly usable websites. There's nothing more satisfying than bringing an idea to life. My work is driven by a commitment to user experience and an appreciation for beautiful things. Outside of work, I enjoy drawing, volleyball, and learning languages. In the near future, I'd like to travel the world and explore new cultures and new sights, which serve as the source of my inspiration to create. <br> Please feel free to explore.";
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
	<div class="photo-container">
		<!-- <div class="color-block"></div> -->
		<!-- <img src="/lib/images/photos/orange_tree.png" alt="orange tree" class="photo" /> -->
	</div>
</div>

<style lang="scss">
	@import '/src/global.scss';
	#page-2 {
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
		max-width: 35vw;
		font-size: calc(2.5vw + 0.5rem);
		line-height: 125%;
		letter-spacing: -0.1vw;
		transition: color 0.5s ease;

		@media (max-width: 600px) {
			max-width: 50vw;
		}
	}

	.bio p {
	}

	.photo-container {
		position: relative;
		flex: 1;
		opacity: 0.2;

		// display: flex;
		// align-items: center;
		// justify-content: end;
	}

	.color-block {
		position: absolute;
		left: -50%;
		height: 70%;
		width: 120%;
		background: rgb(49, 102, 199);
	}

	.photo {
		position: absolute;
		top: 20%;
		left: -20%;
		width: 50%;
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

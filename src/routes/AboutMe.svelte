	<script>
		import { onMount } from 'svelte';
		import SplitType from 'split-type';
		import debounce from 'lodash.debounce';
		import gsap from 'gsap';
		import { getNameMetrics } from '../utils/util.js';

		const name = 'BRYAN JIANG';
		let bio =
			"I'm a software developer and artist. I'm super passionate about creating beautifully usable websites. There's nothing more satisfying than bringing your ideas to life. About me personally, I enjoy drawing, volleyball, and learning languages (watching anime and dramas). I love travelling because I love novelty and I love food. I'm a harsh critic for food, art, and code because, in some ways, they are the same. I often find myself beaten by the gap between my judgement and skill. So, my constant goal is to create something of which even I am proud.";
		let bioContainer;
		let splitText;
		let previousContainerWidth;
		let observer;
		let scroll;

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
			const { left } = getNameMetrics(name);

			const bioContainer = document.querySelector('.bio-container');
			bioContainer.style.transform = `translateX(${left}px)`;
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

			observer = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						gsap.to(entry.target.querySelector('span'), {
							y: 0,
							opacity: 1,
							duration: 1
						});
					}
				});
			}, { threshold: 0.5 });

			// window observer 
			window.addEventListener('resize', handleResizeWindow);

			return () => {
				resizeObserver.disconnect();
				observer.disconnect();
				window.removeEventListener('resize', handleResizeWindow);
			}
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
				<p id="bio-text">{bio}</p>
			</div>
		</div>
	</div>

	<style lang="scss">
		@import '/src/global.scss';
		#page-2 {

		}

		h2 {
			font-size: max(6vw, 2rem);
			font-weight: normal;
			letter-spacing: -3px;

		}

		.bio {
			max-width: 30vw;
			font-size: max(2.2vw, 1rem);
			line-height: max(3vw, 1.2rem);
			letter-spacing: -0.1vw;
			transition: color 0.5s ease;
			@media (max-width: 600px) {
				max-width: 50vw;
			}
		}

		.bio-container {
			width: 100%;
			height: 100%;
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

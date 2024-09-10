<script>
	import { onMount } from 'svelte';
	import SplitType from 'split-type';
	import debounce from 'lodash.debounce';
	import gsap from 'gsap';

	const name = 'BRYAN JIANG';
	let sidePadding = 0;
	let bio =
		'Filler ChatGPT text: Bryan Jiang is a passionate software developer with a focus on web development, creating dynamic and engaging user experiences. He has a keen interest in building complex, scalable applications using modern tools such as React, TypeScript, and SvelteKit. With experience in both frontend and backend technologies. With experience in both frontend and backend technologies, Bryan enjoys tackling challenging problems, especially in areas like authentication, database integration, and real-time updates.';
	let bioContainer;
	let splitText;
	let previousContainerWidth;
	let observer;

	// An event handler that will be called when the container element is resized.
	function handleResize(entry) {
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

	onMount(() => {
		// Align text ref https://darraghmckay.com/blog/rect-text
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');
		context.font = '9rem Arial';
		const metrics = context.measureText(name);
		sidePadding = metrics.actualBoundingBoxLeft;

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
		const resizeObserver = new ResizeObserver(debounce(handleResize, 500));
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
		});
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
	<div class="bio-container" style="transform: translateX({Math.abs(sidePadding)}px)">
		<div class="bio" bind:this={bioContainer}>
			<h2>ABOUT ME</h2>
			<p id="bio-text">{bio}</p>
		</div>
	</div>
</div>

<style lang="scss">	
	@import '/src/global.scss';
	#page-2 {
		padding-left: calc((100vw - 918.55px) / 2);
	}

	h2 {
		font-size: 3.5rem;
		font-weight: bold;
		letter-spacing: -3px;
	}

	.bio {
		max-width: 30vw;
		font-size: 2.2rem;
		line-height: 3rem;
		letter-spacing: -1.5px;
		transition: color 0.5s ease;
	}

	.bio-container {
		width: 100%;
		height: 100%;
	}
</style>

<script>
	import Typed from 'typed.js';
	import gsap from 'gsap';
	import { onMount } from 'svelte';

	const name = 'BRYAN JIANG';
	let greeting;
	let desu;
	let typing = true;
	export let nameElement;
	let sidePadding = 0;
	let isNameHovered = false;

	const changeGreeting = () => {
		if (greeting && !typing) {
			greeting.start();
			typing = true;
		}
	};

	const initializeJob = () => {
		const words = gsap.utils.toArray('.rotating-word');
		gsap.set(words, {
			yPercent: (i) => i && 100, // Set initial state for all except the first word
			opacity: 1
		});
	}

	let i = 0;
	const changeJob = () => {
		const words = gsap.utils.toArray('.rotating-word');
		const next = words[i + 1] ? i + 1 : 0;

		gsap.set(words, {
			yPercent: (j) => j === next ? 100 : 0
		});

		// Animate the current word up and the next word in
		gsap.to(words[i], { yPercent: -100, duration: 0.25 });
		gsap.to(words[next], { yPercent: 0, duration: 0.25 });
		i = next;
	};


	onMount(() => {
		// Align text ref https://darraghmckay.com/blog/rect-text
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');
		context.font = '9rem Arial';
		const metrics = context.measureText(name);
		sidePadding = metrics.actualBoundingBoxLeft;

		// Typing greeting animation
		greeting = new Typed('#greeting', {
			strings: ["Hey, I'm", '你好，我叫', '初めまして、僕は'],
			backDelay: 0,
			loop: true,
			preStringTyped: (arrayPos, self) => {
				switch (arrayPos) {
					case 0:
						self.typeSpeed = 30;
						break;
					case 1:
						self.typeSpeed = 150;
						break;
					case 2:
						self.typeSpeed = 100;
						break;
				}
				if (desu) {
					desu.destroy();
				}
			},
			onStringTyped: (arrayPos, self) => {
				greeting.stop();
				typing = false;
				if (arrayPos === 2) {
					self.cursor.style.display = 'none';
					desu = new Typed('#desu', {
						strings: ['です'],
						typeSpeed: 100
					});
				} else {
					self.cursor.style.display = 'inline';
				}
			}
		});

		initializeJob();
		const greetingInterval = setInterval(() => {
			changeGreeting();
			changeJob();
		}, 3500);

		return () => {
			clearInterval(greetingInterval);
		};
	});
</script>

<div id="page-1" class="page">
	<div class="fill flex-col justify-center align-center">
		<div class="name-container no-select">
			<div class="relative">
				<div class="greeting" style="transform: translateX({Math.abs(sidePadding)}px)">
					<span id="greeting"></span>
				</div>
				<h1
					class="name"
					on:mouseenter={() => {
						isNameHovered = true;
					}}
					on:mouseleave={() => {
						isNameHovered = false;
					}}
					bind:this={nameElement}
				>
					{name}
				</h1>
				<div class="desu-wrapper" style={isNameHovered ? 'left: 1178px;' : ''}>
					<span id="desu"></span>
				</div>
			</div>
			<div class="job" style="transform: translateX({sidePadding}px)">
				<span class="word-container">
					<div class="rotating-word">Web</div>
					<div class="rotating-word">Software</div>
				</span>
				Developer
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.rotating-word {
		position: absolute;
		top: 0;
		right: 0;
		white-space: nowrap;
		width: 100%;
		text-align: right;
		height: 2rem; /* Ensure the height matches the container */
		line-height: 2rem; /* Match the line-height to ensure vertical alignment */
		opacity: 0;
	}

	.word-container {
		position: relative;
		flex-grow: 1;
		overflow: hidden;
		height: 2rem; /* Match line-height to mask words properly */
		vertical-align: bottom;
		margin-right: 0.4rem;
	}

	#page-1 {
		height: 100vh;
	}

	.desu-wrapper {
		width: 3rem;
		position: absolute;
		bottom: 2rem;
		left: 1150px;
		transition: all 0.15s ease;
	}

	.job {
		display: flex;
		font-size: 1.5rem;
		letter-spacing: 1px;
		line-height: 2rem;
		text-align: right;
		width: 100%;
		height: 2rem;
	}

	.name {
		margin: -1rem 0 -1rem 0;
		font-size: 11rem;
		letter-spacing: -5px;
		transition: all 0.25s ease;
	}

	.name:hover {
		transform: scale(105%);
	}

	.greeting {
		height: 1.5rem;
	}

	.name-container {
		flex-grow: 0;
		flex-shrink: 0;
		height: auto;
	}

	.relative {
		position: relative;
	}

	.flex-row {
		display: flex;
	}

	.flex-col {
		display: flex;
		flex-direction: column;
	}

	.fill {
		width: 100%;
		height: 100%;
	}

	.justify-center {
		justify-content: center;
	}

	.align-center {
		align-items: center;
	}

	.main-container {
		transition: background-color 0.5s ease;
	}
</style>

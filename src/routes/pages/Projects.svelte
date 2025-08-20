<script>
	import { onMount } from 'svelte';
	import { animate, animateMini } from 'motion';

	const projects = [
		// {
		// 	name: 'Artstyles',
		// 	desc: 'Based on an image or prompt, presents inspiration from top artists',
		// 	techStack: ['Python', 'Pytorch', 'FAISS', 'React'],
		// 	link: 'https://github.com/bryanjiang117/Artstyles',
		// 	src: ''
		// },
		{
			name: 'FOMO',
			desc: 'An Android location tracking social app made for students and young adults to stay connected',
			techStack: ['Kotlin', 'Jetpack Compose', 'MaterialUI', 'Supbase', 'JUnit', 'Google Maps API'],
			link: 'https://github.com/bryanjiang117/FOMO',
			src: '/lib/images/projects/fomo.png'
		},
		{
			name: 'Crusader',
			desc: 'A Gemini-integrated web app that scrapes the web to find high-quality movie and show recommendations',
			techStack: ['Python', 'Flask', 'React', 'Docker', 'Google Cloud Platform'],
			link: 'https://crusader-569595952979.northamerica-northeast2.run.app/',
			src: '/lib/images/projects/crusader.png'
		},
		{
			name: 'Resolutions',
			desc: 'An productivity web app that motivates you and your friends to stick with your New Year resolutions',
			techStack: ['PostgreSQL', 'Next', 'React', 'Tailwind', 'NextUI', 'Vercel'],
			link: 'https://resolutions-ochre.vercel.app/',
			src: '/lib/images/projects/resolutions.png'
		}
	];

	const refs = [];
	const imgRefs = [];
	let startingYs = []; // cluster the images toward the center of the list so they fit on the screen
	let selectedProjectIndex = -1;

	onMount(() => {
		startingYs = Array.from(
			{ length: imgRefs.length },
			(_, i) => -50 + ((imgRefs.length - 1) / 2 - i) * 10
		);

		const withinElement = (x, y, element) => {
			if (!element) return false;

			const rect = element.getBoundingClientRect();
			return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
		};

		const animateIn = (i) => {
			if (!imgRefs[i]) return;

			const randomX = Math.random() * 10 - 7;
			imgRefs[i].style.left = 40 + randomX + 'vw';
			animate(imgRefs[i], { opacity: 1, y: startingYs[i] + 5 + '%' }, { duration: 0.25 });
		};

		const animateOut = (i) => {
			if (!imgRefs[i]) return;

			animate(
				imgRefs[i],
				{ opacity: 0, y: startingYs[i] + '%' },
				{ duration: 0.2, ease: 'easeOut' }
			);
		};

		window.addEventListener('mousemove', (event) => {
			let indexHovered = -1;
			for (let i = 0; i < projects.length; i++) {
				if (withinElement(event.clientX, event.clientY, refs[i])) {
					indexHovered = i;
					break;
				}
			}
			if (indexHovered !== selectedProjectIndex) {
				if (selectedProjectIndex > -1) {
					animateOut(selectedProjectIndex);
				}
				if (indexHovered > -1) {
					animateIn(indexHovered);
				}
			}
			selectedProjectIndex = indexHovered;
		});
	});
</script>

<section id="page-4" class="page">
	<div class="projects-container">
		<h1 class="projects-title">Projects</h1>
		<ul>
			{#each projects as project, i}
				<li key={i} bind:this={refs[i]}>
					<div class="name">{project.name}</div>
					<img
						src={project.src}
						alt={`${project.name} visual`}
						bind:this={imgRefs[i]}
						style={`opacity: 0; transform: translateY(${startingYs[i]}%);`}
					/>
				</li>
				<hr class="divider" />
			{/each}
		</ul>
	</div>
</section>

<style lang="scss">
	@use '/src/global.scss' as *;

	#page-4 {
		position: absolute;
		height: 150vh;
		// padding-bottom: max(20vh, 10vw);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1;
		background: inherit;
	}

	.projects-container {
		position: relative;
		margin: 0 8vw 0 8vw;
		width: 100%;
		user-select: none;
	}

	.projects-title {
		position: relative;
		top: -4vh;
		right: 0;
		text-align: right;
		font-size: max(1.5rem, 1vw);
		font-weight: 300;
		letter-spacing: 0.2vw;
	}

	ul {
		padding: 0;
	}

	li {
		position: relative;
		padding: 6vh 0 5vh 3vw;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: start;
		gap: 10px;
	}

	img {
		position: absolute;
		left: 35vw;
		top: 50%;
		max-height: 65vh;
		max-width: 50vw;
		object-fit: contain;
		pointer-events: none;
	}

	.name {
		font-size: max(3vw, 2rem);
		font-weight: 500;
	}

	.link {
		font-size: 0.8vw;
	}

	.desc {
		font-size: 1vw;
	}

	.divider {
		margin: 0;
		width: 100%;
	}

	.tech-icon {
		color: $color-text-1;
		padding: 0.5rem;
		border-radius: 1rem;
		font-size: x-small;
	}
</style>

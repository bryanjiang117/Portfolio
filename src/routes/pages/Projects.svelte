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
	const descRefs = [];
	let startingYs = []; // cluster the images toward the center of the list so they fit on the screen
	let hoveredProj = -1;
	let expandedProject = -1;
	let lastCollapsedProj = -1;

	const animateInImg = (i) => {
		if (!imgRefs[i] || expandedProject === i || lastCollapsedProj === i) return;

		const randomX = Math.random() * 10 - 7;
		imgRefs[i].style.left = 30 + randomX + 'vw';
		animate(imgRefs[i], { opacity: 1, y: startingYs[i] + 5 + '%' }, { duration: 0.25 });
	};

	const animateOutImg = (i) => {
		if (!imgRefs[i] || expandedProject === i || lastCollapsedProj === i) return;

		animate(imgRefs[i], { opacity: 0, y: startingYs[i] + '%' }, { duration: 0.2, ease: 'easeOut' });
	};

	const animateCollapseProj = (i) => {
		animate(
			descRefs[i],
			{ scale: 0.95, opacity: 0, y: -5 },
			{ duration: 0.2, ease: 'easeOut' }
		).then(() => {
			descRefs[i].style.display = 'none';
		});
	};

	function toggleProject(i) {
		if (expandedProject === i) {
			// Collapse current project

			if (descRefs[i]) {
				animateCollapseProj(i);
			}

			if (imgRefs[i]) {
				imgRefs[i].style.opacity = '0';
			}

			hoveredProj = -1;
			expandedProject = -1;
			lastCollapsedProj = i;
		} else {
			// Collapse other expanded project if it exists

			if (expandedProject !== -1 && descRefs[expandedProject]) {
				animateCollapseProj(expandedProject);
			}

			if (imgRefs[expandedProject]) {
				imgRefs[expandedProject].style.opacity = '0';
			}

			// Expand new project

			if (descRefs[i]) {
				descRefs[i].style.display = 'block';
				descRefs[i].style.opacity = '0';
				descRefs[i].style.transform = 'scale(0.95) translateY(-5px)';

				animate(descRefs[i], { scale: 1, opacity: 1, y: 0 }, { duration: 0.3, ease: 'easeOut' });
			}

			expandedProject = i;
			hoveredProj = -1;
		}
	}

	function handleKeyDownProject(event, i) {
		if (event.key === 'Enter' || event.key === ' ') {
			toggleProject(i);
		}
	}

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

		function handleMouseMove(event) {
			let newHoveredProj = -1;
			for (let i = 0; i < projects.length; i++) {
				if (withinElement(event.clientX, event.clientY, refs[i])) {
					newHoveredProj = i;
					break;
				}
			}

			if (newHoveredProj !== lastCollapsedProj) {
				lastCollapsedProj = -1;
			}

			if (newHoveredProj === expandedProject || newHoveredProj === lastCollapsedProj) {
				newHoveredProj = -1;
			}

			if (newHoveredProj !== hoveredProj) {
				animateOutImg(hoveredProj);
				if (newHoveredProj > -1) {
					animateInImg(newHoveredProj);
				}
			}

			hoveredProj = newHoveredProj;
		}

		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});
</script>

<section id="page-4" class="page">
	<div class="projects-container">
		<h1 class="projects-title">Projects</h1>
		{#each projects as project, i}
			<button
				bind:this={refs[i]}
				class="project"
				key={i}
				on:click={() => toggleProject(i)}
				on:keydown={(event) => handleKeyDownProject(event, i)}
			>
				<div class="project-header" class:collapsed={expandedProject !== i}>
					<div class="project-name">{project.name}</div>
					<div class="expand-icon">{expandedProject === i ? '−' : '+'}</div>
				</div>

				<div class="project-content">
					<div
						class="project-description"
						bind:this={descRefs[i]}
						style="opacity: 0; transform: scale(0.95) translateY(-5px); display: none;"
					>
						<p class="desc">{project.desc}</p>
						<div class="tech-stack">
							{#each project.techStack as tech}
								<span class="tech-tag">{tech}</span>
							{/each}
						</div>
						<a href={project.link} target="_blank" rel="noopener noreferrer" class="project-link">
							View Project →
						</a>
					</div>

					<img
						src={project.src}
						alt={`${project.name} visual`}
						bind:this={imgRefs[i]}
						class={expandedProject === i && 'expanded'}
					/>
				</div>
			</button>
			<hr class="divider" />
		{/each}
	</div>
</section>

<style lang="scss">
	@use '/src/global.scss' as *;

	#page-4 {
		position: absolute;
		height: 150vh;
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
		top: 0vh;
		left: 0;
		text-align: left;
		font-size: max(1rem, 1vw);
		font-weight: 300;
		letter-spacing: 0.2vw;
	}

	.project {
		display: flex;
		flex-direction: column;
		background: none;
		border: none;
		padding: 7vh 2vw 7vh 2vw;
		margin: 0;
		width: 100%;
		gap: 10px;
		text-align: left;
		cursor: pointer;
		font-family: inherit;
		color: inherit;
		transition: all 0.2s ease;
	}

	.project:hover .project-header.collapsed {
		opacity: 0.8;
	}

	.project-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.project-name {
		font-size: max(3vw, 2.2rem);
		font-weight: 400;
	}

	.expand-icon {
		font-size: max(2.5vw, 1.5rem);
		font-weight: 300;
		color: $color-text-2;
		transition: transform 0.3s ease;
	}

	.project-content {
		position: relative;
		display: flex;
		justify-content: space-between;
	}

	img {
		position: absolute;
		max-height: max(50vh, 15rem);
		max-width: max(50vw, 20rem);
		object-fit: contain;
		opacity: 0;
		pointer-events: none;
		z-index: 2;
		transform: translateY(-50%);
	}

	img.expanded {
		position: relative !important;
		margin-top: 2vh;
		left: auto !important;
		max-height: 100% !important;
		max-width: 47% !important;
		opacity: 1 !important;
		z-index: 1;
		transform: none !important;
	}

	.project-description {
		position: relative;
		margin-top: 2vh;
		padding: 2vh 0;
		width: 47%;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
	}

	.desc {
		font-size: max(1.1vw, 1.1rem);
		line-height: 1.6;
		margin-bottom: 2vh;
		color: $color-text-2;
		opacity: 0.9;
	}

	.tech-stack {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-bottom: 2vh;
	}

	.tech-tag {
		background: rgba(255, 255, 255, 0.1);
		color: $color-text-2;
		padding: 4px 12px;
		border-radius: 20px;
		font-size: max(0.8vw, 0.8rem);
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.project-link {
		display: inline-block;
		color: $color-text-2;
		text-decoration: none;
		font-size: max(1vw, 1rem);
		padding: 8px 16px;
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 4px;
		transition: all 0.3s ease;
	}

	.project-link:hover {
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 255, 255, 0.5);
	}

	.link {
		font-size: 0.8vw;
	}

	.divider {
		margin: 0;
		width: 100%;
	}
</style>

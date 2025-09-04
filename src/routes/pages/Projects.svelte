<script>
	import { onMount } from 'svelte';
	import { animate } from 'motion';
	import { ChevronDown, ChevronUp } from 'lucide-svelte';
	import gsap from 'gsap';

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
	const contentRefs = [];
	let observer;
	let startingYs = []; // cluster the images toward the center of the list so they fit on the screen
	let hoveredProj = -1;
	let expandedProj = -1;
	let lastCollapsedProj = -1;

	const animateInImg = (index) => {
		if (!imgRefs[index] || expandedProj === index || lastCollapsedProj === index) return;

		const randomX = Math.random() * 10 - 7;
		imgRefs[index].style.left = 30 + randomX + 'vw';
		animate(imgRefs[index], { opacity: 1, y: startingYs[index] + 5 + '%' }, { duration: 0.25 });
	};

	const animateOutImg = (index) => {
		if (!imgRefs[index] || expandedProj === index || lastCollapsedProj === index) return;

		animate(
			imgRefs[index],
			{ opacity: 0, y: startingYs[index] + '%' },
			{ duration: 0.2, ease: 'easeOut' }
		);
	};

	const collapseProj = (index) => {
		if (!contentRefs[index]) {
			return;
		}

		animate(
			contentRefs[index],
			{ scale: 0.95, opacity: 0, y: -5, height: 0, margin: 0, padding: 0 },
			{ duration: 0.2, ease: 'easeOut' }
		).then(() => {
			const children = contentRefs[index].children;
			Array.from(children).forEach((child) => {
				child.classList.add('hidden');
			});
		});

		if (imgRefs[index]) {
			imgRefs[index].style.opacity = '0';
		}

		hoveredProj = -1;
		expandedProj = -1;
		lastCollapsedProj = index;
	};

	const expandProj = (index) => {
		if (!contentRefs[index]) {
			return;
		}

		contentRefs[index].style.opacity = '0';
		contentRefs[index].style.transform = 'scale(0.95) translateY(-5px)';

		const children = contentRefs[index].children;
		Array.from(children).forEach((child) => {
			child.classList.remove('hidden');
		});

		animate(
			contentRefs[index],
			{ scale: 1, opacity: 1, y: 0, height: 'fit-content' },
			{ duration: 0.3, ease: 'easeOut' }
		).then(() => {
			const projectElement = document.querySelector(`.project[data-key="${index}"]`);
			projectElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
		});

		if (imgRefs[expandedProj]) {
			imgRefs[expandedProj].style.opacity = '0';
		}

		hoveredProj = -1;
		expandedProj = index;
	};

	function toggleProject(index) {
		if (expandedProj === index) {
			collapseProj(index);
		} else {
			if (expandedProj !== -1 && contentRefs[expandedProj]) {
				collapseProj(expandedProj);
			}
			expandProj(index);
		}
	}

	function handleKeyDownProject(event, index) {
		if (event.key === 'Enter' || event.key === ' ') {
			toggleProject(index);
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

			if (newHoveredProj === expandedProj || newHoveredProj === lastCollapsedProj) {
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

		observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				entries.forEach((entry, i) => {
					const letter = entry.target;
					gsap.to(letter, {
						opacity: 1,
						duration: 0,
						delay: i * 0.075
					});
				});
			} else if (expandedProj === -1) {
				entries.forEach((entry) => {
					const letter = entry.target;
					gsap.killTweensOf(letter);
					gsap.set(letter, {
						opacity: 0
					});
				});
			}
		});

		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			observer.disconnect();
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});

	$: if (observer) {
		const letters = gsap.utils.toArray('.projects-title span');
		letters.forEach((letter) => {
			gsap.set(letter, { opacity: 0 });
			observer.observe(letter);
		});
	}
</script>

<section id="page-4" class="page">
	<div class="projects-container">
		<h1 class="projects-title">
			<span>P</span>
			<span>r</span>
			<span>o</span>
			<span>j</span>
			<span>e</span>
			<span>c</span>
			<span>t</span>
			<span>s</span>
		</h1>
		{#each projects as project, i}
			<button
				bind:this={refs[i]}
				class="project"
				data-key={i}
				key={i}
				on:click={() => toggleProject(i)}
				on:keydown={(event) => handleKeyDownProject(event, i)}
			>
				<div class="project-header" class:collapsed={expandedProj !== i}>
					<div class="project-name">{project.name}</div>
					<div class="expand-icon">
						{#if expandedProj === i}
							<ChevronUp />
						{:else}
							<ChevronDown />
						{/if}
					</div>
				</div>

				<div class="project-content" bind:this={contentRefs[i]}>
					<div class="project-description">
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
				</div>
				<img
					src={project.src}
					alt={`${project.name} visual`}
					bind:this={imgRefs[i]}
					class={expandedProj === i && 'expanded'}
				/>
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
		margin-bottom: 5vh;
		text-align: left;
		font-size: max(1rem, 1.2vw);
		font-weight: 300;
	}

	.project {
		position: relative;
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
		justify-content: start;
		height: 0;
		opacity: 0;
		pointer-events: none;
	}

	.project-description {
		position: relative;
		margin-top: 2vh;
		padding-top: 2vh;
		width: 55%;
		border-top: 1px solid rgba(255, 255, 255, 0.1);

		@media (max-width: 1200px) {
			width: 100%;
		}
	}

	.desc {
		font-size: max(1.1vw, 1rem);
		line-height: 1.6;
		margin-bottom: 2vh;
		color: $color-text-2;
		opacity: 0.9;
	}

	.tech-stack {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-bottom: 3vh;
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

	.divider {
		margin: 0;
		width: 100%;
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
		top: 50%;
		right: 2vw;
		left: auto !important;
		max-height: calc(100% - 7vh) !important;
		max-width: 40% !important;
		opacity: 1 !important;
		z-index: 1;
		transform: translateY(-50%) !important;

		@media (max-width: 1200px) {
			display: none;
		}
	}

	.hidden {
		height: 0 !important;
		margin: 0 !important;
		padding: 0 !important;
	}
</style>

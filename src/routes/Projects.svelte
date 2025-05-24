<script>
	import { onMount } from 'svelte';
	import { getNameMetrics } from '../utils/util.js';

	let nameLength = 0;
	let windowWidth = 0;

	const projects = [
		{
			name: 'FOMO',
			desc: 'An Android app location tracking social app made for students and young adults to stay connected',
			techStack: ['Kotlin', 'Jetpack Compose', 'MaterialUI', 'Supbase', 'JUnit', 'Google Maps API'],
			link: 'https://github.com/bryanjiang117/FOMO'
		},
		{
			name: 'Crusader',
			desc: 'A Gemini-integrated web app that scrapes the web for high-quality movie and show recommendations',
			techStack: ['Python', 'Flask', 'JavaScript', 'React', 'Docker', 'Google Cloud Platform'],
			link: 'https://crusader-569595952979.northamerica-northeast2.run.app/'
		},
		{
			name: 'Resolutions',
			desc: 'A web app to motivate you and your friends to stick with your New Year resolutions',
			techStack: ['PostgreSQL', 'JavaScript', 'Next', 'React', 'Tailwind', 'NextUI', 'Vercel'],
			link: 'https://resolutions-ochre.vercel.app/'
		},
		{
			name: 'Chess',
			desc: 'The board game chess with a focus on effective modular programming',
			techStack: ['C++', 'X Window'],
			link: 'https://github.com/bryanjiang117/Chess'
		},
		{
			name: 'Tournament Organizer',
			desc: 'A desktop app to generate brackets and track teams and tournament progress',
			techStack: ['Java', 'AWT', 'Swing'],
			link: 'https://github.com/bryanjiang117/Tournament-Organizer'
		},
		{
			name: 'TeamFight Tactics',
			desc: 'A passionate recreation of the popular strategy game TeamFight Tactics',
			techStack: ['Java', 'AWT', 'Swing'],
			link: 'https://github.com/bryanjiang117/TeamFight-Tactics'
		}
	];

	function handleResizeWindow() {
		const { length, left, leftSidePadding } = getNameMetrics();
		nameLength = length;
		windowWidth = window.innerWidth;

		const projectsContainer = document.querySelector('.projects-container');
		projectsContainer.style.paddingLeft = `${left + leftSidePadding + 10}px`;
	}

	onMount(() => {
		handleResizeWindow();

		window.addEventListener('resize', handleResizeWindow);

		return () => {
			window.removeEventListener('resize', handleResizeWindow);
		};
	});
</script>

<div id="page-5" class="page">
	<div class="projects-container no-select">
		{#each projects as project, i}
			<div class="project-container">
				<a
					class="project"
					style={i !== 0
						? `margin-left: ${(i * (nameLength - windowWidth * 0.03)) / projects.length / 2}px`
						: 0}
					href={project.link}
					target="_blank"
				>
					<div class="header">
						<h1 class="gradient">{project.name}</h1>
					</div>
					<p class="gradient">{project.desc}</p>
					<div class="tech-stack">
						{#each project.techStack as tech}
							<span class="tech-icon gradient">{tech}</span>
						{/each}
					</div>
				</a>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	@use '/src/global.scss' as *;

	.project {
		display: block;
		position: relative;
		color: $color-text-2;
		text-decoration: none;
	}

	.tech-icon {
		color: $color-text-1;
		padding: 0.5rem;
		border-radius: 1rem;
		font-size: x-small;
	}

	.gradient {
		background: $projects-gradient;
		background-attachment: fixed;
		background-position: center;
		background-size: cover;
	}

	.tech-stack {
		display: flex;
		gap: 0.5rem;
		margin-top: 1rem;
	}

	.project-link {
		font-size: small;
		display: none;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		-webkit-background-clip: text;
		animation: fadeIn 1s;
	}

	.project p {
		letter-spacing: 0px;
		font-size: small;
		margin: 0;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		-webkit-background-clip: text;
	}

	.project h1 {
		margin: 0;
		margin-bottom: 0.5rem;
		font-weight: normal;
		letter-spacing: -1px;
		transition: text-shadow 0.5s;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		-webkit-background-clip: text;
	}

	.header {
		display: flex;
		justify-content: space-between;
		text-align: bottom;
		align-items: center;
		margin-bottom: 0.5rem;
	}

	.project {
		padding: 28px 0 32px 36px;
		border-radius: 8px;
		width: 100vw;
		list-style-type: none;
		font-family: 'Helvetica', sans-serif;
	}

	.project:hover {
		background-color: $color-bg-2;
	}

	.project-container {
		height: 30vh;
	}

	.projects-container {
		height: fit-content;
		display: flex;
		flex-direction: column;
		justify-content: start;
		margin-right: 5vw;
	}

	#page-5 {
		position: relative;
		padding-top: 5rem;
		width: 100%;
		box-sizing: border-box;
		background-color: $color-bg-3;
		z-index: 3;
	}

	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>

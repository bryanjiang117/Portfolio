<script>
	import { onMount } from "svelte";
	import { getNameMetrics } from "../utils/util.js";

	const name = 'BRYAN JIANG';
	let nameLength = 0;

	const projects = [
		{
			name: 'Resolutions',
			desc: 'A web app to motivate you and your friends to stick with your New Year resolutions',
			techStack: ['Next', 'React', 'JavaScript', 'Tailwind', 'NextUI', 'PostgreSQL'],
			link: 'https://github.com/bryanjiang117/Resolutions'
		},
		{
			name: 'Chess',
			desc: 'The board game chess with a focus on effective modular programming',
			techStack: ['C++', 'XWindow'],
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
		const { length, left } = getNameMetrics(name);
		nameLength = length;

		const projectsContainer = document.querySelector('.projects-container');
		projectsContainer.style.paddingLeft = `${left}px`;
	}

	onMount(() => {
		handleResizeWindow();

		window.addEventListener('resize', handleResizeWindow);

		return () => {
			window.removeEventListener('resize', handleResizeWindow);
		}
	});
</script>

<div id="page-4" class="page">
	<div class="projects-container no-select">
    {#each projects as project, i}
			<ul class='project' style={i !== 0 ? `margin-left: ${i * nameLength / 5}px` : 0}>
				<li>
					<div class='header'>
						<h1 class='gradient'>{project.name}</h1>	
						<a class='github-link gradient' href={project.link} target='_blank'>View on GitHub</a>
					</div>
					<p class='gradient'>{project.desc}</p>
					<div class='tech-stack'>
						{#each project.techStack as tech}
							<span class='tech-icon gradient'>{tech}</span>
						{/each}
					</div>
				</li>
      </ul>
    {/each}
  </div>
</div>

<style lang="scss">
@import '/src/global.scss';

.project a {
	text-decoration: none;
	color: $color-text-2;
	position: relative;
}

.project a:hover {
	cursor: pointer;
	transition: text-decoration 1s;
}

.project a:hover::before {
  transform: scaleX(1);
}

.project a::before {
  content: "";
  position: absolute;
  display: block;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: $color-text-2;
  transform: scaleX(0);
  transform-origin: top left;
  transition: transform 0.3s ease;
}

.tech-icon {
	color: $color-text-1;
	padding: 0.5rem;
	border-radius: 1rem;
	font-size: x-small;
}

.gradient {
	background: radial-gradient(rgb(232, 229, 225), black);
	background-attachment: fixed;
	background-position: center;
	background-size: cover;
}

.tech-stack {
	display: flex;
	gap: 0.5rem;
	margin-top: 1rem;
}

.github-link {
	font-size: small;
	display: none;
	-webkit-text-fill-color: transparent; 
	background-clip: text;
	-webkit-background-clip: text; 
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
	font-weight: normal;
	letter-spacing: -1px;
	margin-bottom: 0.5rem;
	transition: text-shadow 0.5s;
	margin: 0;
	-webkit-text-fill-color: transparent; 
	background-clip: text;
	-webkit-background-clip: text; 	
}

.header {
	display: flex;
	justify-content: space-between;
	text-align: bottom;
	align-items: center;
	margin-bottom: 0.5rem;
}

.project li {
	height: 65vh;
}

.project {
  font-family: 'Helvetica', sans-serif;
	list-style-type: none;
	width: fit-content;
	padding: 0;
}

.project:hover h1 {
	// text-shadow: 0 0 15px $color-text-3;
}

.project:hover .github-link {
	display: block;
}

.projects-container {	
	height: fit-content;
	display: flex;
	flex-direction: column;
	justify-content: start;
}

#page-4 {
	width: 100%;
	box-sizing: border-box;
	background-color: $color-bg-3;
	z-index: 3;
	position: relative;
}
</style>

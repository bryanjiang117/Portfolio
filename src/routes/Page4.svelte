<script>
	const projects = [
		{
			name: 'Resolutions',
			desc: 'An web app to motivate you and your friends to stick with your New Year resolutions',
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
			desc: 'A recreation of the popular game TeamFight Tactics',
			techStack: ['Java', 'AWT', 'Swing'],
			link: 'https://github.com/bryanjiang117/TeamFight-Tactics'
		}
	];
</script>

<div id="page-4" class="page">
	<div class="container">
    {#each projects as project, i}
			<ul class='project' style="margin-left: {i * 15}rem">
				<li>
					<h3>{project.name}</h3>
					<a href={project.link} target='_blank'>View on GitHub</a>
					<p>{project.desc}</p>
					<div class='tech-stack'>
						{#each project.techStack as tech}
							<span class='tech-icon'>{tech}</span>
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
	background: linear-gradient(to right, rgb(255, 251, 243), rgb(0, 0, 0));
	background-attachment: fixed;
	background-size: cover;
	background-position: center;
}

.tech-stack {
	display: flex;
	gap: 0.5rem;
	margin-top: 1rem;
}

.project p {
	letter-spacing: 0px;
	font-size: small;	
	margin: 0;
}

.project h3 {
	font-weight: normal;
	letter-spacing: -1px;
	margin-bottom: 0.5rem;
	transition: text-shadow 0.5s;
}

.project li {
	margin-bottom: 6rem;
}
.project {
  font-family: 'Helvetica', sans-serif;
	list-style-type: none;
	width: fit-content;
}

.project:hover h3 {
	text-shadow: 0 0 15px $color-text-3;
}

.container {	
	user-select: none;
}

#page-4 {
  height: 200vh;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
}
</style>

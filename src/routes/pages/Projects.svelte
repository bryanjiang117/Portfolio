<script>

	const projects = [
		{
			name: 'FOMO',
			desc: 'An Android location tracking social app made for students and young adults to stay connected',
			techStack: ['Kotlin', 'Jetpack Compose', 'MaterialUI', 'Supbase', 'JUnit', 'Google Maps API'],
			link: 'https://github.com/bryanjiang117/FOMO'
		},
		{
			name: 'Crusader',
			desc: 'A Gemini-integrated web app that scrapes the web to find high-quality movie and show recommendations',
			techStack: ['Python', 'Flask', 'JavaScript', 'React', 'Docker', 'Google Cloud Platform'],
			link: 'https://crusader-569595952979.northamerica-northeast2.run.app/'
		},
		{
			name: 'Resolutions',
			desc: 'An productivity web app that motivates you and your friends to stick with your New Year resolutions',
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
	
</script>

<section id="page-4" class="page">
	<div class="projects-container no-select"></div>
</section>

<style lang="scss">
	@use '/src/global.scss' as *;

	#page-4 {
		position: absolute;
		height: 200vh;
		background: red;
		z-index: 1;
	}

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

	.tech-stack {
		display: flex;
		gap: 0.5rem;
		margin-top: 1rem;
	}
</style>

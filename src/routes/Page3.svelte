<script>
	import HorizontalLoop from "./HorizontalLoop.svelte";

	const experiences = [
		{
			title: 'Fullstack Engineer',
			company: 'TectMind',
			location: 'Montreal, QC',
			techStack: 'React&nbsp;&nbsp;·&nbsp;&nbsp;TypeScript&nbsp;&nbsp;·&nbsp;&nbsp;Python&nbsp;&nbsp;·&nbsp;&nbsp;Mapbox',
			desc: 'Worked in a tight-knit startup team to create their zoning analysis web app. Developed the app\'s main page (map) and data visualization.'
		},
		{
			title: 'Frontend Developer',
			company: 'ProNavigator',
			location: 'Waterloo, ON',
			techStack: 'React&nbsp;&nbsp;·&nbsp;&nbsp;JavaScript&nbsp;&nbsp;·&nbsp;&nbsp;Material UI',
			desc: 'Designed and developed internal tools user interfaces in collaboration with backend and QA engineers.'
		}
	];
</script>

<section id='page-3' class='page'>
	<div class='container'>
		<HorizontalLoop />
		<div class='experiences'>
			<ul>
				{#each experiences as exp} 
					<li class='experience'>
						<h1>{exp.title}</h1>
						<h3>{exp.company} at {exp.location}</h3>
						<p class='desc'>{exp.desc}</p>
						<p class='techStack'>{@html exp.techStack}</p>
					</li>
				{/each}
			</ul>
		</div>
		<HorizontalLoop />
	</div>
</section>

<style lang='scss'>
	
	.experience .desc{
		margin: 1rem 0;
		font-size: small;
	}

	.experience h3 {
		font-weight: normal;
		margin-top: 0.5rem;
		margin-bottom: 0;
	}

	.experience h1 {
		font-weight: normal;
		font-size: 2rem;
		margin: 0;
		letter-spacing: -1px;
	}

	ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 3rem;
	}

	.experiences {
		
	}

	.container {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		margin-top: 20vh;
	}

	#page-3 {
		height: 140vh;
	}
</style>
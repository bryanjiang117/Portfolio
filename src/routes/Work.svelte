<script>
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
	</div>
</section>

<style lang='scss'>
	@import '/src/global.scss';

	.experience .techStack {
		font-size: max(1.2vw, 0.8rem);
	}

	.experience .desc{
		margin: 1.5rem 0;
		font-size: max(1vw, 0.7rem);
	}

	.experience h3 {
		font-weight: normal;
		margin-top: 0.5rem;
		margin-bottom: 0;
	}

	.experience h1 {
		font-weight: normal;
		margin: 0;
		font-size: max(2.2vw, 1.5rem);
		line-height: 3rem;
		letter-spacing: -1.5px;
	}

	ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 3rem;
	}

	.experience {
		max-width: 30vw;

		@media (max-width: 600px) {
			max-width: 50vw;
		}
	}

	.experiences {
		
	}

	.container {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	#page-3 {
		height: 120vh;
		width: 100%;
		position: absolute;
		z-index: 2;
		background-color: $color-bg-2;
	}
</style>
<script>
	const experiences = [
		{
			title: 'Fullstack Developer',
			company: 'Redbrick - Shift',
			location: 'Victoria, BC',
			techStack: ['React', 'TypeScript', 'C++'],
			desc: 'Bug fixing, testing, and developing new features for our Chromium browser app as a member of the Browser UI team.'
		},
		{
			title: 'Fullstack Engineer',
			company: 'TectMind',
			location: 'Montreal, QC',
			techStack: ['React', 'TypeScript', 'Python'],
			desc: "Developed our new zoning analysis app's main map UI, data visualization page, and corresponding backend in a tight-knit startup."
		},
		{
			title: 'Frontend Developer',
			company: 'ProNavigator',
			location: 'Waterloo, ON',
			techStack: ['React', 'JavaScript'],
			desc: 'Designed and developed user interfaces for our organizational internal tools.'
		}
	];
</script>

<section id="page-3" class="page">
	<div class="container">
		<div class="experiences">
			<ul>
				{#each experiences as exp}
					<li class="experience">
						<h1>{exp.title}</h1>
						<h3>{exp.company} at {exp.location}</h3>
						<p class="desc">{exp.desc}</p>
						<p class="techStack">
							{@html exp.techStack.reduce((prev, cur) => prev + '&nbsp;&nbsp;·&nbsp;&nbsp;' + cur)}
						</p>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<style lang="scss">
	@import '/src/global.scss';

	.experience .techStack {
		font-size: max(1vw, 1rem);
	}

	.experience .desc {
		margin: 1.5rem 0;
		font-size: max(0.8vw, 0.8rem);
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
		margin-right: 20%;
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
		height: 140vh;
		width: 100%;
		position: absolute;
		z-index: 2;
		background-color: $color-bg-2;
	}
</style>

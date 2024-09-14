<script>
	const experiences = [
		{
			title: 'Fullstack Engineer',
			company: 'TectMind',
			location: 'Montreal, QC',
			techStack: 'React, TypeScript, Python, Mapbox',
			desc: 'Worked in a tight-knit startup team to create their zoning analysis web app. Developed the app\'s main page (map) and data visualization.'
		},
		{
			title: 'Frontend Developer',
			company: 'ProNavigator',
			location: 'Waterloo, ON',
			techStack: 'React, JavaScript, Material UI',
			desc: 'Designed and developed internal tools user interfaces in collaboration with backend and QA engineers.'
		}
	];
</script>

<section id='page-3' class='page'>
	<div class='container'>
		<div class='experiences'>
			<ul>
				<!-- {#each experiences as exp} 
					<li class='experience'>
						<h2>{exp.title}</h2>
					</li>
				{/each} -->
			</ul>
		</div>
	</div>
</section>

<style lang='scss'>
	#page-3 {
		height: 100vh;
	}

	.container {
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
	}

	.experiences {
		margin-left: 50vw;
	}

	ul {
		list-style: none;
	}
</style>
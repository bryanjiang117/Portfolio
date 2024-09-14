<script>
	const projects = [
		{
			name: 'Resolutions',
			desc: 'An web app to motivate you and your friends to stick with your New Year resolutions',
			img: '/lib/images/resolutions.png',
			techStack: 'Next, React, JavaScript, Tailwind, NextUI, PostgreSQL'
		},
		{
			name: 'Chess',
			desc: 'The board game chess',
			img: '/lib/images/chess.png',
			techStack: 'C++, XWindow'
		},
		{
			name: 'Tournament Organizer',
			desc: 'A desktop app to generate brackets and track teams and tournament progress',
			img: '/lib/images/tournament-organizer.png',
			techStack: 'Java, AWT, Swing'
		},
		{
			name: 'TeamFight Tactics',
			desc: 'A recreation of the popular game TeamFight Tactics',
			img: '/lib/images/teamfight-tactics.png',
			techStack: 'Java, AWT, Swing'
		}
	];
</script>

<div id="page-4" class="page">
	<div class="container">
    {#each projects as project, i}
      <div class='project-container'>
        <div class='project'>
          <div>{project.name}</div>
          <img href={project.img} alt={project.name}/>
        </div>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">

	.text-container {
		font-size: 2.2rem;
	}

	.text {
		max-width: 30vw;
	}

  .project {
    
  }
  
  .project-container {
    width: 100%;
    height: 30vh;
    display: flex;
    justify-content: right;
  }
  .container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}


  #page-4 {
		height: 100vh;
	}
</style>

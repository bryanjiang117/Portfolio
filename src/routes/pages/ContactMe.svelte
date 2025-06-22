<script>
	export let contactElement;

	// You can add more social media links here
	const socialLinks = [
		{ name: 'Email', url: 'mailto:haozhoujiang@gmail.com', icon: 'email.svg' },
		{ name: 'GitHub', url: 'https://github.com/bryanjiang117', icon: 'github.svg' },
		{ name: 'LinkedIn', url: 'https://linkedin.com/in/bryanjiang117', icon: 'linkedin.svg' }
	];
</script>

<div id="page-5" class="page">
	<div class="contact-container">
		<div class="contact-me" bind:this={contactElement}>Contact Me!</div>
	</div>

	<!-- <div class="links">
		{#each socialLinks as link}
			<a class="social-link" href={link.url} target="_blank">
				<img src={`/lib/images/${link.icon}`} alt={link.name} />
				<span>{link.name}</span>
			</a>
		{/each}
	</div> -->
</div>

<style lang="scss">
	@use '/src/global.scss' as *;

	.contact-me {
		font-size: 8vw;
		letter-spacing: -0.5vw;
		background: $projects-gradient;
		background-attachment: fixed;
		background-position: center;
		background-size: 80vw 100vh;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		-webkit-background-clip: text;
	}

	.contact-container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100vh;
	}

	#page-5 {
		height: 100vh;
		width: 100%;
	}
</style>

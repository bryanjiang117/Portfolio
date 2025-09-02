<script>
	import { tooltip } from 'svooltip';
	import 'svooltip/styles.css';
	import 'iconify-icon';

	let { contactElement = $bindable() } = $props();

	const iconSize = 'max(2vw, 2rem)';

	let emailTooltipContent = $state('Copy Email');

	const copyEmail = () => {
		navigator.clipboard.writeText('haozhoujiang@gmail.com');
		emailTooltipContent = 'Email Copied!';
	};
</script>

<div id="page-7" class="page">
	<div class="contact-container">
		<div class="contact-me" bind:this={contactElement}>Contact Me!</div>
	</div>

	<div class="links">
		<button
			aria-label="Copy Email"
			class="link"
			onclick={copyEmail}
			use:tooltip={{
				content: emailTooltipContent,
				onDestroy: () => {
					emailTooltipContent = 'Copy Email';
				}
			}}
		>
			<iconify-icon icon="line-md:email" width={iconSize} height={iconSize}></iconify-icon>
		</button>
		<a
			aria-label="GitHub"
			class="link"
			href="https://github.com/bryanjiang117"
			target="_blank"
			use:tooltip={{ content: 'Visit GitHub' }}
		>
			<iconify-icon icon="line-md:github" width={iconSize} height={iconSize}></iconify-icon>
		</a>
		<a
			aria-label="Resume"
			class="link"
			href="/lib/resume.pdf"
			download="Bryan_Jiang_Resume.pdf"
			use:tooltip={{ content: 'Download Resume' }}
		>
			<iconify-icon icon="line-md:document-list" width={iconSize} height={iconSize}></iconify-icon>
		</a>
		<a
			aria-label="LinkedIn"
			class="link"
			href="https://linkedin.com/in/bryanjiang117"
			target="_blank"
			use:tooltip={{ content: 'Visit LinkedIn' }}
		>
			<iconify-icon icon="line-md:linkedin" width={iconSize} height={iconSize}></iconify-icon>
		</a>
	</div>
</div>

<style lang="scss">
	@use '/src/global.scss' as *;

	#page-7 {
		height: 100vh;
		width: 100%;
		background: inherit;
	}

	.contact-container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100vh;
	}

	.contact-me {
		font-size: max(8vw, 4rem);
		letter-spacing: -0.5vw;
	}

	.links {
		position: absolute;
		bottom: max(10vh, 3rem);
		left: 50%;
		display: flex;
		gap: 1vw;
		transform: translateX(-50%);
	}

	button.link {
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
	}

	iconify-icon {
		color: $color-text-1;
	}

	:global(.svooltip),
	:global(.svooltip-arrow) {
		background: $color-bg-2;
	}

	:global(.svooltip-content) {
		color: $color-text-2;
	}
</style>

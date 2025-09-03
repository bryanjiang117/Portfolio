<script>
	import { onMount } from 'svelte';
	import { Marquee, loop } from 'dynamic-marquee';

	const N_MARQUEES = 6;
	const marqueeElements = Array.from({ length: N_MARQUEES }, () => null);

	onMount(() => {
		marqueeElements.forEach((marqueeElement, i) => {
			const marquee = new Marquee(marqueeElement, {
				rate: -200,
				startOnScreen: true
			});

			loop(marquee, [
				() => {
					const el = document.createElement('div');
					el.innerHTML = `
							<div class="marqueeItem shift">
								<img src="/lib/images/shift-logo.png" alt="Shift logo" />
							</div>
						`;

					return el;
				},
				() => {
					const el = document.createElement('div');
					el.innerHTML = `
							<div class="marqueeItem redbrick">
								<div class='text'>REDBRICK</div>
							</div>
						`;

					return el;
				},
				() => {
					const el = document.createElement('div');
					el.innerHTML = `
							<div class="marqueeItem pronavigator">
								<img src="/lib/images/pronavigator-logo.png" alt="ProNavigator logo" />
								<div class='text'>
									<span>  P</span><span class="small-pronav-text">RO</span><span>N</span><span class="small-pronav-text">AVIGATOR</span>
								</div>
							</div>
						`;
					return el;
				},
				() => {
					const el = document.createElement('div');
					el.innerHTML = `
							<div class="marqueeItem tectmind">
								<img src="/lib/images/tectmind.webp" alt="Tectmind Logo" />
							</div>
						`;
					return el;
				}
			]);
		});
	});
</script>

{#each marqueeElements as _, i}
	<div
		class="marquee"
		style="transform: translateX({(i - N_MARQUEES) * 50}px);"
		bind:this={marqueeElements[i]}
	></div>
{/each}

<style lang="scss">
	@use '/src/global.scss' as *;

	$marquee-height: max(9vw, 5rem);

	.marquee {
		position: static;
		overflow: hidden;
		height: $marquee-height;
		width: calc(100vw + 6 * 50px); // must change this when changing N_MARQUEES
		margin: 0;
		padding: 0;
	}

	:global(.marqueeItem) {
		height: $marquee-height;
		align-items: center;
		display: flex;
		margin-left: max(3vw, 2rem);
		font-size: $marquee-height;
		user-select: none;
	}

	:global(.marqueeItem img) {
		height: $marquee-height;
	}

	:global(.pronavigator text, .redbrick text) {
		padding-bottom: 1rem;
	}

	:global(.pronavigator) {
		color: #3389a8;
		font-family: $font-pronavigator;
	}

	:global(.small-pronav-text) {
		font-size: calc($marquee-height * 0.9);
	}

	:global(.redbrick) {
		color: white;
		font-family: $font-redbrick;
		letter-spacing: 1.25rem;
	}
</style>

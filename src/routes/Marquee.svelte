<script>
	import { onMount } from 'svelte';
	import { Marquee, loop } from 'dynamic-marquee';

	onMount(() => {
		const marqueeElements = document.querySelectorAll('.marquee');

		marqueeElements.forEach((marqueeElement, i) => {
			const marquee = new Marquee(marqueeElement, {
				rate: -200,
				startOnScreen: true
			});

			const offset = i * 50;
			let firstCycle = true;
			// The first callback returns a spacer element once to create an offset
			loop(marquee, [
				() => {
					if (firstCycle) {
						firstCycle = false;
						const spacer = document.createElement('div');
						spacer.style.width = `${offset}px`;
						spacer.style.flexShrink = '0';
						return spacer;
					}
					return null;
				},
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

<div class="marquee"></div>

<style lang="scss">
	@import '/src/global.scss';

	$marquee-height: 120px;

	.marquee {
		position: static;
		overflow: hidden;
		height: $marquee-height;
		margin: 0;
		padding: 0;
	}

	:global(.marqueeItem) {
		height: $marquee-height;
		align-items: center;
		display: flex;
		gap: 10px;
		margin-left: 3rem;
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

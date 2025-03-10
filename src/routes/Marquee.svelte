<script>
	import { onMount } from 'svelte';
	import { Marquee, loop } from 'dynamic-marquee';

	onMount(() => {
		const marquee1 = (window.m = new Marquee(document.getElementById('marquee'), {
			rate: -150,
			startOnScreen: true
		}));

		const marquee2 = (window.m = new Marquee(document.getElementById('marquee'), {
			rate: -125,
			startOnScreen: true
		}));

		window.l = loop(marquee1, [
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
</script>

<div id="marquee"></div>

<style lang="scss">
	@import '/src/global.scss';

	$marquee-height: 120px;

	#marquee {
		position: static !important;
		overflow: hidden;
		margin: 0;
		padding: 0;
	}

	:global(.marqueeItem) {
		height: $marquee-height;
		align-items: center;
		display: flex;
		gap: 10px;
		font-size: $marquee-height;
		margin-left: 7rem;
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

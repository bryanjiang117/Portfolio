<script>
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	let boxes = [];

	onMount(() => {
		boxes = gsap.utils.toArray('.box');

    // Call the horizontalLoop function (defined below)
    const loop = horizontalLoop(boxes, {
				paused: false,
				repeat: -1,
				speed: 1
			});
	});

	// Horizontal loop function
	function horizontalLoop(items, config) {
		items = gsap.utils.toArray(items);
		config = config || {};
		let tl = gsap.timeline({
				repeat: config.repeat,
				paused: config.paused,
				defaults: { ease: 'none' },
				onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)
			}),
			length = items.length,
			startX = items[0].offsetLeft,
			times = [],
			widths = [],
			xPercents = [],
			curIndex = 0,
			pixelsPerSecond = (config.speed || 1) * 100,
			snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1),
			totalWidth,
			curX,
			distanceToStart,
			distanceToLoop,
			item,
			i;

		gsap.set(items, {
			xPercent: (i, el) => {
				let w = (widths[i] = parseFloat(gsap.getProperty(el, 'width', 'px')));
				xPercents[i] = snap(
					(parseFloat(gsap.getProperty(el, 'x', 'px')) / w) * 100 + gsap.getProperty(el, 'xPercent')
				);
				return xPercents[i];
			}
		});
		gsap.set(items, { x: 0 });
		totalWidth =
      items[length - 1].offsetLeft +
      (xPercents[length - 1] / 100) * widths[length - 1] -
      startX +
      items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], "scaleX") +
      (parseFloat(config.paddingRight) || 0) +
      (length - 1) * 30 - 60; // Adjust with margin (e.g., 30px)

		for (i = 0; i < length; i++) {
			item = items[i];
			curX = (xPercents[i] / 100) * widths[i];
			distanceToStart = item.offsetLeft + curX - startX;
			distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, 'scaleX');
			tl.to(
				item,
				{
					xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
					duration: distanceToLoop / pixelsPerSecond
				},
				0
			)
				.fromTo(
					item,
					{
						xPercent: snap(((curX - distanceToLoop + totalWidth) / widths[i]) * 100)
					},
					{
						xPercent: xPercents[i],
						duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
						immediateRender: false
					},
					distanceToLoop / pixelsPerSecond
				)
				.add('label' + i, distanceToStart / pixelsPerSecond);
			times[i] = distanceToStart / pixelsPerSecond;
		}

		function toIndex(index, vars) {
			vars = vars || {};
			Math.abs(index - curIndex) > length / 2 && (index += index > curIndex ? -length : length); // always go in the shortest direction
			let newIndex = gsap.utils.wrap(0, length, index),
				time = times[newIndex];
			if (time > tl.time() !== index > curIndex) {
				vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
				time += tl.duration() * (index > curIndex ? 1 : -1);
			}
			curIndex = newIndex;
			vars.overwrite = true;
			return tl.tweenTo(time, vars);
		}

		tl.next = (vars) => toIndex(curIndex + 1, vars);
		tl.previous = (vars) => toIndex(curIndex - 1, vars);
		tl.current = () => curIndex;
		tl.toIndex = (index, vars) => toIndex(index, vars);
		tl.times = times;
		tl.progress(1, true).progress(0, true); // pre-render for performance
		if (config.reversed) {
			tl.vars.onReverseComplete();
			tl.reverse();
		}
		return tl;
	}
</script>

<!-- HTML for Boxes -->
<div class="wrapper no-select">
	<div class="box pronavigator">
		<img class="b--marque-a__content__media" src="/lib/images/pronavigator-logo.png" alt="" />
		<span class='text-container'>
			<span class="box-text">P</span><span class='small-pronav-text'>RO</span><span class='box-text'>N</span><span class='small-pronav-text'>AVIGATOR</span>
		</span>
	</div>
	<div class="box tectmind">
		<img class="b--marque-a__content__media" src="/lib/images/tectmind.webp" alt="" />
	</div>
	<div class="box pronavigator">
		<img class="b--marque-a__content__media" src="/lib/images/pronavigator-logo.png" alt="" />
		<span class='text-container'>
			<span class="box-text">P</span><span class='small-pronav-text'>RO</span><span class='box-text'>N</span><span class='small-pronav-text'>AVIGATOR</span>
		</span>
	</div>
  <div class="box tectmind">
		<img class="b--marque-a__content__media" src="/lib/images/tectmind.webp" alt="" />
	</div>
</div>

<style lang='scss'>
	@import '/src/global.scss';

	.wrapper {
		width: 100%;
		position: relative;
		display: flex;
		align-items: center;
		overflow: hidden;
	}

	.box {
		display: flex;
		align-items: center;
		justify-content: space-around;
		height: 5rem;
		margin: 0;
    margin-right: 30px;
		padding: 0;
		position: relative;
		flex-shrink: 0;
		overflow: hidden;
	}

	.small-pronav-text {
		font-size: 4.8rem;
	}

	.text-container {
		align-items: baseline;
	}

  .pronavigator {
    width: 820px;
		color: #3389a8;
    // color: #13414e;
		font-family: $font-pronavigator;
  }

  .tectmind {
    width: 630px;	
  }

	.box-text {
		font-size: 5.5rem;
		@media (max-width: 600px) {
			// font-size: 3.5rem;
		}
	}

	.box img {
		height: 100%;
		object-fit: cover;
	}
</style>

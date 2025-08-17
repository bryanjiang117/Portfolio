<script>
	import { onDestroy, onMount } from 'svelte';

	const places = [
		{ name: 'Tokyo', latlng: [35.652832, 139.839478] },
		{ name: 'Yokohama', latlng: [35.43333, 139.65] }, // Yokohama approximate :contentReference[oaicite:1]{index=1}
		{ name: 'Kamakura', latlng: [35.30889, 139.55028] }, // Kamakura approximate :contentReference[oaicite:2]{index=2}
		{ name: 'Lake Kawaguchi', latlng: [35.515, 138.75667] }, // Lake Kawaguchi approximate :contentReference[oaicite:3]{index=3}
		{ name: 'Yunishigawa Onsen', latlng: [36.92944, 139.68833] }, // Based on station :contentReference[oaicite:4]{index=4}
		{ name: 'Nagano', latlng: [36.65139, 138.18111] }, // Common city value (not looked up here)
		{ name: 'Snow Monkey Park', latlng: [36.73294, 138.46217] }, // Jigokudani Monkey Park :contentReference[oaicite:5]{index=5}
		{ name: 'Takayama', latlng: [36.1431, 137.2528] }, // Approx common city value
		{ name: 'Kanazawa', latlng: [36.56133, 136.65622] }, // Approx
		{ name: 'Osaka', latlng: [34.69374, 135.50218] }, // Osaka city :contentReference[oaicite:6]{index=6}
		{ name: 'Funaya no Ine', latlng: [35.675764, 135.287333] }, // Approx, Ine town :contentReference[oaicite:7]{index=7}
		{ name: 'Kinosaki Onsen', latlng: [35.62972, 134.8] }, // Approx
		{ name: 'Hiroshima', latlng: [34.38528, 132.45528] }, // Common city value
		{ name: 'Miyajima', latlng: [34.295, 132.31917] }, // Approx
		{ name: 'Fukuoka', latlng: [33.59, 130.40172] }, // Approx city
		{ name: 'Ainoshima (Cat Island)', latlng: [33.758845, 130.364781] },
		{ name: 'Kyoto', latlng: [35.01167, 135.76833] }, // Kyoto city :contentReference[oaicite:8]{index=8}
		{ name: 'Beijing', latlng: [39.90667, 116.3975] }, // :contentReference[oaicite:1]{index=1}
		{ name: 'Great Wall', latlng: [40.432434, 116.562921] }, // :contentReference[oaicite:2]{index=2}
		{ name: 'Tianjin', latlng: [39.1336, 117.2054] }, // :contentReference[oaicite:3]{index=3}
		{ name: 'Mazatlán', latlng: [23.217, -106.417] }, // :contentReference[oaicite:4]{index=4}
		{ name: 'Cuba', latlng: [21.5218, -77.7812] }, // :contentReference[oaicite:5]{index=5}
		{ name: 'Vancouver', latlng: [49.26083, -123.11389] }, // :contentReference[oaicite:6]{index=6}
		{ name: 'Grouse Mountain', latlng: [49.37956, -123.0818] }, // :contentReference[oaicite:7]{index=7}
		{ name: 'Calgary', latlng: [51.05, -114.067] }, // :contentReference[oaicite:8]{index=8}
		{ name: 'Banff', latlng: [51.1784, -115.5708] }, // approximate value
		{ name: 'Jasper', latlng: [52.8734, -117.9529] }, // approximate value
		{ name: 'Victoria', latlng: [48.4284, -123.3656] }, // approximate value
		{ name: 'Holland River', latlng: [44.163489, -79.521284] },
		{ name: 'Lake Placid', latlng: [44.2795, -73.9799] }, // approximate value
		{ name: 'Algonquin Peak', latlng: [44.1675, -73.9767] }, // approximate Location in Adirondacks
		{ name: 'Buffalo', latlng: [42.8864, -78.8784] },
		{ name: 'Toronto,', latlng: [43.65107, -79.347015] },
		{ name: 'Niagara Falls', latlng: [43.0896, -79.0849] },
		{ name: 'Hamilton', latlng: [43.2557, -79.8711] },
		{ name: 'Waterloo', latlng: [43.4643, -80.5204] },
		{ name: 'Blue Mountain', latlng: [44.5006, -80.31] },
		{ name: 'Mount St. Louis Moonstone', latlng: [44.6286, -79.7019] },
		{ name: 'Algonquin Provincial Park', latlng: [45.8372, -78.3797] },
		{ name: 'Watertown', latlng: [43.9748, -75.9108] },
		{ name: 'Kingston', latlng: [44.2312, -76.486] },
		{ name: 'Montreal', latlng: [45.5019, -73.5674] },
		{ name: 'Ottawa', latlng: [45.4215, -75.6972] }
	];

	let coverClass = 'map-cover';

	function handleClickCover() {
		coverClass = 'map-cover hide-cover';
	}

	function handleKeydownCover(e) {
		if (e.key === 'Enter' || e.key === ' ') {
			coverClass = 'map-cover hide-cover';
		}
	}

	function handleScroll() {
		coverClass = 'map-cover';
	}

	let map;

	onMount(async () => {
		const L = await import('leaflet');
		await import('leaflet/dist/leaflet.css');

		const WORLD_BOUNDS = [
			[-85, -180],
			[85, 180]
		];

		map = L.map('map', {
			center: [43.6532, -79.3832],
			minZoom: 2,
			maxBounds: WORLD_BOUNDS,
			maxBoundsViscosity: 0.9
		});

		L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png', {
			maxZoom: 19,
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
			subdomains: 'abcd',
			noWrap: false
		}).addTo(map);

		places.forEach((place) => {
			const markerIcon = L.divIcon({
				iconSize: [10, 10],
				html: '<div class="dot"></div>'
			});
			const marker = L.marker(place.latlng, { title: '', icon: markerIcon }).addTo(map);
			marker.bindTooltip(place.name, { direction: 'top', offset: [0, -5] });
		});

		map.fitWorld();
	});
</script>

<svelte:window on:scroll={handleScroll} />

<section id="page-6" class="page">
	<div class="container">
		<div class="map-container">
			<div
				class={coverClass}
				on:click={handleClickCover}
				on:keydown={handleKeydownCover}
				role="button"
				tabindex="0"
			>
				<span class="cover-text">Interact to view map</span>
			</div>
			<div id="map"></div>
		</div>
	</div>
</section>

<style lang="scss">
	@use '/src/global.scss' as *;

	#page-6 {
		height: 120vh;

		display: flex;
		justify-content: center;
		align-items: center;

		background: inherit;
		z-index: 1;
		@media (max-width: 600px) {
			padding-top: 0px;
		}
	}

	.container {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.map-container {
		position: relative;
		width: fit-content;
	}

	#map {
		height: 80vh;
		aspect-ratio: 21/16;
		background: $color-bg-2;
	}

	:global(.leaflet-control-zoom-in),
	:global(.leaflet-control-zoom-out) {
		background-color: $color-bg-2 !important;
		color: $color-text-2 !important;
		border-color: $color-bg-2 !important;
	}

	:global(.leaflet-control-attribution) {
		display: none;
	}

	:global(.leaflet-tooltip) {
		font-size: x-small !important;
		padding: 3px 5px !important;
	}

	:global(.leaflet-div-icon) {
		background: transparent !important;
		border: none !important;
	}

	:global(.leaflet-div-icon .dot) {
		width: 3px !important;
		height: 3px !important;
		border-radius: 50%;
		background: currentColor;
		box-shadow:
			0 0 1px currentColor,
			0 0 2px currentColor,
			0 0 4px currentColor,
			0 0 6px currentColor;
		color: #8dc243;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%); /* center dot in hitbox */
	}

	.map-cover {
		position: absolute;
		top: 0;
		left: 0;

		display: flex;
		justify-content: center;
		align-items: center;

		width: 100%;
		height: 100%;
		background: #21201f;
		opacity: 0.8;
		transition: opacity 0.5s;
		z-index: 3000;
		cursor: pointer;
	}
	.hide-cover {
		opacity: 0;
		pointer-events: none;
	}

	.map-cover:hover .cover-text {
		opacity: 1;
	}

	.cover-text {
		transition: opacity 0.25s;
		opacity: 0;
	}
</style>

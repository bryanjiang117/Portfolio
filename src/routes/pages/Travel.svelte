<script>
	import { onMount } from 'svelte';

	const places = [
		{
			name: 'Tokyo',
			latlng: [35.652832, 139.839478]
		}
	];

	let map;

	onMount(async () => {
		const L = await import('leaflet');
		await import('leaflet/dist/leaflet.css');

		map = L.map('map', {
			center: [43.6532, -79.3832],
			minZoom: 2,
			scrollWheelZoom: false
		});

		L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png', {
			maxZoom: 19,
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
			subdomains: 'abcd'
		}).addTo(map);

		places.forEach((place) => {
			const marker = L.marker(place.latlng, { title: place.name }).addTo(map);
			marker.bindTooltip(place.name, { direction: 'top', offset: [-15, -15] });
		});

		map.fitWorld();
	});
</script>

<section id="page-5" class="page">
	<div class="container">
		<div id="map"></div>
	</div>
</section>

<style lang="scss">
	@use '/src/global.scss' as *;

	#page-5 {
		height: 200vh;

		@media (max-width: 600px) {
			padding-top: 0px;
		}
	}

	.container {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
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
</style>

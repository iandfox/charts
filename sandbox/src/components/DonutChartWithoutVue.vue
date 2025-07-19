<template>
	<div id="container"></div>
</template>

<script setup>
	import { onMounted, useTemplateRef } from 'vue';
	import DonutSVG from '../../../src/DonutSVG.class.js';
	import DonutSVGRenderer from '../../../src/DonutSVGRenderer.class.js';
	
	// TODO 2025-07-19: delete for DRY-ness
	const withTotal = (data) => {
		const total = data.reduce((sum, d) => sum + d.value, 0);
		return data.map((d) => ({ ...d, total }));
	};
	
	const donut = new DonutSVG({
		data: withTotal([
			{ label: 'Plundering Revenue', value: 5000.5, r0: 10, r1: 50 },
			{ label: 'Bribes & “Networking”', value: 2750.25, r0: 10, r1: 50 },
			{ label: 'Cannonball Budget', value: 1200.9, r0: 10, r1: 50 },
			{ label: 'Rum Allowance', value: 3500.123456, r0: 10, r1: 50 },
			{ label: 'Parrot Maintenance', value: 600, r0: 10, r1: 50 },
		]),
	});
	
	onMounted(() => {
		console.log('Starting up...'); // TODO 2025-07-19: delete
		
		const renderer = new DonutSVGRenderer(document.getElementById('container'), donut); // TODO 2025-07-19: delete
		console.log('renderer:', renderer); // TODO 2025-07-19: delete
		
		window.renderer = renderer; // TODO 2025-07-19: delete
	});
</script>

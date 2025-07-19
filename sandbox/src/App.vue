<template>
	<main>
		
		<div>
			<h2>Vanilla JS:</h2>
			<DonutChartWithoutVue />
		</div>
		
		<hr/>
		
		<div>
			<h2>Vue Playground:</h2>
			<p><small><em>(lots of donuts, for testing edge cases)</em></small></p>
			<div style="display: flex; flex-wrap: wrap; gap: 13px;">
				<!--<PlaygroundLotsOfDonuts/>-->
			</div>
		</div>
		
		<hr/>
		<div>
			<img src="./assets/donuts.gif" style="border-top-left-radius: 10px; opacity: 0.3;"/>
		</div>
	</main>
</template>

<script setup>
	import PlaygroundLotsOfDonuts from '@/components/playgrounds/PlaygroundLotsOfDonuts.vue';
	import DonutSVGRenderer from '../../src/DonutSVGRenderer.class.js';
	import { onMounted, useTemplateRef } from 'vue';
	import DonutSVG from '../../src/DonutSVG.class.js';
	import DonutChartWithoutVue from '@/components/DonutChartWithoutVue.vue';
</script>


<style scoped>
	main {
		min-height:      100vh;
		width:           100vw;
	}
</style>

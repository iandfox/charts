<script setup>
	import PlaygroundDonutSegmentSVG from './components/PlaygroundDonutSegmentSVG.vue'
	import PlaygroundDonutSVG from './components/PlaygroundDonutSVG.vue';
	import DonutChart from '@/components/DonutChart.vue';
</script>


<template>
	<main>
		<DonutChart />
	</main>
</template>


<style scoped>
	main {
		min-height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 13px;
	}
</style>

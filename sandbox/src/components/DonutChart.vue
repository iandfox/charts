<template>
	<svg width="500" height="500" viewBox="-75 -75 150 150" style="box-shadow: 0 0 5px black">
		<g
			v-for="(segment, segmentIndex) in donut.segments"
			:id="`${segment.label}`"
		>
			<path
				xmlns="http://www.w3.org/2000/svg"
				:d="segment.toSVGPathDefinition({
					rotation: 0,
					offset: (segment.isHovering ? 2 : 0),
				})"
				:fill="segment.color"
				@mouseover="setHovering(segment, true)"
				@mouseout="setHovering(segment, false)"
			/>
			
			<text
				:x="segment.getPoint(0.5, 0.5, { offset: (segment.isHovering ? 2 : 0) }).x"
				:y="segment.getPoint(0.5, 0.5, { offset: (segment.isHovering ? 2 : 0) }).y"
				text-anchor="middle"
				dominant-baseline="middle"
				font-size="5"
				fill="white"
				style="pointer-events: none; user-select: none;"
			>
				{{ segment.label }}: {{ segment.value }}
			</text>
		</g>
	</svg>
</template>

<script setup>
	import { reactive, toValue } from 'vue';
	import DonutSVG from '../../../src/DonutSVG.class.js';
	
	const props = defineProps({
		data: Array,
	});
	
	/**
	 * @type {DonutSVG}
	 */
	const donut = reactive(new DonutSVG({
		data: props.data
	}));
	
	const setHovering = (segment, value) => {
		segment._isHovering = value;
	}
</script>

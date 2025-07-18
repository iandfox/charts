<template>
	
	<fieldset>
		<h2>Donut testing</h2>
		
		<div>
			<svg width="300" height="300" viewBox="-75 -75 150 150" style="box-shadow: 0 0 5px black">
				<g
					v-for="(segment, segmentIndex) in donut.segments"
					:id="`${segment.label}`"
				>
					<path
						xmlns="http://www.w3.org/2000/svg"
						:d="segment.toSVGPathDefinition({
							rotation: segment.rotation,
							offset: toValue(globalOffset)
						})"
						:fill="segment.color"
					/>
				</g>
			</svg>
			
			<!--
			
			<div style="display: flex; flex-direction: column; gap: 13px;">
				<label for="r0">
					r0 = <input type="range" v-model.number="r0" min="2" max="50" id="r0" name="r0" /> {{ r0 }}
				</label>
				
				<label for="rotation">
					Offset Angle = <input type="range" v-model.number="rotation" min="0" max="6.28" step="0.01" id="rotation" name="rotation" /> {{ rotation }}
				</label>
				
				<label for="offsetRadius">
					Radial offset for all = <input type="range" v-model.number="offsetRadius" min="0" max="50" id="offsetRadius" name="offsetRadius" /> {{ offsetRadius }}
				</label>
			</div>
			
			-->
		</div>
	</fieldset>
</template>

<script setup>
	import DonutSegmentSVG from '../../../src/DonutSegmentSVG.class.js';
	import Donut from '../../../src/Donut.class.js';
	import { ref, toValue, reactive, computed } from 'vue';
	
	const r0 = ref(10);
	const rotation = ref(0);
	const globalOffset = ref(0);
	
	const donut = new Donut({
		segmentClass: DonutSegmentSVG,
		data: [
			{
				label: 'Pi Charts',
				value: 5,
				total: 23,
				r0: 10,
				r1: 50,
			},
			{
				label: 'Blueberry',
				value: 10,
				total: 23,
				r0: 10,
				r1: 50,
			},
			{
				label: 'Apple',
				value: 8,
				total: 23,
				r0: 10,
				r1: 50,
			},
		]
	});
</script>

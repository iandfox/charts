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
							rotation: toValue(globalRotation),
							offset: toValue(globalOffset)
						})"
						:fill="segment.color"
					/>
				</g>
			</svg>
			
			
			<div style="display: flex; flex-direction: column; gap: 13px;">
				<label for="r0">
					r0 = <input type="range" v-model.number="r0" min="0" max="49" id="r0" name="r0" /> {{ r0 }}
				</label>
				
				<label for="rotation">
					Offset Angle = <input type="range" v-model.number="globalRotation" min="0" max="6.28" step="0.01" id="globalRotation" name="globalRotation" /> {{ globalRotation }}
				</label>
				
				<label for="offsetRadius">
					Radial offset for all = <input type="range" v-model.number="globalOffset" min="0" max="50" id="offsetRadius" name="offsetRadius" /> {{ globalOffset }}
				</label>
			</div>
			
		</div>
		
		<div style="max-height: 400px; overflow: auto; font-size: 13px;">
			<pre><code>{{donut}}</code></pre>
		</div>
	</fieldset>
</template>

<script setup>
	import { ref, toValue, watch } from 'vue';
	import DonutSVG from '../../../src/DonutSVG.class.js';
	
	const r0 = ref(10);
	const globalRotation = ref(0);
	const globalOffset = ref(0);
	
	const donut = new DonutSVG({
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
	
	
	watch(r0, (newValue) => {
		donut._segments.forEach((segment) => {
			segment.r0 = newValue;
		});
	});
</script>

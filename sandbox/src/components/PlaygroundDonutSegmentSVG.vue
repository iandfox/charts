<template>
	<fieldset>
		<h2>Donut Segment testing</h2>
		<pre><code>segment = {{ segment }}</code></pre>
	
		<div>
			<svg width="300" height="300" viewBox="-75 -75 150 150" style="box-shadow: 0 0 5px black">
				<circle cx="0" cy="0" r="50" stroke="teal" fill="white" />
				<path
					:d="segment.toSVGPathDefinition({ rotation: toValue(rotation), offset: toValue(offset) })"
					:fill="segment.color"
					xmlns="http://www.w3.org/2000/svg"
				/>
			</svg>
	
			<div style="display: flex; flex-direction: column; gap: 13px;">
				<label for="value">
					value = <input type="range" v-model.number="segment.value" min="1" :max="segment.total" id="value" name="value" /> {{ segment.value }}
					<br />
					<small><em>Bug: arcs with large values (> 50%) do not create a pretty arc</em></small> <!-- TODO 2025-07-10: Bug: arcs with large values (> 50%) do not create a pretty arc -->
				</label>
	
				<label for="r0">
					r0 = <input type="range" v-model.number="segment.r0" min="2" max="50" id="r0" name="r0" /> {{ segment.r0 }}
				</label>
	
				<label for="r1">
					r1 = <input type="range" v-model.number="segment.r1" min="2" max="50" id="r1" name="r1" /> {{ segment.r1 }}
				</label>
	
	
				<label for="rotation">
					Initial Rotation = <input type="range" v-model.number="rotation" min="0" max="6.28" step="0.01" id="rotation" name="rotation" /> {{ rotation }}
				</label>
	
				<label for="offset">
					Radial Offset = <input type="range" v-model.number="offset" min="0" max="50" id="offset" name="offset" /> {{ offset }}
					<br />
					<small><em>(Useful for hover effect -> popout)</em></small>
				</label>
			</div>
			<code>path d="{{ segment.toSVGPathDefinition({ rotation: toValue(rotation), offset: toValue(offset) }) }}"</code>
		</div>
	</fieldset>
</template>

<script setup>
	import DonutSegmentSVG from '../../../src/DonutSegmentSVG.class.js';
	import { reactive, ref, toValue } from 'vue';
	
	const rotation = ref(0);
	const offset = ref(0);
	
	
	/**
	 * @type {DonutSegmentSVG}
	 */
	const segment = reactive(new DonutSegmentSVG({
		label: 'Pi Charts',
		value: 5,
		total: 23,
		r0: 2,
		r1: 50,
	}));

</script>

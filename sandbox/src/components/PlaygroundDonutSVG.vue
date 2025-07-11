<template>
<fieldset>
	<h2>Donut testing</h2>

	<div>
		<svg width="300" height="300" viewBox="-75 -75 150 150" style="box-shadow: 0 0 5px black">
			<circle cx="0" cy="0" r="50" stroke="teal" fill="white" />
			<path
				v-for="(segment, i) in donut.getSegments()"
				:d="segment.toSVGPathDefinition({ fromAngle: segment.fromAngle, offsetRadius: toValue(offsetRadius) })"
				:fill="segment.color"
				xmlns="http://www.w3.org/2000/svg"
			/>
			<!-- TODO: need to do a partial sum of the fromAngle, but I don't want to yet -->
		</svg>

		<div style="display: flex; flex-direction: column; gap: 13px;">
			<label for="offsetRadius">
				Radial offset = <input type="range" v-model.number="offsetRadius" min="0" max="50" id="offsetRadius" name="offsetRadius" /> {{ offsetRadius }}
			</label>
		</div>
	</div>
</fieldset>
</template>

<script setup>
	import DonutSegmentSVG from '../../../src/DonutSegmentSVG.class.js';
	import Donut from '../../../src/Donut.class.js';
	import { ref, toValue, reactive } from 'vue';

	const fromAngle = ref(0);
	const offsetRadius = ref(0);

	const donut = new Donut();

	donut.addSegment({
		label: 'Pi Charts',
		value: 5,
		total: 23,
		r0: 2,
		r1: 50,
	});

	donut.addSegment({
		label: 'Blueberry',
		value: 10,
		total: 23,
		r0: 2,
		r1: 50,
	});

	donut.addSegment({
		label: 'Apple',
		value: 8,
		total: 23,
		r0: 2,
		r1: 50,
	});
</script>

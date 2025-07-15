<template>
<fieldset>
	<h2>Donut testing</h2>
hover states = {{ hoverStates }}
	<div>
		<svg width="300" height="300" viewBox="-75 -75 150 150" style="box-shadow: 0 0 5px black">
			<path
				xmlns="http://www.w3.org/2000/svg"
				v-for="segment in donut.getSegments()"
				:d="segment.toSVGPathDefinition({
					fromAngle: segment.fromAngle,
					offsetRadius: toValue(offsetRadius) + (hoverStates[segment.label] ? 3 : 0)
				})"
				:fill="segment.color"
				@mouseover="setHoverState(segment, true)"
				@mouseout="setHoverState(segment, false)"
			/>
		</svg>

		<div style="display: flex; flex-direction: column; gap: 13px;">
			<label for="r0">
				r0 = <input type="range" v-model.number="r0" min="2" max="50" id="r0" name="r0" /> {{ r0 }}
			</label>

			<label for="fromAngle">
				Offset Angle = <input type="range" v-model.number="fromAngle" min="0" max="6.28" step="0.01" id="fromAngle" name="fromAngle" /> {{ fromAngle }}
			</label>

			<label for="offsetRadius">
				Radial offset for all = <input type="range" v-model.number="offsetRadius" min="0" max="50" id="offsetRadius" name="offsetRadius" /> {{ offsetRadius }}
			</label>
		</div>
	</div>
</fieldset>
</template>

<script setup>
	import DonutSegmentSVG from '../../../src/DonutSegmentSVG.class.js';
	import Donut from '../../../src/Donut.class.js';
	import { ref, toValue, reactive, computed } from 'vue';

	const _r0 = ref(10);
	const r0 = computed({
		get() {
			return _r0.value;
		},
		set(v) {
			_r0.value = v;
			donut._data.forEach((datum) => {
				datum.r0 = v;
			});
		}
	});


	const _fromAngle = ref(0);
	const fromAngle = computed({
		get() {
			return toValue(_fromAngle);
		},
		set(v) {
			_fromAngle.value = v;
			donut._data.forEach((datum) => {
				datum.r0 = v;
			});
		}
	});
	const offsetRadius = ref(0);
	const donut = new Donut();

	const hoverStates = ref({});


	const setHoverState = (segment, val) => {
		hoverStates.value[segment.label] = val;
	}

	donut.addSegment({
		label: 'Pi Charts',
		value: 5,
		total: 23,
		r0: 10,
		r1: 50,
	});

	donut.addSegment({
		label: 'Blueberry',
		value: 10,
		total: 23,
		r0: 10,
		r1: 50,
	});

	donut.addSegment({
		label: 'Apple',
		value: 8,
		total: 23,
		r0: 10,
		r1: 50,
	});
</script>

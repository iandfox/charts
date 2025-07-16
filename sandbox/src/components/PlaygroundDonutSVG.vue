<template>
	<fieldset>
		<h2>Donut testing</h2>
	
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
					@x-mouseover="setHoverState(segment, true)"
					@x-mouseout="setHoverState(segment, false)"
					@mousedown="setThing('mousedown')"
					@x-mousemove="setThing('mousemove')"
					@mouseout="setThing('mouseout')"
					@mouseover="setThing('mouseover')"
					@mouseup="setThing('mouseup')"
					@pointerdown="setThing('pointerdown')"
					@pointerover="setThing('pointerover')"
					@pointerenter="setThing('pointerenter')"
					@pointerup="setThing('pointerup')"
					@pointercancel="setThing('pointercancel')"
					@pointerout="setThing('pointerout')"
					@pointerleave="setThing('pointerleave')"
					@click="setThing('click')"
					@dblclick="setThing('dblclick')"
					@contextmenu="setThing('contextmenu')"
					@wheel="setThing('wheel')"
					@touchstart="setThing('touchstart')"
					@touchmove="setThing('touchmove')"
					@touchend="setThing('touchend')"
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
		
		
		
		<div>
			<!-- // TODO 2025-07-15: delete all of this: -->
			Current slug: {{ _currentThing }}
			
			<br>
			slugs:
			<ul>
				<li v-for="t in _things">{{ t }}</li>
			</ul>
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
	
	const _currentThing = ref(''); // TODO 2025-07-15: delete
	const _things = ref([]); // TODO 2025-07-15: delete
	
	const setHoverState = (segment, val) => { // TODO 2025-07-15: delete eventSlug
		hoverStates.value[segment.label] = val;
	}
	
	const setThing = (t) => { // TODO 2025-07-15: delete
		_things.value.unshift(t);
		_currentThing.value = t;
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

import DonutSegmentSVG from "./DonutSegmentSVG.class.js";
import BaseDonutSegment from './BaseDonutSegment.class';

export default class Donut {
	_segments = [];
	
	_defaultSegmentClass = BaseDonutSegment;

	constructor({ data = [], segmentClass = BaseDonutSegment } = {}) {
		this._defaultSegmentClass = segmentClass;
		
		let runningSumOfAngles = 0; // Track initial rotation of each segment
		
		data.forEach((datum) => {
			const segment = this._addSegment(datum, { rotation: runningSumOfAngles, segmentClass });
			runningSumOfAngles += segment.theta;
		});
	}
	
	
	get segments() {
		return this._segments;
	}
	

	_addSegment(segmentData, { rotation = 0, segmentClass = this._defaultSegmentClass } = {}) {
		if (segmentData instanceof segmentClass) {
			segmentData.initialRotation = rotation;
			this._segments.push(segmentData);
			return segmentData;
		} else {
			const segment = new segmentClass({ ...segmentData, ...{ rotation: rotation } });
			this._segments.push(segment);
			return segment;
		}
	}
}

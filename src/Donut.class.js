import DonutSegmentSVG from "./DonutSegmentSVG.class.js";
import BaseDonutSegment from './BaseDonutSegment.class';

export default class Donut {
	_segments = [];

	constructor({ data = [], segmentClass = BaseDonutSegment } = {}) {
		let runningSumOfAngles = 0; // Track initial rotation of each segment
		
		data.forEach((datum) => {
			const segment = this.addSegment(datum, { rotation: runningSumOfAngles, segmentClass });
			runningSumOfAngles += segment.theta;
		});
	}
	
	
	get segments() {
		return this._segments;
	}
	

	addSegment(segmentData, { rotation = 0, segmentClass = BaseDonutSegment } = {}) {
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

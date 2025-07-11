import DonutSegmentSVG from "./DonutSegmentSVG.class.js";

export default class Donut {
	_data = [];

	constructor({ data = [] } = {}) {
		data.forEach((datum) => {
			this.addSegment(datum);
		});
	}

	addSegment(segmentData) {
		// TODO: allow for other, non-SVG, segment types.
		const segment = ((segmentData instanceof DonutSegmentSVG) ? segment : new DonutSegmentSVG(segmentData));
		this._data.push(segment);
	}

	getSegments(initialAngle = 0) {
		let runningSumAngle = initialAngle;
		return this._data.map((segment) => {
			segment.fromAngle = runningSumAngle;
			runningSumAngle += segment.theta;
			return segment;
		});
	}
}

export { Donut }

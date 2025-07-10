
/**
 * p0 -- p1 is the "outer arc"
 * p2 -- p3 is the "inner arc"
 *        ____________
 *       /            \
 *      /              \
 *     p0              p1
 *      |              |
 *      |              |
 *      |  __________  |
 *      | /          \ |
 *      |/            \|
 *      p3            p2
 *
 * p0 := (x0, y0) (similar for p1, p2, p3)
 *
 * r0 := the radius of the inner arc
 * r1 := the radius of the outer arc
 */
export default class DonutSegmentSVG {
	constructor({
		label,
		value,
		total,
		r0, // TODO 2025-07-10: Probably rename this to `innerRadius` for normal people
		r1, // TODO 2025-07-10: Probably rename this to `outerRadius` for normal people
		color = null,
	}) {
		this.label = label;
		this.value = value;
		this.total = total;
		this.r0 = r0;
		this.r1 = r1;
		this.color = color || label.toHexColor(); // see String.prototype.toHexColor, at the end of the file
	}

	/**
	 * @returns {number} The angle, in radians, of the segment / arcs
	 */
	_getAngleForSegment() {
		return (2 * Math.PI) * (this.value / this.total);
	}

	get theta() {
		return this._getAngleForSegment();
	}


	/**
	 * Calculate the positions of the vertices of the donut segment (i.e., the arc). See the comment for this class
	 * definition for which points correspond to which.
	 *
	 * @param {CalculateVerticesOptions}
	 *
	 * @returns {DonutSegmentVertices}
	 */
	calculateVertices({ fromAngle = 0, offsetRadius = 0, center = { x: 0, y: 0 } } = {}) {
		return {
			p0: {
				// The most-ACW (aka counter-clockwise) point of the outer arc
				x: center.x + ((offsetRadius + this.r1) * Math.cos(fromAngle)),
				y: center.y + ((offsetRadius + this.r1) * Math.sin(fromAngle)),
			},
			p1: {
				// The most-CW point of the outer arc
				x: center.x + ((offsetRadius + this.r1) * Math.cos(fromAngle + this.theta)),
				y: center.y + ((offsetRadius + this.r1) * Math.sin(fromAngle + this.theta)),
			},
			p2: {
				// The most-CW point of the inner arc
				x: center.x + ((offsetRadius + this.r0) * Math.cos(fromAngle + this.theta)),
				y: center.y + ((offsetRadius + this.r0) * Math.sin(fromAngle + this.theta)),
			},
			p3: {
				// The most-ACW point of the inner arc
				x: center.x + ((offsetRadius + this.r0) * Math.cos(fromAngle)),
				y: center.y + ((offsetRadius + this.r0) * Math.sin(fromAngle)),
			},
		}


		/*
		// (x0, y0) := the most-CCW (CCW - counter-clockwise aka anti-clockwise) point on the inner arc
		// (x1, y1) := the most-CCW point on the outer arc
		// (x2, y2) := the most-CW point on the outer arc
		// (x3, y3) := the most-CW point on the inner arc

		const x0 = centerX + r0 * Math.cos(startAngle * Math.PI / 180);
		const y0 = centerY + r0 * Math.sin(startAngle * Math.PI / 180);
		const x1 = centerX + r1 * Math.cos(startAngle * Math.PI / 180);
		const y1 = centerY + r1 * Math.sin(startAngle * Math.PI / 180);
		const x2 = centerX + r1 * Math.cos(endAngle * Math.PI / 180);
		const y2 = centerY + r1 * Math.sin(endAngle * Math.PI / 180);
		const x3 = centerX + r0 * Math.cos(endAngle * Math.PI / 180);
		const y3 = centerY + r0 * Math.sin(endAngle * Math.PI / 180); */
	}

	/**
	 *
	 * @param {CalculateVerticesOptions}
	 *
	 * @returns {string} The definition of the path that you should put into the `<path d="">` attribute
	 */
	toSVGPathDefinition({ fromAngle = 0, offsetRadius = 0, center = { x: 0, y: 0 } } = {}) {
		//
	}
}

export { DonutSegmentSVG };




/// Convert strings (i.e., labels) to hex colors consistently:
String.prototype.hexEncode = function() {
	let output = "";
	for (let i = 0; i < this.length; i++) {
		output += (`000${this.charCodeAt(i).toString(16)}`).slice(-4);
	}
	return result;
}
String.prototype.toHexColor = function() {
	return '#' + this.hexEncode().slice(6);
}




///
/// typedefs for JSDoc:
///


/**
 * @typedef Vertex
 * @type {object}
 * @property {number} x
 * @property {number} y
 */

/**
 * @typedef CalculateVerticesOptions
 * @type {object}
 * @property {number} fromAngle The starting angle from which to draw the segment, in radians
 * @property {number} offsetRadius How far from the center point we'll be drawing the SVG. Useful e.g. when animating it away from center
 * @property {Vertex} center The center of the pie chart.
 */


/**
 * @typedef DonutSegmentVertices
 * @type {object}
 * @property {Vertex} p0
 * @property {Vertex} p1
 * @property {Vertex} p2
 * @property {Vertex} p3
 */

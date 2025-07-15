
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

		// Offset by translating in the direction of the middle of the segment
		const angleInTheMiddleOfTheSegment = fromAngle + this.theta / 2;
		const offset = {
			x: offsetRadius * Math.cos(angleInTheMiddleOfTheSegment),
			y: offsetRadius * Math.sin(angleInTheMiddleOfTheSegment)
		};

		return {
			p0: {
				// The most-ACW (aka counter-clockwise) point of the outer arc
				x: center.x + offset.x + (this.r1 * Math.cos(fromAngle)),
				y: center.y + offset.y + (this.r1 * Math.sin(fromAngle)),
			},
			p1: {
				// The most-CW point of the outer arc
				x: center.x + offset.x + (this.r1 * Math.cos(fromAngle + this.theta)),
				y: center.y + offset.y + (this.r1 * Math.sin(fromAngle + this.theta)),
			},
			p2: {
				// The most-CW point of the inner arc
				x: center.x + offset.x + (this.r0 * Math.cos(fromAngle + this.theta)),
				y: center.y + offset.y + (this.r0 * Math.sin(fromAngle + this.theta)),
			},
			p3: {
				// The most-ACW point of the inner arc
				x: center.x + offset.x + (this.r0 * Math.cos(fromAngle)),
				y: center.y + offset.y + (this.r0 * Math.sin(fromAngle)),
			},
		}
	}

	/**
	 * Gets the path string used in the path's [d="..."] attribute. This could be useful for attaching this function
	 * reactively to the path's attr.
	 *
	 * TODO 2025-07-10: should we be defining vertices with relative coordinates/paths? That seems a question with equal answers tbh
	 *
	 * @param {CalculateVerticesOptions}
	 *
	 * @returns {string} The definition of the path that you should put into the `<path d="">` attribute
	 */
	toSVGPathDefinition({ fromAngle = 0, offsetRadius = 0, center = { x: 0, y: 0 } } = {}) { // TODO 2025-07-10: these are awful variable names
		const { p0, p1, p2, p3 } = this.calculateVertices({ fromAngle, offsetRadius, center });

		let output = [];
		output.push(`M ${center.x},${center.y}`); // Move to center (unnecessary, but good to illustrate)
		output.push(`M ${p3.x},${p3.y}`); // Move to 3rd point of arc, which is the innermost anti-clockwise-est point, and therefore the 'closest,' lexicographically speaking, to center. (points on an arc segment are a no-win variable naming situation)
		output.push(`L ${p0.x},${p0.y}`); // Line out to 0th point of arc, which is the outermost anti-clockwise-est pt
		output.push(`A ${this.r1},${this.r1} 0 0 1 ${p1.x},${p1.y}`); // Arc clockwise to p1 (outermost, most clockwise)
		output.push(`L ${p2.x},${p2.y}`); // Line down to p2 (innermost, most clockwise)
		output.push(`A ${this.r0},${this.r0} 0 0 0 ${p3.x},${p3.y}`); // Arc backwards to p3

		return output.join(' '); // NOTE 2025-07-10: Doing this as a big string template or just string concat is preferred. But arrays look (and play) nicer during dev.
	}
}

export { DonutSegmentSVG };




/// Convert strings (i.e., labels) to hex colors consistently. // TODO 2025-07-10: Obviously I don't want to ship something with these sorts of debug-esque functions glomped onto String.prototype. Need to kill these, someday soon.
String.prototype.hexEncode = function() {
	let output = "";
	for (let i = 0; i < this.length; i++) {
		output += (`000${this.charCodeAt(i).toString(16)}`).slice(-4);
	}
	return output;
}
String.prototype.toHexColor = function() {
	return '#' + this.hexEncode().slice(-3) + this.hexEncode().slice(0, 3);
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

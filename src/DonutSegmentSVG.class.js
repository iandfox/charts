import BaseDonutSegment from './BaseDonutSegment.class.js';
import { EuclideanPoint } from './EuclideanPoint.class';


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
export default class DonutSegmentSVG extends BaseDonutSegment {
	
	color = '#000000';
	_isHovering = false;

	constructor({
		label,
		value,
		total,
		r0,
		r1,
		rotation = 0,
		color = null
	}) {
		super({ label, value, total, r0, r1, rotation });
		
		this.color = color || label.toHexColor(); // see String.prototype.toHexColor, at the end of this file, for now
	}
	
	
	get isHovering() {
		return this._isHovering;
	}
	set isHovering(value) {
		this._isHovering = value;
	}
	
	
	/**
	 * Gets the path string used in the path's [d="..."] attribute. This could be useful for attaching this function
	 * reactively to the path's attr.
	 *
	 * @param {CalculateVerticesOptions}
	 *
	 * @returns {string} The definition of the path that you should put into the `<path d="">` attribute
	 */
	toSVGPathDefinition({ rotation = 0, offset = 0 } = {}) {
		const { p0, p1, p2, p3 } = this.calculateVertices({ rotation, offset });

		const center = new EuclideanPoint({ r: 0, angle: 0 });
		
		const largeArcFlag = (this.theta > Math.PI) ? 1 : 0;
		
		let output = [];
		output.push(`M ${center.x},${center.y}`); // Move to center (unnecessary, but good to illustrate)
		output.push(`M ${p0.x},${p0.y}`); // Move to 0th point of arc, which is the innermost anti-clockwise-est point, and therefore the 'closest,' lexicographically speaking, to center. (points on an arc segment are a no-win variable naming situation)
		output.push(`L ${p1.x},${p1.y}`); // Line out to 1st point of arc, which is the outermost anti-clockwise-est pt
		output.push(`A ${this.r1},${this.r1} 0 ${largeArcFlag} 1 ${p2.x},${p2.y}`); // Arc clockwise to p2 (outermost, most clockwise)
		output.push(`L ${p3.x},${p3.y}`); // Line down to p3 (innermost, most clockwise)
		output.push(`A ${this.r0},${this.r0} 0 ${largeArcFlag} 0 ${p0.x},${p0.y}`); // Arc backwards to p0

		return output.join(' '); // NOTE 2025-07-10: Doing this as a big string template or just string concat is preferred. But arrays look (and play) nicer during dev.
	}
}




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




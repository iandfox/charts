
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
 *
 *
 * theta := the arc angle (i.e., the angle of the segment at the center of the pie/donut chart)
 */
export default class BaseDonutSegment {
	label = '';
	value = 0;
	total = 0;
	r0 = 0;
	r1 = 0;
	
	_theta = 0; // TODO 2025-07-18: I was calculating this on-demand, but decided to switch to a cached static property
	
	constructor({
		label,
		value,
		total, // Used to calculate theta
		r0, // TODO 2025-07-10: Probably rename this to `innerRadius` for normal people // 2025-07-18: Some libs call it the hole
		r1 // TODO 2025-07-10: Probably rename this to `outerRadius` for normal people,
	}) {
		this.label = label;
		this.value = value;
		this.total = total;
		this.r0 = r0;
		this.r1 = r1;
		
		this._theta = (2 * Math.PI) * (this.value / this.total); // NOTE 2025-07-18: I was calculating this on-demand for reactivity porpoises, but it's likely not necessary. I'll at least get it behind a getter, in case I want to refactor
	}
	
	get theta() {
		return this._getAngleForSegment();
	}
	
	
	
	
	
	/**
	 * @returns {number} The angle, in radians, of the segment / arcs
	 */
	_getAngleForSegment() {
		return ;
	}
	
	
	
	/**
	 * Calculate the positions of the vertices of the donut segment (i.e., the arc). See the comment for this class
	 * definition for which points correspond to which.
	 *
	 * @param {CalculateVerticesOptions}
	 *
	 * @returns {DonutSegmentVertices}
	 */
	calculateVertices({
		rotation = 0,
		offsetRadius = 0,
		center = { x: 0, y: 0 }
	} = {}) {
		
		// Offset by translating in the direction of the middle of the segment
		const angleInTheMiddleOfTheSegment = rotation + this.theta / 2;
		const offset = {
			x: offsetRadius * Math.cos(angleInTheMiddleOfTheSegment),
			y: offsetRadius * Math.sin(angleInTheMiddleOfTheSegment)
		};
		
		return {
			p0: {
				// The most-ACW (aka counter-clockwise) point of the outer arc
				x: center.x + offset.x + (this.r1 * Math.cos(rotation)),
				y: center.y + offset.y + (this.r1 * Math.sin(rotation)),
			},
			p1: {
				// The most-CW point of the outer arc
				x: center.x + offset.x + (this.r1 * Math.cos(rotation + this.theta)),
				y: center.y + offset.y + (this.r1 * Math.sin(rotation + this.theta)),
			},
			p2: {
				// The most-CW point of the inner arc
				x: center.x + offset.x + (this.r0 * Math.cos(rotation + this.theta)),
				y: center.y + offset.y + (this.r0 * Math.sin(rotation + this.theta)),
			},
			p3: {
				// The most-ACW point of the inner arc
				x: center.x + offset.x + (this.r0 * Math.cos(rotation)),
				y: center.y + offset.y + (this.r0 * Math.sin(rotation)),
			},
		}
	}
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
 * @property {number} offsetRadius How far from the center point we'll be drawing the SVG. Useful e.g., when animating
 *     it away from center
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

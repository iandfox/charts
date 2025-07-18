import { logger } from './utils/logger.js';
import { EuclideanPoint } from './EuclideanPoint.class.js';

/**
 * p1 -- p2 is the "outer arc"
 * p0 -- p3 is the "inner arc" (in a simple donut chart, this is the "hole")
 *        ________________
 *       /                \
 *      /                  \
 *     p1                  p2
 *      |                  |
 *      |                  |
 *      |  ______________  |
 *      | /              \ |
 *      |/                \|
 *      p0                p3
 *
 * r0 := the radius of the inner arc
 * r1 := the radius of the outer arc
 *
 * theta := the arc angle (i.e., the angle of the segment at the center of the pie/donut chart)
 *        = 2 * pi * (value / total) (percentage of 360 degrees)
 *
 * rotation := the initial rotation of the segment -- where it's at within a donut chart.
 */
export default class BaseDonutSegment {
	label = '';
	value = 0;
	total = 0;
	r0 = 0;
	r1 = 0;
	
	_theta = 0;
	
	/**
	 * Initial rotation of the segment, usually based on where it's at in a donut chart. Careful though, because if you
	 * change up the sortOrder in a donut, you'll need to manually recalculate all the initialRotations.
	 * @type {number}
	 * @private
	 */
	_rotation = 0;
	
	constructor({
		label,
		value,
		total, // Used to calculate theta
		r0,
		r1,
		rotation = 0,
	}) {
		this.label = label;
		this.value = value;
		this.total = total;
		this.r0 = r0;
		this.r1 = r1;
		
		this._theta = (2 * Math.PI) * (this.value / this.total); // NOTE 2025-07-18: I was calculating this on-demand for reactivity porpoises, but it's likely not necessary. I'll at least get it behind a getter, in case I want to refactor
		
		this.initialRotation = parseFloat(rotation) || 0;
	}
	
	
	/**
	 * The initial rotation of the segment, usually from where it's placed within a donut.
	 *
	 * @returns {number}
	 */
	get initialRotation() {
		return this._rotation;
	}
	
	
	/**
	 * Alter the initial rotation of the segment
	 *
	 * @param {number} value
	 */
	set initialRotation(value) {
		this._rotation = value;
	}
	
	
	/**
	 * The angle of the segment (i.e., the angle for the arc(s))
	 * @returns {number}
	 */
	get theta() {
		return this._theta;
	}
	
	
	/**
	 * Gets a point within the segment. Values for `at` and `along` are normalized, and should be between 0 and 1.
	 * If a point outside the segment is desired, these boundaries can be ignored. We can also do an initial rotation
	 * (to position the start of the segment within a chart) or an offset - which 'pops out' the segment from the
	 * center
	 *
	 *        ________________
	 *       /                \
	 *      /                  \
	 *     p1=getPoint(0,1)    p2=getPoint(1,1)
	 *      |                  |
	 *      |                  |
	 *      |  ______________  |
	 *      | /              \ |
	 *      |/                \|
	 *     p0=getPoint(0,0)   p3=getPoint(1,0)
	 *
	 * @param {number} at       Normalized angle position within segment. 0 = most-ACW, 1 = most-CW
	 * @param {number} along    Normalized radial distance from inner arc. 0 = inner arc. 1 = outer arc
	 * @param {number} rotation Initial rotation of segment within donut (Optional, default 0)
	 * @param {number} offset   How far away, in non-normalized units, to pop this segment from center (Optional,
	 *     default 0)
	 *
	 * @returns {EuclideanPoint}
	 */
	getPoint(
		at = 0,
		along = 1,
		{
			rotation = 0,
			offset = 0,
		} = {}
	) {
		if (at < 0 || at > 1) {
			// Warn, but do not break, if we are outside our comfort zone. It's conceivable we might want to use this someday
			logger.warn('Accessing a point outside the arc. Expected a value between 0 and 1, but got', at);
		}
		
		if (along < 0 || along > 1) {
			// Similar to `at`, warn if we're outside the segment
			logger.warn('Accessing a point outside the segment. Expected a value between 0 and 1, but got', along);
		}
		
		const angle = this.initialRotation + rotation + (at * this.theta);
		const r = offset + this.r0 + (along * (this.r1 - this.r0));
		
		return new EuclideanPoint({ r, angle });
	}
	
	
	/**
	 * Calculate the vertices of this donut segment
	 *
	 * @param {CalculateVerticesOptions}
	 *
	 * @returns {DonutSegmentVertices}
	 */
	calculateVertices({
		rotation = 0,
		offset = 0,
	} = {}) {
		return {
			p0: this.getPoint(0, 0, { rotation, offset }),
			p1: this.getPoint(0, 1, { rotation, offset }),
			p2: this.getPoint(1, 1, { rotation, offset }),
			p3: this.getPoint(1, 0, { rotation, offset }),
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
 * @property {number} rotation The starting angle from which to draw the segment, in radians
 * @property {number} offset How far from the center point we'll be drawing the SVG. Useful e.g., when animating
 *     it away from center
 */


/**
 * @typedef DonutSegmentVertices
 * @type {object}
 * @property {EuclideanPoint} p0
 * @property {EuclideanPoint} p1
 * @property {EuclideanPoint} p2
 * @property {EuclideanPoint} p3
 */

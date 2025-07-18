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
 */
export default class BaseDonutSegment {
	label = '';
	value = 0;
	total = 0;
	r0 = 0;
	r1 = 0;
	
	_theta = 0;
	
	constructor({
		label,
		value,
		total, // Used to calculate theta
		r0, // TODO 2025-07-10: Probably rename this to `innerRadius` for normal people // NOTE 2025-07-18: Some libraries call it the `hole` .. but if it's not an actual donut, or if we're in a multi-series chart, this makes less sense.
		r1 // TODO 2025-07-10: Probably rename this to `outerRadius` for normal people, but see note, above
	}) {
		this.label = label;
		this.value = value;
		this.total = total;
		this.r0 = r0;
		this.r1 = r1;
		
		this._theta = (2 * Math.PI) * (this.value / this.total); // NOTE 2025-07-18: I was calculating this on-demand for reactivity porpoises, but it's likely not necessary. I'll at least get it behind a getter, in case I want to refactor
	}
	
	get theta() {
		return this._theta;
	}
	
	
	/**
	 * Gets a point (usually) within the segment.
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
	 * @param {number} offset   How far away, in non-normalized units, to pop this segment from center (Optional, default 0)
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
		
		const angle = rotation + (at * this.theta);
		const r = offset + this.r0 + (along * (this.r1 - this.r0));
		
		return new EuclideanPoint({ r, angle });
	}
	
	
	
	
	
	/**
	 * Calculate the vertices of the donut segment
	 *
	 * @param {CalculateVerticesOptions}
	 *
	 * @returns {DonutSegmentVertices}
	 */
	calculateVertices({
		rotation = 0,
		offset = 0,
	} = {}) {
		console.log('hello'); // TODO 2025-07-18: delete
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

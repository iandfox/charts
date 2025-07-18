export class EuclideanPoint {
	constructor({ x = null, y = null, r = null, angle = null }) {
		// Make sure we have either x,y or r,theta
		if (
			(x === null && y === null && (r === null || angle === null))
			|| (r === null && angle === null && (x === null || y === null))
		) {
			throw new Error('Must provide either x,y or r,angle');
		}
		
		if (x !== null && y !== null) {
			this.x = x;
			this.y = y;
			this.r = Math.sqrt(x * x + y * y);
			this.angle = Math.atan2(y, x);
		} else {
			this.r = r;
			this.angle = angle;
			this.x = r * Math.cos(angle);
			this.y = r * Math.sin(angle);
		}
	}
	
	
	/**
	 * Move this point (i.e., change it in-place) by some amount
	 *
	 * @param {number} x
	 * @param {number} y
	 *
	 * @returns {EuclideanPoint} This EuclideanPoint.
	 */
	shift({ x, y }) {
		this.x += x;
		this.y += y;
		return this;
	}
	
	
	/**
	 * Create a new point, translated from this one
	 *
	 * @param {number} x
	 * @param {number} y
	 *
	 * @returns {EuclideanPoint} New translated point
	 */
	translate({ x, y }) {
		return new EuclideanPoint({
			x: this.x + x,
			y: this.y + y,
		});
	}
}

import DonutSVG from './DonutSVG.class.js';

export default class DonutSVGRenderer { // TODO 2025-07-19: this isn't a great name for this class, I should come back to it once it's fleshed out a bit.
	
	/** @type {HTMLElement} */
	$container = null;
	
	/** @type {SVGElement} */
	$svg = null;
	
	/** @type {Donut} */
	donut = null;
	
	/** @type {number} */
	rotation = 0;
	
	/** @type {number} */
	hoverOffset = 2;
	
	/**
	 * Numbers that will get tweened over time
	 *
	 * @type {{hoverOffset: number}}
	 *
	 * @private
	 */
	_tweened = {
		hoverOffset: 0,
	}
	
	
	constructor(containerElement, donut, { rotation = 0, hoverOffset = 2 } = {}) {
		if (! (containerElement instanceof HTMLElement) && ! (containerElement instanceof SVGElement)) {
			throw new Error(`containerElement must be an HTMLElement or SVGElement. Got: ${containerElement}`);
		}
		
		if (! donut instanceof DonutSVG) {
			throw new Error('donut must be an instance of DonutSVG');
		}
		
		this.$container = containerElement;
		this.donut = donut;
		
		this.rotation = rotation;
		this.hoverOffset = hoverOffset;
		this._tweened.hoverOffset = hoverOffset;
		
		this.draw();
	}
	
	
	/**
	 * (Re-)Draws SVG to container. Deletes existing element if applicable
	 */
	draw() {
		if (this.$svg) {
			// Delete existing element
			this.$svg.remove();
		}
		
		this.$svg = this.createSVGElement();
		this.$container.appendChild(this.$svg);
		
		this.donut.segments.forEach((segment) => {
			const $segment = this.createSegmentElement(segment);
			this.$svg.appendChild($segment);
		});
	}
	
	
	/**
	 * Create an SVG element.
	 *
	 * @param {string} tag
	 *
	 * @return {SVGElement}
	 */
	create(tag) {
		return document.createElementNS('http://www.w3.org/2000/svg', tag);
	}
	
	
	/**
	 * Sets a bunch of attributes at once
	 *
	 * @param {SVGElement} $el
	 * @param {object} attrs
	 */
	setAttributes($el, attrs) {
		if (typeof attrs != 'object') {
			throw new Error(`attrs must be an object, instead was ${typeof attrs}`);
		}
		
		// TODO 2025-07-19: Should we kill existing attributes? in case we want to re-set them from scratch
		
		Object.keys(attrs).forEach((key) => {
			$el.setAttribute(key, attrs[key]);
		});
	}
	
	
	createSVGElement() {
		///
		/// NOTE 2025-07-19: For now this isn't flexible/configurable. I want to get it working, first.
		///
		
		
		const $svg = this.create('svg');
		this.setAttributes($svg, {
			width: 500,
			height: 500,
			viewBox: '-75 -75 150 150',
			style: 'box-shadow: 0 0 5px black',
		});
		
		return $svg;
	}
	
	
	/**
	 * @param {DonutSegmentSVG} segment
	 */
	createSegmentElement(segment) {
		const $g = this.create('g');
		const $path = this.create('path');
		$g.appendChild($path);
		
		this.setAttributes($path, {
			d: segment.toSVGPathDefinition({
				rotation: this.rotation,
				offset: this._tweened.hoverOffset,
			}),
			
			fill: segment.color
		});
		
		$path.addEventListener('mouseover', () => {
			segment.isHovering = true;
			// TODO 2025-07-19: tween.
		});
		
		$path.addEventListener('mouseout', () => {
			segment.isHovering = false;
			// TODO 2025-07-19: handle tweening stoppage
		});
		
		$path.setAttribute('d', segment.toSVGPathDefinition({
			rotation: this.rotation,
			offset: this._tweened.hoverOffset,
		}));
		
		return $g;
	}
	
	
	// TODO 2025-07-19: use this for tweening over time.
	updateSegmentPathInPlace($el, segment) {
		$el.setAttribute('d', segment.toSVGPathDefinition({
			rotation: this.rotation,
			offset: this._tweened.hoverOffset,
		}));
	}
}

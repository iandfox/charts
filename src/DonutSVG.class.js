import Donut from './Donut.class';
import DonutSegmentSVG from './DonutSegmentSVG.class';

export default class DonutSVG extends Donut {
	
	_defaultSegmentClass = DonutSegmentSVG;
	
	constructor({data = []}) {
		super({ data, segmentClass: DonutSegmentSVG });
	}
}

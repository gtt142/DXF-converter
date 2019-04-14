/**
 * DxfCoverter class
 */
export default class DxfConverter { 
    constructor() {
        this.convert = this.convert.bind(this);
    }

    /**
     * Write array of curves to dxfFile
     * @param {Array} curves    curves is `[curve = {L: [{Number}], A: [{Number}], R: [{Number}], sp, x, y, z, alpha, layerName}]`,
     *  where `sp` is Start Point
     * @param {Dxf} dxfFile     dxfFile to save
     */
    writeLARsToDxf(curves, dxfFile) {
    }

    /**
     * Write curve to dxfFile
     * @param {Object} curve    curve is `{L: [{Number}], A: [{Number}], R: [{Number}], sp, x, y, z, alpha, layerName}`,
     *  where `sp` is Start Point
     * @param {Dxf} dxfFile     dxfFile to save 
     */
    writeLARtoDxf(curve, dxfFile) {
    }
}
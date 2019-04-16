import Primitive from './primitive';

/**
 * DxfCoverter class
 */
export default class DxfConverter { 
    constructor() {
        this.writeLARsToDxf = this.writeLARsToDxf.bind(this);
        this.writeLARtoDxf = this.writeLARtoDxf.bind(this);
    }

    /**
     * Write array of curves to dxfFile writeLARtoDxf()
     * @throws Will throw error from writeLARtoDxf
     * @param {Array} curves    is array: `[curve = {L: [{Number}], A: [{Number}], R: [{Number}], SP, X, Y, Z, Alpha, layerName}]`,
     *  where `SP` is Start Point
     * @param {Dxf} dxfFile     dxfFile to save
     */
    writeLARsToDxf(curves, dxfFile) {
        for(let curve of curves) {
            try {
                this.writeLARtoDxf(curve, dxfFile);
            } catch (err) {
                throw err;
            }
        }
    }

    /**
     * Write curve to dxfFile
     * @throws {Error} Will throw error if params in curve not valid
     * @param {Object} curve    curve is `{L: [{Number}], A: [{Number}], R: [{Number}], SP, X, Y, Z, Alpha, layerName}`,
     *  where `SP` is Start Point
     * @param {Dxf} dxfFile     dxfFile to save 
     */
    writeLARtoDxf(curve, dxfFile) {
        const primitives = this.convertLARtoPrimitives(curve);
        this.writePrimitivesToDxf(primitives, dxfFile, curve.layerName);
    }

    /**
     * Convert curve presented by LAR vectors to array of `Primitive`
     * @throws {Error} Will throw error if params in curve not valid
     * @param {Object} curve curve is `{L: [{Number}], A: [{Number}], R: [{Number}], SP, X, Y, Z, Alpha, layerName}`,
     *  where `SP` is Start Point
     * @returns {Array<Primitive>} primitives array
     */
    convertLARtoPrimitives(curve) {
        const primitives = [];

        if (curve.L.length != curve.A.length || curve.L.length != curve.R.length) {
            throw new Error('LAR vectors are not the same size');
        }

        const count = curve.L.length;
        if (curve.SP < 0 || curve.SP > count) {
            throw new Error('SP not valid: ' + curve.SP);
        }

        let leftDirection = 180.0;
        let rightDirection = 0.0;

        let midElement = Math.floor(curve.SP);
        if(midElement == count) {
            midElement--;
        }

        let curentLeftX = 0.0;
        let curentLeftY = 0.0;
        let curentRightX = 0.0;
        let curentRightY = 0.0;

        if (curve.R[midElement] == 0) {  // it's LINE
            let leftPart = curve.SP - Math.floor(curve.SP);
            let rightPart = Math.ceil(curve.SP) - curve.SP;
            if (curve.SP == Math.ceil(curve.SP)) {
                rightPart = 1.0;
            }
            curentLeftX = -1 * curve.L[midElement] * leftPart;
            curentRightX = curve.L[midElement] * rightPart;

            let coordinates = {
                x1: curentLeftX,
                y1: 0,
                z1: curve.Z,
                x2: curentRightX,
                y2: 0,
                z2: curve.Z
            };
            primitives[midElement] = new Primitive(coordinates, Primitive.types.LINE);
        } else { //  it's ARC
            let leftAnglePart = curve.SP - Math.floor(curve.SP);
            let rightAnglePart = Math.ceil(curve.SP) - curve.SP;
            let leftAngle = curve.A[midElement] * leftAnglePart;
            let rightAngle = curve.A[midElement] * rightAnglePart;
            if (curve.SP == count) {
                leftAngle = curve.A[midElement];
            } else if(curve.SP == Math.floor(curve.SP)) {
                rightAngle = curve.A[midElement];
            }

            let centerCoordinates;
            if (Math.sign(curve.A[midElement]) > 0) {
                centerCoordinates = this._arcCenterByClockwiseTangent(curentLeftX, curentLeftY, curve.R[midElement], leftDirection);
            } else {
                centerCoordinates = this._arcCenterByCounterClockwiseTangent(curentLeftX, curentLeftY, curve.R[midElement], leftDirection);
            }

            let localCurentLeftX = curentLeftX - centerCoordinates.x;
            let localCurentLeftY = curentLeftY - centerCoordinates.y;
            let newLocalLeftCoords = this._rotateLine(localCurentLeftX, localCurentLeftY, -1 * leftAngle);
            curentLeftX = newLocalLeftCoords.x + centerCoordinates.x;
            curentLeftY = newLocalLeftCoords.y + centerCoordinates.y;

            let localCurentRightX = curentRightX - centerCoordinates.x;
            let localCurentRightY = curentRightY - centerCoordinates.y;
            let newLocalRightCoords = this._rotateLine(localCurentRightX, localCurentRightY, rightAngle);
            curentRightX = newLocalRightCoords.x + centerCoordinates.x;
            curentRightY = newLocalRightCoords.y + centerCoordinates.y;

            let baseAngle;
            if (Math.sign(curve.A[midElement]) > 0) {
                baseAngle = leftDirection + 90;
            } else {
                baseAngle = leftDirection - 90;
            }

            let startAngle;
            let endAngle;
            if (Math.sign(curve.A[midElement]) > 0) {
                startAngle = baseAngle - leftAngle;
                endAngle = baseAngle + rightAngle;
            } else {
                startAngle = baseAngle + rightAngle;
                endAngle = baseAngle - leftAngle;
            }

            leftDirection -= leftAngle;
            rightDirection += rightAngle;

            let coordinates = {
                x: centerCoordinates.x,
                y: centerCoordinates.y,
                z: curve.Z,
                R: curve.R[midElement],
                fi1: startAngle,
                fi2: endAngle
            };
            primitives[midElement] = new Primitive(coordinates, Primitive.types.ARC);
        }

        let curentElement; // index of curent element

        //  left round
        curentElement = midElement - 1;
        while (curentElement >= 0) {
            if (curve.R[curentElement] == 0) {  // it's LINE
                let leftLength = curve.L[curentElement];
                let leftSegment = this._rotateLine(leftLength, 0, leftDirection);

                let newLeftX = leftSegment.x + curentLeftX;
                let newLeftY = leftSegment.y + curentLeftY;

                let coordinates = {
                    x1: newLeftX,
                    y1: newLeftY,
                    z1: curve.Z,
                    x2: curentLeftX,
                    y2: curentLeftY,
                    z2: curve.Z
                };
                curentLeftX = newLeftX;
                curentLeftY = newLeftY;

                primitives[curentElement] = new Primitive(coordinates, Primitive.types.LINE);
            } else { //  it's ARC
                let angle = curve.A[curentElement];
                let centerCoordinates;
                if (Math.sign(angle) > 0) {
                    centerCoordinates = this._arcCenterByClockwiseTangent(curentLeftX, 
                        curentLeftY, curve.R[curentElement], leftDirection);
                } else {
                    centerCoordinates = this._arcCenterByCounterClockwiseTangent(curentLeftX, 
                        curentLeftY, curve.R[curentElement], leftDirection);
                }

                let localCurentLeftX = curentLeftX - centerCoordinates.x;
                let localCurentLeftY = curentLeftY - centerCoordinates.y;
                let newLocalLeftCoords = this._rotateLine(localCurentLeftX, localCurentLeftY, -1 * angle);
                curentLeftX = newLocalLeftCoords.x + centerCoordinates.x;
                curentLeftY = newLocalLeftCoords.y + centerCoordinates.y;

                let baseAngle;
                let startAngle;
                let endAngle;
                if (Math.sign(angle) > 0) {
                    baseAngle = leftDirection + 90;
                    startAngle = baseAngle - angle;
                    endAngle = baseAngle;
                } else {
                    baseAngle = leftDirection - 90;
                    startAngle = baseAngle;
                    endAngle = baseAngle - angle;
                }

                leftDirection -= angle;

                let coordinates = {
                    x: centerCoordinates.x,
                    y: centerCoordinates.y,
                    z: curve.Z,
                    R: curve.R[curentElement],
                    fi1: startAngle,
                    fi2: endAngle
                };
                primitives[curentElement] = new Primitive(coordinates, Primitive.types.ARC);
            }

            curentElement--;
        }

        //  right round
        curentElement = midElement + 1;
        while (curentElement < count) {
            if (curve.R[curentElement] == 0) {  // it's LINE
                let rightLength = curve.L[curentElement];
                let rightSegment = this._rotateLine(rightLength, 0, rightDirection);

                let newRightX = rightSegment.x + curentRightX;
                let newRightY = rightSegment.y + curentRightY;

                let coordinates = {
                    x1: curentRightX,
                    y1: curentRightY,
                    z1: curve.Z,
                    x2: newRightX,
                    y2: newRightY,
                    z2: curve.Z
                };
                curentRightX = newRightX;
                curentRightY = newRightY;

                primitives[curentElement] = new Primitive(coordinates, Primitive.types.LINE);
            } else { //  it's ARC
                let angle = curve.A[curentElement];
                let centerCoordinates;
                if (Math.sign(angle) > 0) {
                    centerCoordinates = this._arcCenterByCounterClockwiseTangent(curentRightX, 
                        curentRightY, curve.R[curentElement], rightDirection);
                } else {
                    centerCoordinates = this._arcCenterByClockwiseTangent(curentRightX, 
                        curentRightY, curve.R[curentElement], rightDirection);
                }

                let localCurentRightX = curentRightX - centerCoordinates.x;
                let localCurentRightY = curentRightY - centerCoordinates.y;
                let newLocalRightCoords = this._rotateLine(localCurentRightX, localCurentRightY, angle);
                curentRightX = newLocalRightCoords.x + centerCoordinates.x;
                curentRightY = newLocalRightCoords.y + centerCoordinates.y;

                let baseAngle;
                let startAngle;
                let endAngle;
                if (Math.sign(angle) > 0) {
                    baseAngle =  rightDirection - 90;
                    startAngle = baseAngle;
                    endAngle = baseAngle + angle;
                } else {
                    baseAngle =  rightDirection + 90;
                    startAngle = baseAngle + angle;
                    endAngle = baseAngle;
                }

                rightDirection += angle;

                let coordinates = {
                    x: centerCoordinates.x,
                    y: centerCoordinates.y,
                    z: curve.Z,
                    R: curve.R[curentElement],
                    fi1: startAngle,
                    fi2: endAngle
                };
                primitives[curentElement] = new Primitive(coordinates, Primitive.types.ARC);
            }

            curentElement++;
        }

        return primitives;
    }

    /**
     * Write array of primitives to dfx file 
     * @param {Array<Primitive>} primitives 
     * @param {Dxf} dxfFile dxf file object to write
     * @param {String} layerName
     */
    writePrimitivesToDxf(primitives, dxfFile, layerName) {
        for (const primitive of primitives) {
            if (primitive) {
                switch (primitive.type.toUpperCase()) {
                    case Primitive.types.LINE:
                        dxfFile.addDxfLine(primitive.x1, primitive.y1, primitive.z1, 
                            primitive.x2, primitive.y2, primitive.z2, layerName);
                        break;
                    case Primitive.types.ARC:
                        if (primitive.fi2 - primitive.fi1 != 0)
                            dxfFile.addDxfArc(primitive.x, primitive.y, primitive.z, 
                                primitive.R, primitive.fi1, primitive.fi2, layerName);
                        break;
                    default:
                        break;
                }
            }
        }
    }

    /**
     * Rotate line (0; 0), (x; y)
     * 
     * @private
     * @param {Number} x `X` coordinate of second point
     * @param {Number} y `Y` coordinate of second point
     * @param {Number} alfa angle in degree
     * @returns {Object} object with new `x` and `y` coordinate
     */
    _rotateLine(x, y, alfa) {
        let alfaInRad = alfa * Math.PI / 180;
        let x_ = x * Math.cos(alfaInRad) - y * Math.sin(alfaInRad);
        let y_ = x * Math.sin(alfaInRad) + y * Math.cos(alfaInRad);
        return {x: x_, y: y_};
    }

    /**
     * @private
     * @returns {Object} coordinates of center of the arc
     */
    _arcCenterByClockwiseTangent(x, y, R, tangentAngle) {
        let centerAngle = tangentAngle - 90;
        
        let localCSCenter = this._rotateLine(R, 0, centerAngle);
        let centerX = localCSCenter.x + x;
        let centerY = localCSCenter.y + y;

        return {x: centerX, y:centerY};
    }

    /**
     * @private
     * @returns {Object} coordinates of center of the arc
     */
    _arcCenterByCounterClockwiseTangent (x, y, R, tangentAngle) {
        let centerAngle = tangentAngle + 90;
        
        let localCSCenter = this._rotateLine(R, 0, centerAngle);
        let centerX = localCSCenter.x + x;
        let centerY = localCSCenter.y + y;

        return {x: centerX, y:centerY};
    }
}
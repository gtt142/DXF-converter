// let L = [24, 0, 48, 0, 24];
// let R = [0, 6, 0, 6, 0];
// let A = [0, 90, 0, 90, 0];
// let irpx = 2.5;
// let irpy = 2.5;
// let irpB = 2.5;
let W = 5;
const _LINE = 'LINE';
const _ARC = 'ARC';
let VPORT_HEIGHT = 200;

/**
 * Primitive class for LINE or ARC
 */
class Primitive {
    constructor(values, type=_LINE) {
        switch (type.toUpperCase()) {
            case _LINE:
                this.type = _LINE
                this.x1 = values.x1;
                this.y1 = values.y1;
                this.z1 = values.z1;
                this.x2 = values.x2;
                this.y2 = values.y2;
                this.z2 = values.z2;
                break;
            case _ARC:
                this.type = _ARC
                this.x = values.x;
                this.y = values.y;
                this.z = values.z;
                this.R = values.R;
                this.fi1 = values.fi1;
                this.fi2 = values.fi2;
                break;
            default:
                console.error('Unexpected primitive type: ' + type);
                break;
        }
    }
}

/**
 * Header strings for DXF file.
 * @type {string[]}
 */
const dxfHeader = [
    '0',
    'SECTION',
    '2',
    'HEADER',
    '9',
    '$ACADVER',
    '1',
    'AC1006',
    '9',
    '$INSUNITS',
    '70',
    '4',
    '9',
    '$AUNITS',
    '70',
    '0',
    '9',
    '$AUPREC',
    '70',
    '2',
    '0',
    'ENDSEC',
    '0',
    'SECTION',
    '2',
    'TABLES',
    '0',
    'TABLE',
    '2',
    'VPORT',
    '70',
    '1',
    '0',
    'VPORT',
    '2',
    '*ACTIVE',
    '70',
    '0',
    '10',
    '0.0',
    '20',
    '0.0',
    '11',
    '1.0',
    '21',
    '1.0',
    '12',
    '0.0',
    '22',
    '0.0',
    '13',
    '0.0',
    '23',
    '0.0',
    '14',
    '10.0',
    '24',
    '10.0',
    '15',
    '5.0',
    '25',
    '5.0',
    '16',
    '0.0',
    '26',
    '0.0',
    '36',
    '1.0',
    '17',
    '0.0',
    '27',
    '0.0',
    '37',
    '0.0',
    '40',
    VPORT_HEIGHT,
    '41',
    '1.0',
    '42',
    '50.0',
    '43',
    '0.0',
    '44',
    '0.0',
    '50',
    '0.0',
    '51',
    '0.0',
    '71',
    '0',
    '72',
    '1000',
    '73',
    '1',
    '74',
    '3',
    '75',
    '0',
    '76',
    '1',
    '77',
    '0',
    '78',
    '0',
    '0',
    'ENDTAB',
    '0',
    'ENDSEC',
    '0',
    'SECTION',
    '2',
    'ENTITIES'
];

/**
 * DxfCoverter class
 */
class DxfConverter { 

    /**
     * Create a converter
     */
    constructor() {
        this.file = '';
        this.prepare = this.prepare.bind(this);
        this.convert = this.convert.bind(this);
        this.writeBody = this.writeBody.bind(this);
        this.finishWriting = this.finishWriting.bind(this);
        this.writeDxfHeader = this.writeDxfHeader.bind(this);
        this.writeDxfEnd = this.writeDxfEnd.bind(this);
        this.writeDxfPoint = this.writeDxfPoint.bind(this);
        this.writeDxfLine = this.writeDxfLine.bind(this);
        this.writeDxfArc = this.writeDxfArc.bind(this);
        this.writeDxfCircle = this.writeDxfCircle.bind(this);
    }

    /**
     * Convert LAR vectors and save polyline in array
     * @param {Number[]} L - vector L 
     * @param {Number[]} A - vector A
     * @param {Number[]} R - vector R
     * @param {Number} irpx - point where x=0
     * @param {Number} irpy - point where y=0
     * @param {Number} irpB - point where cross section is horizontal
     * @param {Number} zCoord - z coordinate of cross section
     */
    convert(L, A, R, irpx, irpy, irpB, zCoord) {
        if (L.length != A.length || L.length != R.length) {
            throw new Error('Vectors are not the same size');
        }
        const count = L.length;

        if (irpx < 0 || irpx > count) {
            throw new Error('IRPX not valid: ' + irpx);
        }
        if (irpy < 0 || irpy > count) {
            throw new Error('IRPY not valid: ' + irpx);
        }
        if (irpB < 0 || irpB > count) {
            throw new Error('IRPB not valid: ' + irpx);
        }

        this.primitives = new Array(count);

        //  направления для левого и правого обхода
        let leftDirection = 180.0;
        let rightDirection = 0.0;

        if (irpB < irpx) {
            let indexStart = Math.floor(irpx);
            if (irpx == count) {
                indexStart--;
            }
            let indexEnd = Math.floor(irpB);
            if (indexStart == indexEnd) {
                if (R[indexStart] > 0) {
                    let anglePart = irpx - irpB;
                    let angle = A[indexStart] * anglePart;
                    leftDirection += angle;
                }
            } else {
                if (R[indexStart] > 0) {
                    let anglePart = irpx - Math.floor(irpx);
                    if (irpx == count) {
                        anglePart = 1.0;
                    }
                    let angle = A[indexStart] * anglePart;
                    leftDirection += angle;
                }
                let index = indexStart - 1;
                while (index != indexEnd) {
                    leftDirection += A[index];
                    index--;
                }
                if (R[indexEnd] > 0) {
                    let anglePart = Math.ceil(irpB) - irpB;
                    if (irpB == Math.ceil(irpB))
                        anglePart = 1.0;
                    let angle = A[indexEnd] * anglePart;
                    leftDirection += angle;
                }
            }
        }
        
        if (irpB > irpx) {
            let indexStart = Math.floor(irpx);
            let indexEnd = Math.floor(irpB);
            if (irpB == count) {
                indexEnd--;
            }
            if (indexStart == indexEnd) {
                if (R[indexStart] > 0) {
                    let anglePart = irpB - irpx;
                    let angle = A[indexStart] * anglePart;
                    leftDirection -= angle;
                }
            } else {
                if (R[indexStart] > 0) {
                    let anglePart = Math.ceil(irpx) - irpx;
                    let angle = A[indexStart] * anglePart;
                    leftDirection -= angle;
                }
                let index = indexStart + 1;
                while (index != indexEnd) {
                    leftDirection -= A[index];
                    index++;
                }
                if (R[indexEnd] > 0) {
                    let anglePart = irpB - Math.floor(irpB);
                    if (irpB == count) {
                        anglePart = 1.0;
                    }
                    let angle = A[indexEnd] * anglePart;
                    leftDirection -= angle;
                }
            }
        }

        // т.к. в точке старта направления прямо противоположны, то можно  просто повернуть напрвление на 180 гр.
        rightDirection = leftDirection - 180;

        leftDirection %= 360;
        rightDirection %= 360;

        let midElement = Math.floor(irpx);
        if(midElement == count) {
            midElement--;
        }

        let curentLeftX = 0.0;
        let curentLeftY = 0.0;
        let curentRightX = 0.0;
        let curentRightY = 0.0;


        if (R[midElement] == 0) {  // it's LINE
            let leftPart = irpx - Math.floor(irpx);
            let rightPart = Math.ceil(irpx) - irpx;
            if (irpx == Math.ceil(irpx)) {
                rightPart = 1.0;
            }
            let leftLength = L[midElement] * leftPart;
            let rightLenght = L[midElement] * rightPart;

            let leftSegment = this.rotateLine(leftLength, 0, leftDirection);
            let rightSegment = this.rotateLine(rightLenght, 0, rightDirection);

            curentLeftX = leftSegment.x;
            curentLeftY = leftSegment.y;
            curentRightX = rightSegment.x;
            curentRightY = rightSegment.y;

            let coordinates = {
                x1: curentLeftX,
                y1: curentLeftY,
                z1: zCoord,
                x2: curentRightX,
                y2: curentRightY,
                z2: zCoord
            }
            this.primitives[midElement] = new Primitive(coordinates, _LINE);
        } else { //  it's ARC
            let leftAnglePart = irpx - Math.floor(irpx);
            let rightAnglePart = Math.ceil(irpx) - irpx;
            let leftAngle = A[midElement] * leftAnglePart;
            let rightAngle = A[midElement] * rightAnglePart;
            if (irpx == count) {
                leftAngle = A[midElement];
            } else if(irpx == Math.floor(irpx)) {
                rightAngle = A[midElement];
            }

            let centerCoordinates = this.arcCenterByClockwiseTangent(curentLeftX, curentLeftY, R[midElement], leftDirection);

            let localCurentLeftX = curentLeftX - centerCoordinates.x;
            let localCurentLeftY = curentLeftY - centerCoordinates.y;
            let newLocalLeftCoords = this.rotateLine(localCurentLeftX, localCurentLeftY, -1 * leftAngle);
            curentLeftX = newLocalLeftCoords.x + centerCoordinates.x;
            curentLeftY = newLocalLeftCoords.y + centerCoordinates.y;

            let localCurentRightX = curentRightX - centerCoordinates.x;
            let localCurentRightY = curentRightY - centerCoordinates.y;
            let newLocalRightCoords = this.rotateLine(localCurentRightX, localCurentRightY, rightAngle);
            curentRightX = newLocalRightCoords.x + centerCoordinates.x;
            curentRightY = newLocalRightCoords.y + centerCoordinates.y;

            let baseAngle = leftDirection + 90;
            let startAngle = baseAngle - leftAngle;
            let endAngle = baseAngle + rightAngle;
            leftDirection -= leftAngle;
            rightDirection += rightAngle;

            let coordinates = {
                x: centerCoordinates.x,
                y: centerCoordinates.y,
                z: zCoord,
                R: R[midElement],
                fi1: startAngle,
                fi2: endAngle
            }
            this.primitives[midElement] = new Primitive(coordinates, _ARC);
        }

        //  left round
        let curentElement = midElement - 1;
        while (curentElement >= 0) {
            if (R[curentElement] == 0) {  // it's LINE
                let leftLength = L[curentElement];
                let leftSegment = this.rotateLine(leftLength, 0, leftDirection);

                let newLeftX = leftSegment.x + curentLeftX;
                let newLeftY = leftSegment.y + curentLeftY;

                let coordinates = {
                    x1: newLeftX,
                    y1: newLeftY,
                    z1: zCoord,
                    x2: curentLeftX,
                    y2: curentLeftY,
                    z2: zCoord
                }
                this.primitives[curentElement] = new Primitive(coordinates, _LINE);
                curentLeftX = newLeftX;
                curentLeftY = newLeftY;
            } else { //  it's ARC
                let leftAngle = A[curentElement];
                let centerCoordinates = this.arcCenterByClockwiseTangent(curentLeftX, curentLeftY, R[curentElement], leftDirection);

                let localCurentLeftX = curentLeftX - centerCoordinates.x;
                let localCurentLeftY = curentLeftY - centerCoordinates.y;
                let newLocalLeftCoords = this.rotateLine(localCurentLeftX, localCurentLeftY, -1 * leftAngle);
                curentLeftX = newLocalLeftCoords.x + centerCoordinates.x;
                curentLeftY = newLocalLeftCoords.y + centerCoordinates.y;

                let baseAngle = leftDirection + 90;
                let startAngle = baseAngle - leftAngle;
                let endAngle = baseAngle;
                leftDirection -= leftAngle;

                let coordinates = {
                    x: centerCoordinates.x,
                    y: centerCoordinates.y,
                    z: zCoord,
                    R: R[curentElement],
                    fi1: startAngle,
                    fi2: endAngle
                }
                this.primitives[curentElement] = new Primitive(coordinates, _ARC);
            }

            curentElement--;
        }

        //  right round
        curentElement = midElement + 1;
        while (curentElement < count) {
            if (R[curentElement] == 0) {  // it's LINE
                let rightLength = L[curentElement];
                let rightSegment = this.rotateLine(rightLength, 0, rightDirection);

                let newRightX = rightSegment.x + curentRightX;
                let newRightY = rightSegment.y + curentRightY;

                let coordinates = {
                    x1: curentRightX,
                    y1: curentRightY,
                    z1: zCoord,
                    x2: newRightX,
                    y2: newRightY,
                    z2: zCoord
                }
                this.primitives[curentElement] = new Primitive(coordinates, _LINE);
                curentRightX = newRightX;
                curentRightY = newRightY;
            } else { //  it's ARC
                let rightAngle = A[curentElement];
                let centerCoordinates = this.arcCenterByCounterClockwiseTangent(curentRightX, curentRightY, R[curentElement], rightDirection);

                let localCurentRightX = curentRightX - centerCoordinates.x;
                let localCurentRightY = curentRightY - centerCoordinates.y;
                let newLocalRightCoords = this.rotateLine(localCurentRightX, localCurentRightY, rightAngle);
                curentRightX = newLocalRightCoords.x + centerCoordinates.x;
                curentRightY = newLocalRightCoords.y + centerCoordinates.y;

                let baseAngle = rightDirection - 90;
                let startAngle = baseAngle;
                let endAngle = baseAngle + rightAngle;
                rightDirection += rightAngle;


                let coordinates = {
                    x: centerCoordinates.x,
                    y: centerCoordinates.y,
                    z: zCoord,
                    R: R[curentElement],
                    fi1: startAngle,
                    fi2: endAngle
                }
                this.primitives[curentElement] = new Primitive(coordinates, _ARC);
            }

            curentElement++;
        }

        this.yCoordinateMoveToIRPY(irpy, count);

        console.log(this.primitives);
    
    }
    
    writeBody(layerName) {
        for (let i = 0; i < this.primitives.length; i++) {
            let el = this.primitives[i];
            if (el != null) {
                switch (el.type.toUpperCase()) {
                    case _LINE:
                        this.writeDxfLine(el.x1, el.y1, el.z1, el.x2, el.y2, el.z2, layerName);
                        break;
                    case _ARC:
                        if (el.fi2 - el.fi1 != 0)
                            this.writeDxfArc(el.x, el.y, el.z, el.R, el.fi1, el.fi2, layerName);
                        break;
                    default:
                        break;
                }
            }
        }
    }

    prepare() {
        this.file = '';
        this.writeDxfHeader();        
    }
    
    finishWriting() {
        this.writeDxfEnd();
        return this.file;
    }

    yCoordinateMoveToIRPY(irpy, count) {
        let elIndex = Math.floor(irpy);
        let part = irpy - Math.floor(irpy);
        let yCoord = 0.0;
        
        if (irpy == count) {
            elIndex--;
            part = 1.0;
        }
        if (this.primitives[elIndex].type == _LINE) {
            yCoord = this.primitives[elIndex].y1 + (this.primitives[elIndex].y2 - this.primitives[elIndex].y1) * part;
        } else if (this.primitives[elIndex].type == _ARC) {
            let newFi = this.primitives[elIndex].fi1 + (this.primitives[elIndex].fi2 - this.primitives[elIndex].fi1) * part;
            let lineInLCS = this.rotateLine(this.primitives[elIndex].R, 0, newFi);
            yCoord = lineInLCS.y + this.primitives[elIndex].y;
        } else {
            return;
        }

        for (let i = 0; i < this.primitives.length; i++) {
            if (this.primitives[i] != null) {
                if (this.primitives[i].type == _LINE) {
                    this.primitives[i].y1 -= yCoord;
                    this.primitives[i].y2 -= yCoord;
                }
                if (this.primitives[i].type == _ARC) {
                    this.primitives[i].y -= yCoord;
                }
            }
        }
    }

    arcCenterByClockwiseTangent(x, y, R, tangentAngle) {
        let centerAngle = tangentAngle - 90;
        
        let localCSCenter = this.rotateLine(R, 0, centerAngle);
        let centerX = localCSCenter.x + x;
        let centerY = localCSCenter.y + y;

        return {x: centerX, y:centerY}
    }

    arcCenterByCounterClockwiseTangent (x, y, R, tangentAngle) {
        let centerAngle = tangentAngle + 90;
        
        let localCSCenter = this.rotateLine(R, 0, centerAngle);
        let centerX = localCSCenter.x + x;
        let centerY = localCSCenter.y + y;

        return {x: centerX, y:centerY}
    }

    /**
     * rotation with Rotation matrix
     */
    rotateLine(x, y, alfa) {
        let alfaInRad = alfa * Math.PI / 180;
        let x_ = x * Math.cos(alfaInRad) - y * Math.sin(alfaInRad);
        let y_ = x * Math.sin(alfaInRad) + y * Math.cos(alfaInRad);

        return {x: x_, y: y_};
    }

    writeDxfHeader() {
        for (let str of dxfHeader) {
            this.file += str + '\n';
        }
    }

    writeDxfEnd() {
        this.file += '0\n';
        this.file += 'ENDSEC\n';
        this.file += '0\n';
        this.file += 'EOF\n';
    }

    writeDxfPoint(x, y, z, layer='DefLayer') {
        if (isNaN(Number(x)) || isNaN(Number(y)) || isNaN(Number(z))) {
            throw new Error("Wrong data format")
        }
        this.file += '0\n';
        this.file += 'POINT\n';
        this.file += '8\n';
        this.file += layer + '\n';
        this.file += '10\n';
        this.file += x + '\n';
        this.file += '20\n';
        this.file += y + '\n';
        this.file += '30\n';
        this.file += z + '\n';
    }

    writeDxfLine(x1, y1, z1, x2, y2, z2, layer='DefLayer') {
        if (isNaN(Number(x1)) || isNaN(Number(y1)) || isNaN(Number(z1)) || isNaN(Number(x2)) || isNaN(Number(y2)) || isNaN(Number(z2))) {
            throw new Error("Wrong data format")
        }
        this.file += '0\n';
        this.file += 'LINE\n';
        this.file += '8\n';
        this.file += layer + '\n';
        this.file += '10\n';
        this.file += x1 + '\n';
        this.file += '20\n';
        this.file += y1 + '\n';
        this.file += '30\n';
        this.file += z1 + '\n';
        this.file += '11\n';
        this.file += x2 + '\n';
        this.file += '21\n';
        this.file += y2 + '\n';
        this.file += '31\n';
        this.file += z2 + '\n';
    }

    writeDxfArc(x, y, z, R, fi_start, fi_end, layer='DefLayer') {
        if (isNaN(Number(x)) || isNaN(Number(y)) || isNaN(Number(z)) || isNaN(Number(R)) || isNaN(Number(fi_start)) || isNaN(Number(fi_end))) {
            throw new Error("Wrong data format")
        }
        this.file += '0\n';
        this.file += 'ARC\n';
        this.file += '8\n';
        this.file += layer + '\n';
        this.file += '10\n';
        this.file += x + '\n';
        this.file += '20\n';
        this.file += y + '\n';
        this.file += '30\n';
        this.file += z + '\n';
        this.file += '40\n';
        this.file += R + '\n';
        this.file += '50\n';
        this.file += fi_start + '\n';
        this.file += '51\n';
        this.file += fi_end + '\n';
    }

    writeDxfCircle(x, y, z, R, layer='DefLayer') {
        if (isNaN(Number(x)) || isNaN(Number(y)) || isNaN(Number(z)) || isNaN(Number(R))) {
            throw new Error("Wrong data format")
        }
        this.file += '0\n';
        this.file += 'CIRCLE\n';
        this.file += '8\n';
        this.file += layer + '\n';
        this.file += '10\n';
        this.file += x + '\n';
        this.file += '20\n';
        this.file += y + '\n';
        this.file += '30\n';
        this.file += z + '\n';
        this.file += '40\n';
        this.file += R + '\n';
    }
}

class FileSaver {
    static saveTextToFile(content, fileName, type = 'data:text/plain;charset=utf-8,') {
        let a = document.createElement('a');
        a.download = fileName;
        a.href = type + content;
        FileSaver.click(a);
    }

    static click(node) {
        try {
            node.dispatchEvent(new MouseEvent('click'));
        } catch (e) {
            var evt = document.createEvent('MouseEvents');
            evt.initMouseEvent('click', true, true, window, 0, 0, 0, 80,
                                20, false, false, false, false, 0, null);
            node.dispatchEvent(evt);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let saveDxfButton = document.getElementById("save_dxf")
    saveDxfButton.addEventListener("click", () => {

        if (allLayers.length == 0) {
            alert("Nothing to save");
            return;
        }

        const conv = new DxfConverter();
        conv.prepare();
        
        let zCoord = 0.0;
        for (let i = 0; i < allLayers.length; i++) {
            let val;
            val = allLayers[i].irpx.value;
            if (isNaN(val)) {
                throw new Error('IRPX is not valid');
            }
            let irpx = val;
            val = allLayers[i].irpy.value;
            if (isNaN(val)) {
                throw new Error('IRPY is not valid');
            }
            let irpy = val;
            val = allLayers[i].irpB.value;
            if (isNaN(val)) {
                throw new Error('IRPB is not valid');
            }
            let irpB = val;
            let L = new Array(5);
            let A = new Array(5);
            let R = new Array(5);

            for (let j = 0; j < 5; j++) {
                val = Number(allLayers[i].columnL.values[j].value);
                if (isNaN(val)) {
                    throw new Error('L is not valid');
                }
                L[j] = val;
                val = Number(allLayers[i].columnA.values[j].value);
                if (isNaN(val)) {
                    throw new Error('A is not valid');
                }
                A[j] = val;
                val = Number(allLayers[i].columnR.values[j].value);
                if (isNaN(val)) {
                    throw new Error('R is not valid');
                }
                R[j] = val;
            }

            conv.convert(L, A, R, irpx, irpy, irpB, zCoord);
            conv.writeBody(allLayers[i].layerName.value);
            zCoord += W;
        }

        let text = conv.finishWriting();
        FileSaver.saveTextToFile(text, 'file.dxf');
    });
});

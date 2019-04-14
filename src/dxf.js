const VPORT_HEIGHT = 200;

/**
 * Dxf file class
 */
export default class Dxf { 

    /**
     * Create a converter
     */
    constructor() {
        this._header;
        this._end;
        this._entities = [];
        this.addDxfPoint = this.addDxfPoint.bind(this);
        this.addDxfLine = this.addDxfLine.bind(this);
        this.addDxfArc = this.addDxfArc.bind(this);
        this.addDxfCircle = this.addDxfCircle.bind(this);
    }

    get body() {
        let result;
        result = this.getDxfHeader();
        result += this._entities.join('');
        result += this.getDxfEnd();
        return result;
    }

    getDxfHeader() {
        let header = '';
        for (let str of dxfHeader) {
            header += str + '\n';
        }
        return header;
    }

    getDxfEnd() {
        let str = '';
        str += '0\n';
        str += 'ENDSEC\n';
        str += '0\n';
        str += 'EOF\n';
        return str;
    }

    addDxfPoint(x, y, z, layer='DefLayer') {
        if (isNaN(Number(x)) || isNaN(Number(y)) || isNaN(Number(z))) {
            throw new Error('Wrong data format');
        }
        let entity = '';
        entity += '0\n';
        entity += 'POINT\n';
        entity += '8\n';
        entity += layer + '\n';
        entity += '10\n';
        entity += x + '\n';
        entity += '20\n';
        entity += y + '\n';
        entity += '30\n';
        entity += z + '\n';
        this._entities.push(entity);
    }

    addDxfLine(x1, y1, z1, x2, y2, z2, layer='DefLayer') {
        if (isNaN(Number(x1)) || isNaN(Number(y1)) || isNaN(Number(z1)) || isNaN(Number(x2)) || isNaN(Number(y2)) || isNaN(Number(z2))) {
            throw new Error('Wrong data format');
        }
        let entity = '';
        entity += '0\n';
        entity += 'LINE\n';
        entity += '8\n';
        entity += layer + '\n';
        entity += '10\n';
        entity += x1 + '\n';
        entity += '20\n';
        entity += y1 + '\n';
        entity += '30\n';
        entity += z1 + '\n';
        entity += '11\n';
        entity += x2 + '\n';
        entity += '21\n';
        entity += y2 + '\n';
        entity += '31\n';
        entity += z2 + '\n';
        this._entities.push(entity);
    }

    addDxfArc(x, y, z, R, fi_start, fi_end, layer='DefLayer') {
        if (isNaN(Number(x)) || isNaN(Number(y)) || isNaN(Number(z)) || isNaN(Number(R)) || isNaN(Number(fi_start)) || isNaN(Number(fi_end))) {
            throw new Error('Wrong data format');
        }
        let entity = '';
        entity += '0\n';
        entity += 'ARC\n';
        entity += '8\n';
        entity += layer + '\n';
        entity += '10\n';
        entity += x + '\n';
        entity += '20\n';
        entity += y + '\n';
        entity += '30\n';
        entity += z + '\n';
        entity += '40\n';
        entity += R + '\n';
        entity += '50\n';
        entity += fi_start + '\n';
        entity += '51\n';
        entity += fi_end + '\n';
        this._entities.push(entity);
    }

    addDxfCircle(x, y, z, R, layer='DefLayer') {
        if (isNaN(Number(x)) || isNaN(Number(y)) || isNaN(Number(z)) || isNaN(Number(R))) {
            throw new Error('Wrong data format');
        }
        let entity = '';
        entity += '0\n';
        entity += 'CIRCLE\n';
        entity += '8\n';
        entity += layer + '\n';
        entity += '10\n';
        entity += x + '\n';
        entity += '20\n';
        entity += y + '\n';
        entity += '30\n';
        entity += z + '\n';
        entity += '40\n';
        entity += R + '\n';
        this._entities.push(entity);
    }

    static getDxfPoint(x, y, z, layer='DefLayer') {
        if (isNaN(Number(x)) || isNaN(Number(y)) || isNaN(Number(z))) {
            throw new Error('Wrong data format');
        }
        let entity = '';
        entity += '0\n';
        entity += 'POINT\n';
        entity += '8\n';
        entity += layer + '\n';
        entity += '10\n';
        entity += x + '\n';
        entity += '20\n';
        entity += y + '\n';
        entity += '30\n';
        entity += z + '\n';
        return entity;
    }

    addDxfEntity(entity) {
        this._entities.push(entity);
    }

    static getDxfLine(x1, y1, z1, x2, y2, z2, layer='DefLayer') {
        if (isNaN(Number(x1)) || isNaN(Number(y1)) || isNaN(Number(z1)) || isNaN(Number(x2)) || isNaN(Number(y2)) || isNaN(Number(z2))) {
            throw new Error('Wrong data format');
        }
        let entity = '';
        entity += '0\n';
        entity += 'LINE\n';
        entity += '8\n';
        entity += layer + '\n';
        entity += '10\n';
        entity += x1 + '\n';
        entity += '20\n';
        entity += y1 + '\n';
        entity += '30\n';
        entity += z1 + '\n';
        entity += '11\n';
        entity += x2 + '\n';
        entity += '21\n';
        entity += y2 + '\n';
        entity += '31\n';
        entity += z2 + '\n';
        return entity;
    }

    static getDxfArc(x, y, z, R, fi_start, fi_end, layer='DefLayer') {
        if (isNaN(Number(x)) || isNaN(Number(y)) || isNaN(Number(z)) || isNaN(Number(R)) || isNaN(Number(fi_start)) || isNaN(Number(fi_end))) {
            throw new Error('Wrong data format');
        }
        let entity = '';
        entity += '0\n';
        entity += 'ARC\n';
        entity += '8\n';
        entity += layer + '\n';
        entity += '10\n';
        entity += x + '\n';
        entity += '20\n';
        entity += y + '\n';
        entity += '30\n';
        entity += z + '\n';
        entity += '40\n';
        entity += R + '\n';
        entity += '50\n';
        entity += fi_start + '\n';
        entity += '51\n';
        entity += fi_end + '\n';
        return entity;
    }

    static getDxfCircle(x, y, z, R, layer='DefLayer') {
        if (isNaN(Number(x)) || isNaN(Number(y)) || isNaN(Number(z)) || isNaN(Number(R))) {
            throw new Error('Wrong data format');
        }
        let entity = '';
        entity += '0\n';
        entity += 'CIRCLE\n';
        entity += '8\n';
        entity += layer + '\n';
        entity += '10\n';
        entity += x + '\n';
        entity += '20\n';
        entity += y + '\n';
        entity += '30\n';
        entity += z + '\n';
        entity += '40\n';
        entity += R + '\n';
        return entity;
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
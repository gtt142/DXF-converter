import Dxf from './dxf';
import FileSaver from './file-saver';
import DxfConverter from './dxf-converter';
// import {allLayers, setListener as addLayerListener} from './input';
import {setListener as addLayerListener} from './input';

// let deltaZ = 5;
const defElementsOfCurveCount = 9;

function saveAllLayers() {
    // const deltaZEl = document.getElementById('deltaZ');
    // if(!isNaN(Number(deltaZEl.value))) {
    //     deltaZ = Number(deltaZEl.value);
    // }

    // if (allLayers.length == 0) {
    //     alert('Nothing to save');
    //     return;
    // }
    
    // const curves = [];
    // let zCoord = 0.0;
    // for (let i = 0; i < allLayers.length; i++) {
    //     let val;
    //     val = Number(allLayers[i].X.value);
    //     if (isNaN(val)) {
    //         throw new Error('IRPX is not valid');
    //     }
    //     let X = val;
    //     val = Number(allLayers[i].Y.value);
    //     if (isNaN(val)) {
    //         throw new Error('IRPY is not valid');
    //     }
    //     let Y= val;
    //     val = Number(allLayers[i].Alpha.value);
    //     if (isNaN(val)) {
    //         throw new Error('IRPB is not valid');
    //     }
    //     let Alpha = val;
    //     val = Number(allLayers[i].SP.value);
    //     if (isNaN(val)) {
    //         throw new Error('IRPB is not valid');
    //     }
    //     let SP = val;
    //     let L = new Array(5);
    //     let A = new Array(5);
    //     let R = new Array(5);

    //     let countInput = document.getElementById('count');
    //     let elementsOfCurveCount = Number(countInput.value);
    //     if (isNaN(elementsOfCurveCount)) {
    //         elementsOfCurveCount = defElementsOfCurveCount;
    //     }

    //     for (let j = 0; j < allLayers[i].columnL.values.length; j++) {
    //         val = Number(allLayers[i].columnL.values[j].value);
    //         if (isNaN(val)) {
    //             throw new Error('L is not valid');
    //         }
    //         L[j] = val;
    //         val = Number(allLayers[i].columnA.values[j].value);
    //         if (isNaN(val)) {
    //             throw new Error('A is not valid');
    //         }
    //         A[j] = val;
    //         val = Number(allLayers[i].columnR.values[j].value);
    //         if (isNaN(val)) {
    //             throw new Error('R is not valid');
    //         }
    //         R[j] = val;
    //     }

    //     const curve = {
    //         L, A, R, SP, X, Y, Z: zCoord, Alpha, layerName: `layer_${i}`
    //     };
    //     curves.push(curve);    
    //     zCoord += deltaZ;
    // }
    // const converter = new DxfConverter();
    // const dxfFile = new Dxf();
    // converter.writeLARsToDxf(curves, dxfFile);
    
    // FileSaver.saveTextToFile(dxfFile.body, 'file.dxf');


    // {x, y, z, R, fi_start, fi_end, type: Types.Arc, id: UUID},
    // {x1, y1, z1, x2, y2, z2, type: Types.Line, id: UUID} 
    const section1 = {
        primitives: [
            {
                id: '123',
                type: 'LINE',
                x1: -65,
                y1: 60,
                z1: 0,
                x2: -43.5279,
                y2: 20.6344,
                z2: 0,
            },
            {
                id: '124',
                type: 'ARC',
                x: -17.191,
                y: 35,
                z: 0,
                R: 30,
                fi_start: 208.61,
                fi_end: 270,
            },
            {
                id: '123',
                type: 'LINE',
                x1: -17.191,
                y1: 5,
                z1: 0,
                x2: 17.191,
                y2: 5,
                z2: 0,
            },
            {
                id: '124',
                type: 'ARC',
                x: 17.191,
                y: 35,
                z: 0,
                R: 30,
                fi_start: 270,
                fi_end: 331.39,
            },
            {
                id: '123',
                type: 'LINE',
                x1: 43.5279,
                y1: 20.6344,
                z1: 0,
                x2: 65,
                y2: 60,
                z2: 0,
            },
            {
                id: '123',
                type: 'LINE',
                x1: 65,
                y1: 60,
                z1: 0,
                x2: 65,
                y2: 100,
                z2: 0,
            },
            {
                id: '123',
                type: 'LINE',
                x1: 65,
                y1: 100,
                z1: 0,
                x2: -65,
                y2: 100,
                z2: 0,
            },
            {
                id: '123',
                type: 'LINE',
                x1: -65,
                y1: 100,
                z1: 0,
                x2: -65,
                y2: 60,
                z2: 0,
            },
            // {
            //     id: '124',
            //     type: 'ARC',
            //     x: 0,
            //     y: 0,
            //     z: 0,
            //     R: 50,
            //     fi_start: 90,
            //     fi_end: 210,
            // }
        ]
    };
    const section2 = {
        primitives: [
            {
                id: '125',
                type: 'LINE',
                x1: -67.2727,
                y1: 45,
                z1: 0,
                x2: -40,
                y2: -5,
                z2: 0,
            },
            {
                id: '123',
                type: 'LINE',
                x1: -40,
                y1: -5,
                z1: 0,
                x2: 40,
                y2: -5,
                z2: 0,
            },
            {
                id: '123',
                type: 'LINE',
                x1: 40,
                y1: -5,
                z1: 0,
                x2: 67.2727,
                y2: 45,
                z2: 0,
            },
            {
                id: '123',
                type: 'LINE',
                x1: 67.2727,
                y1: 45,
                z1: 0,
                x2: 100,
                y2: 45,
                z2: 0,
            },
            {
                id: '123',
                type: 'LINE',
                x1: 100,
                y1: 45,
                z1: 0,
                x2: 100,
                y2: -60,
                z2: 0,
            },
            {
                id: '123',
                type: 'LINE',
                x1: 100,
                y1: -60,
                z1: 0,
                x2: -100,
                y2: -60,
                z2: 0,
            },
            {
                id: '123',
                type: 'LINE',
                x1: -100,
                y1: -60,
                z1: 0,
                x2: -100,
                y2: 45,
                z2: 0,
            },
            {
                id: '123',
                type: 'LINE',
                x1: -100,
                y1: 45,
                z1: 0,
                x2: -67.2727,
                y2: 45,
                z2: 0,
            },
            // {
            //     id: '126',
            //     type: 'ARC',
            //     x: 0,
            //     y: 0,
            //     z: 0,
            //     R: 50,
            //     fi_start: 30,
            //     fi_end: 60,
            // }
        ]
    };
    const sections = [section1, section2];
    const converter = new DxfConverter();
    const dxfFile = new Dxf();
    // converter.writeSectionToDxf(section1, dxfFile, 'layerQWERTY');
    dxfFile.pushLayer({layerName: 'layer_1', layerColor: Dxf.colors.AQUA});
    dxfFile.pushLayer({layerName: 'layer_0', layerColor: Dxf.colors.WHITE, layerStyle: Dxf.lineStyles.LONG_DASHED_DOTTED});
    converter.writeSectionsToDxf(sections, dxfFile);
    FileSaver.saveTextToFile(dxfFile.body, 'prim.dxf');
}

document.addEventListener('DOMContentLoaded', () => {
    addLayerListener(defElementsOfCurveCount);
    const saveDxfButton = document.getElementById('save_dxf');    
    saveDxfButton.addEventListener('click', saveAllLayers);
});
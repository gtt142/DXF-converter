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
    const roller1 = {
        primitives: [
            {
                id: '123',
                type: 'LINE',
                x1: -85.1147,
                y1: 76.1218,
                z1: 0,
                x2: -50.114,
                y2: 15.5,
                z2: 0,
            },
            {
                id: '124',
                type: 'ARC',
                x: -25,
                y: 30,
                z: 0,
                R: 29,
                fi_start: 210,
                fi_end: 270,
            },
            {
                id: '123',
                type: 'LINE',
                x1: -25,
                y1: 1,
                z1: 0,
                x2: 25,
                y2: 1,
                z2: 0,
            },
            {
                id: '124',
                type: 'ARC',
                x: 25,
                y: 30,
                z: 0,
                R: 29,
                fi_start: 270,
                fi_end: 330,
            },
            {
                id: '123',
                type: 'LINE',
                x1: 50.1147,
                y1: 15.5,
                z1: 0,
                x2: 85.1147,
                y2: 76.1218,
                z2: 0,
            },
            {
                id: '123',
                type: 'LINE',
                x1: 85.1147,
                y1: 76.1218,
                z1: 0,
                x2: 85.1147,
                y2: 121,
                z2: 0,
            },
            {
                id: '123',
                type: 'LINE',
                x1: -85.1147,
                y1: 76.1218,
                z1: 0,
                x2: -85.1147,
                y2: 121,
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
            {
                id: 'axis1',
                type: 'LINE',
                x1: 85.1147,
                y1: 121,
                z1: 0,
                x2: -85.1147,
                y2: 121,
                z2: 0,
            },
        ],
        axisId: 'axis1'
    };
    // const axis1 = {
    //     primitives: [

    //     ]
    // };
    const roller2 = {
        primitives: [
            {
                id: '125',
                type: 'LINE',
                x1: -86.8468,
                y1: 75.1218,
                z1: 0,
                x2: -42.8979,
                y2: -1,
                z2: 0,
            },
            {
                id: '123',
                type: 'LINE',
                x1: -42.8979,
                y1: -1,
                z1: 0,
                x2: 42.8979,
                y2: -1,
                z2: 0,
            },
            {
                id: '123',
                type: 'LINE',
                x1: 42.8979,
                y1: -1,
                z1: 0,
                x2: 86.8468,
                y2: 75.1218,
                z2: 0,
            },
            {
                id: '123',
                type: 'LINE',
                x1: 86.8468,
                y1: 75.1218,
                z1: 0,
                x2: 115.8555,
                y2: 75.1218,
                z2: 0,
            },
            {
                id: '123',
                type: 'LINE',
                x1: 115.8555,
                y1: 75.1218,
                z1: 0,
                x2: 115.8555,
                y2: -51,
                z2: 0,
            },
            {
                id: '123',
                type: 'LINE',
                x1: -115.9406,
                y1: -51,
                z1: 0,
                x2: -115.9406,
                y2: 75.1218,
                z2: 0,
            },
            {
                id: '123',
                type: 'LINE',
                x1: -115.9406,
                y1: 75.1218,
                z1: 0,
                x2: -86.8468,
                y2: 75.1218,
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
            {
                id: 'axis2',
                type: 'LINE',
                x1: 115.8555,
                y1: -51,
                z1: 0,
                x2: -115.9406,
                y2: -51,
                z2: 0,
            },
        ],
        axisId: 'axis2'
    };
    // const axis2 = {
    //     primitives: [
    //     ]
    // };
    const neutral = {
        primitives: [
            {
                id: '123',
                type: 'LINE',
                x1: -75.9808,
                y1: 58.3013,
                z1: 0,
                x2: -50.9808,
                y2: 15,
                z2: 0,
            },
            {
                id: '124',
                type: 'ARC',
                x: -25,
                y: 30,
                z: 0,
                R: 30,
                fi_start: 210,
                fi_end: 270,
            },
            {
                id: '123',
                type: 'LINE',
                x1: -25,
                y1: 0,
                z1: 0,
                x2: 25,
                y2: 0,
                z2: 0,
            },
            {
                id: '124',
                type: 'ARC',
                x: 25,
                y: 30,
                z: 0,
                R: 30,
                fi_start: 270,
                fi_end: 330,
            },
            {
                id: '123',
                type: 'LINE',
                x1: 50.9808,
                y1: 15,
                z1: 0,
                x2: 75.9808,
                y2: 58.3013,
                z2: 0,
            },
        ]
    };
    const profile = {
        primitives: [
            {
                id: '123',
                type: 'LINE',
                x1: -75.1147,
                y1: 58.8013,
                z1: 0,
                x2: -50.1147,
                y2: 15.5,
                z2: 0,
            },
            {
                id: '124',
                type: 'ARC',
                x: -25,
                y: 30,
                z: 0,
                R: 29,
                fi_start: 210,
                fi_end: 270,
            },
            {
                id: '123',
                type: 'LINE',
                x1: -25,
                y1: 1,
                z1: 0,
                x2: 25,
                y2: 1,
                z2: 0,
            },
            {
                id: '124',
                type: 'ARC',
                x: 25,
                y: 30,
                z: 0,
                R: 29,
                fi_start: 270,
                fi_end: 330,
            },
            {
                id: '123',
                type: 'LINE',
                x1: 50.1147,
                y1: 15.5,
                z1: 0,
                x2: 75.1147,
                y2: 58.8013,
                z2: 0,
            },
            //////////////////
            {
                id: '123',
                type: 'LINE',
                x1: -76.8468,
                y1: 57.8013,
                z1: 0,
                x2: -51.8468,
                y2: 14.5,
                z2: 0,
            },
            {
                id: '124',
                type: 'ARC',
                x: -25,
                y: 30,
                z: 0,
                R: 31,
                fi_start: 210,
                fi_end: 270,
            },
            {
                id: '123',
                type: 'LINE',
                x1: -25,
                y1: -1,
                z1: 0,
                x2: 25,
                y2: -1,
                z2: 0,
            },
            {
                id: '124',
                type: 'ARC',
                x: 25,
                y: 30,
                z: 0,
                R: 31,
                fi_start: 270,
                fi_end: 330,
            },
            {
                id: '123',
                type: 'LINE',
                x1: 51.8468,
                y1: 14.5,
                z1: 0,
                x2: 76.8468,
                y2: 57.8013,
                z2: 0,
            },

            ////////////
            {
                id: '123',
                type: 'LINE',
                x1: -76.8468,
                y1: 57.8013,
                z1: 0,
                x2: -75.1147,
                y2: 58.8013,
                z2: 0,
            },
            {
                id: '123',
                type: 'LINE',
                x1: 76.8468,
                y1: 57.8013,
                z1: 0,
                x2: 75.1147,
                y2: 58.8013,
                z2: 0,
            },

        ]
    };

    const exchangeData = {
        sections: [
            {
                neutralPolyline: neutral,
                profileSections: profile,
                rollers: [roller1, roller2],
            }
        ]
    };

    // // const sections = [section1, section3, section2, section4];
    // const converter = new DxfConverter();
    // const dxfFile = new Dxf();
    // // converter.writeSectionToDxf(section1, dxfFile, 'layerQWERTY');
    // // dxfFile.addLayer({layerName: 'layer_1', layerColor: Dxf.colors.CYAN});
    // // dxfFile.addLayer({layerName: 'layer_0', layerColor: Dxf.colors.WHITE, lineType: Dxf.lineTypes.LONG_DASHED_DOTTED});
    // // converter.writeSectionsToDxf(sections, dxfFile);
    // dxfFile.addLayer({layerName: 'S1_roller_1', layerColor: Dxf.colors.BLUE});
    // dxfFile.addLayer({layerName: 'S1_roller_axis_1', layerColor: Dxf.colors.CYAN, lineType: Dxf.lineTypes.LONG_DASHED_DOTTED});
    // dxfFile.addLayer({layerName: 'S1_roller_2', layerColor: Dxf.colors.BLUE});
    // dxfFile.addLayer({layerName: 'S1_roller_axis_2', layerColor: Dxf.colors.CYAN, lineType: Dxf.lineTypes.LONG_DASHED_DOTTED});
    // dxfFile.addLayer({layerName: 'S1_neutral_line', layerColor: Dxf.colors.RED, lineType: Dxf.lineTypes.LONG_DASHED_DOTTED});
    // dxfFile.addLayer({layerName: 'S1_equidistants', layerColor: Dxf.colors.YELLOW});

    // converter.writeSectionToDxf(roller1, dxfFile, 'S1_roller_1');
    // converter.writeSectionToDxf(axis1, dxfFile, 'S1_roller_axis_1');
    // converter.writeSectionToDxf(roller2, dxfFile, 'S1_roller_2');
    // converter.writeSectionToDxf(axis2, dxfFile, 'S1_roller_axis_2');
    // converter.writeSectionToDxf(neutral, dxfFile, 'S1_neutral_line');
    // converter.writeSectionToDxf(profile, dxfFile, 'S1_equidistants');

    const converter = new DxfConverter();
    const dxfFile = new Dxf();
    converter.writeSectionsToDxf(exchangeData, dxfFile);
    FileSaver.saveTextToFile(dxfFile.body, 'section.dxf');
}

document.addEventListener('DOMContentLoaded', () => {
    addLayerListener(defElementsOfCurveCount);
    const saveDxfButton = document.getElementById('save_dxf');    
    saveDxfButton.addEventListener('click', saveAllLayers);
});
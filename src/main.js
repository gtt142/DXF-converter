import Dxf from './dxf';
import FileSaver from './file-saver';
import DxfConverter from './dxf-converter';
import {allLayers, setListener as addLayerListener} from './input';

const W = 5; // zDelta
const defElementsOfCurveCount = 9;

document.addEventListener('DOMContentLoaded', () => {
    addLayerListener(defElementsOfCurveCount);
    let saveDxfButton = document.getElementById('save_dxf');
    saveDxfButton.addEventListener('click', () => {

        if (allLayers.length == 0) {
            alert('Nothing to save');
            return;
        }
        
        const curves = [];
        let zCoord = 0.0;
        for (let i = 0; i < allLayers.length; i++) {
            let val;
            val = Number(allLayers[i].X.value);
            if (isNaN(val)) {
                throw new Error('IRPX is not valid');
            }
            let X = val;
            val = Number(allLayers[i].Y.value);
            if (isNaN(val)) {
                throw new Error('IRPY is not valid');
            }
            let Y= val;
            val = Number(allLayers[i].Alpha.value);
            if (isNaN(val)) {
                throw new Error('IRPB is not valid');
            }
            let Alpha = val;
            val = Number(allLayers[i].SP.value);
            if (isNaN(val)) {
                throw new Error('IRPB is not valid');
            }
            let SP = val;
            let L = new Array(5);
            let A = new Array(5);
            let R = new Array(5);

            let countInput = document.getElementById('count');
            let elementsOfCurveCount = Number(countInput.value);
            if (isNaN(elementsOfCurveCount)) {
                elementsOfCurveCount = defElementsOfCurveCount;
            }

            for (let j = 0; j < elementsOfCurveCount; j++) {
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

            const curve = {
                L, A, R, SP, X, Y, Z: zCoord, Alpha, layerName: `layer_${i}`
            };
            curves.push(curve);    
            zCoord += W;
        }
        const converter = new DxfConverter();
        const dxfFile = new Dxf();
        converter.writeLARsToDxf(curves, dxfFile);
        
        FileSaver.saveTextToFile(dxfFile.body, 'file.dxf');
    });
});
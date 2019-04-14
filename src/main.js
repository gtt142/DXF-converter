import Dxf from './dxf';
import FileSaver from './file-saver';
import DxfConverter from './dxf-converter';
import {allLayers, setListener as addLayerListener} from './input';

document.addEventListener('DOMContentLoaded', () => {
    addLayerListener();
    let saveDxfButton = document.getElementById('save_dxf');
    saveDxfButton.addEventListener('click', () => {

        if (allLayers.length == 0) {
            alert('Nothing to save');
            return;
        }
        
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
        
        const converter = new DxfConverter();
        const dxfFile = new Dxf();
        converter.writeLARsToDxf


        let text = conv.finishWriting();
        FileSaver.saveTextToFile(text, 'file.dxf');
    });
});
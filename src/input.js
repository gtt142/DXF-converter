const allLayers = [];

class IdHolder {
    constructor() {
        this._id = 1;
    }

    set id(num) {
        this._id = num;
    }

    get id() {
        let retV = this._id;
        this._id++;
        return retV;
    }
}

const IdManager = new IdHolder();

class LayerFormColumn {
    constructor(name, elementsCount) {
        this.element = document.createElement('div');
        this.element.className = 'layer_column';
        this.header = document.createElement('div');
        this.header.className = 'l_col_name';
        this.header.textContent = name;
        this.element.appendChild(this.header);
        let count = elementsCount;
        this.values = new Array(count);
        for (let i = 0; i < count; i++) {
            this.values[i] = document.createElement('input');
            this.values[i].value = 0;
            this.element.appendChild(this.values[i]);
        }
    }
}

class Layer {
    constructor(elementsCount) {
        this._id = IdManager.id;
        this.element = document.createElement('div');
        this.element.className = 'layer';
        this.columnL = new LayerFormColumn('L', elementsCount);
        this.element.appendChild(this.columnL.element);
        this.columnA = new LayerFormColumn('A', elementsCount);
        this.element.appendChild(this.columnA.element);
        this.columnR = new LayerFormColumn('R', elementsCount);
        this.element.appendChild(this.columnR.element);

        this.irpsCol = document.createElement('div');
        this.irpsCol.className = 'layer_column-sp';

        let header = document.createElement('div');
        header.className = 'l_col_name';
        header.textContent = 'X';
        this.irpsCol.appendChild(header);
        this.X = document.createElement('input');
        this.X.value = 0;
        this.irpsCol.appendChild(this.X);

        header = document.createElement('div');
        header.className = 'l_col_name';
        header.textContent = 'Y';
        this.irpsCol.appendChild(header);
        this.Y = document.createElement('input');
        this.Y.value = 0;
        this.irpsCol.appendChild(this.Y);

        header = document.createElement('div');
        header.className = 'l_col_name';
        header.textContent = 'Alpha';
        this.irpsCol.appendChild(header);
        this.Alpha = document.createElement('input');
        this.Alpha.value = 0;
        this.irpsCol.appendChild(this.Alpha);
        
        header = document.createElement('div');
        header.className = 'l_col_name';
        header.textContent = 'SP';
        this.irpsCol.appendChild(header);
        this.SP = document.createElement('input');
        this.SP.value = elementsCount/2;
        this.irpsCol.appendChild(this.SP);

        header = document.createElement('div');
        header.className = 'l_col_name';
        header.textContent = 'layer';
        this.irpsCol.appendChild(header);
        this.layerName = document.createElement('input');
        this.layerName.className = 'layer_name_input';
        this.layerName.value = 'layer_' + this._id;

        this.irpsCol.appendChild(this.layerName);

        this.element.appendChild(this.irpsCol);
    }
}

function addLayer(elementsCount) {
    let layer = new Layer(elementsCount);
    let containers = document.getElementsByClassName('container');
    let container = containers[0];
    container.appendChild(layer.element);
    allLayers.push(layer);
}

function setListener(elementsCount = 5) {
    // document.addEventListener('DOMContentLoaded', () => {

    let addLayerBtn = document.getElementById('add_layer');
    addLayerBtn.addEventListener('click', () => {
        let countInput = document.getElementById('count');
        elementsCount = Number(countInput.value);
        if (!isNaN(elementsCount) && elementsCount > 0) {
            addLayer(elementsCount);
        } else {
            alert('elemnts count should be number and more than 0');
        }
    });
        
    // });
}

export {setListener, allLayers};

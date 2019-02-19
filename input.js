let allLayers = [];

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
    constructor(name) {
        this.element = document.createElement('div');
        this.element.className = 'layer_column';
        this.header = document.createElement('div');
        this.header.className = 'l_col_name';
        this.header.textContent = name;
        this.element.appendChild(this.header);
        let count = 5;
        this.values = new Array(count);
        for (let i = 0; i < count; i++) {
            this.values[i] = document.createElement('input');
            this.values[i].value = 0;
            this.element.appendChild(this.values[i]);
        }
    }
}

class Layer {
    constructor() {
        this._id = IdManager.id;
        this.element = document.createElement('div');
        this.element.className = 'layer';
        this.columnL = new LayerFormColumn('L');
        this.element.appendChild(this.columnL.element);
        this.columnA = new LayerFormColumn('A');
        this.element.appendChild(this.columnA.element);
        this.columnR = new LayerFormColumn('R');
        this.element.appendChild(this.columnR.element);

        this.irpsCol = document.createElement('div');
        this.irpsCol.className = 'layer_column';
        let header = document.createElement('div');
        header.className = 'l_col_name';
        header.textContent = 'irpx';
        this.irpsCol.appendChild(header);
        this.irpx = document.createElement('input');
        this.irpx.value = 2.5;
        this.irpsCol.appendChild(this.irpx);
        header = document.createElement('div');
        header.className = 'l_col_name';
        header.textContent = 'irpy';
        this.irpsCol.appendChild(header);
        this.irpy = document.createElement('input');
        this.irpy.value = 2.5;
        this.irpsCol.appendChild(this.irpy);
        header = document.createElement('div');
        header.className = 'l_col_name';
        header.textContent = 'irpB';
        this.irpsCol.appendChild(header);
        this.irpB = document.createElement('input');
        this.irpB.value = 2.5;
        this.irpsCol.appendChild(this.irpB);
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

function addLayer() {
    let layer = new Layer();
    let containers = document.getElementsByClassName('container');
    let container = containers[0];
    container.appendChild(layer.element);
    allLayers.push(layer);
}

document.addEventListener('DOMContentLoaded', () => {
    let addLayerBtn = document.getElementById("add_layer")
    addLayerBtn.addEventListener("click", () => {
        addLayer();
    });
    
});
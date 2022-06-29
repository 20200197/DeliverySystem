document.getElementById('profile-file').onchange=function(e){
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload=function(){
        let preview = document.getElementById('preview-profile');
        imagen = document.createElement('img');
        imagen.src = reader.result;
        imagen.width = 200;
        imagen.height = 200;
        preview.append(imagen);
    }
}

document.getElementById('antecedente-file').onchange=function(e){
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload=function(){
        let preview = document.getElementById('preview-antecedente');
        imagen = document.createElement('img');
        imagen.src = reader.result;
        imagen.width = 100;
        imagen.height = 100;
        preview.append(imagen);
    }
}

document.getElementById('solvencia-file').onchange=function(e){
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload=function(){
        let preview = document.getElementById('preview-solvencia');
        imagen = document.createElement('img');
        imagen.src = reader.result;
        imagen.width = 100;
        imagen.height = 100;
        preview.append(imagen);
    }
}



var map = L.map('mapa').setView([13.683767546575941, -88.93569946289064], 8);

var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

Layer = null;

function onMapClick(e) {
    if(Layer == null){
        Layer = L.marker(e.latlng);
        cords = Layer.getLatLng().lat + ', ' + Layer.getLatLng().lng;
    } else {
        Layer.remove();
        Layer = L.marker(e.latlng);
        cords = Layer.getLatLng().lat + ', ' + Layer.getLatLng().lng;
    }

    console.log(cords);
    Layer.addTo(map);
}

map.on('click', onMapClick);


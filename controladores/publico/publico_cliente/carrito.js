function restarCant(id){
    if(document.getElementById('cantidad' + id).value != 1){
        document.getElementById('cantidad' + id).value = Math.floor(document.getElementById('cantidad' + id).value) - 1;
    }
}

function sumarCant(id){
    document.getElementById('cantidad' + id).value = Math.floor(document.getElementById('cantidad' + id).value) + 1;
}
const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_SOLD_COUNT = "Cant.";
const ORDER_BY_COST = "Cost.";
var productos = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;


function mostrarNomb(){
    var nombre = document.getElementById("usuario");
    var userName = JSON.parse(localStorage.user);
    nombre.innerHTML = `Bienvenido <font color="Olive"><strong>${userName.usuario}</strong></font> a e-mercado`;
}

mostrarNomb()


document.addEventListener("DOMContentLoaded", function(e){ 
    getJSONData(PRODUCTS_URL).then(function(resultObj){ /*En esta linea se hace el llamado al JSON de 'productos'*/
        if (resultObj.status === "ok"){ /*Aqui chequea que la respuesta al json haya sido efectiva*/
            ordymostProd(ORDER_ASC_BY_NAME, resultObj.data); /*Por defecto los productos se muestran ordenados en orden ascendente*/
        }
    });

function ordenarProd(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; } //Aqui accedemos a la propiedad nombre del objeto 'a'
            if ( a.name > b.name ){ return 1; }  //para compararlo con el nombre del objeto 'b'
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_SOLD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount); //Aqui accedemos a la propiedad vendidos del objeto 'a'
            let bCount = parseInt(b.soldCount); //para compararlo con el vendidos del objeto 'b'

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_COST){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.cost); //Aqui accedemos a la propiedad precio del objeto 'a'
            let bCount = parseInt(b.cost); //para compararlo con el precio del objeto 'b'

            if ( aCount > bCount ){ return 1; }
            if ( aCount < bCount ){ return -1; }
            return 0;
        });
    }

    return result;
}

function mostrarProductos(){

    let listaProductos = ""; /*Se crea un for que vaya recorriendo el arreglo de 'productos'*/
    for(let i = 0; i < productos.length; i++){
        let product = productos[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.soldCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.soldCount) <= maxCount))){
            
            /*Aqui accedemos a las distintas propiedades que queremos insertar en el html.*/
            listaProductos += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name +`</h4>
                            <small class="text-muted">Quedan: ` + product.soldCount + ` artículos, y el precio unitario es: ` + product.cost + `U$S</small>
                           
                        </div>
                        <p class="mb-1">` + product.description + `</p>
                    </div>
                </div>
            </a>
            `
        }

        document.getElementById("listaproductos").innerHTML = listaProductos;
    }
}

function ordymostProd(sortCriteria, categoriesArray){ /*Esta funcion, combina las dos de arriba, para mostrar la lista de productos ordenados*/
    currentSortCriteria = sortCriteria; 

    if(categoriesArray != undefined){
        productos = categoriesArray;
    }

    productos = ordenarProd(currentSortCriteria, productos);

    //Muestro las categorías ordenadas
    mostrarProductos();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


    document.getElementById("sortAsc").addEventListener("click", function(){
        ordymostProd(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        ordymostProd(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        ordymostProd(ORDER_BY_SOLD_COUNT);
    });

    document.getElementById("sortByCost").addEventListener("click", function(){
        ordymostProd(ORDER_BY_COST);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        mostrarProductos();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
      
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        mostrarProductos();
    });
});

      

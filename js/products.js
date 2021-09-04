const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_SOLD_COUNT = "Cant.";
const ORD_POR_$_ASC = "Cost.";
const ORD_POR_$_DESC = "Cost Desc.";
var productos = [];
var actualCrit = undefined;
var mincost = undefined;
var maxcost = undefined;
var buscar = undefined;


function mostrarNomb(){
    var nombre = document.getElementById("usuariolog");
    var userName = JSON.parse(sessionStorage.user);
    nombre.innerHTML = `Bienvenido <font color="Olive"><strong>${userName.usuario}</strong></font> a e-mercado`;
}

mostrarNomb()


document.addEventListener("DOMContentLoaded", function(e){ 
    getJSONData(PRODUCTS_URL).then(function(resultObj){ /*En esta linea se hace el llamado al JSON de 'productos'*/
        if (resultObj.status === "ok"){ /*Aqui chequea que la respuesta al json haya sido efectiva*/
            ordymostProd(ORDER_ASC_BY_NAME, resultObj.data); /*Por defecto los productos se muestran ordenados en orden ascendente*/
        }
    });

function ordenarProd(criterio, arrprod){
    let result = [];
    if (criterio === ORDER_ASC_BY_NAME)
    {
        result = arrprod.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; } //Aqui accedemos a la propiedad nombre del objeto 'a'
            if ( a.name > b.name ){ return 1; }  //para compararlo con el nombre del objeto 'b'
            return 0;
        });
    }else if (criterio === ORDER_DESC_BY_NAME){
        result = arrprod.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criterio === ORDER_BY_SOLD_COUNT){
        result = arrprod.sort(function(a, b) {
            let aCount = parseInt(a.soldCount); //Aqui accedemos a la propiedad vendidos del objeto 'a'
            let bCount = parseInt(b.soldCount); //para compararlo con el vendidos del objeto 'b'

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }else if (criterio === ORD_POR_$_ASC){
        result = arrprod.sort(function(a, b) {
            let acost = parseInt(a.cost); //Aqui accedemos a la propiedad precio del objeto 'a'
            let bcost = parseInt(b.cost); //para compararlo con el precio del objeto 'b'

            if ( acost > bcost ){ return 1; }
            if ( acost < bcost ){ return -1; }
            return 0;
        });
    }else if (criterio === ORD_POR_$_DESC){
        result = arrprod.sort(function(a, b) {
            let acost = parseInt(a.cost); 
            let bcost = parseInt(b.cost); 

            if ( acost > bcost ){ return -1; }
            if ( bcost < acost ){ return 1; }
            return 0;
        });
    }

    return result;
}

function mostrarProductos(){

    let listaProductos = ""; /*Se crea un for que vaya recorriendo el arreglo de 'productos'*/
    for(let i = 0; i < productos.length; i++){
        let product = productos[i];

        if (((mincost == undefined) || (mincost != undefined && parseInt(product.cost) >= mincost)) &&
            ((maxcost == undefined) || (maxcost != undefined && parseInt(product.cost) <= maxcost))){
                if (buscar == undefined || product.name.toLowerCase().indexOf(buscar) != -1 || /*Desafiate buscador en vivo*/
                product.description.toLowerCase().indexOf(buscar) != -1) {/*Desafiate buscador en vivo*/
            
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
                            <small class="text-muted">Se vendieron: ` + product.soldCount + ` autos de este tipo.</small>
                        </div>
                        <p class="mb-1">` + product.description + `</p>
                        <br>
                        <p class="mb-1">El precio unitario es: ` + product.cost + `U$S</p>
                    </div>
                </div>
            </a>
            `
        }
    }

        document.getElementById("listaproductos").innerHTML = listaProductos;
    }
}

function ordymostProd(nuevoCrit, listaProd){ 
    actualCrit = nuevoCrit; 

    if(listaProd != undefined){
        productos = listaProd;
    }

    productos = ordenarProd(actualCrit, productos);

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
        ordymostProd(ORD_POR_$_ASC);
    });

    document.getElementById("sortByCostDesc").addEventListener("click", function(){
        ordymostProd(ORD_POR_$_DESC);
    });

    

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFiltercostMin").value = "";
        document.getElementById("rangeFiltercostMax").value = "";

        mincost = undefined;
        maxcost = undefined;

        mostrarProductos();
    });

    document.getElementById("rangeFiltercost").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por costo
      
        mincost = document.getElementById("rangeFiltercostMin").value;
        maxcost = document.getElementById("rangeFiltercostMax").value;

        if ((mincost != undefined) && (mincost != "") && (parseInt(mincost)) >= 0){
            mincost = parseInt(mincost);
        }
        else{
            mincost = undefined;
        }

        if ((maxcost != undefined) && (maxcost != "") && (parseInt(maxcost)) >= 0){
            maxcost = parseInt(maxcost);
        }
        else{
            maxcost = undefined;
        }

        mostrarProductos();
    });

    document.getElementById("buscador").addEventListener("input", function (e) {  /*Desafiate buscador en vivo*/
        buscar = document.getElementById("buscador").value.toLowerCase(); /*Desafiate buscador en vivo*/
        mostrarProductos();
    });
    
});



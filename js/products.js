const ORDER_ASC_BY_NAME = "AZ";
var currentSortCriteria = undefined;
var productos = []; 



/*Se cambian nombre de las funciones simplemente para darle un nombre distinto a las de "category"*/

function ordenarProd(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; } //Aqui accedemos a la propiedad nombre del objeto 'a'
            if ( a.name > b.name ){ return 1; }  //para compararlo con el nombre del objeto 'b'
            return 0;
        });
    }
    return result;
}


function mostrarProductos(){

    let listaProductos = "";
    for(let i = 0; i < productos.length; i++){
        let product = productos[i];

        {   /*Aqui cambiamos category-info por product-info para que lea en elnace correspondiente. De igual manera con la imagen, nombre, 
            descripcion y cantidad de vendidos del producto, para que nos muestre lo que corresponde.*/
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

        document.getElementById("listaproductos").innerHTML = listaProductos; /*Insertamos la lista en el div con id 'listaproductos*/ 
    }
}

function ordymostProd(sortCriteria, productsArray){  /*Esta funcion, combina las dos de arriba, para mostrar la lista de productos ordenados*/
    currentSortCriteria = sortCriteria;                     

    if(productsArray != undefined){
        productos = productsArray;
    }

    productos = ordenarProd(currentSortCriteria, productos);

    /*Muestro la lista de productos en orden alfabetico por defecto*/
    mostrarProductos();
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){ /*En esta linea se hace el cambio de "categories", por "products", para que tome la url correspondiente*/
        if (resultObj.status === "ok"){ /*Aqui chequea que la respuesta al json haya sido efectiva*/
            ordymostProd(ORDER_ASC_BY_NAME, resultObj.data); /*Por defecto los productos se muestran ordenados en orden ascendente*/
        }
    });
});
  

      

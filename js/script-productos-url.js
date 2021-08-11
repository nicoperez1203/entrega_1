async function mostrar_info(){ //Crea la función que nos mostrará la información

const url = "https://japdevdep.github.io/ecommerce-api/product/all.json" //Crea una variable con la url de donde nos traerá la información

let info = await fetch(url) //Crea la variable info, donde se guardaran los datos json
let data = await info.json() //Devuelve una promesa que se resuelve con el resultado de analizar la url
let div = document.getElementById("container") //Trae el elemento con id "container" desde el html

let filas = ""; //Crea una variable "filas" vacía

for (let index = 0; index < data.length; index++){ //Recorre la variable data
    filas += `<tr>
    <td>${data[index].name}</td>
    <td>${data[index].cost}</td>
    <td>${data[index].description}</td>
    </tr>`
}

let contenido = `<table> 
<tr>
<th>Nombre</th>
<th>Precio</th>
<th>Descripcion</th>
</tr>
${filas}
</table>` // Va insertando el contenido en una tabla

div.innerHTML = contenido; //Inserta la tabla en el div

};

mostrar_info() //Llamado a la función
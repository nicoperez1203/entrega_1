function guardarNomb(){
    var inputUser = document.getElementById("usuario");
    sessionStorage.setItem("user", JSON.stringify({usuario: inputUser.value})); //A la key "user" le damos el valor ingresado en el elemento usuario
}

function redireccion(){
    
    let user2 = document.getElementById("usuario").value; //Se crean dos variables para almacenar nombre de usuario y contraseña
    let pass2 = document.getElementById("pass").value;
    
    if (user2 != "" && pass2 != "" ){  //Chequeamos que se haya ingresado algo y re-dirigimos
            guardarNomb()       
            window.location = "home.html";
        }else{                        //Si no se ingreso algun valor, nos salta una alerta
            alert("Los campos usuario y/o contraseña, no pueden estar vacíos.")
            document.getElementById("usuario").focus();
            }
    }



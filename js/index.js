function guardarNomb(){
    var inputUser = document.getElementById("usuario");
    sessionStorage.setItem("user", JSON.stringify({usuario: inputUser.value}));
}



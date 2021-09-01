function guardarNomb(){
    var inputUser = document.getElementById("email");
    localStorage.setItem("user", JSON.stringify({usuario: inputUser.value}));
}


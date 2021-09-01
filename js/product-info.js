function mostrarNomb(){
    var nombre = document.getElementById("usuario");
    var userName = JSON.parse(localStorage.user);
    nombre.innerHTML = `Bienvenido <font color="Olive"><strong>${userName.usuario}</strong></font> a e-mercado`;
}

mostrarNomb()
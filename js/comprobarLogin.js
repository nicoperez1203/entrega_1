function checkLogin() {
    if (sessionStorage.getItem("user") === null) { //Comprobamos si la key "user" esta vacía, y re-dirigimos al index
        window.location = "index.html"; 
    }
}
checkLogin()


function checkLogin() {
    if (sessionStorage.getItem("user") === null) {
        window.location = "index.html"; 
    }
}
checkLogin()


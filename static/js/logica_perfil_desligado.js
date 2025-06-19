if(localStorage.getItem("user_logado") == null){
    let perfil = document.querySelector("#btnPerfil")
    perfil.pathname = "./login.html"
}
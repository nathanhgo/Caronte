let login = document.querySelector("#login")

login.addEventListener('click', ()=>{
    let nome = document.querySelector("#nome")
    let senha = document.querySelector("#senha")

    let usuario = {
        nome: nome.value,
        senha: senha.value,
        flashcards: []
    }

    for (let i = 0; i < localStorage.length; i++) {
        // Pra conseguir realizar o login, é preciso pegar o usuário, criar uma versão temporária dele,
        // e deixar a chave "flashcards" do JSON da versão temporária com o valor padrão original (um array vazio),
        usuario_temp = JSON.parse(localStorage.getItem(localStorage.key(i)))
        usuario_temp.flashcards = []

        if(JSON.stringify(usuario_temp) == JSON.stringify(usuario)){
            usuario_de_vdd = localStorage.getItem(localStorage.key(i))
            usuario.flashcards = JSON.parse(localStorage.getItem(localStorage.key(i))).flashcards
            localStorage.setItem("user_logado", JSON.stringify(usuario));
            window.location.href = '../perfil.html';
        }
        else{
            let aviso = document.querySelector("#aviso")
            aviso.innerHTML = `
            <div class="alert alert-danger" role="alert">
            Esse usuário não existe!
            </div>`
        }
    }
})
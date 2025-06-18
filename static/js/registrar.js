let cadastrar = document.querySelector("#cadastrar")

cadastrar.addEventListener('click', ()=>{
    let nome = document.querySelector("#nome")
    let senha = document.querySelector("#senha")

    let usuario = {
        nome: nome.value,
        senha: senha.value,
        flashcards: []
    }
    
    // Verificando se existe um usuário com mesmo nome
    for (let i = 0; i < localStorage.length; i++) {
        if(JSON.parse(localStorage.getItem(localStorage.key(i))).nome == usuario.nome){
            alert("Já existe um usuário com esse mesmo nome!")
            window.location.reload(true)
        }
    }

    localStorage.setItem(`user_id${localStorage.length}`, JSON.stringify(usuario));
    window.location.href = '../login.html';
})
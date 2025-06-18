function mostrarNome() {
    let nome = document.querySelector("#nome")
    nome.innerHTML += JSON.parse(localStorage["user_logado"]).nome
}
mostrarNome()

let btnEditarNome = document.querySelector("#btnEditarNome")

btnEditarNome.addEventListener('click', ()=>{
    let nomeNovo = document.querySelector("#nomeNovo")

    if(JSON.parse(localStorage["user_logado"]).nome == nomeNovo.value)
        {alert("Esse já é seu nome!")}
    else{
        for (let i = 0; i < localStorage.length; i++) {
            if(JSON.parse(localStorage["user_logado"]).nome == JSON.parse(localStorage[`user_id${i}`]).nome){
                let usuario_novonome = {
                    nome: nomeNovo.value,
                    senha: JSON.parse(localStorage.getItem("user_logado")).senha,
                    flashcards: JSON.parse(localStorage.getItem("user_logado")).flashcards
                }

                localStorage.setItem("user_logado", JSON.stringify(usuario_novonome))
                localStorage.setItem(`user_id${i}`, JSON.stringify(usuario_novonome))

                let nome = document.querySelector("#nome")
                nome.innerHTML = `<h1></h1>`
                mostrarNome()
            }
        }
    }
    }
)
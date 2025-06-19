// const { use } = require("react")

function mostrarNome(nome_usuario) {
    let nome = document.querySelector("#nome")
    nome.innerHTML = `<h1 id="nome">Nome:${nome_usuario}</h1>`
}
mostrarNome(JSON.parse(localStorage["user_logado"]).nome)

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

                mostrarNome(JSON.parse(localStorage["user_logado"]).nome)
            }
        }
    }
    })

let btnExcluir = document.querySelector("#btnExcluir")
btnExcluir.addEventListener('click', ()=>{
    for (let i = 0; i < localStorage.length; i++) {
            if(JSON.parse(localStorage["user_logado"]).nome == JSON.parse(localStorage[`user_id${i}`]).nome){

                localStorage.removeItem("user_logado")
                localStorage.removeItem(`user_id${i}`)

                window.location.href = '../index.html'
            }
        }
})

// const novosFlashcards = [
//     { pergunta: "Qual a capital do Brasil?", resposta: "Brasília", categoria: "GEOGRAFIA" },
//     { pergunta: "Qual a fórmula da água?", resposta: "H2O", categoria: "CIÊNCIAS" },
//     { pergunta: "Quem descobriu o Brasil?", resposta: "Pedro Álvares Cabral", categoria: "HISTÓRIA" },
//     { pergunta: "Leru liru", resposta: "liru leru", categoria: "HISTÓRIA" }
// ];

// const userLogado = JSON.parse(localStorage.getItem('user_logado'));
// userLogado.flashcards = novosFlashcards;
// const usuarioAtualizadoString = JSON.stringify(userLogado);
// localStorage.setItem('user_logado', usuarioAtualizadoString);

const mostrarStacks = () => {
    let flashcardList = document.querySelector('.flashcardList')
    let flashcards = JSON.parse(localStorage.getItem('user_logado')).flashcards
    let listaCategorias = []

    flashcardList.innerHTML = ''

    for (const fc of flashcards) {
        if (listaCategorias.indexOf(fc.categoria) == -1) {
            listaCategorias.push(fc.categoria)
        }
    }

    if (listaCategorias.length > 0) {
           for (const ct of listaCategorias) {
            flashcardList.innerHTML += `
                <li class="flashcardStack">${ct}
                <button class="btn btn-primary btnAbrir">Abrir pilha</button>
                <button class="btn btn-danger btnExcluir" onclick="excluirStack('${ct}')">Exluir pilha</button>
                </li>
            `
        } 
    } else {
        flashcardList.innerHTML = `
        <div class="alert alert-danger" role="alert">
        Você não tem nenhuma pilha de flashcard!
        </div>`
    }


}

mostrarStacks()

const excluirStack = (stack) => {
    const userLogado = JSON.parse(localStorage.getItem('user_logado'));
    let old_flashcards = userLogado.flashcards
    let new_flashcards = []

    for (const fc of old_flashcards) {
        if (fc.categoria != stack) {
            new_flashcards.push(fc)
        }
    }
    
    userLogado.flashcards = new_flashcards
    const userLogadoString = JSON.stringify(userLogado);
    localStorage.setItem('user_logado', userLogadoString)

    mostrarStacks()
}


const selectCategory = document.querySelector('.selectCategory')
const corpoModalCriar = document.querySelector('#corpoModalCriar')

let flashcards = JSON.parse(localStorage.getItem('user_logado')).flashcards
let listaCategorias = []

for (const fc of flashcards) {
    if (listaCategorias.indexOf(fc.categoria) == -1) {
        listaCategorias.push(fc.categoria)
    }
}

for (const ct of listaCategorias) {
    selectCategory.innerHTML += `<option value="${ct}">${ct}</option>`
}

const btnCriarFlashcard = document.querySelector('#btnCriar')

btnCriarFlashcard.addEventListener('click', () => {
    const frenteFlashcard = document.querySelector('#frenteFlashcard')
    const fundoFlashcard  = document.querySelector('#fundoFlashcard')
    const selectCategory = document.querySelector('#selectCategory')

    if (frenteFlashcard.value == '' || fundoFlashcard.value == '') {
        corpoModalCriar.innerHTML += `
            <div class="alert alert-danger" role="alert">
                Um ou mais campos estão vazios!
            </div>
        `
    } else {
        const userLogado = JSON.parse(localStorage.getItem('user_logado'));
        userLogado.flashcards.push({
            pergunta: `${frenteFlashcard.value}`,
            resposta: `${fundoFlashcard.value}`,
            categoria: `${String(selectCategory.value).toUpperCase()}`
        })

        const usuarioAtualizadoString = JSON.stringify(userLogado);
        localStorage.setItem('user_logado', usuarioAtualizadoString);
    }
})
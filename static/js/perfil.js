// const { use } = require("react")
if(localStorage.getItem("user_logado") == null){
    window.location.href = './login.html'
}

function mostrarNome(nome_usuario) {
    let nome = document.querySelector("#nome")
    nome.innerHTML = `<h1 id="nome">@${nome_usuario}</h1>`
}
mostrarNome(JSON.parse(localStorage["user_logado"]).nome)

let btnEditarNome = document.querySelector("#btnEditarNome")
btnEditarNome.addEventListener('click', ()=>{
    let nomeNovo = document.querySelector("#nomeNovo")

    if(JSON.parse(localStorage["user_logado"]).nome == nomeNovo.value)
        {alert("Esse já é seu nome!")}
    else{
        atualizarDados()
    }

})

const atualizarDados = () => {
    let nomeNovo = document.querySelector("#nomeNovo")
    let novoNomeUser = nomeNovo.value
    if (nomeNovo.value == '') {
        novoNomeUser = JSON.parse(localStorage["user_logado"]).nome
    }
    
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.getItem(`user_id${i}`)) {
            if(JSON.parse(localStorage["user_logado"]).nome == JSON.parse(localStorage[`user_id${i}`]).nome){
                let usuario_novonome = {
                    nome: novoNomeUser,
                    senha: JSON.parse(localStorage.getItem("user_logado")).senha,
                    flashcards: JSON.parse(localStorage.getItem("user_logado")).flashcards
                }

                localStorage.setItem("user_logado", JSON.stringify(usuario_novonome))
                localStorage.setItem(`user_id${i}`, JSON.stringify(usuario_novonome))

                mostrarNome(JSON.parse(localStorage["user_logado"]).nome)
            }
        }
    }
}


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

let btnDeslogar = document.querySelector("#btnDeslogar")
btnDeslogar.addEventListener('click', ()=>{
    localStorage.removeItem("user_logado")
    window.location.href = './index.html'
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
    let numFlashcard = {}

    flashcardList.innerHTML = ''

    for (const fc of flashcards) {
        if (listaCategorias.indexOf(fc.categoria) == -1) {
            listaCategorias.push(fc.categoria)
            numFlashcard[`${fc.categoria}`] = 1
        } else {
            numFlashcard[`${fc.categoria}`] += 1
        }
    }

    if (listaCategorias.length > 0) {
           for (const ct of listaCategorias) {
            flashcardList.innerHTML += `
                <li class="flashcardStack">
                <div>${ct.toLowerCase()} <strong>(${numFlashcard[ct]} flashcard)</strong></div>
                <div>
                    <button class="btn btn-primary btnAbrir" onclick="abrirStack('${ct}', 0)" data-bs-toggle="modal" data-bs-target="#modalVerFlashcard">Abrir pilha</button>
                    <button class="btn btn-danger btnExcluir" onclick="excluirStack('${ct}')">Excluir pilha</button>
                </div>
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
    atualizarDados()
}

const atualizarModalCriar = () => {
    const selectCategory = document.querySelector('.selectCategory')
    const corpoModalCriar = document.querySelector('#corpoModalCriar')

    let flashcards = JSON.parse(localStorage.getItem('user_logado')).flashcards
    let listaCategorias = []

    selectCategory.innerHTML = ''

    for (const fc of flashcards) {
        if (listaCategorias.indexOf(fc.categoria) == -1) {
            listaCategorias.push(fc.categoria)
        }
    }

    for (const ct of listaCategorias) {
        selectCategory.innerHTML += `<option value="${ct}">${ct.toLowerCase()}</option>`
    }

    selectCategory.innerHTML += `<option id='optNovapilha' value="novaPilha">Nova Pilha</option>`
}

const criarDivCriarCategoria = () => {
    const divCriarPilha = document.querySelector('#divCriarPilha')
    const criarCategoria = document.querySelector('#criarCategoria')
    const inputGroupCriarPilha = document.querySelector('#inputGroupCriarPilha')

    try {
        divCriarPilha.removeChild(inputGroupCriarPilha)
        criarCategoria.value = '0'
    } catch(error) {
        //
    }

    if (selectCategory.value === 'novaPilha' || JSON.parse(localStorage.getItem('user_logado')).flashcards.length == 0) {
        
        criarCategoria.value = '1'

        divCriarPilha.innerHTML += `
            <div class="input-group mb-3" id="inputGroupCriarPilha">
                    <span class="input-group-text" id="basic-addon1">📃</span>
                    <input type="textarea" id="novaCategoria" class="form-control" placeholder="Nome da Pilha" aria-label="frenteFlashcard" aria-describedby="basic-addon1" required>
            </div>
        `
    } else {
        divCriarPilha.removeChild(inputGroupCriarPilha)

        criarCategoria.value = '0'
    }
}


const btnCriar = document.querySelector('#btnCriar')
btnCriar.addEventListener('click', () => {
    const frenteFlashcard = document.querySelector('#frenteFlashcard')
    const fundoFlashcard  = document.querySelector('#fundoFlashcard')
    const selectCategory = document.querySelector('#selectCategory')
    const criarCategoria = document.querySelector('#criarCategoria')

    if (frenteFlashcard.value == '' || fundoFlashcard.value == '') {
        corpoModalCriar.innerHTML += `
            <div class="alert alert-danger" role="alert">
                Um ou mais campos estão vazios!
            </div>
        `
    } else {
        let cat = ''
        if (criarCategoria.value == '1') {
            const novaCategoria = document.querySelector('#novaCategoria')
            cat = novaCategoria.value

        } else {
            cat = selectCategory.value
        }


        const userLogado = JSON.parse(localStorage.getItem('user_logado'));
        userLogado.flashcards.push({
            pergunta: `${frenteFlashcard.value}`,
            resposta: `${fundoFlashcard.value}`,
            categoria: `${String(cat).toUpperCase()}`
        })

        const usuarioAtualizadoString = JSON.stringify(userLogado);
        localStorage.setItem('user_logado', usuarioAtualizadoString);

        try{
            const inputGroupCriarPilha = document.querySelector('#inputGroupCriarPilha')
            const divCriarPilha = document.querySelector('#divCriarPilha')
            const criarCategoria = document.querySelector('#criarCategoria')

            divCriarPilha.removeChild(inputGroupCriarPilha)
            criarCategoria.value = '0'
        } catch(error) {
            //
        }

    }

    frenteFlashcard.value = ''
    fundoFlashcard.value = ''
    
    atualizarModalCriar()
    mostrarStacks()
    atualizarDados()
})


btnCriarFlashcard = document.querySelector("#btnCriarFlashcard")

btnCriarFlashcard.addEventListener('click', () => {
    atualizarModalCriar()

    if (JSON.parse(localStorage.getItem('user_logado')).flashcards.length == 0) {

        criarDivCriarCategoria()
    }
})


const abrirStack = (stack, count) => {
    const userLogado = JSON.parse(localStorage.getItem('user_logado'));
    const todosFlashcards = userLogado.flashcards
    const flashcardsStack = []

    for (const fc of todosFlashcards) {
        if (fc.categoria == stack) {
            flashcardsStack.push(fc)
        }
    }

    if (flashcardsStack[count] == undefined){
        count = 0
    }

    document.querySelector('#modalVerLabel').innerText = `${stack.toLowerCase()}`

    const corpoModalVer = document.querySelector('#corpoModalVer')
    corpoModalVer.innerHTML = `
        <h3>Frente do cartão</h3>
        <p>${flashcardsStack[count].pergunta}</p>
        <div>
            <button type="button" onclick="modalEditarFlashcard(${count}, '${flashcardsStack[count].categoria}')" id="btnEditarlashcard" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modalEditarFlashcard">
                Editar Flashcard
            </button>
            <button class="btn btn-primary" onclick="mostrarResposta('${flashcardsStack[count].resposta}', ${count}, '${stack}')">Ver Resposta</button>
        </div>
    `
}


const mostrarResposta = (resposta, count, stack) => {
    count += 1
    corpoModalVer.innerHTML = `
        <h3>Frente do cartão</h3>
        <p>${resposta}</p>
        <div>
            <button type="button" onclick="modalEditarFlashcard(${count-1}, '${stack}')" id="btnEditarlashcard" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modalEditarFlashcard">
                Editar Flashcard
            </button>
            <button class="btn btn-primary" onclick="abrirStack('${stack}', ${count})">Próximo</button>
        </div>
    `
}

const modalEditarFlashcard = (count, stack) => {
    const userLogado = JSON.parse(localStorage.getItem('user_logado'));
    const todosFlashcards = userLogado.flashcards

    const flashcardsStack = []

    for (const fc of todosFlashcards) {
        if (fc.categoria == stack) {
            flashcardsStack.push(fc)
        }
    }

    const novaFrenteFC = document.querySelector('#novaFrenteFC')
    const novoFundoFC = document.querySelector('#novoFundoFC')

    novaFrenteFC.value = flashcardsStack[count].pergunta
    novoFundoFC.value = flashcardsStack[count].resposta

    const perguntaAntiga = flashcardsStack[count].pergunta
    const respostaAntiga = flashcardsStack[count].resposta

    const btnEditar = document.querySelector('#btnEditar')
    btnEditar.addEventListener('click', () => {
        for (fc of userLogado.flashcards) {
            if (fc.pergunta == perguntaAntiga && fc.resposta == respostaAntiga && fc.categoria == stack) {
                fc.pergunta = novaFrenteFC.value
                fc.resposta = novoFundoFC.value
            }
        }

        localStorage.setItem("user_logado", JSON.stringify(userLogado))
        atualizarDados()

        novoFundoFC.value = ''
        novaFrenteFC.value = ''
    })

}

mostrarStacks()

selectCategory.addEventListener('change', () => {
    criarDivCriarCategoria()
})
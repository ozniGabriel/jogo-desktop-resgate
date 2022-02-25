function inicio() {
    // PRINCIPAIS VARIAVEIS
    let alturaJogador = 179
    let velocidadeAmigo = 10
    let velocidadeInimigo1 = 648
    let velocidadeInimigo2 = 750
    let alturaAleatoriaInimigo
    let velocidadeProjetil = 180
    let permitirDisparo = true
    let inimigosAbatidos = 0
    let amigosSalvos = 0
    let batidas = 0
    let amigosCapturados = 0
    let recomecar = false

    // OCULTANDO A TELA DE INICIO
    document.querySelector('#inicio').style.display = 'none'
    //EXIBINDO A PONTUACAO
    document.querySelector('#pontuacao').style.visibility = 'visible'

    // INSTANCIANDO A DIV PRINCIPAL
    let divElementos = document.querySelector('#elementos')
    // INSTANCIANDO O SPAN BATIDAS
    let numBatidas = document.querySelector('#numBatidas')
    // INSTANCIANDO O SPAN MORTES
    let numCapturados = document.querySelector('#numCapturados')
    // INSTANCIANDO O SPAN AMIGOS SALVOS
    let numSalvos = document.querySelector('#numSalvos')
    // INSTANCIANDO O SPAN INIMIGOS ABATIDOS
    let numAbatidos = document.querySelector('#numAbatidos')

    // CRIAÇÃO DOS ELEMENTOS DO JOGO
    let jogador = document.createElement('div')
    let amigo = document.createElement('div')
    let inimigo1 = document.createElement('div')
    let inimigo2 = document.createElement('div')
    let projetil = document.createElement('div')
    let solo = document.createElement('div')

    // ARRAY CRIADO PARA DEIXAR O CÓDIGO MENOS VERBOSO LÁ NA FRENTE
    const ele = [
        { nome: jogador, classe: 'jogador' },
        { nome: amigo, classe: 'amigo' },
        { nome: inimigo1, classe: 'inimigo1' },
        { nome: inimigo2, classe: 'inimigo2' },
        { nome: projetil, classe: 'aguardar' },
        { nome: solo, classe: 'solo' }
    ]

    // ADICIONANDO SUAS RESPECTIVAS CLASSES CSS
    ele.forEach(item => item.nome.classList.add(item.classe))

    // ADICIONANDO OS ELEMENTOS NA PÁGINA
    ele.forEach(item => {divElementos.appendChild(item.nome)})

    // OBJETIVO DO JOGO
    alert(
        'Missão: Garanta que 10 aliados cheguem ao solo em segurança antes que 20 sejam capturados! Difícil de mais? Hahaha'
    )
    
    function moveJogador() {
        document.onkeydown = e => {
            if (e.key === ' ') {
                disparo()
            }
            if (e.key === 'ArrowDown') {
                alturaJogador += 32
                jogador.style.top = `${alturaJogador}px`
            }
            if (e.key === 'ArrowUp') {
                alturaJogador -= 32
                jogador.style.top = `${alturaJogador}px`
            }
            if (alturaJogador <= 20) {
                alturaJogador = 20
            }
            if (alturaJogador >= 360) {
                alturaJogador = 360
            }
        }
    } // FIM DA FUNÇÃO MOVE-JOGADOR

    function moveAmigo() {
        velocidadeAmigo += 0.6
        amigo.style.top = `${velocidadeAmigo}px`
        if (velocidadeAmigo >= 415) {
            reiniciarAmigo()
        }
    } // FIM DA FUNÇÃO MOVE-AMIGO

    function moveInimigos() {
        velocidadeInimigo1 -= 2
        velocidadeInimigo2 -= 1
        inimigo1.style.left = `${velocidadeInimigo1}px`
        inimigo2.style.left = `${velocidadeInimigo2}px`
        if (velocidadeInimigo1 === -50) {
            reiniciarInimigo1()
        }
        if (velocidadeInimigo2 === -20) {
            reiniciarInimigo2()
        }
    } // FIM DA FUNÇÃO MOVE-INIMIGOS

    function reiniciarInimigo1() {
        alturaAleatoriaInimigo = Math.floor(Math.random() * 300)
        velocidadeInimigo1 = 690
        inimigo1.style.top = `${alturaAleatoriaInimigo}px`
    } // FIM DA FUNÇÃO REINICIAR INIMIGO1

    function reiniciarInimigo2() {
        velocidadeInimigo2 = 750
        inimigo2.style.left = `${velocidadeInimigo2}px`
    } // FIM DA FUNÇÃO REINICIAR INIMIGO2

    function reiniciarAmigo() {
        velocidadeAmigo = 10
        let posicaoAleatoriaAmigo = Math.floor(Math.random() * 870)
        amigo.style.left = `${posicaoAleatoriaAmigo}px`
        finalizar()
    } // FIM DA FUNÇÃO REINICIAR AMIGO

    function novoDisparo() {
        velocidadeProjetil = 180
        projetil.style.left = `${velocidadeProjetil}px`
        projetil.style.visibility = 'hidden'
        // HABILTANDO UM NOVO DISPARO, POIS O ÚLTIMO JÁ SAIU DA TELA
        permitirDisparo = true
    } // FIM DA FUNCAÇÃO NOVO DISPARO

    function disparo() {
        if (permitirDisparo) {
            projetil.style.top = `${alturaJogador + 50}px`
            projetil.style.visibility = 'visible'
            // BLOQUEANDO DISPAROS MULTIPLOS, POIS SÓ DEVO DISPARAR APÓS O TIRO SAIR DA TELA
            permitirDisparo = false
            let tiro = setInterval(() => {
                projetil.style.left = `${velocidadeProjetil}px`
                velocidadeProjetil += 45
                if (velocidadeProjetil >= 910) {
                    clearInterval(tiro)
                    novoDisparo()
                }
            }, 30)
        }
    } // FIM DA FUNÇÃO DISPARO

    // BATIDA DO JOGADOR COM OS INIMIGOS
    function colisão1() {
        let colisao = $(jogador).collision($(inimigo1))
        let colisao2 = $(jogador).collision($(inimigo2))
        if (colisao.length > 0) {
            colisao = 0
            batidas++
            numBatidas.innerHTML = batidas
            reiniciarInimigo1()
        }
        if (colisao2.length > 0) {
            colisao2 = 0
            batidas++
            numBatidas.innerHTML = batidas
            reiniciarInimigo2()
        }
    } // FIM DA FUNÇÃO COLISAO1

    // BATIDA DO AMIGO COM OS INIMIGOS
    function colisao2() {
        let colisao3 = $(amigo).collision($(inimigo1))
        let colisao4 = $(amigo).collision($(inimigo2))
        if (colisao3.length > 0) {
            colisao3 = 0
            amigosCapturados++
            numCapturados.innerHTML = amigosCapturados
            reiniciarAmigo()
        }
        if (colisao4.length > 0) {
            colisao4 = 0
            amigosCapturados++
            numCapturados.innerHTML = amigosCapturados
            reiniciarAmigo()
        }
    } // FIM DA FUNÇÃO COLISAO3
    
    // ENCONTRO DO PROJETIL COM OS INIMIGOS
    function colisao3() {
        let colisao5 = $(projetil).collision($(inimigo1))
        let colisao6 = $(projetil).collision($(inimigo2))
        if (colisao5.length > 0) {
            colisao5 = 0
            inimigosAbatidos++
            numAbatidos.innerHTML = inimigosAbatidos
            novoDisparo()
            reiniciarInimigo1()
        }
        if (colisao6.length > 0) {
            colisao6 = 0
            inimigosAbatidos++
            numAbatidos.innerHTML = inimigosAbatidos
            velocidadeProjetil = 910
            reiniciarInimigo2()
        }
    } // FIM DA FUNÇÃO COLISAO5


    // BATIDA DO AMIGO COM O SOLO
    function colisao4() {
        let colisao7 = $(amigo).collision($(solo))
        if (colisao7.length > 0) {
            colisao7 = 0
            amigosSalvos++
            numSalvos.innerHTML = amigosSalvos
            reiniciarAmigo()
        }
    } // FIM DA FUNÇÃO COLISAO4

    function finalizar() {
        if (amigosSalvos == 10 && amigosCapturados < 25) {
            alert('Missão Concluida')
            recomecar = true
        }
        if (amigosCapturados == 25 && amigosSalvos < 10) {
            alert('Falhou Soldado, perdeeeu.')
            recomecar = true
        }
    }

    function novoJogo() {
        numAbatidos.innerHTML = 0
        numSalvos.innerHTML = 0
        numBatidas.innerHTML = 0
        numCapturados.innerHTML = 0
        // MOSTRANDO A TELA DE INICIO
        document.querySelector('#inicio').style.display = 'flex'
    }

    function gameLoop() {
        let loop = setInterval(() => {
            moveJogador()
            moveAmigo()
            moveInimigos()
            colisão1()
            colisao2()
            colisao3()
            colisao4()
            // CONDICAO PARA TERMINO DO JOGO
            if (recomecar) {
                clearInterval(loop)
                recomecar = false
                ele.forEach(item => divElementos.removeChild(item.nome))
                return novoJogo()
            }
        }, 10)
    } // FIM DA FUNÇÃO GAME-LOOP

    // INVOCANDO A FUNÇÃO PRINCIPLA DO JOGO
    gameLoop()
} // FIM DA FUNÇÃO INICIO

document.querySelector('#inicio').addEventListener('click', inicio)
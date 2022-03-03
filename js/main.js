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
    let amigosCapturados = 0
    let recomecar = false
    let fundoGame = 0

    // OCULTANDO A TELA DE INICIO
    document.querySelector('#inicio').style.display = 'none'
    //EXIBINDO A PONTUACAO
    document.querySelector('#pontuacao').style.visibility = 'visible'

    // INSTANCIANDO ELEMENTOS DO JOGO
    let divElementos = document.querySelector('#elementos')
    let numCapturados = document.querySelector('#numCapturados')
    let numSalvos = document.querySelector('#numSalvos')
    let numAbatidos = document.querySelector('#numAbatidos')
    let jogo = document.querySelector('#jogo')
    let somPrincipal = document.querySelector('#musica')
    let somExplosao = document.querySelector('#explosao')
    let somDisparo = document.querySelector('#disparo')
    let somCapturado = document.querySelector('#capturado')
    let somResgatado = document.querySelector('#resgatado')


    // CRIAÇÃO DOS ELEMENTOS DO JOGO
    let jogador = document.createElement('div')
    let amigo = document.createElement('div')
    let inimigo1 = document.createElement('div')
    let inimigo2 = document.createElement('div')
    let projetil = document.createElement('div')
    let solo = document.createElement('div')
    
    // ARRAY CRIADO PARA DEIXAR O CÓDIGO MENOS VERBOSO LÁ NA FRENTE
    const elementos = [
        { nome: jogador, classe: 'jogador' },
        { nome: amigo, classe: 'amigo' },
        { nome: inimigo1, classe: 'inimigo1' },
        { nome: inimigo2, classe: 'inimigo2' },
        { nome: projetil, classe: 'aguardar' },
        { nome: solo, classe: 'solo' }
    ]

    // ADICIONANDO SUAS RESPECTIVAS CLASSES CSS
    elementos.forEach(item => item.nome.classList.add(item.classe))

    // ADICIONANDO OS ELEMENTOS NA PÁGINA
    elementos.forEach(item => {divElementos.appendChild(item.nome)})

    // OBJETIVO DO JOGO
    alert(
        'Bravo2000 na escuta? Garanta que 10 aliados cheguem ao solo em segurança antes que 25 sejam capturados!\n\n Evite colisões com o Inimigo.'
    )

    function moveFundo(){
        fundoGame += 0.1
        document.querySelector('#jogo').style = `background-position: ${fundoGame}%`
    } // FIM DA FUNÇÃO MOVE-FUNDO
    
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
        velocidadeInimigo2 -= 2
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
        inimigo1.style.left = `${velocidadeInimigo1}px`
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
            somDisparo.play()
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
            finalizar(true)
            
        }
        if (colisao2.length > 0) {
            colisao2 = 0
            finalizar(true)
        }
    } // FIM DA FUNÇÃO COLISAO1

    // BATIDA DO AMIGO COM OS INIMIGOS
    function colisao2() {
        let colisao3 = $(amigo).collision($(inimigo1))
        let colisao4 = $(amigo).collision($(inimigo2))
        if (colisao3.length > 0) {
            somCapturado.play()
            colisao3 = 0
            amigosCapturados++
            numCapturados.innerHTML = amigosCapturados
            reiniciarAmigo()
        }
        if (colisao4.length > 0) {
            somCapturado.play()
            amigo.classList.add('morte')
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
            somResgatado.play()
            colisao7 = 0
            amigosSalvos++
            numSalvos.innerHTML = amigosSalvos
            reiniciarAmigo()
        }
    } // FIM DA FUNÇÃO COLISAO4

    function finalizar(bateu) {
        somPrincipal.pause()
        if (amigosSalvos == 10 && amigosCapturados < 25) {
            alert('Yeah, sua missão foi concluída! Parabéns Bravo2000.')
            recomecar = true
        }
        if (amigosCapturados == 25 && amigosSalvos < 10) {
            alert('25 Aliados capturados, sua missão foi comprometida. Isso será uma mancha na sua reputação Bravo2000.')
            recomecar = true
        }
        if(bateu){
            somExplosao.play()
            bateu = false
            recomecar = true
            alert('Kabummm! Bravo2000 foi abatido.')   
        }
    } // FIM DA FUNÇÃO FINALIZAR

    function novoJogo() {
        numAbatidos.innerHTML = 0
        numSalvos.innerHTML = 0
        numCapturados.innerHTML = 0
        // MOSTRANDO A TELA DE INICIO
        document.querySelector('#inicio').style.display = 'flex'
    } // FIM DA FUNÇÃO NOVO-JOGO

    function gameLoop() {
        let loop = setInterval(() => {
            somPrincipal.play()
            moveFundo()
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
                elementos.forEach(item => divElementos.removeChild(item.nome))
                return novoJogo()
            }
        }, 10)
    } // FIM DA FUNÇÃO GAME-LOOP

    // INVOCANDO A FUNÇÃO PRINCIPAL DO JOGO
    gameLoop()

} // FIM DA FUNÇÃO INICIO

document.querySelector('#novoJogo').addEventListener('click', inicio)

document.querySelector('#instrucoes').addEventListener('click', ()=>{
    alert("Controles do Jogo:\n\n * Para movimentar o Jogador: Utilize as setas do teclado (CIMA/BAIXO)\n * Para atirar: Utilize a tecla ESPAÇO")
})

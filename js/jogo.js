var altura = 0
var largura = 0
var vidas = 1
var tempo = 30
var criaMosquitoTempo = 1500


// Validação que controla o nível de dificuldade que o mosquito irá aparecer na tela

var nivel = window.location.search //recupera o parametro da url contido apenas depois da?
nivel = nivel.replace('?', '') // iremos substituir a ? por nada deta forma teremos apenas a informação do nível que o usuário digitou

if(nivel === 'normal'){
    //1500
    criaMosquitoTempo = 1500
} else if (nivel === 'dificil') {
    //1000
    criaMosquitoTempo = 1000
} else if (nivel === 'chucknorris') {
    //750
    criaMosquitoTempo = 750
}


//Função que irá captar o tamanho máximo da altura e largura da tela do usuário.
function ajustaTamanhoPalcoJogo(){
    altura = window.innerHeight
    largura = window.innerWidth
    console.log(largura,altura)
}
ajustaTamanhoPalcoJogo()

//Criação do Cronômetro

var cronometro = setInterval(function() {
    tempo -= 1
    if(tempo < 0) {
        clearInterval(cronometro) // para a execução da função cronometro
        clearInterval(criaMosquito)
        window.location.href = 'vitoria.html'
    } else {
        document.getElementById('cronometro').innerHTML = tempo  
    }
    
},1000)


function posicaoRandomica(){
    
    //remover mosquito anterior(caso exista)
    if(document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()

        if(vidas > 3){
            window.location.href = 'fim_de_jogo.html'
        } else {
            document.getElementById('v' + vidas).src="img/coracao_vazio.png"
            vidas++
        }
        

    }
    
    // criação de um número aleatório para altura e largura da tela de acordo com o tamanho da tela que o usuário está utilizando no momento.
    var posicaoX = Math.floor(Math.random() * largura) - 90 //ficara 90 px menor do que o limite da tela.
    var posicaoY = Math.floor(Math.random() * altura) - 90

    //controle ternario criado para evitar um posicionamento menor do que 0 já que incluímos - 90 se o número aleatório for negativo o mosquito irá sumir da tela. Com o controle abaixo evitamos a geração de um número negativo porque toda vez que o número for menor do que zero ele receberá 0 senão ele receberá o valor atual dele.
    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    console.log(posicaoX, posicaoY)

    // criar o elemento html
    var mosquito = document.createElement('img')
    mosquito.src = 'img/mosquito.png'
    mosquito.className = tamanhoAleatorio()+ ' ' + ladoAleatorio()
    // atribuindo a posição randomica x e y a imagem
    mosquito.style.left = posicaoX + 'px' 
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.position = 'absolute' //precisa ser posição absoluta para que funcione
    mosquito.id = 'mosquito'    
    mosquito.onclick = function() {
        this.remove() //this faz referencia ao próprio elemento do html no caso o mosquito.
    }
    //metodo que irá adicionar o elemento criado no body do html
    document.body.appendChild(mosquito)

}

function tamanhoAleatorio(){
    var classe = Math.floor(Math.random() * 3) // o resultado será um número entre 0 e mais próximo de 3.
    
    switch(classe) {
        case 0:
            return 'mosquito1' //como tem o comando return não é necessário usar o break pois o próprio return já interrompe o fluxo do switch.

        case 1:
            return 'mosquito2'

        case 2:
            return 'mosquito3'
    }
}

function ladoAleatorio(){
    var classe = Math.floor(Math.random() * 2) // o resultado será um número entre 0 e mais próximo de 2.
    
    switch(classe) {
        case 0:
            return 'ladoA' //como tem o comando return não é necessário usar o break pois o próprio return já interrompe o fluxo do switch.

        case 1:
            return 'ladoB'

        
    }
}
const displayTempo = document.querySelector('#timer');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const html = document.querySelector('html');
const botaoIniciar = document.querySelector('.app__card-primary-button');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const botoes = document.querySelectorAll('.app__card-button');
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/fokus-projeto-base/sons/luna-rise-part-one.mp3');
let tempoDecorridoEmSegundos = 1500 ;
const startPauseBt = document.querySelector('#start-pause');
let intervaloId = null;
const audioPlay = new Audio('/fokus-projeto-base/sons/play.wav');
const audioPausa = new Audio('/fokus-projeto-base/sons/pause.mp3');
const audioTempoFinalizado = new Audio('/fokus-projeto-base/sons/beep.mp3');
const iniciarOuPausarBtIcone = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 2
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
   alterarContexto('descanso-curto')
   curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/fokus-projeto-base/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            ` 
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
            musica.play()
        } else {
            musica.pause()
        }
});

function iniciarOuPausar() {
    if(intervaloId){
        audioPausa.play()
        zerar()
        return
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    iniciarOuPausarBtIcone.setAttribute('src', `/fokus-projeto-base/imagens/pause.png`)
   
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
       //audioTempoFinalizado.play() 
        alert('Tempo finalizado!');
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
           if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado')
            document.dispatchEvent(evento)
        }
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar);startPauseBt.addEventListener('click', iniciarOuPausar);

function zerar() {
    clearInterval(intervaloId) 
    iniciarOuPausarBt.textContent = "Começar"
    iniciarOuPausarBtIcone.setAttribute('src', `/fokus-projeto-base/imagens/play_arrow.png`)
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date (tempoDecorridoEmSegundos * 1000) 
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}
mostrarTempo()


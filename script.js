const palco = document.getElementById('palco')
const numObjetos = document.getElementById('num-objetos')
const txtQtd = document.getElementById('txt-qtd')
const btnAdicionar = document.getElementById('btn-add')
const btnRemover = document.getElementById('btn-remover')


let larguraPalco = palco.offsetWidth //obtem a largura do elemento palco
let alturaPalco = palco.offsetHeight //obtem a altura do elemento palco
let bolas = [] //array para armazenar as instancias das bolinhas
let numBola = 0 //contador para o numero de bolas


//classe usada para criar objetos (bolinhas)
class Bola {
    constructor(arrayBolas, palco) {
        this.tamBolinha = Math.floor(Math.random() * 15) + 10 //define o tamanho da bolinha
        this.r = Math.floor(Math.random() * 255) //define o component vermelho do rgb
        this.g = Math.floor(Math.random() * 255) //define o component verde do rgb
        this.b = Math.floor(Math.random() * 255) //define o component azul do rgb
        this.px = Math.floor(Math.random() * (larguraPalco - this.tamBolinha)) //Esta linha define a posição inicial da bola no eixo X (horizontal). Ele gera uma posição aleatória entre 0 e a largura do palco menos o tamanho da bola, garantindo que a bola não saia da tela.
        this.py = Math.floor(Math.random() * (alturaPalco - this.tamBolinha)) // esta linha define a posição inicial da bola no eixo Y (vertical), garantindo que a bola não saia da tela na vertical.
        this.velX = Math.floor(Math.random() * 2) + 0.5 //Aqui, estamos definindo a velocidade da bola no eixo X. Ele gera uma velocidade aleatória entre 0.5 e 2.
        this.velY = Math.floor(Math.random() * 2) + 0.5 //define a velocidade da bola no eixo Y.
        this.dirX = (Math.random() * 10) > 5 ? 1 : -1 // Aqui, estamos definindo a direção inicial da bola no eixo X. Ele gera um número aleatório entre 0 e 9 e verifica se é maior que 5. Se for, a direção é positiva (para a direita), caso contrário, é negativa (para a esquerda).
        this.dirY = (Math.random() * 10) > 5 ? 1 : -1 //define a direção inicial da bola no eixo Y.
        this.palco = palco // Esta linha atribui o elemento HTML do palco à propriedade palco da bola.
        this.arrayBolas = arrayBolas //Aqui, atribuímos a matriz de bolas existentes à propriedade arrayBolas da bola.
        this.id = Date.now() + "_" + Math.floor(Math.random() * 100000000000000) // Esta linha gera um ID único para a bola combinando o timestamp atual com um número aleatório.
        this.desenhar() //metodo de desenhar a bolinha
        this.controle = setInterval(this.controlar, 10) //cria um intervalo que chama o método controlar() a cada 10 milissegundos para controlar o movimento da bola.
        this.eu = document.getElementById(this.id) // Aqui, buscamos o elemento HTML da bola pelo ID e o atribuímos à propriedade eu da bola.
        numBola++ // atualiza o número total de bolas e exibem isso no HTML.
        numObjetos.innerHTML = numBola // atualiza o número total de bolas e exibem isso no HTML.
    }


    // METODOS DA CLASSE

    //retorna a posição da bola dentro da matriz arrayBolas. Ele usa o método indexOf() para encontrar o índice da própria bola dentro da matriz e retorna esse valor.Se a bola não estiver presente na matriz, o método retorna -1.
    minhaPos = () => {
        return this.arrayBolas.indexOf(this)
    }

    //Este método é responsável por remover a bola do palco e da matriz de bolas
    remover = () => {
        clearInterval(this.controle)
        bolas = bolas.filter((b) => {
            if (b.id != this.id) {
                return b
            }
        })

        this.eu.remove()
        numBola--
        numObjetos.innerHTML = numBola
    }





    //Este método é responsável por desenhar a bola no palco.
    //Ele cria um novo elemento HTML <div> para representar a bola.
    //Define os atributos id, class e style desse elemento, onde id é definido como o ID único da bola, class é definido como "bola" para aplicar estilos CSS apropriados e style define a posição, tamanho e cor da bola.
    //Finalmente, adiciona o elemento da bola ao palco usando appendChild().
    desenhar = () => {
        const div = document.createElement('div');
        div.setAttribute('id', this.id);
        div.setAttribute('class', 'bola');
        div.setAttribute('style', `left:${this.px}px;top:${this.py}px;width:${this.tamBolinha}px;height:${this.tamBolinha}px;background-color:rgb(${this.r}, ${this.g},${this.b})`); // Adicionado um sinal de igual após 'top'
        this.palco.appendChild(div);
    }

    //Este método controla o comportamento da bola quando ela atinge as bordas do palco.
    controleBordas = () => {

        //Verifica se a bola atingiu a borda direita (this.px + this.tamBolinha >= larguraPalco) ou a borda esquerda (this.px <= 0). Se sim, inverte a direção da bola no eixo X (this.dirX).
        if (this.px + this.tamBolinha >= larguraPalco) {
            this.dirX = -1
        }
        else if (this.px <= 0) {
            this.dirX = 1
        }

        //Da mesma forma, verifica se a bola atingiu a borda inferior (this.py + this.tamBolinha >= alturaPalco) ou a borda superior (this.py <= 0). Se sim, inverte a direção da bola no eixo Y (this.dirY).
        if (this.py + this.tamBolinha >= alturaPalco) {
            this.dirY = -1
        }
        else if (this.py <= 0) {
            this.dirY = 1
        }
    }

    //Este método controla o movimento da bola.
    controlar = () => {

        this.controleBordas() //Chama controleBordas() para verificar se a bola atingiu as bordas do palco e atualizar sua direção, se necessário.
        this.px += this.dirX * this.velX //atualiza as coordenadas em x
        this.py += this.dirY * this.velY //atualiza as coordenadas em y
        this.eu.setAttribute('style', `left:${this.px}px;top:${this.py}px;width:${this.tamBolinha}px;height:${this.tamBolinha}px;background-color:rgb(${this.r}, ${this.g},${this.b})`); //atualiza o estilo css

        //se sair dos limites enquanto a tela for redimensionada dai remove a bolinha
        if ((this.px > larguraPalco) || (this.py > alturaPalco)) {
            this.remover()
        }
    }
}


//evento que é acionado quando a janela do navegador for redimensionada
window.addEventListener('resize', (evt) => {
    larguraPalco = palco.offsetWidth //passa novos valores para a largura do palco
    alturaPalco = palco.offsetHeight //passa novos valores para a altura do palco
})


//evento de click, cria novos objetos (bolinhas)
btnAdicionar.addEventListener('click', (evt) => {
    const qtd = txtQtd.value
    for (let i = 0; i < qtd; i++) {
        bolas.push(new Bola(bolas, palco)) //instancia um novo objeto
    }
})


//evento de click para remover todas as bolinhas da tela
btnRemover.addEventListener('click', (evt) => {
    bolas.map((b) => {
        b.remover()
    })
})
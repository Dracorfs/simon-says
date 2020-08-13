const lightblue = document.getElementById('lightblue')
const purple = document.getElementById('purple')
const orange = document.getElementById('orange')
const green = document.getElementById('green')
const btnStart = document.getElementById('btnStart')
const LAST_LEVEL = 10

class Game {
    constructor() {
        this.initialize = this.initialize.bind(this)
        this.initialize()
        this.generateSequence()
        setTimeout(this.nextLevel(), 500)
    }
    initialize(){
        this.nextLevel = this.nextLevel.bind(this)
        this.choiceColor = this.choiceColor.bind(this)
        this.toggleBtnStart()
        
        this.level = 1
        this.colors = {
            lightblue,
            purple,
            orange,
            green,
        }
    }

    toggleBtnStart(){
        (btnStart.classList.contains('hide'))
            ? btnStart.classList.remove('hide')
            : btnStart.classList.add('hide')
    }

    generateSequence() {
        this.sequence = new Array(LAST_LEVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }

    nextLevel() {
        this.sublevel = 0
        this.lightUpSequence()
        this.addClickEvents()
    }

    transformNumToColor(number){
        switch(number){
        case 0:
            return 'lightblue'
        case 1:
            return 'purple'
        case 2:
            return 'orange'
        case 3:
            return 'green'
        }
    }

    transformColorToNum(color){
        switch(color){
        case 'lightblue':
            return 0
        case 'purple':
            return 1
        case 'orange':
            return 2
        case 'green':
            return 3
        }
    }

    lightUpSequence() {
        for (let i = 0; i < this.level; i++){
        const color = this.transformNumToColor(this.sequence[i])
        setTimeout(() => this.lightUpColor(color), 1000 * i)
        }
    }

    lightUpColor(color){
        this.colors[color].classList.add('light')
        setTimeout(() => this.turnOffColor(color), 350)
    }

    turnOffColor(color){
        this.colors[color].classList.remove('light')
    }

    addClickEvents(){
        this.colors.lightblue.addEventListener('click', this.choiceColor)
        this.colors.green.addEventListener('click', this.choiceColor)
        this.colors.purple.addEventListener('click', this.choiceColor)
        this.colors.orange.addEventListener('click', this.choiceColor)
    }

    deleteClickEvents() {
        this.colors.lightblue.removeEventListener('click', this.choiceColor)
        this.colors.green.removeEventListener('click', this.choiceColor)
        this.colors.purple.removeEventListener('click', this.choiceColor)
        this.colors.orange.removeEventListener('click', this.choiceColor)
    }

    choiceColor(ev){
        const colorName = ev.target.dataset.color
        const colorNumber = this.transformColorToNum(colorName)
        this.lightUpColor(colorName)
        if (colorNumber === this.sequence[this.sublevel]){
        this.sublevel++
        if (this.sublevel === this.level){
            this.level++
            this.deleteClickEvents()
            if (this.level === (LAST_LEVEL + 1)){
            this.winTheGame()
            } else {
            setTimeout(this.nextLevel, 1500)
            }
        }
        } else {
        this.gameOver()
        }
    }
    winTheGame(){
        swal('Platzi', 'Felicitaciones, ganaste el juego!', 'success')
        .then(this.initialize)
    }
    gameOver(){
        swal('Platzi', 'Lo lamentamos, perdiste :c', 'error')
        .then(() => {
            this.deleteClickEvents()
            this.initialize()
        })
    }
}

function startGame(){
    window.game = new Game()
}
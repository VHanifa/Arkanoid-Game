
class HTMLobj {
    constructor(id, w, h, r, c, x, y, dx, dy) {
        this.id = id
        this.w = w
        this.h = h
        this.r = r
        this.c = c
        this.x = x
        this.y = y
        this.dx = dx
        this.dy = dy
    }
    create(main) {
        main.innerHTML += `<div id="${this.id}"></div>`
        this.show()
    }
    show() {
        this.elem = document.getElementById(this.id)
        this.elem.style.width = this.w + 'px'
        this.elem.style.height = this.h + 'px'
        this.elem.style.borderRadius = this.r
        this.elem.style.background = this.c;
        this.elem.style.left = this.x + 'px'
        this.elem.style.top = this.y + 'px'
    }
}

class Bricks {
    r = 3
    c = 6
    g = 10
    arr = []
    create() {
        for (let i = 0; i < this.r; i++) {
            for (let j = 0; j < this.c; j++) {
                let w = (game.w - (this.c + 1) * this.g) / this.c
                let h = w / 5
                let x = (j + 1) * this.g + j * w
                let y = (i + 1) * this.g + i * h
                let brick = new HTMLobj(`b${i}${j}`, w, h, 0, 'orange', x, y)
                brick.create(game.elem)
                this.arr.push( brick )
            }
        }
    }
    check() {
        for (let i = 0; i < this.arr.length; i++) {
            let brick = this.arr[i]
            if ( ball.collision(brick) ) {
                document.getElementById( brick.id ).remove()
                this.arr.splice(i, 1)
                return true
            }
           
        }
    }
}

const game = new HTMLobj('game',800,600,'0','white')
const ball = new HTMLobj('ball',40,40,'50%','red',0,0,5,5)
const bar = new HTMLobj('bar',150,10,'0','blue',0,600,10)
const bricks = new Bricks()
let start = setInterval(() => ball.move(), 40)

bar.y = game.h - bar.h
ball.y = bar.y - ball.h
ball.dy = -5

ball.move = function() {
    if(this.x < 0 || this.x >= game.w - this.w) this.dx *= -1
    if (this.y < 0 || this.collision(bar) || bricks.check() ) this.dy *= -1
    if (this.y >= game.h - this.h) gameOver()
    this.x += this.dx
    this.y += this.dy
    this.show()
}

ball.collision = function(obj) {
    return (
        this.y > obj.y - this.h &&
        this.y < obj.y + obj.h &&
        this.x > obj.x - this.w &&
        this.x < obj.x + obj.w
    )
}

bar.move = function(e) {
    if(e.keyCode == 37 && this.x > 0) this.x -= this.dx
    if(e.keyCode == 39 && this.x < game.w - this.w) this.x += this.dx
    this.show()
}

game.over = function() {
    clearInterval(start)
    this.elem.innerHTML = "<h1>GAME OVER</h1>" 
    this.c= "red"
    this.show()
}

game.create( document.querySelector("body") )
ball.create(game.elem)
bar.create(game.elem)
bricks.create(game.elem)

onkeydown = (e) => bar.move(e)
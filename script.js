let cvs = document.getElementById('canvas')
let path_to_img = 'assets/img/'
let ctx = cvs.getContext('2d')
let toLoad = [
    'flappy_bird_bird1.png',
    'flappy_bird_bg1.png',
    'flappy_bird_fg.png',
    'flappy_bird_pipeUp1.png',
    'flappy_bird_pipeBottom1.png'
]
let isloaded = 0
let bird = new Image()
let bg = new Image()
let fg = new Image()
let p_up = new Image()
let p_down = new Image()
bird.src = path_to_img + 'flappy_bird_bird1.png'
bg.src = path_to_img + 'flappy_bird_bg1.png'
fg.src = path_to_img + 'flappy_bird_fg.png'
p_up.src = path_to_img + 'flappy_bird_pipeUp1.png'
p_down.src = path_to_img + 'flappy_bird_pipeBottom1.png'

function load() {
    return new Promise(resolve => {
        toLoad.forEach(element => {
            image = new Image()
            image.src = path_to_img + element
            image.onload = () => {
                isloaded += 1
                if (isloaded == toLoad.length) resolve(5)
            }

        });
    })

}

let gap = 100
let xPos = 10
let yPos = 150
let default_grav = 1.2
let grav = 1.2
let distance = 100
let speed = 2
let jump = 30
let endgame = false
let score = 0
let p = [{
    x: cvs.width,
    y: 0
}]
ctx.fillStyle = "000"
ctx.font = "30px Verdana"

function moveUp() {
    yPos -= jump
    grav = default_grav
}

function drawCanvas() {
    ctx.drawImage(bg, 0, 0)
    for (item of p) {
        ctx.drawImage(p_up, item.x, item.y)
        ctx.drawImage(p_down, item.x, item.y + p_up.height + gap)
        item.x -= speed;
        if (item.x == distance) {
            p.push({
                x: cvs.width,
                y: Math.floor(Math.random() * p_up.height - p_up.height)
            })
        }
        if ((xPos + bird.width >= item.x && xPos + bird.width <= item.x + p_up.width) &&
            ((yPos <= p_up.height + item.y) || ((yPos + bird.height >= item.y + p_up.height + gap))) || (yPos + bird.height >= cvs.height - fg.height)) {
            speed = 0
            grav = 0
            jump = 0
            endgame = true

        }
        if (item.x == 0) {
            score++
            console.log(score)
        }
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height)

    ctx.drawImage(bird, xPos, yPos)
    ctx.fillText(score, cvs.width / 2 - 15, 40)
    if (endgame) {
        location.reload()
        return
    }
    grav *= 1.02
    yPos += grav
    if (yPos < 0) {
        yPos = 0
    }


    requestAnimationFrame(drawCanvas)

}
document.addEventListener('click', moveUp)
document.addEventListener('keydown', moveUp)
load().then((res) => {
    drawCanvas()
})
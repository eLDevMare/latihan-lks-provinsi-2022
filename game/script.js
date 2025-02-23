class Injection {
    constructor(x,y,width,height, image){
        this.x = x
        this.y = y,
        this.width = width
        this.height = height
        this.image = image
    }

    draw(ctx){
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}


class Detect {
    constructor(x,y,width,height){
        this.x = x
        this.y = y,
        this.width = width
        this.height = height
    }

    draw(ctx){
        ctx.fillRect(this.x,this.y,this.width,this.height)
    }
}

class Detect1 extends Detect {
    constructor(x,y,width,height){
        super(x,y,width,height)
        this.detect = false
    }

    setDetect(value){
        this.detect = value
    }
}

class Detect2 extends Detect {
    constructor(x,y,width,height){
        super(x,y,width,height)
        this.detect = false
    }

    setDetect(value){
        this.detect = value
    }
}

class Detect3 extends Detect {
    constructor(x,y,width,height){
        super(x,y,width,height)
        this.detect = false
    }

    setDetect(value){
        this.detect = value
    }
}

class Detect4 extends Detect {
    constructor(x,y,width,height){
        super(x,y,width,height)
        this.detect = false
    }

    setDetect(value){
        this.detect = value
    }
}

class Virus {
    constructor(x,y,width,height, image){
        this.x = x
        this.y = y,
        this.width = width
        this.height = height
        this.image = image
        this.velocity = -10
    }

    draw(ctx){
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }

    random(){
        let random = Math.random()
        if(random > 0.75){
            this.x = 0
        } else if(random > 0.5){
            this.x = 170
        } else if(random > 0.25){
            this.x = 335
        } else {
            this.x = 500
        }
    }
}


class Gameboard {
    constructor(ctx,boardHeight,boardWidth,virus,injection,virusArray,detect1,detect2,detect3,detect4,score,pause, virusFailsArray, pauseHtml, boardHtml, dashboardHtml, usernameInput, outputHtml, playerName, playerScore, leaderboardHtml){
        this.ctx = ctx
        this.boardHeight = boardHeight
        this.boardWidth = boardWidth
        this.virus = virus
        this.injection = injection
        this.virusArray = virusArray
        this.detect1 = detect1
        this.detect2 = detect2
        this.detect3 = detect3
        this.detect4 = detect4
        this.score = score
        this.pause = pause
        this.virusFailsArray = virusFailsArray
        this.pauseHtml = pauseHtml
        this.boardHtml = boardHtml
        this.dashboardHtml = dashboardHtml
        this.usernameInput = usernameInput
        this.outputHtml = outputHtml
        this.playerName = playerName
        this.playerScore = playerScore
        this.leaderboardHtml = leaderboardHtml
    }

    start(){
        this.dashboardHtml.style.display = "none"
        this.boardHtml.style.display = "flex"
        this.username = document.getElementById("username-input").value
        gameboard.initialize()
    }

    initialize(){
        requestAnimationFrame(this.update.bind(this))
        setInterval(this.setVirus.bind(this), 1000)
        setInterval(this.defaultKey.bind(this), 500)
        this.eventListener()
        console.log(this.username)
    }

    eventListener(){
        document.addEventListener("keyup", (e) => this.injectionKey(e))
    }

    defaultKey(){
        this.detect1.setDetect(false)
        this.detect2.setDetect(false)
        this.detect3.setDetect(false)
        this.detect4.setDetect(false)
    }

    injectionKey(e){
        if(e.code == "KeyD"){
            this.detect1.setDetect(true)
        }
        if(e.code == "KeyF"){
            this.detect2.setDetect(true)
        }
        if(e.code == "KeyJ"){
            this.detect3.setDetect(true)
        }
        if(e.code == "KeyK"){
            this.detect4.setDetect(true)
        }

        if(e.code == "Escape"){
            this.pauseHtml.style.display = "flex"
            this.pause = true
        }
    }

    continuePause(){
        this.pause = false
        requestAnimationFrame(this.update.bind(this))
        this.pauseHtml.style.display = "none"
    }

    gameOverFunc(){
        this.outputHtml.style.display = "flex"
        this.playerName.innerHtml = this.username
        this.playerScore.innerHtml = this.score
        this.setData()
    }

    setVirus(){
        let virus = new Virus(this.virus.x,this.virus.y,this.virus.width,this.virus.height,this.virus.image)
        virus.random()
        this.virusArray.push(virus)
    }

    update(){
        if(this.pause == true){
            return
        }

        if(this.virusFailsArray.length == 5){
            this.gameOverFunc()
            return
        }

        requestAnimationFrame(this.update.bind(this))
        this.ctx.clearRect(0,0,this.boardWidth,this.boardHeight)

        
        for(let i = 0; i < this.virusArray.length; i++){
            let virus = this.virusArray[i]
            this.ctx.drawImage(virus.image,virus.x,virus.y,virus.width,virus.height)
            virus.y -= virus.velocity

            if(this.detectElement(virus,this.detect4) && this.detect4.detect == true){
                this.virusArray.splice(i, 1)
                i--
                this.score += 1
            }
            if(this.detectElement(virus,this.detect1) && this.detect1.detect == true){
                this.virusArray.splice(i, 1)
                i--
                this.score += 1
            }
            if(this.detectElement(virus,this.detect2) && this.detect2.detect == true){
                this.virusArray.splice(i, 1)
                i--
                this.score += 1
            }
            if(this.detectElement(virus,this.detect3) && this.detect3.detect == true){
                this.virusArray.splice(i, 1)
                i--
                this.score += 1
            }


            if(this.boardHeight - this.detect1.height + 50 < virus.y){
                this.virusArray.splice(i,1)
                this.virusFailsArray.push(i)
            }
        }
        

        
        this.ctx.fillStyle = "blue"
        this.detect1.draw(this.ctx)
        this.detect2.draw(this.ctx)
        this.detect3.draw(this.ctx)
        this.detect4.draw(this.ctx)


        
        console.log(this.virusFailsArray.length)

        this.ctx.fillStyle = "white"
        this.ctx.font = "30px arial"
        this.ctx.fillText(`Name : ${this.username}`, 20, 50)
        this.ctx.fillText(`Score : ${this.score}`, 20, 90)
        this.ctx.fillText(`Fails : ${this.virusFailsArray.length}`, 20, 130)

        this.ctx.drawImage(this.injection.image,this.injection.x,this.injection.y,this.injection.width,this.injection.height)
    }
    

    detectElement(a,b){
        return a.height + a.y > b.y &&
               a.y < b.y + b.y &&
               a.width + a.x > b.x &&
               a.x < b.x + b.width 
    }




    setData(){
        let data = {
            username: this.username,
            score: this.score
        }
        let dataJson = JSON.parse(localStorage.getItem("data")) || []
        dataJson.push(data)
        localStorage.setItem("data", JSON.stringify(dataJson))
    }


    displayLeaderboard(){
        this.leaderboardHtml.style.display = "flex"
        this.dashboardHtml.style.display = "none"
        this.getData()
    }

    displayDashboard(){
        this.leaderboardHtml.style.display = "none"
        this.dashboardHtml.style.display = "flex"
    }

    getData(){
        let data = JSON.parse(localStorage.getItem("data")) || []
        let html = document.getElementById("leaderboard-data")

        html.innerHTML = data?.map((item, index ) => 
            `<p>${index + 1}. ${item.username} || ${item.score}</p>`
        ).join("")
    }
}


let pauseHtml = document.getElementById("pause")
let boardHtml = document.getElementById("board")
let dashboardHtml = document.getElementById("dashboard")
let outputHtml = document.getElementById("output")
let leaderboardHtml = document.getElementById("leaderboard")

let playerName = document.getElementById("player-name")
let playerScore = document.getElementById("player-score")

let usernameInput;





let boardHeight = 1000
let boardWidth = 600
let board = document.getElementById("board")
let ctx = board.getContext("2d")
board.height = boardHeight
board.width = boardWidth


let virusImage = new Image()
virusImage.src = "assets/viruss.png"
let virusX = 0
let virusY = 0
let virusWidth = 100
let virusHeight = 100
let virusArray = []
let virusFailsArray = []

let detectX = 0
let detectWidth = boardWidth / 4 - 20
let detectHeight = 160
let detectY = boardHeight - detectHeight

let injectionImage = new Image()
injectionImage.src = "assets/d.png"
let injectionHeight = 150
let injectionWidth = boardWidth
let injectionX = 0
let injectionY = boardHeight - injectionHeight

let score = 0
let pause =  false

let detect1 = new Detect1(-10   ,detectY,detectWidth,detectHeight)
let detect2 = new Detect2(150, detectY,detectWidth,detectHeight)
let detect3 = new Detect3(320, detectY,detectWidth,detectHeight)
let detect4 = new Detect4(470, detectY,detectWidth,detectHeight)
let virus = new Virus(virusX,virusY,virusWidth,virusHeight,virusImage)
let injection = new Injection(injectionX,injectionY,injectionWidth,injectionHeight, injectionImage)

let gameboard = new Gameboard(ctx,boardHeight,boardWidth,virus,injection,virusArray, detect1,detect2,detect3,detect4, score, pause, virusFailsArray, pauseHtml, boardHtml, dashboardHtml, usernameInput, outputHtml,playerName,playerScore, leaderboardHtml)
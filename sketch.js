let grid;
let n;
let rows = 8;
let turn = 0;

function setup(){
    createCanvas(500,500)
    grid = new Grid(rows)
    n = height/rows
}

function draw(){
    background(47,131,63)
    grid.render(n)
    if (grid.isOver()){
        console.log(grid.getWinner())
        noLoop()
    }
}

function mousePressed(){
    for (let row of grid.grid){
        for (let piece of row){
            d = dist(mouseX, mouseY, (piece.x*n)+n/2, (piece.y*n)+n/2)
            



            if (d <= n/2){
                if (piece.is == false){
                    if (turn == 0){
                        piece.color = 0
                        turn = 1
                    } else {
                        piece.color = 255
                        turn = 0
                    }
                    piece.is = true
                    
                    grid.check(piece)
                }
            }
        }
    }
}
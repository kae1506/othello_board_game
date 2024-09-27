class Grid{
    constructor(n){
        this.grid = []
        this.n = n
        for (var i = 0; i < n; i++){
            this.grid.push([])
            for (var j = 0; j < n; j++ ){
                this.grid[i].push(new Square(i, j))
            }
        }
    }

    isOver(){
        
        for (let row of this.grid){
            for (let piece of row){
                if (piece.is == false){
                    return false
                }
            }
        }

        return true
    }

    getWinner(){
        let w = 0
        let b = 0

        for (let row of this.grid){
            for (let piece of row){
                if (piece.color == 255){
                    w += 1
                } else {
                    b += 1
                }
            }
        }
        console.log("white: ", w, "black: ", b)

        if (w>b){
            return "white wins!"
        } else if (b>w){
            return "black wins!"
        } else {
            return "tie!"
        }
    }


    check(piece){
        let x = piece.x
        let y = piece.y
        let col = piece.color

        // check in all 8 directions

        // up
        let q = []

        for (let i = y-1; i >= 0; i--){
            // here, the x is constant

            if(this.grid[x][i].color == col && this.grid[x][i].is){
                // flip all them
                

                for (let piece of q){
                    piece.color = col
                }
                if (q.length > 0 ){
                }                 
                break
            }else if (this.grid[x][i].is){
                
                q.push(this.grid[x][i])
                
            } else { 
                break
            }    
        }
        
        // down
        q = []
        for (let i = y+1; i < this.n; i++){
            if(this.grid[x][i].color == col && this.grid[x][i].is){
                // flip all them
                

                for (let piece of q){
                    piece.color = col
                }
                if (q.length > 0 ){
                } 
                break
            } else if (this.grid[x][i].is){
                
                q.push(this.grid[x][i])
                
            } else { 
                break
            }        
        }

        // left
        q = []
        for (let i = x-1; i >= 0; i--){
            // piece checker
            if(this.grid[i][y].color == col && this.grid[i][y].is){
                // flip all them
                

                for (let piece of q){
                    piece.color = col
                }
                if (q.length > 0 ){
                }                
                break
            } else if (this.grid[i][y].is){
                
                q.push(this.grid[i][y])
                
            } else { 
                break
            }   
        }

        q = []
        // right
        for (let i = x+1; i < this.n; i++){
            // piece checker
            if(this.grid[i][y].color == col && this.grid[i][y].is){
                // flip all them
                

                for (let piece of q){
                    piece.color = col
                }
                if (q.length > 0 ){
                }
                break
            } else if (this.grid[i][y].is){
                q.push(this.grid[i][y])
                
            } else { 
                break
            }   
        }

        // for diagonals, each diagonal is the length
        // of minimum of the xdistance and ydistance

        let xDistEnd = 8-x-1
        let yDistEnd = 8-y-1
        let xDist = x
        let yDist = y

        // up-right
        q = []
        for (let i = 1;  i <= min(xDistEnd, yDist); i++){
            if (x + i < 8 && y-i >= 0){
                let p = this.grid[x+i][y-i]
                if(p.color == col && p.is){
                    // flip all them
                    

                    for (let piece of q){
                        piece.color = col
                    }
                    if (q.length > 0 ){
                    }
                    break
                } else if (p.is){
                    q.push(p)
                    
                } else { 
                    break
                } 
            }
        }

        // up-left
        q = []
        for (let i = 1;  i <= min(xDist, yDist); i++){
            if (x - i >= 0 && y-i >= 0){

                let p = this.grid[x-i][y-i]
                if(p.color == col && p.is){
                    // flip all them
                    

                    for (let piece of q){
                        piece.color = col
                    }
                    if (q.length > 0 ){
                    }
                    break
                } else if (p.is){
                    q.push(p)
                    
                } else { 
                    break
                } 
            }
        }

        // down-right
        q = []
        for (let i = 1;  i <= min(xDistEnd, yDistEnd); i++){
            if (x+i < 8 && y+i < 8){
                let p = this.grid[x+i][y+i]
                if(p.color == col && p.is){
                    // flip all them
                    

                    for (let piece of q){
                        piece.color = col
                    }
                    if (q.length > 0 ){
                    }
                    break
                } else if (p.is){
                    q.push(p)
                    
                } else { 
                    break
                } 
            }
        }
        
        
        // down-left
        q = []

        for (let i = 1;  i <= min(xDist, yDistEnd); i++){
            if (x - i >= 0 && y+i < 8){

                let p = this.grid[x-i][y+i]

                if(p.color == col && p.is){
                    // flip all them
                    

                    for (let piece of q){
                        piece.color = col
                    }
                    if (q.length > 0 ){
                    }

                    break
                } else if (p.is){

                    q.push(p)
                    
                } else if (p.is == false) { 
                    break
                }
            } 
        }


    
    }


    render(n){
        for (var i = 0; i < 8; i++){
            line(0, i*n, n*8, i*n)
            line(i*n, 0, i*n, n*8)
        }

        for (let row of this.grid){
            for (let piece of row){
                piece.render(n)
            }
        }
    }
}

class Square{
    constructor(i, j){
        this.x = i
        this.y = j

        this.color = 255    // white is 0, black is 1
        this.is = false
    }

    render(n){
        if (this.is == true){
            push()
            fill(this.color)
            ellipse(this.x*n + n/2, this.y*n + n/2, n, n)
            pop()
        }
    }
}
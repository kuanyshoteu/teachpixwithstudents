
let paintbox = document.getElementById("generate-window");
let generateBox = document.getElementsByClassName("generate-box")[0];
let htools = document.getElementsByClassName("htools");
let sectioNeurons = document.getElementById("neuronSection");
let originalPixel = document.getElementById("originalPixel");
let graphsSection = document.getElementById("graphsSection");

let pixelHeight = 20
let pixelWidth = 20

let generateBoxWidth = pixelWidth * fieldWidth + 140;

function setWidthForSomeBoxes(){
    for(let i = 0; i < htools.length; i++){
        htools[i].style.height = pixelHeight * fieldHeight + "px";
    }
    generateBox.style.width = generateBoxWidth+ "px";
    sectioNeurons.style.width = ((screen.width - generateBoxWidth- 64*2)/2 ) + "px";    
    originalPixel.style.width = pixelWidth+"px";
    originalPixel.style.height = pixelHeight+"px";
    graphsSection.style.width = ((screen.width - generateBoxWidth - 64*2)/2) + "px";
}
setWidthForSomeBoxes()

function placePixels(){
    let leftCoord;
    for(let i = 0; i < fieldHeight; i++){
        leftCoord = 0
        for(let j = 0; j < fieldWidth; j++){
            let copyPixel = originalPixel.cloneNode(true);
            copyPixel.style.left = leftCoord+"px";
            copyPixel.style.top = (0 + i*pixelHeight)+"px";
            copyPixel.id = "pixel_i" + i+"j"+j;
            paintbox.appendChild(copyPixel)
            leftCoord += pixelWidth;
        }
    }
}
placePixels();

let needPaint = false;
onmousedown = function(event){
    needPaint = true;
    lastDrawing = [];
}
onmouseup = function(event){
    needPaint = false;
    picture.push(lastDrawing);
}
onmousemove = function(event){
    if(needPaint){
        let j = parseInt((event.clientX - paintbox.offsetLeft)/pixelWidth);
        let i = parseInt((event.clientY - paintbox.offsetTop + scrollY)/pixelHeight);        
        
        lastDrawing.push([i, j]);
        let crntPixel = document.getElementById("pixel_i"+i+"j"+j)
        crntPixel.style.backgroundColor = "rgb(255, 77, 77)";
        pictureInNumbers[i][j] = 1;
        neurons[0][i*fieldWidth+j] = 1;
        predict();
    }
}

document.onkeydown = undo;
function undo(e){
    if (e.keyCode == 90 && e.ctrlKey) {
        console.log(picture)
        if(picture.length > 0){
            let ld = picture[picture.length - 1]
            for(let i = 0; i < ld.length; i++){
                y = ld[i][0]
                x = ld[i][1]
                let crntPixel = document.getElementById("pixel_i"+y+"j"+x)
                crntPixel.style.backgroundColor = "white";
            }
            picture.pop();
            for(let i = 0; i < picture.length; i++){
                for(let j = 0; j < picture[i].length; j++){
                    y = picture[i][j][0]
                    x = picture[i][j][1]
                    let crntPixel = document.getElementById("pixel_i"+y+"j"+x)
                    crntPixel.style.backgroundColor = "rgb(255, 77, 77)";
                }
            }
            updateNeurons().then(()=>{predict()});
        }
    }
}

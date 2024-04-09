
let paintbox = document.getElementById("generate-window");
let generateBox = document.getElementsByClassName("generate-box")[0];
let htools = document.getElementsByClassName("htools");
let sectioNeurons = document.getElementById("neuronSection");
let originalPixel = document.getElementById("originalPixel");
let graphsSection = document.getElementById("graphsSection");

let allPicturesBox = document.getElementById("allPicturesBox");

let pixelHeight = 20
let pixelWidth = 20

let generateBoxWidth = pixelWidth * fieldWidth + 140;

function showNeuralNetwork(){
    neuralNetworkSection = document.getElementById("neuralNetworkSection")
    neuralNetworkSection.classList = "";
}
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

function placePixels(crntPictureIndex, crntPaintbox, crntPixelHeight, crntPixelWidth, leftStart){
    let leftCoord;
    for(let i = 0; i < fieldHeight; i++){
        leftCoord = leftStart
        for(let j = 0; j < fieldWidth; j++){
            let copyPixel = originalPixel.cloneNode(true);
            copyPixel.style.height = crntPixelHeight+"px";
            copyPixel.style.width = crntPixelWidth+"px";
            copyPixel.style.left = leftCoord+"px";
            copyPixel.style.top = (0 + i*crntPixelHeight)+"px";
            copyPixel.id = "pixel_p"+crntPictureIndex+"i" + i+"j"+j;
            crntPaintbox.appendChild(copyPixel)
            leftCoord += crntPixelWidth;
        }
    }
}
placePixels(0, paintbox, 20, 20, 0);


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
        let crntPixel = document.getElementById("pixel_p0i"+i+"j"+j)
        crntPixel.style.backgroundColor = "rgb(255, 77, 77)";
        pictureInNumbers[i][j] = 1;
        neurons[0][i*fieldWidth+j] = 1;
        predict();
    }
}
let pictureIndex = 1;
function savePicture(){
    rightAnswer = document.getElementById("rightAnswerBox").value;
    rightAnswers.push(parseInt(rightAnswer))
    if(rightAnswers){
        allPictures.push(neurons[0]);
        smallCellSize = 4;

        let smallPaintbox = document.createElement("div");
        smallPaintbox.style.position = "relative"
        allPicturesBox.appendChild(smallPaintbox);
        placePixels(pictureIndex, smallPaintbox, smallCellSize, smallCellSize, (allPictures.length-1) * smallCellSize * (fieldWidth+1));
        for(let i = 0; i < fieldHeight; i++){
            for(let j = 0; j < fieldWidth; j++){
                if(neurons[0][i*fieldWidth+j] == 1){
                    let crntPixel = document.getElementById("pixel_p"+pictureIndex+"i"+i+"j"+j)
                    crntPixel.style.backgroundColor = "rgb(255, 77, 77)";
                }
            }
        }

        pictureIndex++;

        allPicturesLength = document.getElementById("allPicturesLength");
        allPicturesLength.innerHTML = allPictures.length
        picture = [];
        clearPaint();
        updateNeurons();
    console.log(rightAnswers)
    console.log(allPictures)
    }
}
function clearPaint(){
    for(let i = 0; i < fieldHeight; i++){
        for(let j = 0; j < fieldWidth; j++){
            let crntPixel = document.getElementById("pixel_p0i"+i+"j"+j)
            crntPixel.style.backgroundColor = "rgb(255, 255, 255)";
        }
    }
}
document.onkeydown = undo;
function undo(e){
    if (e.keyCode == 90 && e.ctrlKey) {
        if(picture.length > 0){
            let ld = picture[picture.length - 1]
            for(let i = 0; i < ld.length; i++){
                y = ld[i][0]
                x = ld[i][1]
                let crntPixel = document.getElementById("pixel_p0i"+y+"j"+x)
                crntPixel.style.backgroundColor = "white";
            }
            picture.pop();
            for(let i = 0; i < picture.length; i++){
                for(let j = 0; j < picture[i].length; j++){
                    y = picture[i][j][0]
                    x = picture[i][j][1]
                    let crntPixel = document.getElementById("pixel_p0i"+y+"j"+x)
                    crntPixel.style.backgroundColor = "rgb(255, 77, 77)";
                }
            }
            updateNeurons().then(()=>{predict()});
        }
    }
}

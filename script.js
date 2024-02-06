
let paintbox = document.getElementById("paintbox");
let pixelHeight = 20
let pixelWidth = 20

let originalPixel = document.getElementById("originalPixel");

function placePixels(){
    let leftCoord;
    for(let i = 0; i < 25; i++){
        leftCoord = paintbox.offsetLeft
        for(let j = 0; j < 25; j++){
            let copyPixel = originalPixel.cloneNode(true);
            copyPixel.style.left = leftCoord+"px";
            copyPixel.style.top = (paintbox.offsetTop + i*pixelHeight)+"px";
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
}
onmouseup = function(event){
    needPaint = false;
}
onmousemove = function(event){
    if(needPaint){
        let j = parseInt((event.clientX - paintbox.offsetLeft)/pixelWidth);
        let i = parseInt((event.clientY - paintbox.offsetTop)/pixelHeight);
        let crntPixel = this.document.getElementById("pixel_i"+i+"j"+j)
        crntPixel.style.backgroundColor = "black"
    }
}
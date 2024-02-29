// Opens a generate section
const generateBlock = document.getElementById('generate-block');

// Draw picture
const generateWindow = document.getElementById('generate-window');
// drawPicture()
function drawPicture(){
    // analyseWords()
    let picture1 = new Picture("Sky", 320, 180);
    picture1.createPaper()

    let background = new Background("Red", "PtoP", [0,0],[], 320, 180 );
    background.drawBackground()

    let layer0 = new Layer(0);
    picture1.addLayer(layer0)
    layer0.addImage(background.picture, 0, 0, layer0.width, layer0.height)

    picture1.drawPicture()
}

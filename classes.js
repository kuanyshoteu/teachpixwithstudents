const insert = (arr, index, ...newItems) => [
    // part of the array before the specified index
    ...arr.slice(0, index),
    // inserted items
    ...newItems,
    // part of the array after the specified index
    ...arr.slice(index)
  ]
class Picture{
    constructor(title, width, height){
        this.width = width;
        this.height = height;
        this.title = title;
        this.picture = this.createPaper();
        this.layers=[];
    }
    createPaper(){
        let picture1 = new Array(this.height)
        for(let i = 0; i < this.height; i++){
            picture1[i] = new Array(this.width);
        }
        return picture1;
    }
    addLayer(newLayer){
        let indexToInsert = 0;
        for(let i = 0; i < this.layers.length; i++){
            if(this.layers[i].zindex > newLayer.zindex){
                indexToInsert = i
            }
        }
        newLayer.width = this.width;
        newLayer.height = this.height;
        this.layers = insert(this.layers, indexToInsert, newLayer)
    }
    drawPicture(){
        for(let i = 0; i < this.layers.length; i++){
            this.picture = this.layers[i].drawLayer(this.picture)
        }
        console.log(this.picture)
    }
}
class Layer{
    constructor(zindex){
        this.zindex = zindex;
        this.picture = [];
        this.width;
        this.height;
    }
    addImage(image, leftCoord, topCoord, width, height){
        let newPic = new Array(this.height)
        
        for(let i = topCoord; i < topCoord + height; i++){
            newPic[i] = new Array(this.width);
            for(let j = leftCoord; j < leftCoord + width; j++){
                console.log(image[i-topCoord][j-leftCoord])
                newPic[i][j] = image[i-topCoord][j-leftCoord];
                
            }
        }
        this.picture = newPic;
    }
    drawLayer(oldPic){
        for(let i = 0; i < this.height; i++){
            for(let j = 0; j < this.width; j++){
                if(this.picture[i][j].r > 0){
                    oldPic[i][j] = this.picture[i][j];
                }
            }
        }
        return oldPic;
    }
}
class Background{
    constructor(color, type, point1, point2, width, height) {
        this.mainColor = color;
        this.type = type; //str, examples: centered, point to point 
        this.point1 = point1; //center
        this.point2 = point2;  
        this.width = width;
        this.height = height;  
        this.picture = [];    
    }
    drawBackground(){
        let newPic = new Array(this.height)
        for(let i = 0; i < this.height; i++){
            newPic[i] = new Array(this.width);
            for(let j = 0; j < this.width; j++){
                newPic[i][j] = {r:255, g:0, b:0};
            }
        }
        this.picture = newPic;
    }
}
class Field{
    constructor(type, layer, width, height,leftCoord, topCoord) {
        this.type = type; // mountain, sky, sea, grass, sand    
        this.layer = layer    
        this.width = width;
        this.height = height;
        this.leftCoord = leftCoord;
        this.topCoord = topCoord;
        this.picture = [];
    }
}
class SmallObjects{
    constructor(type, width, height, layer,leftTop) {
        this.type = type; // tree, stone, wave, flower, cars, dirt, clouds, stars        
        this.width = width;
        this.height = height;
        this.layer = layer;
        this.leftCoord = leftCoord;
        this.topCoord = topCoord;
        this.picture = [];
    }
}
class Hero{
    constructor(hname, group, layer,leftTop) {
        this.name = hname;
        this.group = group;
        this.layer = layer; 
        this.leftCoord = leftCoord;
        this.topCoord = topCoord;
        this.picture = [];     
    }
    
}

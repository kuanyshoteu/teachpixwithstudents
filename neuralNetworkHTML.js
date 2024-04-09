let layerbox0 = document.getElementById("layerbox0");
let originalNeuron = document.getElementById("originalNeuron");
let neuralNetworkBox = document.getElementById("neuralNetworkBox");
let neuronSection = document.getElementById("neuronSection");

let originalRect = document.getElementById("originalRect");

let neuronHeight = 20;
let neuronWidth = 20;
let layerDistance = 200;
let paddingLeft = 30;
originalNeuron.style.width = neuronWidth+"px";
originalNeuron.style.height = neuronHeight+"px";
neuronHeight+=10;

let answers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

let neuronHeights = [[]];
let layerHeights = [];

function placeOneNeuron(neuron, layerIndex, layerbox, crntLayerPadding){
    let copyNeuron = originalNeuron.cloneNode(true);
    height = layerbox0.offsetTop + crntLayerPadding + neuron*neuronHeight;
    
    copyNeuron.style.top = height+"px";
    copyNeuron.style.left = (paddingLeft + layerDistance+generateBox.offsetLeft + generateBoxWidth + (layerIndex-2)*layerDistance)+"px";

    copyNeuron.id = "neuron_layer" + layerIndex+"_neuron"+ neuron;
    copyNeuron.innerHTML = "0";
    layerbox.appendChild(copyNeuron);

    return height
}

function placeNeurons(){
    for(let layerIndex = 1; layerIndex < numberOfLayers; layerIndex++){
        layerHeights = [];
        crntLayerBox = layerbox0.cloneNode(true);
        crntLayerBox.id = "layerbox"+layerIndex;
        let crntLayerPadding = (sectioNeurons.offsetHeight - neuronHeight * lengthOfLayers[layerIndex]) / 2;
        for(let neuronIndex = 0; neuronIndex < lengthOfLayers[layerIndex]; neuronIndex++){
            layerHeights.push(placeOneNeuron(neuronIndex, layerIndex, crntLayerBox, crntLayerPadding));
        }
        neuronHeights.push(layerHeights);
        neuralNetworkBox.appendChild(crntLayerBox);
    } 
}

function placeOneAnswer(answer, layerNumber, layerbox, crntLayerPadding){
    let copyNeuron = originalNeuron.cloneNode(true);
    copyNeuron.style.backgroundColor = "#1A1F2B";
    copyNeuron.style.border = "0";
    copyNeuron.style.color = "white";
    copyNeuron.style.fontSize = "13px"
    copyNeuron.classList.add("answer")
    copyNeuron.style.top = (2+layerbox0.offsetTop + crntLayerPadding + answer*neuronHeight)+"px";
    copyNeuron.style.left = (paddingLeft +30+generateBox.offsetLeft + generateBoxWidth + (layerNumber-2)*layerDistance)+"px";

    copyNeuron.id = "answer_" + answer;
    copyNeuron.innerHTML = answer;
    layerbox.appendChild(copyNeuron);
}
function placeAnswers(){
    crntLayerBox = layerbox0.cloneNode(true);
    crntLayerBox.id = "layerboxanswers";

    let crntLayerPadding = (sectioNeurons.offsetHeight - neuronHeight * answers.length) / 2;
    for(let answer = 0; answer < answers.length; answer++){
        placeOneAnswer(answer, numberOfLayers, crntLayerBox, crntLayerPadding);
    }
    neuralNetworkBox.appendChild(crntLayerBox);
}

function placeOneRectangle(layerFromIndex, neuronFromIndex, neuronToIndex){ 
    let layerToIndex = layerFromIndex + 1;   
    crntRect = originalRect.cloneNode(true);
    
    neuronFrom = document.getElementById("neuron_layer"+layerFromIndex+"_neuron"+neuronFromIndex)
    neuronTo = document.getElementById("neuron_layer"+layerToIndex+"_neuron"+neuronToIndex)

    neuronFromHeight = neuronHeights[layerFromIndex][neuronFromIndex]
    neuronToHeight = neuronHeights[layerFromIndex+1][neuronToIndex]

    crntRect.style.top = (Math.min(neuronFromHeight, neuronToHeight) + neuronHeight/2 - 5)+"px";
    crntRect.style.left = (neuronFrom.offsetLeft + neuronWidth + 2)+"px";
    crntRect.style.width = (neuronTo.offsetLeft - neuronFrom.offsetLeft - neuronWidth - 3)+"px";
    crntRect.style.height = (Math.max(Math.max(neuronFrom.offsetTop, neuronTo.offsetTop) - Math.min(neuronFrom.offsetTop, neuronTo.offsetTop), 1))+"px";

   
    if(neuronFromHeight < neuronToHeight)
        diagonal = " right";
    else
        diagonal = " left";
    let rgb = "rgb(48, 53, 64)";
    let line = "linear-gradient(to top "+diagonal+", rgba(0,0,0,0) 0%, rgba(0,0,0,0) calc(50% - 0.5px),"+rgb+" calc(50% + 0.5px), rgba(0,0,0,0) calc(50% + 1px),rgba(0,0,0,0) 100%)"

    crntRect.style.background = line;
    crntRect.id = "rect_layerFrom"+layerFromIndex+"layerTo"+layerToIndex+"neuronFrom"+neuronFromIndex+"neuronToIndex"+neuronToIndex;
    neuralNetworkBox.appendChild(crntRect);
}
function placeRectangles(){
    for(let layerFromIndex = 1; layerFromIndex < numberOfLayers-1; layerFromIndex++){
        for(let neuronFromIndex = 0; neuronFromIndex < lengthOfLayers[layerFromIndex]; neuronFromIndex++){
            for(let neuronToIndex = 0; neuronToIndex < lengthOfLayers[layerFromIndex+1]; neuronToIndex++){
               placeOneRectangle(layerFromIndex, neuronFromIndex, neuronToIndex);
            }
        }
    }
}
function circleAnswer(){
    let maxResult = 0;
    let maxResultIndex = 0;
    for(let neuronIndex = 0; neuronIndex < neurons[numberOfLayers-1].length; neuronIndex++){
        let crntAns = document.getElementById("answer_"+neuronIndex)
        crntAns.style.border = "0"
        if(neurons[numberOfLayers-1][neuronIndex] > maxResult){
            maxResult = neurons[numberOfLayers-1][neuronIndex]; 
            maxResultIndex = neuronIndex;
        }
    }
    let maxResultAns = document.getElementById("answer_"+maxResultIndex)
    maxResultAns.style.border = "1px solid yellow"
    return maxResultIndex;
}

placeNeurons();
placeAnswers();
placeRectangles();
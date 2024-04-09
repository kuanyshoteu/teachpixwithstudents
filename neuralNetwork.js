// Дробные числа 0 -> 1 из шариков
// Он двумерный, каждая строчка хранит один слой шариков
let neurons = [] // 2d array

// Дробные числа 0 -> 1, числа из ниток
// Каждая плоскость хранит нитки между двумя слоями шариков
// Внутри плоскости, каждая строчка хранит нитки для одного нейрона, 
// в который идут нитки

let weightedEdges = [] // 3d array

// Свободный член многочлена
let freeTerms = [] // 2d array, one stone for every neuron
let numberOfLayers = 4;
let lengthOfLayers = [fieldHeight*fieldWidth, 16, 16, 10];

function initializeNeurons(){
	firstLayer = []
	for(let i = 0; i < fieldHeight; i++){
		for(let j = 0; j < fieldWidth; j++){
			firstLayer.push(0);
		}
	}
	neurons.push(firstLayer);
	for(let i = 1; i < numberOfLayers; i++){
		let crntLayer = [];
		for(let j = 0; j < lengthOfLayers[i]; j++){
			crntLayer.push(0);
		}
		neurons.push(crntLayer);
	}	
}

function initializeFreeTerms(){
	for(let i = 0; i < numberOfLayers-1; i++){
		let crntTerms = [];
		for(let j = 0; j < lengthOfLayers[i+1]; j++){
			crntTerms.push(6);
		}
		freeTerms.push(crntTerms);
	}
}

function initializeEdges(){
	for(let layerFromIndex = 0; layerFromIndex < numberOfLayers-1; layerFromIndex++){
		let crntEdges = []; //2d array, plane between layerFrom and layerFrom+1
		for(let neuronToIndex = 0; neuronToIndex < lengthOfLayers[layerFromIndex+1]; neuronToIndex++){
			let edgesOfOneNeuron = [] //1d array, row for one neuron (neuronTo) from layerFrom+1
			for(let k = 0; k < lengthOfLayers[layerFromIndex]; k++){
				edgesOfOneNeuron.push(0.5); 
			}
			crntEdges.push(edgesOfOneNeuron);
		}
		weightedEdges.push(crntEdges);
	}	

}
function initializeNeuralNetwork(){
	initializeNeurons();
	initializeEdges();
	initializeFreeTerms()
}
initializeNeuralNetwork();

function calculateNeuron(layerFrom, neuronToIndex){
	let sum = 0;
	for(let neuronFromIndex = 0; neuronFromIndex < neurons[layerFrom].length; neuronFromIndex++){
		sum += neurons[layerFrom][neuronFromIndex] * weightedEdges[layerFrom][neuronToIndex][neuronFromIndex];
	}
	
	sum = sum - freeTerms[layerFrom][neuronToIndex];
	sum = 1/(1+(Math.E ** (-sum)));

	neurons[layerFrom+1][neuronToIndex] = sum;
	let neuronHTML = document.getElementById("neuron_layer" + (layerFrom+1) + "_neuron"+neuronToIndex);
	neuronHTML.innerHTML = Math.floor(sum * 10) / 10;
	r = 255;	
	g = 255-sum*(255-77);
	b = 255-sum*(255-77);
	
	neuronHTML.style.backgroundColor = "rgb("+r+", "+g+", "+b+")";
}
async function updateNeurons(){
    for(let i = 0; i < picture.length; i++){
        for(let j = 0; j < picture[i].length; j++){
            y = picture[i][j][0];
            x = picture[i][j][1];
			neurons[0][y*fieldWidth + x] = 1;
		}
	}
	for(let j = 0; j < fieldWidth*fieldHeight; j++){
		neurons[0][j] = 0;
	}
	for(let i = 1; i < numberOfLayers; i++){
		for(let j = 0; j < lengthOfLayers[i]; j++){
			neurons[i][j] = 0;
			let neuronHTML = document.getElementById("neuron_layer" + i + "_neuron"+j);
			neuronHTML.innerHTML = "0";
			neuronHTML.style.backgroundColor = "white"
		}
	}
	let answers = document.getElementsByClassName("answer");
	for(let i = 0; i < answers.length; i++){
		answers[i].style.border = "none";
	}
}

function predict(){
    for(let layerFrom = 0; layerFrom < numberOfLayers-1; layerFrom++){
        for(let neuronIndex = 0; neuronIndex < neurons[layerFrom+1].length; neuronIndex++){
            calculateNeuron(layerFrom,  neuronIndex);
        }
    }
    return circleAnswer();
}
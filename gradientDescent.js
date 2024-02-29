// Сумма ошибок нынешней функции
// Нынешняя функция - это predict()
// у нее есть константы, у нее есть переменные
// Константы - edge (нити), Free Terms (камушки) 
// Переменные - Рисунок (625 пикселей)

// Записывает сумму ошибок при изменений каждой нити
let costsForEdges = [];

// Записывает сумму ошибок при изменений каждого камушка
let costsForFreeTerms = [];

function initializeCostsForFreeTerms(){
	for(let i = 1; i < numberOfLayers; i++){
		let crntCosts = []; 
		for(let j = 0; j < lengthOfLayers[i]; j++){
			crntCosts.push(0);
		}
		costsForFreeTerms.push(crntCosts);
	}
}
function initializeCostsForEdges(){
	for(let i = 0; i < numberOfLayers-1; i++){
		let crntEdgeCosts = []; //2d array // Двумерный массив для ошибок нитей одной плоскости
		for(let j = 0; j < lengthOfLayers[i+1]; j++){
			let edgesOfOneNeuron = [] //1d array // Одномерный массив ошибок изменений нитей одного нейрона
			for(let k = 0; k < lengthOfLayers[i]; k++){
				edgesOfOneNeuron.push(0);
			}
			crntEdgeCosts.push(edgesOfOneNeuron);
		}
		costsForEdges.push(crntEdgeCosts);
	}	
}
initializeCostsForFreeTerms();
initializeCostsForEdges();
let alpha = 0.0001;

function learn(){
	}
function calculateCost(){
	sumOfErrors = 0;
	for (let i = 0; i < allPictures.length; i++) {
		crntPicture = allPictures[i];
		sumOfErrors += (rightAnswer[i] - predict(crntPicture))**2;
	}
	return sumOfErrors;
	
}
function gradientDescent(){ 
	for(let i = 0; i < numberOfLayers-1; i++){
		for(let j = 0; j < lengthOfLayers[i+1]; j++){
			for(let k = 0; k < lengthOfLayers[i]; k++){
				weightedEdges[i][j][k] -= alpha;
				calculateCost();
				weightedEdges[i][j][k] += alpha;
			}
		}
	}	
}
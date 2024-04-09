// Сумма ошибок нынешней функции
// Нынешняя функция - это predict()
// у нее есть константы, у нее есть переменные
// Константы - edge (нити), Free Terms (камушки) 
// Переменные - Рисунок (625 пикселей)

// Записывает сумму ошибок при изменений каждой нити
let derivativesForEdges = [];

// Записывает сумму ошибок при изменений каждого камушка
let derivativesForFreeTerms = [];

function initializeDerivativesForFreeTerms(){
	for(let i = 0; i < numberOfLayers-1; i++){
		let crntCosts = []; 
		for(let j = 0; j < lengthOfLayers[i+1]; j++){
			crntCosts.push(0);
		}
		derivativesForFreeTerms.push(crntCosts);
	}
}
function initializeCostsForEdges(){
	for(let i = 0; i < numberOfLayers-1; i++){
		let crntEdgeCosts = []; // Двумерный массив для ошибок нитей одной плоскости
		for(let j = 0; j < lengthOfLayers[i+1]; j++){
			let edgesOfOneNeuron = [] // Одномерный массив ошибок изменений нитей одного нейрона
			for(let k = 0; k < lengthOfLayers[i]; k++){
				edgesOfOneNeuron.push(0);
			}
			crntEdgeCosts.push(edgesOfOneNeuron);
		}
		derivativesForEdges.push(crntEdgeCosts);
	}	
}
initializeDerivativesForFreeTerms();
initializeCostsForEdges();

function calculateCost(){
	sumOfErrors = 0;
	for (let i = 0; i < allPictures.length; i++) {
		crntPicture = allPictures[i];
		predictedAns = predict(crntPicture)
		sumOfErrors += (rightAnswers[i] - predictedAns)**2;
	}
	return sumOfErrors/(allPictures.length*10);
	
}

// Чтобы сделать градиентный спуск нужно взять производную функции
// Однако, наша функция содержит тысячи переменных, 
// описывать движение точки в настолько сложных функциях (11000-мерной степи) напрямую мы не умеем.
// Поэтому описывать движение будем через тени точки на каждую из 11000 осей.

// Если вы помните, то у мы рассматривали как-то на доске систему из много уравнений,
// решив каждую из которых мы узнаем координаты самой низкой точки в степи.

// В этот раз мы эти уравнения не решаем, а отнимая производную двигаем точку на маленькие расстояния

function calculateDerivatives(){
	// Средняя ошибка ответов нашей модели (рандомных нитей) до обучения
	// Это точка, где наша точка начинает свой путь в степи
	let originalCost = calculateCost();
	
	// Чтобы понимать что отнимать от нашей точки найдем значения всех 11000 производных
	// и запишем в массивы derivativesForEdges и derivativesForFreeTerms
	// Производную функции вычисляем через формулу лимита 
	// lim (f(x+alpha) - f(x))/alpha
	//   (alpha -> 0)

	let alpha = 0.01; // Прям стремится к нулю не можем сделать, просто близкое что-то возьмем
	for(let i = 0; i < numberOfLayers-1; i++){
		for(let j = 0; j < lengthOfLayers[i+1]; j++){
			for(let k = 0; k < lengthOfLayers[i]; k++){
				weightedEdges[i][j][k] += alpha; // одна нитка + альфа
				newCost = calculateCost();
				derivativesForEdges[i][j][k] = (newCost - originalCost); 
				console.log("cost", newCost, originalCost, (newCost - originalCost)/alpha)
				// это почти формула производной 

				// Производную от одной нитки вычислил (почти точно), 
				// то есть движение тени на одну ось вычислил 
				// Теперь вернем нынешнюю нитку на место, 
				// чтобы при вычислений производной от следующей нитки, нынешняя была на своем месте  
				weightedEdges[i][j][k] -= alpha; 
			}
		}
	}
	// Тоже самое с балансирующими камнями на нейронах, 
	// у каждого нейрона есть по одному камню
	// (они тоже не меняющаяся часть нейронной сети вместе с нитками при предсказывании, 
	// камни и нитки меняются только при переобучении)
	for(let i = 0; i < numberOfLayers-1; i++){
		for(let j = 0; j < lengthOfLayers[i+1]; j++){
			freeTerms[i][j] += alpha;
			derivativesForFreeTerms[i][j] = (calculateCost() - originalCost)/alpha;
			freeTerms[i][j] -= alpha;
		}
	}
	console.log("derivativesForEdges")
	console.log(derivativesForEdges)
}

let learnRate = 0.00001;
function gradientDescent(){
	for(let i = 0; i < numberOfLayers-1; i++){
		for(let j = 0; j < lengthOfLayers[i+1]; j++){
			freeTerms[i][j] -= derivativesForFreeTerms[i][j] * learnRate;
			for(let k = 0; k < lengthOfLayers[i]; k++){
				weightedEdges[i][j][k] -= derivativesForEdges[i][j][k] * learnRate;
			}
		}
	}
	console.log("weightedEdges")
	console.log(weightedEdges)
}

function colorWires(){
	for(let i = 1; i < numberOfLayers-1; i++){
		for(let j = 0; j < lengthOfLayers[i+1]; j++){
			for(let k = 0; k < lengthOfLayers[i]; k++){
				weight = weightedEdges[i][j][k]*100;
				r = 48 + weight;
				g = 53 + weight;
				b = 64 + weight;
				rgb = "rgb("+r+", "+g+", "+b+")";

			    neuronFromHeight = neuronHeights[i][k];
			    neuronToHeight = neuronHeights[i+1][j];
			    if(neuronFromHeight < neuronToHeight)
			        diagonal = " right";
			    else
			        diagonal = " left";

			    let line = "linear-gradient(to top "+diagonal+", rgba(0,0,0,0) 0%, rgba(0,0,0,0) calc(50% - 0.5px),"+rgb+" calc(50% + 0.5px), rgba(0,0,0,0) calc(50% + 1px),rgba(0,0,0,0) 100%)"

				crntRectId = "rect_layerFrom"+i+"layerTo"+(i+1)+"neuronFrom"+k+"neuronToIndex"+j;				
				crntRect = document.getElementById(crntRectId);
				crntRect.style.background = line;				
			}
		}
	}
}
function learn(){
	for(let t = 0; t < 10; t++){
		console.log("learn", t)
		calculateDerivatives();
		console.log("derivatives end")
		gradientDescent();
		console.log("gradientDescent end")
	}
	colorWires();
}

colorWires();

// 2d array, every array is one picture
let allPictures = []; 
let rightAnswers = []

// Нынешний один рисунок
let picture = [];

// Последний нарисованный кусок нынешнего рисунка
// является частью picture
let lastDrawing = [];

// размеры пэйнта
let fieldWidth = 25;
let fieldHeight = 25;

// Всё, что ниже не нужно, я потом удалю, пока баги выходят
let pictureInNumbers = [];
for(let i = 0; i < fieldHeight; i++){
	let row = []
	for(let j = 0; j < fieldWidth; j++){
		row.push(0);
	}
	pictureInNumbers.push(row);
}


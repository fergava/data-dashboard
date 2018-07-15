// PAGE 1 - INDEX.HTML
// pegar os dois select do html
var localMenu = document.querySelector("#localMenu");
var yearClassMenu = document.querySelector("#yearClassMenu");

// fazer a função rodar conforme obrowser abrir
window.onload = createOptions1();

// função cria as opções de local e ano e turma e inserre a informção do banco de dados no local
function createOptions1() {

	var localOptions = document.createElement("option");
	localOptions.innerHTML = "Sede";
	localOptions.value = "none";
	localMenu.appendChild(localOptions);

	var yearClassOptions = document.createElement("option");
	yearClassOptions.innerHTML = "Ano - Turma";
	yearClassOptions.value = "none";
	yearClassMenu.appendChild(yearClassOptions);

		for (local in data) {
			var localItem = document.createElement("option");
			localItem.value = local;
			localItem.innerHTML = local;
			localMenu.appendChild(localItem);
			console.log(local);
	}
}

localMenu.addEventListener("change", createOptions2);

function createOptions2() {
	var local = localMenu.value;
	yearClassMenu.innerHTML = "";
	
	var yearClassOptions = document.createElement("option");
	yearClassOptions.innerHTML = "Ano - Turma";
	yearClassOptions.value = "none";
	yearClassMenu.appendChild(yearClassOptions);

	for (yearClass in data[local]) {
		var yearClassItem = document.createElement("option");
		yearClassItem.value = yearClass;
		yearClassItem.innerHTML = yearClass;
		yearClassMenu.appendChild(yearClassItem);
		console.log(yearClassItem);
	}
}

yearClassMenu.addEventListener("change", prepareToSend);

function prepareToSend() {
	var newDiv = document.createElement("div");
	var yearClass = yearClassMenu.value;
	for (i in data[local][yearClass]) {
		for (j of data[local][yearClass]["students"]) {
			console.log(j)
			var showStudents = document.createElement("div");
			showStudents.value = j;
			showStudents.innerHTML = j;
			newDiv.appendChild(showStudents)
		}
		for (l of data[local][yearClass]["ratings"]) {
			console.log(l);
			var showRating = document.createElement("div");
			showRating.value = l;
			showRating.innerHTML = l;
			newDiv.appendChild(showRating)
		}
	}
}

var continueButton = document.querySelector("#continueButton");

continueButton.addEventListener("click", sendData);

function sendData() {
	prepareToSend();

}



// console.log(data);
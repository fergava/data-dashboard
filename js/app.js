// PAGE 1 - INDEX.HTML

var localMenu = document.querySelector("#localMenu");
var yearClassMenu = document.querySelector("#yearClassMenu");

localStorage.clear();

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

	for (local in locals) {
		var localItem = document.createElement("option");
		localItem.value = local;
		localItem.innerHTML = locals[local];
		localMenu.appendChild(localItem);
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
	}
}

var continueButton = document.querySelector("#continueButton");

continueButton.addEventListener("click", sendData);

function sendData() {
	if (localMenu.value === 'none' || yearClassMenu.value === 'none') {
		alert('selectione algo');
	} else {
		localStorage.setItem('localMenu', localMenu.value);
		localStorage.setItem('yearClassMenu', yearClassMenu.value);
		window.location.href = 'screen1.html';
	}
}

// console.log(data);
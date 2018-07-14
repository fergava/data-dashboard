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
	for (yearClass in data[local]) {
		var yearClassItem = document.createElement("option");
		yearClassItem.value = yearClass;
		yearClassItem.innerHTML = yearClass;
		yearClassMenu.appendChild(yearClassItem);
		console.log(yearClassItem);
	}
}



// console.log(data);
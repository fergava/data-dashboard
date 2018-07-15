var activeStudents = document.querySelector(".activeStudents");
var active = document.querySelector(".active");
var inactive = document.querySelector(".inactive");

function printActiveStudents() {
	
	var localMenu = "AQP";
  var yearClassMenu = "2016-2";

	for (student of data[localMenu][yearClassMenu]["students"]) {
		// console.log(student)
		// var studentsTrueFalse = student.active;
		// console.log(studentsTrueFalse);
		var criar = document.createElement("p");
		criar.className = "divMix";
		criar.value = student.active;
		criar.innerHTML = student.active;
		activeStudents.appendChild(criar);
		
		if (criar.value === true) {
			var criarp2 = document.createElement("p");
			criarp2.className = "divActive";
			criarp2.innerHTML = criar.value;
			active.appendChild(criarp2);
		} else {
			var criarp3 = document.createElement("p");
			criarp3.className = "divInactive";
			criarp3.innerHTML = criar.value;
			inactive.appendChild(criarp3);
		}
	}
}

printActiveStudents()
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

	google.charts.load('current', {'packages':['bar']});
      google.charts.setOnLoadCallback(drawStuff);

      function drawStuff() {
        var data = new google.visualization.arrayToDataTable([
          // usar push
        ]);

        var options = {
          width: 300,
          legend: { position: 'none' },
          chart: {
            title: 'Inscrições',
            subtitle: 'popularity by percentage' },
          axes: {
            x: {
              0: { side: 'top', label: 'White to move'} // Top x-axis.
            }
          },
          bar: { groupWidth: "60%" }
        };

        var chart = new google.charts.Bar(document.getElementById('top_x_div'));
        // Convert the Classic options to Material options.
        chart.draw(data, google.charts.Bar.convertOptions(options));
      };
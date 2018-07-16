/* função que gera: 
O número total de alunas presentes pela sede e geração.  A porcentagem de alunas desistentes */

function printActiveStudents() {
	
	var localMenu = "AQP";
  var yearClassMenu = "2016-2";
  var active = 0;
  var inactive = 0;

	for (student of data[localMenu][yearClassMenu]["students"]) {	
		if (student.active === true) {
			active ++;
		} else {
			inactive ++;
		}
	}
	var arr = [
		["Ativas", active],
		["Inativas", inactive]
	];
  return arr;
}

// grafico pizza
google.charts.load("current", {"packages":["corechart"]});
google.charts.setOnLoadCallback(drawChart);
  
function drawChart() {

	var data = new google.visualization.DataTable();
	  data.addColumn("string", "Status");
	  data.addColumn("number", "Qts");
	  data.addRows(printActiveStudents());
  var options = {"title":"Inscrições",
                 "width":400,
                 "height":300,
               	 "colors":["#FFE521","#CD2626"]
                };
  var chart = new google.visualization.PieChart(document.getElementById("chart_div"));
  chart.draw(data, options);
}

// ---------------------------------------
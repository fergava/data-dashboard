var localMenu = localStorage.getItem('localMenu');
var yearClassMenu = localStorage.getItem('yearClassMenu');

if (!localMenu || !yearClassMenu) {
  window.location.href = 'index.html';
}

var selectedLocal = document.querySelector("#selectedLocal");

selectedLocal.innerHTML = localMenu + ' - ' + yearClassMenu;

google.charts.load('current', {
  'packages': ['corechart']
});

// grafico pizza
google.charts.setOnLoadCallback(drawChartPizza);
google.charts.setOnLoadCallback(drawChart);
google.charts.setOnLoadCallback(drawBarChart);

function drawChartPizza() {
  var data = new google.visualization.DataTable();
  data.addColumn("string", "Status");
  data.addColumn("number", "Qts");
  data.addRows(printActiveStudents());
  var options = {
    title: 'Média de alunas inscritas',
    titleTextStyle: {
      fontSize: 14,
      bold: true
    },
    "width": 400,
    "height": 300,
    "colors": ["#FFE521", "#CD2626"]
  };
  var chart = new google.visualization.PieChart(document.getElementById("chart_div"));
  chart.draw(data, options);
}

function drawChart() {
  var data = google.visualization.arrayToDataTable(averageGeneral());
  var options = {
    title: 'Quantidade de alunas acima da média em todos os sprints',
    titleTextStyle: {
      fontSize: 14,
      bold: true
    },
    curveType: 'function',
    legend: {
      position: 'bottom'
    }
  };
  var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
  chart.draw(data, options);
}

//Funcao para gerar grafico 1 (ativas e inativas por sede)
function printActiveStudents() {

  var active = 0;
  var inactive = 0;

  for (student of data[localMenu][yearClassMenu]["students"]) {
    if (student.active === true) {
      active++;
    } else {
      inactive++;
    }
  }
  var arr = [
    ["Ativas", active],
    ["Inativas", inactive]
  ];
  return arr;
}

//Funcao para gerar grafico 2 (>70%)
function averageGeneral() {

  var sp1 = 0;
  var sp2 = 0;
  var sp3 = 0;
  var sp4 = 0;
  for (student of data[localMenu][yearClassMenu]["students"]) {
    if (student.active === true) {

      for (sprint of student.sprints) {
        if (sprint.number == 1) {
          if (calcHseSprint(sprint) >= 70 && calcTechSprint(sprint) >= 70) {
            sp1++;
          }
        }
        if (sprint.number == 2) {
          if (calcHseSprint(sprint) >= 70 && calcTechSprint(sprint) >= 70) {
            sp2++;
          }
        }
        if (sprint.number == 3) {
          if (calcHseSprint(sprint) >= 70 && calcTechSprint(sprint) >= 70) {
            sp3++;
          }
        }
        if (sprint.number == 4) {
          if (calcHseSprint(sprint) >= 70 && calcTechSprint(sprint) >= 70) {
            sp4++;
          }
        }
      }
    }
  }

  var arr = [
    ['Sprints', 'quantidade de alunas ativas com media maior que 70'],
    ['SP1', sp1],
    ['SP2', sp2],
    ['SP3', sp3],
    ['SP4', sp4],
  ];

  return arr;
}

function calcTechSprint(sprint) {
  var percent = (sprint.score.tech / 1800) * 100;
  return percent.toFixed(1);
}

function calcHseSprint(sprint) {
  var percent = (sprint.score.hse / 1200) * 100;
  return percent.toFixed(1);
}

//Funcao gerar grafico 3 (NPS)

function calcNps(){
  var sprint = 0;
  var totalNps = 0;
  var promoters = 0;
  var passive = 0;
  var detractors = 0;
  for (rating of data[localMenu][yearClassMenu]["ratings"]) {
    promoters += rating.nps.promoters;
    passive += rating.nps.passive;
    detractors += rating.nps.detractors;
    sprint ++;
  }
  totalNps = promoters - detractors;
  
  var arr =[
    ['Name', '%'],
    ['NPS', (totalNps/sprint)],
    ['Promoters', (promoters/sprint)],
    ['Passive',(passive/sprint)],
    ['Detractors',(detractors/sprint)]
  ];

  return arr;
}

function drawBarChart() {
  var data = google.visualization.arrayToDataTable(calcNps());
  var options = {
    title: "NPS médio dos sprints",
    titleTextStyle: {
      fontSize: 14,
      bold: true
    },
    width: 600,
    height: 400,
    bar: {groupWidth: "70%"},
    legend: { position: "none" },
  };
  var chart = new google.visualization.BarChart(document.getElementById('bar_chart'));
  chart.draw(data, options);
}
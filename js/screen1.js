var localMenu = localStorage.getItem('localMenu');
var yearClassMenu = localStorage.getItem('yearClassMenu');

if(!localMenu || !yearClassMenu){
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

function drawChartPizza() {
  var data = new google.visualization.DataTable();
  data.addColumn("string", "Status");
  data.addColumn("number", "Qts");
  data.addRows(printActiveStudents());
  var options = {
    "title": "Inscrições",
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
    title: 'Company Performance',
    curveType: 'function',
    legend: {
      position: 'bottom'
    }
  };
  var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
  chart.draw(data, options);
}

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

function calcTech(student) {
  var grade = 0;
  var average = 0;
  var count = student.sprints.length;
  for (sprint of student.sprints) {
    grade += sprint.score.tech;
  }
  average = grade / count;
  var percent = (average / 1800) * 100;
  return percent.toFixed(1);
}

function calcHSE(student) {
  var grade = 0;
  var average = 0;
  var count = student.sprints.length;
  for (sprint of student.sprints) {
    grade += sprint.score.hse;
  }
  average = grade / count;
  var percent = (average / 1200) * 100;
  return percent.toFixed(1);
}
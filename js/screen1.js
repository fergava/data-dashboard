// PAGE 2 - SCREEN1.html

var localMenu = localStorage.getItem('localMenu');
var yearClassMenu = localStorage.getItem('yearClassMenu');

if (!localMenu || !yearClassMenu) {
  window.location.href = 'index.html';
}

var selectedLocal = document.querySelector("#selectedLocal");

selectedLocal.innerHTML = localMenu + ' - ' + yearClassMenu;

// PARA CRIAR DIVS E PRINTAR DADOS

// function addDate() {

// }

google.charts.load('current', {
  'packages': ['corechart']
});

//grafico 1 (pizza) - Ativas e Inativas por sede
google.charts.setOnLoadCallback(drawChartPizza);

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
  // printando os dados antes do grafico

  // pegar a div do html para manipular
  var dateDiv = document.querySelector(".dateDiv1");

  // criar nome da seção
    var sectionName = document.createElement("h1");
    sectionName.innerHTML = "Alunas inscritas"
    dateDiv.appendChild(sectionName);

    // criar div drop pra colocar 2 dados: numero e leganda
    var divActive = document.createElement("div"); 
      // p - Numero
      var intoBoxActiveP1 = document.createElement("h2");
      intoBoxActiveP1.innerHTML = active;
      divActive.appendChild(intoBoxActiveP1);
      // p - legenda
      var intoBoxActiveP2 = document.createElement("small");
      intoBoxActiveP2.innerHTML = "Alunas Ativas";
      divActive.appendChild(intoBoxActiveP2);
  // colocar dentro da div do html
  dateDiv.appendChild(divActive);

  // calculos drop
  var studentsTotal = (active + inactive);
  var drop = (inactive / studentsTotal) * 100 ;

  // pegar a div do html para manipular
  var dateDiv = document.querySelector(".dateDiv1");

    // criar div drop pra colocar 2 dados: numero e leganda
    var divDrop = document.createElement("div"); 
      
      // p - Numero
      var intoBoxP1 = document.createElement("h2");
      intoBoxP1.innerHTML = drop.toFixed(1);
      divDrop.appendChild(intoBoxP1);
      // p - legenda
      var intoBoxP2 = document.createElement("small");
      intoBoxP2.innerHTML = "Desistentes";
      divDrop.appendChild(intoBoxP2);

  // colocar dentro da div do html
  dateDiv.appendChild(divDrop);

  return arr;
}

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

// grafico 2 (linha) - maiores de 70% tech e hse por sprints
google.charts.setOnLoadCallback(drawChart);

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

//grafico 3 (barra) - NPS
google.charts.setOnLoadCallback(drawBarChart);

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
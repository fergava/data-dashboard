// PAGE 2 - SCREEN1.html

var localMenu = localStorage.getItem("localMenu");
var yearClassMenu = localStorage.getItem("yearClassMenu");

if (!localMenu || !yearClassMenu) {
  window.location.href = "index.html";
}

var selectedLocal = document.querySelector("#selectedLocal");

selectedLocal.innerHTML = locals[localMenu] + " - " + yearClassMenu;

google.charts.load("current", {
  "packages": ["corechart"]
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
  
  var dataName1 = document.querySelector("#dataName1");
  dataName1.innerHTML = "ALUNAS INSCRITAS";

  var intoBoxActiveH2 = document.querySelector(".intoBoxActiveH2");
  var intoBoxActiveSmall = document.querySelector(".intoBoxActiveSmall");
  intoBoxActiveH2.innerHTML = active;
  intoBoxActiveSmall.innerHTML = "Alunas Ativas";
  
  // calculos drop
  var studentsTotal = (active + inactive);
  var drop = (inactive / studentsTotal) * 100;

  var intoBoxDropH2 = document.querySelector(".intoBoxDropH2") 
  var intoBoxDropSmall = document.querySelector(".intoBoxDropSmall")
  intoBoxDropH2.innerHTML = drop.toFixed(1);
  intoBoxDropSmall.innerHTML = "Desistentes";

  return arr;
}

function drawChartPizza() {
  var data = new google.visualization.DataTable();
  data.addColumn("string", "Status");
  data.addColumn("number", "Qts");
  data.addRows(printActiveStudents());
  var options = {


    "colors": ["#FFE521", "#CD2626"]
  };
  var chart = new google.visualization.PieChart(document.getElementById("chart_div"));
  chart.draw(data, options);
}


// grafico 2 (linha) - maiores de 70% tech e hse por sprints
google.charts.setOnLoadCallback(drawChart);

function averageGeneral() {

  var sprintSize = data[localMenu][yearClassMenu].ratings.length;

  var arr = [
    ["Sprints", "quantidade de alunas ativas com media maior que 70"]
  ];

  for (var i = 1; i <= sprintSize; i++) {
    arr.push(["SP" + i, 0]);
  }

  var totalStudentsAvg = 0;
  var totalStudents = 0;
  for (student of data[localMenu][yearClassMenu]["students"]) {
    if (student.active === true) {
      for (sprint of student.sprints) {
        if (calcHseSprint(sprint) >= 70 && calcTechSprint(sprint) >= 70) {
          switch (sprint.number) {
            case 1:
              arr[1][1] += 1;
              break;
            case 2:
              arr[2][1] += 1;
              break;
            case 3:
              arr[3][1] += 1;
              break;
            case 4:
              arr[4][1] += 1;
              break;
          }
          totalStudentsAvg++;
          totalStudents++;
        }
      }
    }
  }

  var dataName2 = document.querySelector("#dataName2");
  dataName2.innerHTML = "ALUNAS EM DESTAQUE";

  var sprintMedia = totalStudentsAvg / sprintSize;

  var intoBoxMediaH2 = document.querySelector(".intoBoxMediaH2");
  var intoBoxMediaSmall = document.querySelector(".intoBoxMediaSmall");
  intoBoxMediaH2.innerHTML = sprintMedia.toFixed(1);
  intoBoxMediaSmall.innerHTML = "Aluna(s) contemplam essa média.";
  
  var intoBoxPercentH2 = document.querySelector(".intoBoxPercentH2") 
  var intoBoxPercentSmall = document.querySelector(".intoBoxPercentSmall")
  intoBoxPercentH2.innerHTML = Math.round((sprintMedia * 100) / totalStudents) + "%";
  intoBoxPercentSmall.innerHTML = "do Total de " + "(" + totalStudents + ")";

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

    curveType: "function",
    legend: {
      position: "bottom"
    }
  };
  var chart = new google.visualization.LineChart(document.getElementById("curve_chart"));
  chart.draw(data, options);
}

//grafico 3 (barra) - NPS
google.charts.setOnLoadCallback(drawBarChart);

function calcNps() {
  var sprint = 0;
  var totalNps = 0;
  var promoters = 0;
  var passive = 0;
  var detractors = 0;
  for (rating of data[localMenu][yearClassMenu]["ratings"]) {
    promoters += rating.nps.promoters;
    passive += rating.nps.passive;
    detractors += rating.nps.detractors;
    sprint++;
  }
  totalNps = promoters - detractors;

  var arr = [
    ["Name", "%"],
    ["NPS", (totalNps / sprint)],
    ["Promoters", (promoters / sprint)],
    ["Passive", (passive / sprint)],
    ["Detractors", (detractors / sprint)]
  ];

  // printando os dados antes do grafico
  // pegar a div do html para manipular
  var dataName3 = document.querySelector("#dataName3");
  dataName3.innerHTML = "NET PROMOTER SCORE";

  // conta porcentagem
  var totalAnswer = promoters + passive + detractors;
  var cumulativeNPS = (promoters - detractors);
  var cumulativeNPSpercent = (cumulativeNPS / totalAnswer) * 100;

  var intoBoxCumulativeH2 = document.querySelector(".intoBoxCumulativeH2");
  var intoBoxCumulativeSmall = document.querySelector(".intoBoxCumulativeSmall");
  intoBoxCumulativeH2.innerHTML = cumulativeNPSpercent.toFixed(1);
  intoBoxCumulativeSmall.innerHTML = "% cumulativa de NPS";
  

  var promotersP = document.querySelector(".promotersP"); 
  var passiveP = document.querySelector(".passiveP");
  var detrectorsP = document.querySelector(".detrectorsP");
  promotersP.innerHTML = ((promoters / totalAnswer) * 100).toFixed(1) + " % Promoters";
  passiveP.innerHTML = ((passive / totalAnswer) * 100).toFixed(1) + " % Passive";
  detrectorsP.innerHTML = ((detractors / totalAnswer) * 100).toFixed(1) + " % Detrectors";

  return arr;
}

function drawBarChart() {
  var data = google.visualization.arrayToDataTable(calcNps());
  var options = {
    bar: {
      groupWidth: "70%"
    },
    legend: {
      position: "none"
    },
  };
  var chart = new google.visualization.BarChart(document.getElementById("bar_chart"));
  chart.draw(data, options);
}

//Gráfico 4 - Tech Skills

var selectSprintTech = document.getElementById("selectSprintTech");
var selectSprintHse = document.getElementById("selectSprintHse");

window.onload = loadSelect();

function loadSelect() {
  var sprintSize = data[localMenu][yearClassMenu].ratings.length;
  for (var i = 1; i <= sprintSize; i++) {
    var localOptionsTech = document.createElement("option");
    var localOptionsHse = document.createElement("option");
    localOptionsTech.innerHTML = "Sprint " + i;
    localOptionsHse.innerHTML = "Sprint " + i;
    localOptionsTech.value = i - 1;
    localOptionsHse.value = i - 1;
    selectSprintTech.appendChild(localOptionsTech);
    selectSprintHse.appendChild(localOptionsHse);
  }

  var dataName4 = document.querySelector("#dataName4");
  dataName4.innerHTML = "TECH SKILLS";

  var dataName5 = document.querySelector("#dataName5");
  dataName5.innerHTML = "HSE SKILLS";
}

//Gráfico 4 - Tech
window.onload = drawChartStudentsScoresTech();
selectSprintTech.addEventListener("change", avgTechStudents);
selectSprintTech.addEventListener("change", drawChartStudentsScoresTech);

function drawChartStudentsScoresTech() {
  google.charts.setOnLoadCallback(drawPieChartTech);
}

function drawChartStudentsScoresHse() {
  google.charts.setOnLoadCallback(drawPieChartHse);
}

// Qtd e Porcentagem de alunas com media > 70 por sprint em TECH
function avgTechStudents() {

  var sprint = selectSprintTech.value;

  var qtd = 0;
  var pct = 0;
  var total = data[localMenu][yearClassMenu]["students"].length;

  for (student of data[localMenu][yearClassMenu]["students"]) {
    if (true === student.active) {
      if (student.sprints[sprint].score.tech >= 1260) {
        qtd++;
      }
    }
  }

  pct = (qtd / total) * 100;

  var qtdStdTech = document.getElementById("qtdStdTech");
  var qtdStdLegendTech = document.getElementById("qtdStdLegendTech");
  var avgStdTech = document.getElementById("avgStdTech");
  var ttStdTech = document.getElementById("ttStdTech");
  qtdStdTech.innerHTML = qtd;
  qtdStdLegendTech.innerHTML = "Número de Alunas";
  avgStdTech.innerHTML = Math.round(pct) + "%";
  ttStdTech.innerHTML = `% de total (${total})`;

  return arr = [
    ["Qtd Alunas", "%"],
    ["Acima media", Math.round(pct)],
    ["Abaixo media", Math.round((100 - pct))]
  ];
}

function drawPieChartTech() {

  var data = google.visualization.arrayToDataTable(avgTechStudents());

  var options = {

    pieHole: 0.5,
    pieSliceTextStyle: {
      color: "black",
    }
  };

  var chart = new google.visualization.PieChart(document.getElementById("donutchartTech"));
  chart.draw(data, options);
}


//Gráfico 5 - Tech
window.onload = drawChartStudentsScoresHse();
selectSprintHse.addEventListener("change", avgHseStudents);
selectSprintHse.addEventListener("change", drawChartStudentsScoresHse);

function drawChartStudentsScoresHse() {
  google.charts.setOnLoadCallback(drawPieChartHse);
}

// Qtd e Porcentagem de alunas com media > 70 por sprint em HSE
function avgHseStudents() {

  var sprint = selectSprintHse.value;

  var qtd = 0;
  var pct = 0;
  var total = data[localMenu][yearClassMenu]["students"].length;

  for (student of data[localMenu][yearClassMenu]["students"]) {
    if (true === student.active) {
      if (student.sprints[sprint].score.hse >= 840) {
        qtd++;
      }
    }
  }

  pct = (qtd / total) * 100;

  var qtdStdHse = document.getElementById("qtdStdHse");
  var qtdStdLegendHse = document.getElementById("qtdStdLegendHse");
  var avgStdHse = document.getElementById("avgStdHse");
  var ttStdHse = document.getElementById("ttStdHse");
  qtdStdHse.innerHTML = qtd;
  qtdStdLegendHse.innerHTML = "Número de Alunas";
  avgStdHse.innerHTML = Math.round(pct) + "%";
  ttStdHse.innerHTML = `% de total (${total})`;

  return arr = [
    ["Qtd Alunas", "%"],
    ["Acima media", Math.round(pct)],
    ["Abaixo media", Math.round((100 - pct))]
  ];
}

function drawPieChartHse() {

  var data = google.visualization.arrayToDataTable(avgHseStudents());

  var options = {
    pieHole: 0.5,
    pieSliceTextStyle: {
      color: "black",
    }
  };

  var chart = new google.visualization.PieChart(document.getElementById("donutchartHse"));
  chart.draw(data, options);
}

// ----- Grafico 6 -  Estudantes Satisfeitas por Sprint em %

function studentSatisfactionData() {

  var sprintSize = data[localMenu][yearClassMenu].ratings.length;
  var array = [
    ["Sprints", "% de Alunas"]
  ];

  for (var i = 1; i <= sprintSize; i++) {
    array.push(["SP" + i, 0]);
  }

  var x = 1;
  var avgSs = 0;
  for (rating of data[localMenu][yearClassMenu]["ratings"]) {
    array[x][1] += (rating.student.cumple + rating.student.supera);
    avgSs += (rating.student.cumple + rating.student.supera);
    x++;
  }

  var dataName6 = document.querySelector("#dataName6");
  dataName6.innerHTML = "Satisfação das Alunas";

  var studentSatisfactionInfoH2 = document.getElementById("studentSatisfactionInfoH2");
  var studentSatisfactionInfoSmall = document.querySelector(".studentSatisfactionInfoSmall");
  
  var stdSize = data[localMenu][yearClassMenu].students.length;
  avgSs = (avgSs / sprintSize);

  var totalSs = (avgSs * stdSize) / 100;
  studentSatisfactionInfoH2.innerHTML = Math.round(totalSs);
  studentSatisfactionInfoSmall.innerHTML = "Acham que Cumpre ou Supera as expectativas."

  return array;
}

google.charts.setOnLoadCallback(drawLineChartStudentSatisfaction);

function drawLineChartStudentSatisfaction() {

  var data = google.visualization.arrayToDataTable(studentSatisfactionData());

  var options = {
    curveType: "function",
    legend: {
      position: "bottom"
    }
  };

  var chart = new google.visualization.LineChart(document.getElementById("studentSatisfactionGraphic"));
  chart.draw(data, options);
}

// ----- Grafico 7 - Nota dos professores por sprint

function teacherRatingData() {

  var sprintSize = data[localMenu][yearClassMenu].ratings.length;
  var array = [
    ["Sprints", "Mentores"]
  ];

  for (var i = 1; i <= sprintSize; i++) {
    array.push(["SP" + i, 0]);
  }

  var x = 1;
  var avgTr = 0;
  for (rating of data[localMenu][yearClassMenu]["ratings"]) {
    array[x][1] += rating.teacher;
    avgTr += rating.teacher;
    x++;
  }

  var dataName7 = document.querySelector("#dataName7");
  dataName7.innerHTML = "Avaliação dos Mentores";

  avgTr = (avgTr / sprintSize);

  var teacherRatingInfoH2 = document.getElementById("teacherRatingInfoH2");
  teacherRatingInfoH2.innerHTML = avgTr.toFixed(2);

  var teacherRatingInfoSmall = document.querySelector(".teacherRatingInfoSmall");
  teacherRatingInfoSmall.innerHTML = "Nota média geral";

  return array;
}

google.charts.setOnLoadCallback(drawLineChartTeacherRating);

function drawLineChartTeacherRating() {

  var data = google.visualization.arrayToDataTable(teacherRatingData());

  var options = {
    curveType: "function",
    legend: {
      position: "bottom"
    }
  };

  var chart = new google.visualization.LineChart(document.getElementById("teacherRatingGraphic"));
  chart.draw(data, options);
}

// ----- Grafico 8 - Nota dos mentores por sprint

function jediMasterRatingData() {
  var sprintSize = data[localMenu][yearClassMenu].ratings.length;
  var array = [
    ["Sprints", "Jedi"]
  ];

  for (var i = 1; i <= sprintSize; i++) {
    array.push(["SP" + i, 0]);
  }

  var x = 1;
  var avgJmr = 0;
  for (rating of data[localMenu][yearClassMenu]["ratings"]) {
    array[x][1] += rating.jedi;
    avgJmr += rating.jedi;
    x++;
  }

  var dataName8 = document.querySelector("#dataName8");
  dataName8.innerHTML = "Avaliação dos Jedi";

  avgJmr = (avgJmr / sprintSize);

  var jediMasterRatingInfoH2 = document.getElementById("jediMasterRatingInfoH2");
  jediMasterRatingInfoH2.innerHTML = avgJmr.toFixed(1);

  var jediMasterRatingInfoSmall = document.querySelector(".jediMasterRatingInfoSmall");
  jediMasterRatingInfoSmall.innerHTML = "Nota média geral";
  return array;
}

google.charts.setOnLoadCallback(drawLineChartJediMasterRating);

function drawLineChartJediMasterRating() {

  var data = google.visualization.arrayToDataTable(jediMasterRatingData());

  var options = {
    curveType: "function",
    legend: {
      position: "bottom"
    }
  };

  var chart = new google.visualization.LineChart(document.getElementById("jediMasterRatingGraphic"));
  chart.draw(data, options);
}